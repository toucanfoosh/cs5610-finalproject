import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import FancyButton from "../FancyButton/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk, deleteCommentThunk, findCommentsByPostThunk, updateCommentThunk } from "../services/comments-thunk";
import "../index.css";
import "./index.css";
import { findPostByIdThunk, updatePostThunk } from "../services/posts-thunk";
import PostItem from "../home/post-item";
import BackButton from "../back-button";

const Post = () => {
    const { currentUser } = useSelector(state => state.user);
    const { postComments, loading } = useSelector(state => state.comments);
    const location = useLocation();
    const dispatch = useDispatch();
    const { username, pid } = useParams();
    const [comment, setComment] = useState("");
    const [post, setPost] = useState(undefined);


    const fetchComments = async (post) => {
        if (post.type === "repost") {
            const response = await dispatch(findCommentsByPostThunk(post.originalPost));
            console.log(response);
        }
        else {
            const response = await dispatch(findCommentsByPostThunk(pid));
            console.log(response);
        }
    }

    const fetchPost = async (id) => {
        const response = await dispatch(findPostByIdThunk(id));
        setPost(response.payload);
        return response.payload;
    }

    useEffect(() => {
        fetchPost(pid).then(result => fetchComments(result));
    }, []);

    const handlePostComment = async () => {
        if (currentUser) {
            if (comment === "") {
                return;
            }
            if (post.type === "post") {
                const newComment = {
                    userId: currentUser._id,
                    postId: pid,
                    username: currentUser.username,
                    handle: currentUser.handle,
                    likes: 0,
                    liked: false,
                    comment
                }

                const response = await dispatch(createCommentThunk(newComment));
                console.log(response);

                const fullPost = await dispatch(findPostByIdThunk(pid));
                console.log(fullPost);
                console.log(fullPost.payload.comments)
                const newPost = {
                    ...fullPost.payload,
                    comments: fullPost.payload.comments + 1
                }
                console.log(newPost);
                const result = await dispatch(updatePostThunk(newPost));
                console.log(result);

                const changePost = await dispatch(findPostByIdThunk(pid));
                setPost(changePost.payload);
            }
            else if (post.type === "repost") {
                const newComment = {
                    userId: currentUser._id,
                    postId: post.originalPost,
                    username: currentUser.username,
                    handle: currentUser.handle,
                    likeUsers: [],
                    likes: 0,
                    comment
                }

                const response = await dispatch(createCommentThunk(newComment));
                console.log(response);

                const fullPost = await dispatch(findPostByIdThunk(post.originalPost));
                const newPost = {
                    ...fullPost.payload,
                    comments: fullPost.payload.comments + 1
                }
                console.log(newPost);
                const result = await dispatch(updatePostThunk(newPost));
                console.log(result);

                const changePost = await dispatch(findPostByIdThunk(post._id));
                console.log(changePost);
                setPost(changePost.payload);
            }
        }
    }

    const isLiked = (likeUsers) => {
        if (currentUser) {
            return likeUsers.includes(currentUser._id) ? 'fa-solid sf-danger' : 'fa-regular';
        }
        else {
            return 'fa-regular';
        }
    }

    const handleCommentLike = async (comment) => {
        if (currentUser) {
            if (!comment.likeUsers.includes(currentUser._id)) {
                const { likeUsers } = JSON.parse(JSON.stringify(comment))
                console.log(likeUsers);
                likeUsers.push(currentUser._id);
                const newComment = {
                    ...comment,
                    likes: comment.likes + 1,
                    likeUsers
                }

                console.log(newComment);

                const response = await dispatch(updateCommentThunk(newComment));
                console.log(response);

                if (post.type === "post") {
                    const updatedComments = await dispatch(findCommentsByPostThunk(pid));
                }
                else {
                    const updatedComments = await dispatch(findCommentsByPostThunk(post.originalPost));
                }
            }
            else {
                // unlike
                const newLikeUsers = comment.likeUsers.filter(e => e !== currentUser._id);
                const newComment = {
                    ...comment,
                    likes: comment.likes - 1,
                    likeUsers: newLikeUsers
                }

                const response = await dispatch(updateCommentThunk(newComment));
                console.log(response);

                if (post.type === "post") {
                    const updatedComments = await dispatch(findCommentsByPostThunk(pid));
                }
                else {
                    const updatedComments = await dispatch(findCommentsByPostThunk(post.originalPost));
                }
            }
        }
        else {
            console.log("Must be logged in to like comment");
        }
    }

    const handleDeleteComment = async (comment) => {
        if (currentUser) {
            if (post.type === "post") {
                const response = await dispatch(deleteCommentThunk(comment._id));

                const newPost = {
                    ...post,
                    comments: post.comments - 1
                }

                const updatedPost = await dispatch(updatePostThunk(newPost));

                const result = await dispatch(findPostByIdThunk(pid));
                setPost(result.payload);
            }
            else {
                const response = await dispatch(deleteCommentThunk(comment._id));
                const originalPost = await fetchPost(post.originalPost);
                console.log(originalPost);
                const newPost = {
                    ...originalPost,
                    comments: originalPost.comments - 1
                }

                const updatedPost = await dispatch(updatePostThunk(newPost));
                console.log(updatedPost);
                const result = await dispatch(findPostByIdThunk(post._id));
                console.log(result);
                setPost(result.payload);
            }
        }
    }

    return (
        <div className="row">
            <BackButton path="/" />
            {post &&
                <div className="pt-5 pb-3 px-0">
                    <PostItem post={pid} />
                </div>}
            <div className="d-flex flex-column">
                {
                    loading &&
                    <ul className="list-group">
                        <li className="list-group-item">
                            Loading...
                        </li>
                    </ul>
                }
                {
                    !loading &&
                    postComments.map(comment => {
                        return (
                            <div className="d-flex row justify-content-between pb-2">
                                <div className="sf-bottom-border d-flex pb-2">
                                    <div className="col-1 justify-content-center d-flex">
                                        <Link onClick={() => handleCommentLike(comment)} className="sf-anim-3">
                                            <i className={`fa-heart ${isLiked(comment.likeUsers)} pe-1 sf-anim-3 sf-small-hover sf-secondary`}></i>
                                            <span className="sf-secondary">{comment.likes}</span>
                                        </Link>
                                    </div>
                                    <div className="col-10 flex-column d-flex justify-content-start sf-secondary">
                                        <div className="">
                                            <Link className="" to={`/profile/other/${comment.userId}`}>
                                                <span className="sf-underline-hover sf-secondary fw-bold">{comment.username}</span>
                                                <span className="sf-tertiary"> @{comment.handle}</span>
                                            </Link>
                                        </div>
                                        <div className="row pt-1">
                                            <div className="sf-secondary">
                                                {comment.comment}
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        currentUser && (currentUser.role === "admin" || comment.userId === currentUser._id) &&
                                        <div className="col-1 d-flex justify-content-end">
                                            <Link onClick={() => handleDeleteComment(comment)}>
                                                <i className="fa-solid fa-x pe-1 sf-anim-3 sf-small-hover sf-tertiary"></i>
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>)
                    }
                    )
                }
            </div>
            <div className="p-3">
                <div className="row sf-comment-post d-flex justify-content-center">
                    <textarea onChange={(e) => setComment(e.target.value)} placeholder="Leave a comment" className="sf-form-control col-8 p-2" />
                    <div className="col-3">
                        <FancyButton onclick={handlePostComment} text="Comment" />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Post;