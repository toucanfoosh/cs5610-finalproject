import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { findUserById } from "../services/user-service";
import { findPostsByUser } from "../services/posts-service";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import PostItem from "../home/post-item";
import { Link } from "react-router-dom";
import { findReviewsByUser } from "../services/reviews-service";

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

        const response2 = await findReviewsByUser(result._id);
        console.log(response2);
        setReviews(response2);
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
                    <h3>Reviews {currentUser && currentUser.reviews}</h3>
                    {reviews.length > 0 &&
                        <ul className="list-group">
                            {reviews.map(item =>
                                <li className="list-group-item">
                                    {item.score} <br />
                                    <Link to={`/search/album/${item.albumId}`} className="sf-underline-hover float-end">{item.albumName} by {item.albumMainArtist}</Link>
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
                    <h3>Posts {currentUser && currentUser.posts}</h3>
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