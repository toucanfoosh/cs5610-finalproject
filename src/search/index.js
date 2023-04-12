import { useEffect, useState } from "react";
import FancyButton from "../FancyButton/button";
import { useDispatch } from "react-redux";
import { getAccessTokenThunk } from "../services/search-thunk";
import { fullTextSearch } from "../services/search-service";
import "./index.css";
import { Link } from "react-router-dom";

const SearchScreen = () => {
    const [search, setSearch] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        const getToken = async () => {
            const token = await dispatch(getAccessTokenThunk());
            setAccessToken(token.payload);
        }

        getToken();
    }, []);

    const searchSpotify = async () => {
        const credentials = {
            search,
            accessToken
        }
        const results = await fullTextSearch(credentials);
        if (results === 400) {
            return;
        }
        console.log(results.data.albums.items);
        setSearchResults(results.data.albums);
    }
    return (
        <div>
            <div className="input-group mb-3" size="lg">
                <input className="form-control"
                    placeholder="Search"
                    type="input"
                    onChange={(e) => {
                        setSearch(e.target.value);
                        searchSpotify();
                    }}
                />
            </div>
            <FancyButton text="Search"></FancyButton>
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

                </div>
            </div>
            {search}
        </div>
    )
}

export default SearchScreen;