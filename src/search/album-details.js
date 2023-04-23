import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAccessToken, getAlbum } from "../services/search-service";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReviewThunk, findReviewsByAlbumThunk, updateReviewThunk } from "../services/reviews-thunk";
import "../index.css";
import FancyButton from "../FancyButton/button";
import { updateUserThunk } from "../services/user-thunk";

const AlbumDetails = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState({});
    const { currentUser } = useSelector(state => state.user);
    const { reviews } = useSelector(state => state.reviews);
    const [error, setError] = useState("");
    const [review, setReview] = useState("");
    const [score, setScore] = useState(0);
    const [oldReviewId, setOldReviewId] = useState("");
    const [alreadyPosted, setAlreadyPosted] = useState(false);
    const dispatch = useDispatch();

    const checkIfAlreadyPosted = (result) => {
        if (result) {
            result.forEach(review => {
                if (review.userId === currentUser._id) {
                    setAlreadyPosted(true);
                    setReview(review.review);
                    setScore(review.score);
                    setOldReviewId(review._id);
                }
            })
        }
    }

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
            console.log(album.data);
            setAlbum(album);
            return album.data;
        }

        getToken().then(result => getAlbums(result))
        dispatch(findReviewsByAlbumThunk(id)).then(result => {
            checkIfAlreadyPosted(result.payload)
        });
    }, [id, currentUser]);

    function convertMS(track) {
        const minutes = Math.floor(track.duration_ms / 1000 / 60)
        const seconds = Math.floor((track.duration_ms / 1000) % 60)
        return (
            <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
        )
    }

    const handleEditReview = async () => {
        const updatedReview = {
            _id: oldReviewId,
            review,
            score,
            albumId: id,
            albumName: album.data.name,
            userId: currentUser._id,
            username: currentUser.username,
            handle: currentUser.handle
        }
        const newReview = await dispatch(updateReviewThunk(updatedReview));
        console.log(newReview);
    }

    const handlePostReview = async () => {
        const fullReview = {
            review,
            score,
            albumId: id,
            albumName: album.data.name,
            albumMainArtist: album.data.artists[0].name,
            userId: currentUser._id,
            username: currentUser.username,
            handle: currentUser.handle
        }
        const result = await dispatch(createReviewThunk(fullReview));
        if (result.payload === 404) {
            setError("Missing fields");
            return;
        }
        if (result.payload === 409) {
            setError("Can't review more than once");
            return;
        }

        const newUser = {
            ...currentUser,
            reviews: currentUser.reviews + 1
        }

        const updatedUser = await dispatch(updateUserThunk(newUser));
        console.log(updatedUser);
    }

    return (
        <div>
            {album.data &&
                <div>
                    <div className="ps-2">
                        <div className="d-flex p-3 ps-0 justify-content-between d-flex row">
                            <div className="col-1" />
                            <div className="d-flex col-11">
                                <img src={album.data.images[1].url} className="sf-song-cover" />
                                <div className="d-flex ps-3 flex-column justify-content-center">
                                    <h1 className="sf-secondary sf-song-title m-0">{album.data.name}</h1>
                                    <div className="sf-accent sf-song-artist">
                                        {album.data.artists && album.data.artists.map(artist => <span>{artist.name} </span>)}
                                    </div>
                                    <div className="text-capitalize sf-tertiary sf-song-subtext fs-5">{album.data.album_type} • {album.data.release_date.substring(0, 4)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 pb-1 pt-1">
                        {album.data.tracks.items.map((track, index) => {
                            return (
                                <div className="py-1 row d-flex justify-content-between">
                                    <div className="d-flex col-11">
                                        <div className="sf-tertiary pe-2 col-1 d-flex justify-content-end">{index + 1}</div>
                                        <div className="sf-secondary col-11 text-truncate">{track.name}</div>
                                    </div>
                                    <div className="sf-tertiary sf-secondary col-1 d-flex justify-content-end">{convertMS(track)}</div>
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
                                        <Link to={`/profile/${item.userId}`} className="sf-underline-hover sf-anim-3 float-end">{item.username} @{item.handle}</Link>
                                        {item.review}
                                    </li>
                                )}
                            </ul>
                        }
                        {
                            reviews && reviews.length === 0 &&
                            <div>
                                No reviews yet
                            </div>
                        }

                        {
                            currentUser && alreadyPosted &&
                            <div>
                                <h2 className="sf-secondary">Edit Your Review</h2>
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
                                <textarea
                                    defaultValue={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    className="form-control"
                                    placeholder={`Review ${album.data.name}`} />
                                <FancyButton onclick={handleEditReview} text="Save Edits" />
                            </div>
                        }
                        {
                            currentUser && !alreadyPosted &&

                            <div>
                                <h2 className="sf-secondary">Leave a Review</h2>
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
                                <textarea
                                    defaultValue={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    className="form-control"
                                    placeholder={`Review ${album.data.name}`} />
                                <FancyButton onclick={handlePostReview} text="Post Review" />
                            </div>
                        }
                        {!currentUser &&
                            <div>
                                <h2 className="sf-secondary">Leave a Review</h2>
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