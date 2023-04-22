import './index.css';
import '../index.css';
import '../search/index.css';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { miniTextSearch } from '../services/search-service';
import { getAccessTokenThunk } from '../services/search-thunk';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import LoadingIcon from '../loading-icon';

const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useStateWithCallbackLazy("");
    const [accessToken, setAccessToken] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [searchResultItems, setSearchResultItems] = useState({});
    const [loading, setLoading] = useState(false);
    const [hasBorder, setHasBorder] = useState(false);
    useEffect(() => {
        const getToken = async () => {
            const token = await dispatch(getAccessTokenThunk());
            setAccessToken(token.payload);
        }
        getToken();
    }, []);
    const searchSpotify = async (searchterm) => {
        window.localStorage.setItem("token", accessToken);
        setLoading(true);
        if (!searchterm) {
            setLoading(false);
            setSearchResults("");
            return;
        }
        const credentials = {
            searchterm,
            accessToken,
        }
        const results = await miniTextSearch(credentials);
        setLoading(false);
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
                            type="text" placeholder='Search...' className="sf-searchbar-text" autoComplete='off'
                            onChange={(e) => {
                                setSearch(e.target.value, (result) => {
                                    console.log(result);
                                    searchSpotify(result);
                                });
                                setHasBorder(e.target.value !== '');
                            }}
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
            <div className='d-flex justify-content-center sf-card-container'>
                <div className={`sf-card ${hasBorder ? 'sf-card-border' : ''} sf-bg-primary`}>
                    {
                        loading &&
                        <LoadingIcon />
                    }
                    {
                        !loading &&
                        <div>
                            {
                                searchResults.items &&
                                searchResultItems.map(result =>
                                    <Link className="sf-no-text-decor" to={`/search/album/${result.id}`}>
                                        <div className='sf-result p-2 sf-result-hover flex-column flex-xl-row'>
                                            <img src={result.images[0].url} className="sf-card-img img-fluid"></img>
                                            <div className="sf-card-body pt-1 pt-xl-0 ps-xl-3 text-center text-xl-start text-truncate">
                                                <div className="sf-result-text sf-secondary sf-text-bold text-truncate">{result.name}</div>
                                                <div className="sf-result-text sf-tertiary text-truncate">{result.artists[0].name}</div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            {
                                searchResults.items && searchResultItems.length === 0 &&
                                <div className='text-center p-3'>
                                    No results found
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>

        </div>
    )
};

export default SideBar;