import { useEffect, useState } from "react";
import FancyButton from "../FancyButton/button";
import { useDispatch, useSelector } from "react-redux";
import { getAccessTokenThunk } from "../services/search-thunk";
import { useNavigate, useParams } from "react-router-dom";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { fullTextSearch } from "../services/search-service";
import "./index.css";
import "../index.css";
import { Link } from "react-router-dom";
import LoadingIcon from "../loading-icon";
import { findReviewsByAlbumThunk } from "../services/reviews-thunk";
import { searchUsersThunk } from "../services/user-thunk";

const SearchScreen = () => {
    const { searchTerm } = useParams();
    const [search, setSearch] = useState(searchTerm || "");
    const [accessToken, setAccessToken] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [searchResultItems, setSearchResultItems] = useStateWithCallbackLazy([]);
    const [waiting, setWaiting] = useState(false);
    const [offset, setOffset] = useStateWithCallbackLazy(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getToken = async () => {
            const token = await dispatch(getAccessTokenThunk());
            setAccessToken(token.payload);
        }
        getToken();
        if (search) {
            searchSpotify(0);
        }
    }, [search]);

    const handleAverageReviews = async (id) => {
        const response = await dispatch(findReviewsByAlbumThunk(id));
        const reviews = response.payload;

        let totalScore = 0;
        if (reviews.length > 0) {
            for (const review of reviews) {
                totalScore += review.score;
            }

            totalScore = totalScore / reviews.length;
            return {
                score: totalScore,
                numReviews: reviews.length
            }
        }
        else {
            return {
                score: "-",
                numReviews: "(0)"
            }
        }
    }

    const handleHoldScore = async (items) => {
        console.log(items);
        const reviews = await Promise.all(items.map(item => {
            return handleAverageReviews(item.id)
        }));
        let count = -1;

        const newSearchResultItems = items.map(item => {
            count++;
            return {
                ...item,
                score: reviews[count].score,
                numReviews: reviews[count].numReviews
            }
        })

        console.log(newSearchResultItems);
        setSearchResultItems(newSearchResultItems);
    }

    const searchLocalDatabase = async (search) => {
        const results = await dispatch(searchUsersThunk(search));
        console.log(results.payload);
        return results.payload;
    }

    const searchSpotify = async (offsetNum) => {
        window.localStorage.setItem("token", accessToken);
        console.log(offsetNum);
        if (!search) {
            setSearchResults("");
            return;
        }
        const credentials = {
            search,
            accessToken,
            offsetNum
        }
        setWaiting(true);
        const results = await fullTextSearch(credentials);
        console.log(results);
        setWaiting(false);
        if (results === 400) {
            return;
        }

        const response = await searchLocalDatabase(search);

        console.log(results.data.albums.items);
        if (offsetNum > 0) {
            setSearchResultItems(searchResultItems => [
                ...searchResultItems,
                ...results.data.albums.items
            ], result => handleHoldScore(result));
        }
        else {
            setSearchResults(results.data.albums);
            setSearchResultItems([...response, ...results.data.albums.items], result => handleHoldScore(result));
        }

        navigate(`/search/${search}`);

    }
    return (
        <div>
            <div className='sf-searchbar-page-container sf-bg-blur sticky-top sf-home-item-container d-flex align-items-center justify-content-center'>
                <div className='sf-searchbar'>
                    <input id='search' className="sf-searchbar-text"
                        placeholder="Search..."
                        type="input"
                        value={search}
                        autoComplete="off"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                searchSpotify(0);
                            }
                        }}
                    />
                    <button className="sf-searchbar-button" onClick={() => searchSpotify(0)}><i class="fa fa-search"></i></button>
                </div>
            </div>
            <div className="container mt-3">
                <div className="col justify-content-center">
                    {
                        waiting &&
                        <LoadingIcon />
                    }
                    {
                        !waiting &&
                        searchResults === "" &&
                        <div>
                            No results found
                        </div>
                    }
                    {
                        !waiting &&
                        searchResults.items &&
                        searchResultItems.map(result => {
                            return (
                                <div>
                                    {
                                        // ALBUM
                                        result.images &&
                                        <Link className="sf-no-text-decor" to={`/search/album/${result.id}`}>
                                            <div className="p-1">
                                                <div className="sf-result-container sf-result-hover d-flex align-items-center">
                                                    <div className="sf-result-body-container d-flex sf-w-100">
                                                        <div className="col-9 d-flex">
                                                            <img src={result.images[0].url} className="sf-result-img p-2" />
                                                            <div className="ps-3 sf-flex-col justify-content-center align-items-start text-truncate sf-result-body">
                                                                <div className="sf-w-100 sf-secondary sf-text-bold text-truncate">{result.name}</div>
                                                                <div className="sf-tertiary text-truncate">{result.artists[0].name}</div>
                                                            </div>
                                                        </div>
                                                        <div className="sf-flex-col col-3 sf-review-stats d-flex justify-content-center align-items-end">
                                                            <div className="sf-flex-col pe-3 text-truncate text-end">
                                                                <div className="sf-secondary sf-text-bold">Rating: {result.score !== "-" ? (("" + result.score).length > 4 ? ("" + result.score).slice(0, 4) : result.score) : result.score}/5</div>
                                                                <div className="sf-tertiary">{result.numReviews} reviews</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    }
                                    {
                                        // USER
                                        result.role &&
                                        <Link className="sf-no-text-decor" to={`/profile/other/${result._id}`}>
                                            <div className="p-1">
                                                <div className="sf-result-container sf-result-hover d-flex align-items-center">
                                                    <div className="sf-result-body-container d-flex sf-w-100">
                                                        <div className="col-9 d-flex">
                                                            <img src={`/images/${result.avatar}`} className="sf-result-img p-2" />
                                                            <div className="ps-3 sf-flex-col justify-content-center align-items-start text-truncate sf-result-body">
                                                                <div className="sf-w-100 sf-secondary sf-text-bold text-truncate">{result.username}</div>
                                                                <div className="sf-tertiary text-truncate">@{result.handle}</div>
                                                            </div>
                                                        </div>
                                                        <div className="sf-flex-col col-3 sf-review-stats d-flex justify-content-center align-items-end">
                                                            <div className="sf-flex-col pe-3 text-truncate text-end">
                                                                <div className="sf-secondary sf-text-bold">Followers: {result.followers.length}</div>
                                                                <div className="sf-secondary sf-text-bold">Following: {result.following.length}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className="d-flex justify-content-center">
                    {
                        !waiting && searchResults.items && searchResults.items.length > 0 &&
                        <div className="sf-results-button-container m-3">
                            <FancyButton onclick={() => {
                                setOffset(offset + 8, result => searchSpotify(result));
                            }} text="More Results" className="sf-results-button" />
                        </div>
                    }
                    {
                        searchResults.items && searchResults.items.length === 0 &&
                        <div className="text-center">
                            No results found
                        </div>
                    }
                </div>
                <div className="sf-bottom-post"></div>
            </div>
        </div >
    )
}

export default SearchScreen;