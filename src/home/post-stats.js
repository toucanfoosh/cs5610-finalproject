import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import '../index.css';
import { createPostThunk, updatePostThunk } from "../services/posts-thunk";
import { updateUserThunk } from "../services/user-thunk";

function copyLink(link) {
    console.log("link" + link)
    navigator.clipboard.writeText(link);
}

const PostStats = ({ stats, postLink }) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    function isLiked(liked) {
        if (currentUser) {
            return liked.includes(currentUser._id) ? 'fa-solid sf-liked' : 'fa-regular';
        }
        else {
            return 'fa-regular';
        }
    }

    async function changeLikedValue(stats) {
        if (currentUser) {
            console.log(currentUser);
            if (stats.likeUsers.includes(currentUser._id)) {
                const newLikeUsers = stats.likeUsers.filter((e) => e !== currentUser._id);
                const newStats = {
                    ...stats,
                    likes: stats.likes - 1,
                    likeUsers: newLikeUsers
                }
                const response = await dispatch(updatePostThunk(newStats));
                console.log(response);

                const { likes } = JSON.parse(JSON.stringify(currentUser));
                const newLikes = likes.filter(e => e != currentUser._id);

                const updatedUser = {
                    ...currentUser,
                    likes: newLikes
                }

                const status = await dispatch(updateUserThunk(updatedUser));
            }
            else {
                const { likeUsers } = JSON.parse(JSON.stringify(stats))
                console.log(likeUsers);
                likeUsers.push(currentUser._id);
                console.log(likeUsers);
                const newStats = {
                    ...stats,
                    likes: stats.likes + 1,
                    likeUsers
                }
                const response = await dispatch(updatePostThunk(newStats));
                console.log(response);

                const { likes } = JSON.parse(JSON.stringify(currentUser));
                console.log(currentUser);
                likes.push(stats._id);

                const updatedUser = {
                    ...currentUser,
                    likes
                }

                const status = await dispatch(updateUserThunk(updatedUser));
                console.log(status);
            }
        } else {
            console.log("must be logged in to like");
        }

    }

    const handleRepost = async () => {
        if (currentUser) {
            if (!stats.repostUsers.includes(currentUser._id) && stats.userId !== currentUser._id) {
                const newRepost = {
                    originalPost: stats._id,
                    username: currentUser.username,
                    handle: currentUser.handle,
                    userId: currentUser._id,
                    type: "repost"
                }

                console.log(newRepost);

                const repost = await dispatch(createPostThunk(newRepost));
                console.log(repost);

                // create repost

                // update repostUsers
                const { repostUsers } = JSON.parse(JSON.stringify(stats));
                repostUsers.push(currentUser._id);

                const { reposts } = JSON.parse(JSON.stringify(stats));
                reposts.push(repost.payload._id);
                const newOriginalPost = {
                    ...stats,
                    reposts,
                    repostUsers
                }

                const response = await dispatch(updatePostThunk(newOriginalPost));
                console.log(response);
                // update repost count

            }
        } else {
            console.log("Must be logged in to repost");
        }
    }

    return (
        <div>
            <div className="mt-4 row">
                <div className="col-3">
                    <Link className="text-secondary sf-no-link-decor" to={`/${postLink}`}>
                        <i className="fa-regular fa-comment sf-anim-3 sf-small-hover pe-1"></i>
                        <span className="ms-sm-1 ms-md-3">{stats.comments}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link onClick={() => handleRepost()} className="text-secondary sf-no-link-decor" to="#">
                        <i className="fas fa-retweet sf-anim-3 sf-small-hover pe-1"></i>
                        <span className="ms-sm-1 ms-md-3">{stats.reposts.length}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link onClick={() => changeLikedValue(stats)} className="text-secondary sf-no-link-decor" to="#" >
                        <i className={`fa-heart ${isLiked(stats.likeUsers)} pe-1 sf-anim-3 sf-small-hover`}></i>
                        <span className="">{stats.likes}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link className="text-secondary sf-no-link-decor" to="#" onClick={() => copyLink(`http://localhost:3000${postLink}`)}>
                        <i className="fa fa-arrow-up-from-bracket sf-anim-3 sf-small-hover"></i>
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default PostStats;