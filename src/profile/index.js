import { useDispatch, useSelector } from "react-redux";
import FancyButton from "../FancyButton/button";
import { logoutThunk } from "../services/user-thunk";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { findUserById } from "../services/user-service";
import "../index.css"
import './index.css'
import { BrowserRouter, Link } from "react-router-dom";
import { findPostsByUserThunk } from "../services/posts-thunk";
import { findReviewsByUserThunk } from "../services/reviews-thunk";
import { Router, Route, Routes } from "react-router";
import LoadingIcon from "../loading-icon";
import Tabs from "../tabs";
import profileItems from "./profile.json";
import Header from "./header";
import { Body } from "./body";

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
            console.log(currentUser);
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

    const artistProfileItems = [
        ...profileItems,
        {
            "title": "Albums",
            "path": "/profile/albums",
            "_id": "890"
        }
    ]

    return (
        <div className="row">
            {currentUser &&
                <div className="mt-5 px-0">
                    <div className="pb-2 sticky-top sf-bg-blur sf-bottom-border">
                        <div className="row">
                            <div className="col-8">
                                <Header user={currentUser} />
                            </div>
                            <div className="d-flex align-items-center justify-content-center col-4 pb-3">
                                <div className="sf-profile-button">
                                    <FancyButton onclick={handleEditProfile} text="Edit Profile" />
                                </div>
                                <div className="sf-profile-button">
                                    <FancyButton onclick={handleLogout} text="Logout" />
                                </div>
                            </div>
                        </div>
                        <div>

                                {
                                    currentUser.role !== "artist" && 
                                    <Routes>
                                        <Route index element={<Tabs props={profileItems} active="Posts" />} />
                                        <Route path="/reviews" element={<Tabs props={profileItems} active="Reviews" />} />
                                        <Route path="/likes" element={<Tabs props={profileItems} active="Likes" />} />
                                        <Route path="/albums" element={<Tabs props={profileItems} active="Albums" />} />
                                    </Routes>
                                }
                                {
                                    currentUser.role === "artist" &&
                                    <Routes>
                                        <Route index element={<Tabs props={artistProfileItems} active="Posts" />} />
                                        <Route path="/reviews" element={<Tabs props={artistProfileItems} active="Reviews" />} />
                                        <Route path="/likes" element={<Tabs props={artistProfileItems} active="Likes" />} />
                                        <Route path="/albums" element={<Tabs props={artistProfileItems} active="Albums" />} />
                                    </Routes>
                                }

                        </div>
                    </div>
                    <Body
                        currentUser={currentUser}
                        loading={loading}
                        posts={posts}
                        reviews={reviews}
                        followers={followers}
                        following={following}
                    />
                </div>
            }
        </div >
    )
};

export default Profile;