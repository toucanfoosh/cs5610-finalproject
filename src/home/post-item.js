import '../index.css'
import './index.css'
import PostStats from './post-stats';
import { useDispatch } from 'react-redux';
import { deletePostThunk, updatePostThunk } from '../services/posts-thunk';
import { Link, useLocation } from 'react-router-dom';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { findUserById } from '../services/user-service';
import { updateUserThunk } from '../services/user-thunk';
import { useEffect, useState } from 'react';
import { findPostById } from '../services/posts-service';
import { deleteCommentThunk, findCommentsByPostThunk } from '../services/comments-thunk';

const PostItem = ({ post }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [postUser, setPostUser] = useStateWithCallbackLazy({});

    const [originalPost, setOriginalPost] = useState(undefined);

    useEffect(() => {
        async function fetchUserById() {
            const user = await findUserById(post.userId);
            setPostUser(user);
        }

        async function fetchOriginalPost() {
            const response = await findPostById(post.originalPost);
            setOriginalPost(response);
        }

        fetchUserById();

        if (post.type === "repost") {
            fetchOriginalPost();
        }
    }, []);

    const handleSubtractPost = async (result) => {
        console.log(result);
        const newUser = {
            ...result,
            posts: result.posts - 1
        }

        const updatedUser = await dispatch(updateUserThunk(newUser));
        console.log(updatedUser);
    }

    const handleDeleteRepost = async (post, id) => {
        if (postUser) {
            const { repostUsers } = JSON.parse(JSON.stringify(post));
            const newRepostUsers = repostUsers.filter(e => e != postUser._id);

            const { reposts } = JSON.parse(JSON.stringify(post));
            const newReposts = reposts.filter(e => e != id);
            const updatedPost = {
                ...post,
                reposts: newReposts,
                repostUsers: newRepostUsers
            }

            const response = await dispatch(updatePostThunk(updatedPost));
            console.log(response);
        }
    }

    const deleteReposts = async () => {
        if (post.type === "post" && post.reposts.length > 0) {
            for (const element of post.reposts) {
                const response = await dispatch(deletePostThunk(element));
                console.log(response);
            }
        }
    }

    const deleteComments = async (post) => {
        console.log(post);
        if (post.type === "post") {
            const comments = await dispatch(findCommentsByPostThunk(post._id));
            console.log(comments);

            for (const comm of comments.payload) {
                const response = await dispatch(deleteCommentThunk(comm._id));
            }
        }
    }

    const deletePostHandler = async (id) => {
        if (post.type === "repost") {
            const response = await handleDeleteRepost(originalPost, id);
            console.log(response);
        }

        const user = await findUserById(post.userId);
        handleSubtractPost(user);
        await deleteComments(post);
        await deleteReposts();
        await dispatch(deletePostThunk(post._id));

    }

    return (
        <div>
            {
                postUser && post.type === "post" &&
                <Link to={`/${postUser.username}/${post._id}`} state={{ from: location.pathname }}>
                    <div className="px-3 py-3 m-0 sf-home-item-container">
                        <div className="row">
                            <div className="col-3 col-md-2 align-self-start text-center">
                                <img className="sf-pfp sf-clickable sf-darken-hover sf-anim-3" src={`/images/${post.avatar}`} />
                            </div>
                            <div className="col">
                                <span className="col">
                                    <div className="row">
                                        <div className="col-11">
                                            <Link to={`/profile/${post.userId}`}>
                                                <span className="sf-font-bold sf-clickable sf-underline-hover sf-anim-3 pe-1 sf-secondary ">
                                                    {post.username}
                                                </span>
                                                <span class="fa-solid fa-circle-check sf-accent pe-1"></span>
                                                <span className="sf-font-normal sf-clickable sf-tertiary">@{post.handle}</span>
                                            </Link>
                                            <div className="sf-font-normal sf-secondary pb-1 text-break">
                                                {post.post}
                                            </div>
                                            <PostStats stats={post} postLink={`/${postUser.username}/${post._id}`} />
                                        </div>
                                        <div className="col-1 d-flex align-items-top justify-content-center">
                                            <Link to='#'>
                                                <div className='row text-center'>
                                                    <i className="fa-solid fa-x px-1 sf-clickable sf-tertiary-alt-hover sf-large-hover sf-anim-3 sf-hw-100"
                                                        onClick={() => deletePostHandler(post._id)}>
                                                    </i>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            }
            {
                postUser && post.type === "repost" && originalPost &&
                <Link to={`/${post.username}/${post._id}`} state={{ from: location.pathname }}>
                    <div className="px-3 py-3 m-0 sf-home-item-container">
                        <div className="row">
                            <div>
                                <i className="fas fa-retweet sf-anim-3 sf-small-hover pe-1"></i>
                                <Link to={`/profile/${post.userId}`} className="sf-underline-hover">{post.username} reposted</Link>
                            </div>
                            <div className="col-3 col-md-2 align-self-start text-center">
                                <img className="sf-pfp sf-clickable sf-darken-hover sf-anim-3" src={`/images/${originalPost.avatar}`} />
                            </div>
                            <div className="col">
                                <span className="col">
                                    <div className="row">
                                        <div className="col-11">
                                            <Link to={`/profile/${originalPost.userId}`}>
                                                <span className="sf-font-bold sf-clickable sf-underline-hover sf-anim-3 pe-1 sf-secondary ">
                                                    {originalPost.username}
                                                </span>
                                                <span class="fa-solid fa-circle-check sf-accent pe-1"></span>
                                                <span className="sf-font-normal sf-clickable sf-tertiary">@{originalPost.handle}</span>
                                            </Link>
                                            <div className="sf-font-normal sf-secondary pb-1 text-break">
                                                {originalPost.post}
                                            </div>
                                            <PostStats stats={originalPost} postLink={`/${originalPost.username}/${originalPost._id}`} />
                                        </div>
                                        <div className="col-1 d-flex align-items-top justify-content-center">
                                            <Link to='#'>
                                                <div className='row text-center'>
                                                    <i className="fa-solid fa-x px-1 sf-clickable sf-tertiary-alt-hover sf-large-hover sf-anim-3 sf-hw-100"
                                                        onClick={() => deletePostHandler(post._id)}>
                                                    </i>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            }
        </div>
    );
};


export default PostItem;
