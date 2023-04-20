import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { findUserById } from "../services/user-service";
import { findPostsByUser } from "../services/posts-service";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import PostItem from "../home/post-item";
import { Link } from "react-router-dom";
import { findReviewsByUser } from "../services/reviews-service";
import { findReviewsByUserThunk } from "../services/reviews-thunk";
import { findPostsByUserThunk } from "../services/posts-thunk";
import FancyButton from "../FancyButton/button";
import { updateUserThunk } from "../services/user-thunk";

const OtherProfile = () => {
    const { uid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const { numPosts } = useSelector(state => state.postsData);
    const { numReviews } = useSelector(state => state.reviews);
    const [profile, setProfile] = useStateWithCallbackLazy({});
    const [posts, setPosts] = useState([]);
    const [reviews, setReviews] = useState([]);

    const fetchUser = async () => {
        const response = await findUserById(uid);
        console.log(response);
        setProfile(response, result => fetchUserPostsAndReviews(result));
    }

    const fetchUserPostsAndReviews = async (result) => {
        console.log(profile._id);
        const response = await dispatch(findPostsByUserThunk(result._id));
        console.log(response);
        setPosts(response.payload);

        const response2 = await dispatch(findReviewsByUserThunk(result._id));
        console.log(response2);
        setReviews(response2.payload);
    }

    const handleFollow = async () => {
        if (profile && currentUser) {
            const { followers } = Object.assign({ followers: [] }, profile.followers);
            followers.push(currentUser._id);
            const newProfile = {
                ...profile,
                followers
            }

            const response = await dispatch(updateUserThunk(newProfile));
            console.log(response);

            const { following } = Object.assign({ following: [] }, profile.following);
            following.push(profile._id);
            const newUser = {
                ...currentUser,
                following
            }

            const updatedUser = await dispatch(updateUserThunk(newUser));
            console.log(updatedUser);
        }

    }

    useEffect(() => {
        if (currentUser) {
            if (uid === currentUser._id) {
                navigate("/profile");
            }
        }
        fetchUser();

    }, [uid]);

    return (
        <div>
            {profile &&
                <div>
                    <h1>{profile.firstName} {profile.lastName}</h1>
                    <h2>{profile.username} @{profile.handle}</h2>
                    <img src={`/images/${profile.avatar}`} />
                    <div>{profile.bio}</div>
                    <h3>Reviews {numReviews}</h3>
                    {reviews.length > 0 &&
                        <ul className="list-group">
                            {reviews.map(item =>
                                <li className="list-group-item">
                                    {item.score} <br />
                                    <Link to={`/search/album/${item.albumId}`} className="sf-underline-hover sf-anim-3 float-end">{item.albumName} by {item.albumMainArtist}</Link>
                                    {item.review}
                                </li>)
                            }
                        </ul>
                    }
                    {reviews.length === 0 &&
                        <div>
                            No reviews found
                        </div>
                    }
                    <h3>Posts {numPosts}</h3>
                    {posts.length > 0 &&
                        <ul className="list-group">
                            {posts.map(post =>
                                <PostItem post={post} />
                            )}
                        </ul>
                    }
                    {posts.length === 0 &&
                        <div>
                            No posts found
                        </div>
                    }
                    <FancyButton onclick={handleFollow} text="Follow" />
                </div>
            }
        </div>
    )
}

export default OtherProfile;