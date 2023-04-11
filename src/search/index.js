import { useEffect, useState } from "react";
import FancyButton from "../FancyButton/button";
import { useDispatch } from "react-redux";
import { getAccessTokenThunk } from "../services/search-thunk";

const SearchScreen = () => {
    const [search, setSearch] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        var token = dispatch(getAccessTokenThunk());
        console.log(token);
    }, []);

    // async function searchSpotify() {
    //     var params = {
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + accessToken
    //         }
    //     }

    //     var results = await fetch('https://api.spotify.com/v1/search?q=' + search + '&type=album', params)
    //         .then(response => response.json())
    //         .then(data => { return data.albums.items });
    // }

    return (
        <div>
            <div className="input-group mb-3" size="lg">
                <input className="form-control"
                    placeholder="Search"
                    type="input"
                    onChange={(e) => {
                        setSearch(e.target.value);
                        // searchSpotify();
                    }}
                />
            </div>
            <FancyButton text="Search"></FancyButton>
            <div className="container mt-3">
                <div className="row row-cols-4">
                    <div className="card">
                        <img src="catjam.jpg" className="card-img-top"></img>
                        <div className="card-body">
                            <div className="card-title">Album Name</div>
                        </div>
                    </div>
                    <div className="card">
                        <img src="catjam.jpg" className="card-img-top"></img>
                        <div className="card-body">
                            <div className="card-title">Album Name</div>
                        </div>
                    </div>
                    <div className="card">
                        <img src="catjam.jpg" className="card-img-top"></img>
                        <div className="card-body">
                            <div className="card-title">Album Name</div>
                        </div>
                    </div>
                    <div className="card">
                        <img src="catjam.jpg" className="card-img-top"></img>
                        <div className="card-body">
                            <div className="card-title">Album Name</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchScreen;