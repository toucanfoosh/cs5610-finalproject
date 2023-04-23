import '../index.css'
import './index.css'
import PostStats from './post-stats';
import { useDispatch, useSelector } from 'react-redux';
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
    const { posts } = useSelector(state => state.postsData);
    const [postUser, setPostUser] = useStateWithCallbackLazy({});
    const [fullPost, setFullPost] = useStateWithCallbackLazy(undefined);
    const [originalPost, setOriginalPost] = useState(undefined);

    async function fetchUserById(result) {
        const user = await findUserById(result.userId);
        setPostUser(user);
    }

    async function fetchOriginalPost(result) {
        const response = await findPostById(result.originalPost);
        setOriginalPost(response);
    }

    const fetchFullPost = async () => {
        const response = await findPostById(post);
        setFullPost(response, result => {
            fetchUserById(result);
            if (result.type === "repost") {
                fetchOriginalPost(result);
            }
        });
        return response;
    }

    useEffect(() => {
        fetchFullPost();
    }, [posts]);

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
            const newRepostUsers = repostUsers.filter(e => e !== postUser._id);

            const { reposts } = JSON.parse(JSON.stringify(post));
            console.log(id);
            const newReposts = reposts.filter(e => e !== id);
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
        if (fullPost.type === "post" && fullPost.reposts.length > 0) {
            for (const element of fullPost.reposts) {
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
        if (fullPost.type === "repost") {
            const response = await handleDeleteRepost(originalPost, id);
            console.log(response);
        }


        const user = await findUserById(fullPost.userId);
        if (fullPost.type === "post") {
            await handleSubtractPost(user);
        }

        await deleteComments(fullPost);
        await deleteReposts();
        await dispatch(deletePostThunk(post));
    }


    return (
        <div>
            {
                fullPost && postUser && fullPost.type === "post" &&
                <Link to={`/${postUser.username}/${post}`} state={{ from: location.pathname }}>
                    <div className="px-3 py-3 m-0 sf-home-item-container">
                        <div className="row">
                            <div className="col-3 col-md-2 align-self-start text-center">
                                <img className="sf-pfp sf-clickable sf-darken-hover sf-anim-3" src={`/images/${fullPost.avatar}`} />
                            </div>
                            <div className="col">
                                <span className="col">
                                    <div className="row">
                                        <div className="col-11">
                                            <Link to={`/profile/${fullPost.userId}`}>
                                                <span className="sf-font-bold sf-clickable sf-underline-hover sf-anim-3 pe-1 sf-secondary ">
                                                    {fullPost.username}
                                                </span>
                                                <span class="fa-solid fa-circle-check sf-accent pe-1"></span>
                                                <span className="sf-font-normal sf-clickable sf-tertiary">@{fullPost.handle}</span>
                                            </Link>
                                            <div className="sf-font-normal sf-secondary pb-1 text-break">
                                                {fullPost.post}
                                            </div>
                                            <PostStats stats={fullPost} postLink={`/${postUser.username}/${post}`} />
                                        </div>
                                        <div className="col-1 d-flex align-items-top justify-content-center">
                                            <Link to='#'>
                                                <div className='row text-center'>
                                                    <i className="fa-solid fa-x px-1 sf-clickable sf-tertiary-alt-hover sf-large-hover sf-anim-3 sf-hw-100"
                                                        onClick={() => deletePostHandler(post)}>
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
                fullPost && postUser && fullPost.type === "repost" && originalPost &&
                <Link to={`/${fullPost.username}/${post}`} state={{ from: location.pathname }}>
                    <div className="px-3 py-3 m-0 sf-home-item-container">
                        <div className="row">
                            <div>
                                <i className="fas fa-retweet sf-anim-3 sf-small-hover pe-1"></i>
                                <Link to={`/profile/${fullPost.userId}`} className="sf-underline-hover">{fullPost.username} reposted</Link>
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
                                                        onClick={() => deletePostHandler(post)}>
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
