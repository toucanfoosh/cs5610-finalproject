import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import FancyButton from "../FancyButton/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk, deleteCommentThunk, findCommentsByPostThunk, updateCommentThunk } from "../services/comments-thunk";
import "../index.css";
import { findPostByIdThunk, updatePostThunk } from "../services/posts-thunk";
import PostItem from "../home/post-item";

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
            {<Link className="col-1" to={`/`}><i class="fa-solid fa-arrow-left"></i></Link>}
            <h1 className="col-11">Post</h1>
            {post && <PostItem post={pid} />}
            <h1 className="">Comments</h1>
            <ul className="list-group">
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
                        return (<li className="list-group-item">
                            <div className="row">
                                <div className="col">
                                    {comment.comment}
                                </div>
                                <div className="col">
                                    <Link className="sf-underline-hover sf-anim-3" to={`/profile/other/${comment.userId}`}>{comment.username} @{comment.handle}</Link>
                                </div>
                                <div className="col">
                                    <Link onClick={() => handleCommentLike(comment)} className="sf-anim-3">
                                        <i className={`fa-heart ${isLiked(comment.likeUsers)} pe-1 sf-anim-3 sf-small-hover`}></i>
                                        {comment.likes}
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link onClick={() => handleDeleteComment(comment)}>
                                        <i className="fa-solid fa-x pe-1 sf-anim-3 sf-small-hover"></i>
                                    </Link>
                                </div>
                            </div>

                        </li>)
                    }
                    )
                }
            </ul>
            <textarea onChange={(e) => setComment(e.target.value)} placeholder="Leave a comment" className="form-control" />
            <FancyButton onclick={handlePostComment} text="Comment" />
        </div >
    );
};

export default Post;