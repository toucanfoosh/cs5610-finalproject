import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import FancyButton from "../FancyButton/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk, findCommentsByPostThunk } from "../services/comments-thunk";
import "../index.css";
import { findPostByIdThunk, updatePostThunk } from "../services/posts-thunk";
import PostItem from "../home/post-item";

const Post = () => {
    const { currentUser } = useSelector(state => state.user);
    const { postComments, loading } = useSelector(state => state.comments);
    const location = useLocation();
    const dispatch = useDispatch();
    const { from } = location.state ? location.state : "/";
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

    const fetchPost = async () => {
        const response = await dispatch(findPostByIdThunk(pid));
        setPost(response.payload);
        return response.payload;
    }

    useEffect(() => {
        fetchPost().then(result => fetchComments(result));
    }, [postComments]);

    const handlePostComment = async () => {
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
        }
        else if (post.type === "repost") {
            const newComment = {
                userId: currentUser._id,
                postId: post.originalPost,
                username: currentUser.username,
                handle: currentUser.handle,
                likes: 0,
                liked: false,
                comment
            }

            const response = await dispatch(createCommentThunk(newComment));
            console.log(response);

            const fullPost = await dispatch(findPostByIdThunk(post.originalPost));
            console.log(fullPost);
            console.log(fullPost.payload.comments)
            const newPost = {
                ...fullPost.payload,
                comments: fullPost.payload.comments + 1
            }
            console.log(newPost);
            const result = await dispatch(updatePostThunk(newPost));
            console.log(result);
        }


    }

    return (
        <div className="row">
            {from && <Link className="col-1" to={`${from}`}><i class="fa-solid fa-arrow-left"></i></Link>}
            <h1 className="col-11">Post</h1>
            {post && <PostItem post={post} />}
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
                {!loading &&
                    postComments.map(comment =>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col">
                                    {comment.comment}
                                </div>
                                <div className="col">
                                    <Link className="sf-underline-hover sf-anim-3" to={`/profile/${comment.userId}`}>{comment.username} @{comment.handle}</Link>
                                </div>
                                <div className="col">
                                    {!comment.liked && <i class="fa-regular fa-heart"></i>}
                                    {comment.liked && <i class="fa-solid fa-heart"></i>} {comment.likes}
                                </div>
                            </div>

                        </li>
                    )
                }
            </ul>
            <textarea onChange={(e) => setComment(e.target.value)} placeholder="Leave a comment" className="form-control" />
            <FancyButton onclick={handlePostComment} text="Comment" />
        </div>
    );
};

export default Post;