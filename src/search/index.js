import { useEffect, useState } from "react";
import FancyButton from "../FancyButton/button";
import { useDispatch, useSelector } from "react-redux";
import { getAccessTokenThunk } from "../services/search-thunk";
import { useNavigate, useParams } from "react-router-dom";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { fullTextSearch } from "../services/search-service";
import "./index.css";
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
            <div className='sf-searchbar-page-container sf-home-item-container d-flex align-items-center justify-content-center'>
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
                <div className="row row-cols-4 justify-content-center">
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
                            <div className="card">
                                <Link className="sf-no-text-decor" to={`/search/album/${result.id}`}>
                                    <img src={result.images[0].url} className="card-img"></img>
                                    <div className="card-body">
                                        <div className="card-title sf-text-bold">{result.name}</div>
                                        <div className="card-text">{result.artists[0].name}</div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                    {
                        !waiting && searchResults.items && searchResultItems.length > 0 &&
                        <FancyButton onclick={() => {
                            setOffset(offset + 8, result => searchSpotify(result));
                        }} text="More Results" />
                    }
                    {
                        searchResults.items && searchResultItems.length === 0 &&
                        <div>
                            No results found
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchScreen;