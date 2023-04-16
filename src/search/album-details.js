import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAccessToken, getAlbum } from "../services/search-service";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk, findReviewsByAlbumThunk } from "../services/reviews-thunk";
import "../index.css";
import FancyButton from "../FancyButton/button";

const AlbumDetails = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState({});
    const { reviews } = useSelector(state => state.reviews);
    const { currentUser } = useSelector(state => state.user);
    const [error, setError] = useState("");
    const [review, setReview] = useState("");
    const [score, setScore] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        const getToken = async () => {
            if (!localStorage.getItem("token")) {
                const temp = await getAccessToken();
                localStorage.setItem("token", temp);
            }
            return localStorage.getItem("token");
        }

        const getAlbums = async (token) => {
            const params = {
                id,
                token
            }
            const album = await getAlbum(params);
            setAlbum(album);
            console.log(album.data);
            return album.data;
        }

        getToken().then(result => getAlbums(result));
        dispatch(findReviewsByAlbumThunk(id));
        console.log(reviews);
    }, [id]);

    function convertMS(track) {
        const minutes = Math.floor(track.duration_ms / 1000 / 60)
        const seconds = Math.floor((track.duration_ms / 1000) % 60)
        return (
            <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
        )
    }

    const handlePostReview = async () => {
        const fullReview = {
            review,
            score,
            albumId: id,
            userId: currentUser._id,
            username: currentUser.username,
            handle: currentUser.handle
        }
        const result = await dispatch(createReviewThunk(fullReview));
        if (result.payload === 404) {
            console.log("heelo");
            setError("Missing fields");
        }
        if (result.payload === 409) {
            console.log("heelo");
            setError("Can't review more than once");
        }
    }

    return (
        <div>
            {album.data &&
                <div>
                    <div>
                        <h1 className="sf-secondary">{album.data.name}</h1>
                        <div>{album.data.release_date.substring(0, 4)} • {album.data.album_type}</div>
                        <img src={album.data.images[1].url} />
                        <div>
                            {album.data.artists && album.data.artists.map(artist => <span>{artist.name} </span>)}
                        </div>
                    </div>
                    <div className="mt-2">
                        <h2 className="sf-secondary">Tracks</h2>
                        {album.data.tracks.items.map(track => {
                            return (
                                <div>
                                    <span>{track.name}</span>
                                    <div className="float-end">{convertMS(track)}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <h2 className="sf-secondary">Reviews</h2>
                        {
                            reviews && reviews.length > 0 &&
                            <ul className="list-group">
                                {reviews.map(item =>
                                    <li className="list-group-item">
                                        {item.score} <br />
                                        <div className="float-end">{item.username} @{item.handle}</div>
                                        {item.review}
                                    </li>)
                                }
                            </ul>
                        }
                        {
                            reviews && reviews.length === 0 &&
                            <div>
                                No reviews yet
                            </div>
                        }

                        <h2 className="sf-secondary">Leave a Review</h2>
                        {currentUser &&
                            <div>
                                {
                                    error &&
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                }
                                <div onChange={(e) => setScore(e.target.value)}>
                                    <input type="radio" value={1} name="stars" />1
                                    <input type="radio" value={2} name="stars" />2
                                    <input type="radio" value={3} name="stars" />3
                                    <input type="radio" value={4} name="stars" />4
                                    <input type="radio" value={5} name="stars" />5
                                </div>
                                <textarea defaultValue={review} onChange={(e) => setReview(e.target.value)} className="form-control" placeholder={`Review ${album.data.name}`}></textarea>
                                <FancyButton onclick={handlePostReview} text="Post Review" />
                            </div>
                        }
                        {!currentUser &&
                            <div>
                                Must be logged in to review
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default AlbumDetails;