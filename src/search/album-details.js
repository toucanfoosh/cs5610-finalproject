import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getAccessToken, getAlbum } from "../services/search-service";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReviewThunk, findReviewsByAlbumThunk, updateReviewThunk } from "../services/reviews-thunk";
import "../index.css";
import FancyButton from "../FancyButton/button";
import { updateUserThunk } from "../services/user-thunk";
import { createListThunk, findListsByUserThunk, updateListThunk } from "../services/lists-thunk";
import BackButton from "../back-button";
import ReviewItem from "./review-item";

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
    const [lists, setLists] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showLists, setShowLists] = useState(false);

    const toggleShowLists = () => {
        setShowLists(!showLists);
    }

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

    const fetchLists = async () => {
        if (currentUser) {
            const response = await dispatch(findListsByUserThunk(currentUser._id));
            setLists(response.payload);
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
        fetchLists();
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

    const alreadyIncluded = (list) => {
        for (const album of list.albums) {
            if (album.albumId === id) {
                return true;
            }
        }
        return false;
    }

    const handleRemoveFromList = async (list) => {
        // PREREQ: already in list
        console.log("removing from list");
        const newAlbums = list.albums.filter(e => e.albumId != id);
        const newList = {
            ...list,
            albums: newAlbums
        }

        const response = await dispatch(updateListThunk(newList));
        const update = await fetchLists();
    }

    const handleAddToList = async (list) => {
        console.log("adding to list");
        const newAlbum = {
            albumId: id,
            albumName: album.data.name,
            albumMainArtist: album.data.artists[0].name,
            albumImage: album.data.images[1].url
        }

        const { albums } = JSON.parse(JSON.stringify(list));
        albums.push(newAlbum);

        const newList = {
            ...list,
            albums
        }

        const response = await dispatch(updateListThunk(newList));
        const result = await fetchLists();
        console.log(response);
    }

    const createNewFolio = async () => {
        if (currentUser) {
            const newList = {
                userId: currentUser._id,
                albums: [],
                name: "Untitled Folio",
                description: ""
            }

            const response = await dispatch(createListThunk(newList));
            console.log(response.payload);

            const resList = response.payload;

            navigate(`/lists/${resList._id}`);
        }
    }


    return (
        <div>
            {album.data &&
                <div>
                    <BackButton path="/search" on />
                    <div className="ps-2">
                        <div className="d-flex p-3 px-0 justify-content-start d-flex row">
                            <div className="col-1" />
                            <div className="d-flex col-8">
                                <img src={album.data.images[1].url} className="sf-song-cover" />
                                <div className="d-flex ps-3 flex-column justify-content-center">
                                    <h1 className="sf-secondary sf-song-title m-0">{album.data.name}</h1>
                                    <div className="sf-accent sf-song-artist">
                                        {album.data.artists && album.data.artists.map(artist => <span>{artist.name} </span>)}
                                    </div>
                                    <div className="text-capitalize sf-tertiary sf-song-subtext fs-5">{album.data.album_type} • {album.data.release_date.substring(0, 4)}</div>
                                </div>
                            </div>
                            {
                                currentUser &&
                                <div className="col-3 d-flex align-items-end justify-content-center">
                                    <div className="sf-dropdown d-flex justify-content-center">
                                        <div className="fs-1 sf-hw-100">
                                            <div className="sf-dropdown-button">
                                                <FancyButton
                                                    text={`${showLists ? "x" : "+"}`}
                                                    onclick={toggleShowLists}
                                                    color={`${showLists ? "sf-bg-danger" : "sf-bg-accent"}`}
                                                    textColor={`${showLists ? "sf-secondary" : "sf-primary"}`} />
                                            </div>
                                        </div>
                                        <div class={`sf-dropdown-content ${showLists ? "d-block" : "d-none"}`}>
                                            {lists.length > 0 && lists.map(list => {
                                                return (
                                                    <div>
                                                        {
                                                            !alreadyIncluded(list) &&
                                                            <Link onClick={() => handleAddToList(list)}>
                                                                <div className="row d-flex justify-content-between">
                                                                    <div className="col-9 text-truncate">{list.name}</div>
                                                                    <div className="col-2 pe-3"><i className="fa-solid fa-plus"></i></div>
                                                                </div>
                                                            </Link>
                                                        }
                                                        {
                                                            alreadyIncluded(list) &&
                                                            <Link onClick={() => handleRemoveFromList(list)}>
                                                                <div className="row d-flex justify-content-between">
                                                                    <div className="col-9 text-truncate">{list.name}</div>
                                                                    <div className="col-2 pe-3"><i className="fa-solid fa-check"></i></div>
                                                                </div>
                                                            </Link>
                                                        }
                                                    </div>
                                                )
                                            }
                                            )}
                                            {
                                                lists.length === 0 &&
                                                <div>
                                                    <Link onClick={() => createNewFolio()}>
                                                        Create new Folio
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
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
                        <h2 className="row px-4 pt-3 pb-0 sf-secondary">Reviews</h2>
                        {
                            reviews && reviews.length > 0 &&
                            <div className="row">
                                {reviews.map(review =>
                                    <ReviewItem item={review} />
                                )}
                            </div>
                        }
                        {
                            reviews && reviews.length === 0 &&
                            <div>
                                No reviews yet
                            </div>
                        }

                        {
                            currentUser && alreadyPosted &&
                            <div className="row">
                                <h2 className="sf-secondary pt-2">Edit Your Review</h2>
                                {
                                    error &&
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                }
                                <div className="col-8 d-flex flex-column">
                                    <div className="py-2">
                                        <div class="star-rating" onChange={(e) => setScore(e.target.value)}>
                                            <input type="radio" value="1" name="stars" id="star1" /><label for="star1" class="fas fa-star sf-clickable"></label>
                                            <input type="radio" value="2" name="stars" id="star2" /><label for="star2" class="fas fa-star sf-clickable"></label>
                                            <input type="radio" value="3" name="stars" id="star3" /><label for="star3" class="fas fa-star sf-clickable"></label>
                                            <input type="radio" value="4" name="stars" id="star4" /><label for="star4" class="fas fa-star sf-clickable"></label>
                                            <input type="radio" value="5" name="stars" id="star5" /><label for="star5" class="fas fa-star sf-clickable"></label>
                                        </div>
                                    </div>
                                    <div className="">
                                        <textarea
                                            defaultValue={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            className="sf-form-control sf-w-100 py-2 px-3"
                                            placeholder={`Review ${album.data.name}`} />
                                    </div>
                                </div>
                                <div className="col-4 p-3">
                                    <FancyButton onclick={handleEditReview} text="Save Edits" />
                                </div>
                            </div>
                        }
                        {
                            currentUser && !alreadyPosted &&

                            <div className="row">
                                <h2 className="sf-secondary pt-2">Leave a Review</h2>
                                {
                                    error &&
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                }
                                <div className="col-8 d-flex flex-column">
                                    <div className="py-2">
                                        <div class="star-rating" onChange={(e) => setScore(e.target.value)}>
                                            <input type="radio" value="1" name="stars" id="star1" /><label for="star1" class="fas fa-star sf-clickable"></label>
                                            <input type="radio" value="2" name="stars" id="star2" /><label for="star2" class="fas fa-star sf-clickable"></label>
                                            <input type="radio" value="3" name="stars" id="star3" /><label for="star3" class="fas fa-star sf-clickable"></label>
                                            <input type="radio" value="4" name="stars" id="star4" /><label for="star4" class="fas fa-star sf-clickable"></label>
                                            <input type="radio" value="5" name="stars" id="star5" /><label for="star5" class="fas fa-star sf-clickable"></label>
                                        </div>
                                    </div>
                                    <div className="">
                                        <textarea
                                            defaultValue={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            className="sf-form-control sf-w-100"
                                            placeholder={`Review ${album.data.name}`} />
                                    </div>
                                </div>
                                <div className="col-4 p-3">
                                    <FancyButton onclick={handlePostReview} text="Post Review" />
                                </div>
                            </div>
                        }
                        {!currentUser &&
                            <div>
                                <h2 className="sf-secondary pt-2">Leave a Review</h2>
                                Must be logged in to review
                            </div>
                        }
                    </div>
                    <div className="sf-bottom-post" />
                </div>
            }
        </div >
    )
}

export default AlbumDetails;