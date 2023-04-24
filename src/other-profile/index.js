import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Routes, Route } from "react-router";
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
    const [profile, setProfile] = useStateWithCallbackLazy(undefined);
    const [posts, setPosts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [followers, setFollowers] = useState(undefined);
    const [following, setFollowing] = useState(undefined);

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

            const { following } = JSON.parse(JSON.stringify(profile));
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

    // TODO: implement unfollowing
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

    const Followers = () => {
        getUsernamesFromFollowers(profile).then(response => setFollowers(response));
        return (
            <div>
                <h3>Followers {profile.followers.length}</h3>
                {
                    followers && followers.map(follower =>
                        <div>
                            {follower.username}
                        </div>)
                }
            </div>
        )
    }

    const Following = () => {
        getUsernamesFromFollowing(profile).then(response => setFollowing(response));
        return (
            <div>
                <h3> Following {profile.following.length}</h3>
                {
                    following && following.map(followed =>
                        <div>
                            {followed.username}
                        </div>
                    )
                }
            </div>
        )
    }

    const Reviews = () => {
        return (
            <div>
                <h3>Reviews {numReviews}</h3>
                {
                    reviews.length > 0 &&
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
                {
                    reviews.length === 0 &&
                    <div>
                        No reviews found
                    </div>
                }
            </div>
        )
    }

    const Posts = () => {
        return (
            <div>
                <h3>Posts {numPosts}</h3>
                {
                    posts.length > 0 &&
                    <ul className="list-group">
                        {posts.map(post =>
                            <PostItem post={post._id} />
                        )}
                    </ul>
                }
                {
                    posts.length === 0 &&
                    <div>
                        No posts found
                    </div>
                }
            </div>
        )
    }

    return (
        <div>
            {profile &&
                <div>
                    <h1>{profile.firstName} {profile.lastName}</h1>
                    <h2>{profile.username} @{profile.handle}</h2>
                    <img src={`/images/${profile.avatar}`} />
                    <div>{profile.bio}</div>
                    <Routes>
                        <Route index element={<Posts />} />
                        <Route path="/followers" element={<Followers />} />
                        <Route path="/following" element={<Following />} />
                        <Route path="/reviews" element={<Reviews />} />
                    </Routes>





                    {!isFollowing() &&
                        <FancyButton onclick={handleFollow} text="Follow" />}
                    {isFollowing() &&
                        <FancyButton onclick={handleUnfollow} text="Unfollow" />}
                </div>
            }
        </div >
    )
}

export default OtherProfile;