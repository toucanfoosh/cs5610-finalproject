import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { findUserById } from "../services/user-service";
import { findPostsByUser } from "../services/posts-service";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import PostItem from "../home/post-item";

const OtherProfile = () => {
    const { uid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
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
        const response = await findPostsByUser(result._id);
        console.log(response);
        setPosts(response);
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
                    <h3>Reviews</h3>

                    <h3>Posts</h3>
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
                </div>
            }
        </div>
    )
}

export default OtherProfile;