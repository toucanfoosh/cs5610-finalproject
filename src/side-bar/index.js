import './index.css';
import '../index.css';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { miniTextSearch } from '../services/search-service';
import { getAccessTokenThunk } from '../services/search-thunk';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useStateWithCallbackLazy("");
    const [accessToken, setAccessToken] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [searchResultItems, setSearchResultItems] = useState({});
    useEffect(() => {
        const getToken = async () => {
            const token = await dispatch(getAccessTokenThunk());
            setAccessToken(token.payload);
        }
        getToken();
    }, []);
    const searchSpotify = async (searchterm) => {
        window.localStorage.setItem("token", accessToken);
        if (!searchterm) {
            setSearchResults("");
            return;
        }
        const credentials = {
            searchterm,
            accessToken,
        }
        const results = await miniTextSearch(credentials);
        console.log(results);
        if (results === 400) {
            return;
        }
        console.log(results.data.albums.items);
        setSearchResults(results.data.albums);
        setSearchResultItems(results.data.albums.items);
    }
    return (
        <div>
            <div className='sf-searchbar-container'>
                <div className="d-flex justify-content-center py-3">
                    <div className='sf-searchbar'>
                        <input
                            type="text" placeholder='Search...' className="sf-searchbar-text"
                            onChange={(e) => setSearch(e.target.value, (result) => {
                                console.log(result);
                                searchSpotify(result);
                            })}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    navigate(`/search/${search}`);
                                }
                            }}
                        />
                        <button onClick={() => navigate(`/search/${search}`)} className="sf-searchbar-button"><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </div>
            {
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
                searchResults.items && searchResultItems.length === 0 &&
                <div>
                    No results found
                </div>
            }
        </div>
    )
};

export default SideBar;