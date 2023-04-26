import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import '../index.css';
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { createPostThunk, updatePostThunk, deletePostThunk } from "../services/posts-thunk";
import { updateUserThunk } from "../services/user-thunk";
import { findPostById } from "../services/posts-service";

function copyLink(link) {
    console.log("link" + link)
    navigator.clipboard.writeText(link);
}

const PostStats = ({ stats, postLink }) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const { posts, loading } = useSelector(state => state.postsData);

    function isLiked(liked) {
        if (currentUser) {
            return liked.includes(currentUser._id) ? 'fa-solid sf-danger' : 'fa-regular';
        }
        else {
            return 'fa-regular';
        }
    }

    function isReposted(reposts) {
        if (currentUser) {
            return reposts.includes(currentUser._id) ? 'sf-accent' : '';
        }
        else {
            return '';
        }
    }

    useEffect(() => {

    }, [posts])

    async function changeLikedValue(stats) {
        if (currentUser) {
            if (stats.likeUsers.includes(currentUser._id)) {
                const newLikeUsers = stats.likeUsers.filter((e) => e !== currentUser._id);
                const newStats = {
                    ...stats,
                    likes: stats.likes - 1,
                    likeUsers: newLikeUsers
                }
                const response = await dispatch(updatePostThunk(newStats));

                const { likes } = JSON.parse(JSON.stringify(currentUser));
                const newLikes = likes.filter(e => e != stats._id);

                const updatedUser = {
                    ...currentUser,
                    likes: newLikes
                }

                const status = await dispatch(updateUserThunk(updatedUser));
                console.log(status.payload);
            }
            else {
                const { likeUsers } = JSON.parse(JSON.stringify(stats))
                likeUsers.push(currentUser._id);
                const newStats = {
                    ...stats,
                    likes: stats.likes + 1,
                    likeUsers
                }
                const response = await dispatch(updatePostThunk(newStats));

                const { likes } = JSON.parse(JSON.stringify(currentUser));
                likes.push(stats._id);

                const updatedUser = {
                    ...currentUser,
                    likes
                }

                const status = await dispatch(updateUserThunk(updatedUser));
                console.log(status.payload);
            }
        } else {
            console.log("must be logged in to like");
        }

    }

    const handleRepost = async () => {
        if (currentUser) {
            console.log(currentUser);
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

                const user = JSON.parse(JSON.stringify(currentUser));
                user.reposts.push({repostId: repost.payload._id, originalPost: stats._id});
                const newUser = {
                    ...currentUser,
                    reposts: user.reposts
                }

                const updatedUser = await dispatch(updateUserThunk(newUser));
                console.log(updatedUser);

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
            else if (stats.repostUsers.includes(currentUser._id)) {
                // remove repost from currentUser list
                const user = JSON.parse(JSON.stringify(currentUser));
                const {repostId} = user.reposts.find(e => e.originalPost === stats._id);
                console.log(repostId);
                const newUserReposts = user.reposts.filter(e => e.originalPost !== stats._id);
                const newUser = {
                    ...user,
                    reposts: newUserReposts
                }

                let res = await dispatch(updateUserThunk(newUser));
                
                const {reposts} = JSON.parse(JSON.stringify(stats));
                const newReposts = reposts.filter(e => e !== repostId);


                const {repostUsers} = JSON.parse(JSON.stringify(stats));
                const newRepostUsers = repostUsers.filter(e => e !== currentUser._id);

                const newPost = {
                    ...stats,
                    reposts: newReposts,
                    repostUsers: newRepostUsers
                }

                res = await dispatch(updatePostThunk(newPost));

                const deleted = await dispatch(deletePostThunk(repostId));
            }
        } else {
            console.log("Must be logged in to repost");
        }
    }

    return (
        <div>
            <div className="mt-4 row">
                <div className="col-3">
                    <Link className="sf-secondary sf-no-link-decor" to={`/${postLink}`}>
                        <i className="fa-regular fa-comment sf-anim-3 sf-small-hover pe-1"></i>
                        <span className="ps-1">{stats.comments}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link onClick={() => handleRepost()} className="sf-secondary sf-no-link-decor" to="#">
                        <i className={`fas fa-retweet sf-anim-3 sf-small-hover pe-1 ${isReposted(stats.repostUsers)}`}></i>
                        <span className="ps-1">{stats.reposts.length}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link onClick={() => changeLikedValue(stats)} className="sf-secondary sf-no-link-decor" to="#" >
                        <i className={`fa-heart ${isLiked(stats.likeUsers)} pe-1 sf-anim-3 sf-small-hover`}></i>
                        <span className="ps-1">{stats.likes}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link className="sf-secondary sf-no-link-decor" to="#" onClick={() => copyLink(`http://localhost:3000${postLink}`)}>
                        <i className="fa fa-arrow-up-from-bracket sf-anim-3 sf-small-hover"></i>
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default PostStats;