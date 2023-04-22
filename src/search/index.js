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

const SearchScreen = () => {
    const { searchTerm } = useParams();
    const [search, setSearch] = useState(searchTerm || "");
    const [accessToken, setAccessToken] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [searchResultItems, setSearchResultItems] = useState([]);
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


    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

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
        console.log(results.data.albums.items);
        if (offsetNum > 0) {
            setSearchResultItems(searchResultItems => [
                ...searchResultItems,
                ...results.data.albums.items
            ])
            console.log(searchResultItems);
        }
        else {
            setSearchResults(results.data.albums);
            setSearchResultItems(results.data.albums.items);
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
                        searchResultItems.map(result =>
                            <div className="p-1">
                                <div className="sf-result-container row align-items-center">
                                    <Link className="sf-no-text-decor" to={`/search/album/${result.id}`}>
                                        <div className="row">
                                            <div className="col-3">
                                                <img src={result.images[0].url} className="sf-result-img" />
                                            </div>
                                            <div className="sf-card-body col-9">
                                                <div className="sf-card-title sf-secondary sf-text-bold text-truncate">{result.name}</div>
                                                <div className="sf-card-text sf-tertiary text-truncate">{result.artists[0].name}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="d-flex justify-content-center">
                    {
                        !waiting && searchResults.items && searchResultItems.length > 0 &&
                        <div className="sf-results-button-container m-3">
                            <FancyButton onclick={() => {
                                setOffset(offset + 8, result => searchSpotify(result));
                            }} text="More Results" className="sf-results-button" />
                        </div>
                    }
                    {
                        searchResults.items && searchResultItems.length === 0 &&
                        <div className="text-nowrap">
                            No results found
                        </div>
                    }
                </div>
                <div className="sf-bottom-post"></div>
            </div>
        </div>
    )
}

export default SearchScreen;