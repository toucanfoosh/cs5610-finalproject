import { useEffect, useState } from "react";
import FancyButton from "../FancyButton/button";
import { useDispatch } from "react-redux";
import { getAccessTokenThunk } from "../services/search-thunk";
import { useNavigate, useParams } from "react-router-dom";
import { fullTextSearch } from "../services/search-service";
import "./index.css";
import { Link } from "react-router-dom";

const SearchScreen = () => {
    const { searchTerm } = useParams();
    const [search, setSearch] = useState(searchTerm);
    const [accessToken, setAccessToken] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [waiting, setWaiting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const getToken = async () => {
            const token = await dispatch(getAccessTokenThunk());
            setAccessToken(token.payload);
        }
        getToken();
        if (searchTerm) {
            searchSpotify();
        }
    }, [searchTerm]);

    const searchSpotify = async () => {
        window.localStorage.setItem("token", accessToken);
        const credentials = {
            search,
            accessToken
        }
        setWaiting(true);
        const results = await fullTextSearch(credentials);
        setWaiting(false);
        if (results === 400) {
            return;
        }
        console.log(results.data.albums.items);
        setSearchResults(results.data.albums);
        navigate(`/search/${search}`);
    }
    return (
        <div>
            <div className="input-group mb-3" size="lg">
                <input className="form-control"
                    placeholder="Search"
                    type="input"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>
            <FancyButton onclick={searchSpotify} text="Search"></FancyButton>
            <div className="container mt-3">
                <div className="row row-cols-4">
                    {
                        searchResults.items &&
                        searchResults.items.map(result =>
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
                        searchResults.items && searchResults.items.length === 0 &&
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