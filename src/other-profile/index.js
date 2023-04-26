import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Routes, Route } from "react-router";
import { findUserById } from "../services/user-service";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { findReviewsByUserThunk } from "../services/reviews-thunk";
import { findPostsByUserThunk } from "../services/posts-thunk";
import FancyButton from "../FancyButton/button";
import { updateUserThunk } from "../services/user-thunk";
import Header from "../profile/header";
import { Body } from "../profile/body";
import Tabs from "../tabs";

const OtherProfile = () => {
    const { uid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const { numPosts } = useSelector(state => state.postsData);
    const { numReviews } = useSelector(state => state.reviews);
    const [profile, setProfile] = useStateWithCallbackLazy(undefined);
    const [posts, setPosts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [followers, setFollowers] = useState(undefined);
    const [following, setFollowing] = useState(undefined);
    const [loading, setLoading] = useState(true);


    const isFollowing = () => {
        if (currentUser && profile) {
            if (profile.followers.includes(currentUser._id)) {
                return true;
            }
        }
        return false;
    }

    const fetchUser = async () => {
        const response = await findUserById(uid);
        console.log(response);
        setProfile(response, result => fetchUserPostsAndReviews(result));
        return response;
    }

    const fetchUserById = async (id) => {
        const response = await findUserById(id);
        // console.log(response);
        return response;
    }

    const fetchUserPostsAndReviews = async (result) => {
        // console.log(profile._id);
        const response = await dispatch(findPostsByUserThunk(result._id));
        setPosts(response.payload);

        const response2 = await dispatch(findReviewsByUserThunk(result._id));
        setReviews(response2.payload);
        setLoading(false);
    }

    const handleFollow = async () => {
        if (profile && currentUser) {
            const { followers } = JSON.parse(JSON.stringify(profile));
            followers.push(currentUser._id);
            const newProfile = {
                ...profile,
                followers
            }

            const response = await dispatch(updateUserThunk(newProfile));
            console.log(response);

            const { following } = JSON.parse(JSON.stringify(currentUser));
            following.push(profile._id);
            const newUser = {
                ...currentUser,
                following
            }

            const updatedUser = await dispatch(updateUserThunk(newUser));
            console.log(updatedUser);

            fetchUser();
        }
    }

    const handleUnfollow = async () => {
        if (currentUser && profile) {
            const { followers } = JSON.parse(JSON.stringify(profile));
            const newFollowers = followers.filter(e => e != currentUser._id);
            const newProfile = {
                ...profile,
                followers: newFollowers
            }

            const response1 = await dispatch(updateUserThunk(newProfile));

            const { following } = JSON.parse(JSON.stringify(currentUser));
            const newFollowing = following.filter(e => e != profile._id);
            const newUser = {
                ...currentUser,
                following: newFollowing
            }

            const response2 = await dispatch(updateUserThunk(newUser));

            fetchUser();
        }
    }

    const getUsernamesFromFollowers = async (otherUser) => {
        return await Promise.all(otherUser.followers.map((id) => fetchUserById(id)));
    }

    const getUsernamesFromFollowing = async (otherUser) => {
        return await Promise.all(otherUser.following.map((id) => fetchUserById(id)));
    }

    useEffect(() => {
        if (currentUser) {
            if (uid === currentUser._id) {
                navigate("/profile");
            }
        }
        fetchUser()
    }, [uid]);

    const arr = [
        {
            title: "Posts",
            path: `/profile/other/${uid}/`
        },
        {
            title: "Reviews",
            path: `/profile/other/${uid}/reviews`
        },
        {
            title: "Likes",
            path: `/profile/other/${uid}/likes`
        }
    ]

    const artistArr = [
        ...arr,
        {
            title: "Albums",
            path: `/profile/other/${uid}/albums`
        }
    ]

    return (
        <div className="row">
            {profile &&
                <div className="mt-5 px-0">
                    <div className="pb-2 sticky-top sf-bg-blur sf-bottom-border">
                        <div className="row">
                            <div className="col-8">
                                <Header user={profile} />
                            </div>
                            <div className="d-flex align-items-center justify-content-center col-4 pb-3">
                                <div className="sf-profile-button">
                                    {!isFollowing() &&
                                        <FancyButton onclick={handleFollow} text="Follow" />}
                                    {isFollowing() &&
                                        <FancyButton onclick={handleUnfollow} color="sf-bg-primary" textColor="sf-secondary" text="Unfollow" />}
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                profile.role !== "artist" &&
                                <Routes>
                                    <Route index element={<Tabs props={arr} active="Posts" />} />
                                    <Route path="/reviews" element={<Tabs props={arr} active="Reviews" />} />
                                    <Route path="/likes" element={<Tabs props={arr} active="Likes" />} />
                                </Routes>
                            }
                            {
                                profile.role === "artist" &&
                                <Routes>
                                    <Route index element={<Tabs props={artistArr} active="Posts" />} />
                                    <Route path="/reviews" element={<Tabs props={artistArr} active="Reviews" />} />
                                    <Route path="/likes" element={<Tabs props={artistArr} active="Likes" />} />
                                    <Route path="/albums" element={<Tabs props={artistArr} active="Albums" />} />
                                </Routes>
                            }
                        </div>
                    </div>
                    <Body
                        currentUser={profile}
                        loading={loading}
                        uid={uid}
                        posts={posts}
                        reviews={reviews}
                        followers={followers}
                        following={following} />

                </div>
            }
        </div >
    )
}

export default OtherProfile;