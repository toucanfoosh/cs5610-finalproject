import { useDispatch, useSelector } from "react-redux";
import FancyButton from "../FancyButton/button";
import { logoutThunk } from "../services/user-thunk";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { findUserById } from "../services/user-service";
import "../index.css"
import { BrowserRouter, Link } from "react-router-dom";
import { findPostsByUserThunk } from "../services/posts-thunk";
import { findReviewsByUserThunk } from "../services/reviews-thunk";
import PostItem from "../home/post-item";
import { Router, Route, Routes } from "react-router";
import LoadingIcon from "../loading-icon";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [followers, setFollowers] = useState(undefined);
    const [posts, setPosts] = useState(undefined);
    const [reviews, setReviews] = useState(undefined);
    const [following, setFollowing] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const handleLogout = async () => {
        await dispatch(logoutThunk());
        console.log("logged out");
        navigate("/login");
    }

    const handleEditProfile = () => {
        navigate("/edit-profile");
    }

    const fetchUserById = async (id) => {
        const response = await findUserById(id);
        return response;
    }

    const fetchPosts = async () => {
        const response = await dispatch(findPostsByUserThunk(currentUser._id));
        console.log(response);
        setPosts(response.payload);
        setLoading(false);
        return response.payload;
    }

    const fetchReviews = async () => {
        const response = await dispatch(findReviewsByUserThunk(currentUser._id));
        setReviews(response.payload);
        return response.payload;
    }

    const getUsernamesFromFollowers = async () => {
        return await Promise.all(currentUser.followers.map((id) => fetchUserById(id)));
    }

    const getUsernamesFromFollowing = async () => {
        return await Promise.all(currentUser.following.map((id) => fetchUserById(id)));
    }

    useEffect(() => {
        if (currentUser) {
            getUsernamesFromFollowers().then(result => {
                setFollowers(result)
            });
            getUsernamesFromFollowing().then(result => {
                setFollowing(result)
            });
            const response = fetchPosts();
            console.log(response);
            fetchReviews();

        }
    }, [currentUser]);

    const Followers = () => {
        return (
            <div>
                <h3>Followers {currentUser.followers.length}</h3>
                {
                    followers &&
                    followers.map(follower =>
                        <Link className="sf-underline-hover" to={`/profile/other/${follower._id}`}>
                            {follower.username}
                        </Link>)
                }
            </div>
        )
    }

    const Following = () => {
        return (
            <div>
                <h3>Following {currentUser.following.length}</h3>
                {
                    following &&
                    following.map(following =>
                        <Link className="sf-underline-hover" to={`/profile/other/${following._id}`}>
                            {following.username}
                        </Link>)
                }
            </div>
        )
    }

    const Posts = () => {
        return (
            <div>
                <h3>Posts {currentUser.posts}</h3>
                {
                    loading &&
                    <LoadingIcon />
                }
                {
                    !loading &&
                    <ul className="mb-2 list-group ps-0">
                        {posts.map(post => <PostItem post={post._id} />)}
                    </ul>
                }
            </div>
        )
    }

    const Reviews = () => {
        return (
            <div>
                <h3>Reviews {currentUser.reviews}</h3>
                {
                    reviews &&
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
            </div>
        )
    }

    return (
        <div>
            {currentUser &&
                <div>
                    <h1 className="sf-secondary">Profile</h1>
                    <div className="sf-secondary">{currentUser.firstName} {currentUser.lastName}</div>
                    <img src={`/images/${currentUser.avatar}`} />
                    <div className="sf-secondary sf-text-bold">{currentUser.username}
                        <span className="sf-text-normal">@{currentUser.handle}</span>
                    </div>
                    <div className="sf-secondary">
                        {currentUser.bio}
                    </div>
                    <div className="sf-secondary">
                        <Routes>
                            <Route index element={<Posts />} />
                            <Route path="/followers" element={<Followers />} />
                            <Route path="/following" element={<Following />} />
                            <Route path="/reviews" element={<Reviews />} />
                        </Routes>
                    </div>

                    <FancyButton onclick={handleEditProfile} text="Edit Profile" />
                    <FancyButton onclick={handleLogout} text="Logout" />

                </div>
            }
        </div>
    )
};

export default Profile;