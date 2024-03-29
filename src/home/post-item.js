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
    const {currentUser} = useSelector(state => state.user);
    const { posts } = useSelector(state => state.postsData);
    const [postUser, setPostUser] = useStateWithCallbackLazy({});
    const [fullPost, setFullPost] = useStateWithCallbackLazy(undefined);
    const [originalPost, setOriginalPost] = useState(undefined);

    async function fetchUserById(result) {
        const user = await findUserById(result.userId);
        setPostUser(user);
    }

    async function fetchUserByGivenId(id) {
        const user = await findUserById(id);
        return user;
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

            const user = JSON.parse(JSON.stringify(postUser));
            const newUserReposts = user.reposts.filter(e => e.repostId !== id);
            const newUser = {
                ...user,
                reposts: newUserReposts
            }

            let res= await dispatch(updateUserThunk(newUser));
            console.log(res);
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

    const deleteLikes = async (post) => {
        const likes = post.likeUsers;
        console.log(post);
        for (const user of likes) {
            console.log(user);
            const actualUser = await fetchUserByGivenId(user);
            console.log(actualUser);

            const newLikes = actualUser.likes.filter(e => e != post._id);
            console.log(newLikes);
            const newUser = {
                ...actualUser,
                likes: newLikes
            }

            console.log(newUser);

            const response = await dispatch(updateUserThunk(newUser));
            console.log(response);
        }
    }

    const deletePostHandler = async (id) => {
        if (fullPost.type === "repost") {
            const response = await handleDeleteRepost(originalPost, id);
            console.log(response);
        }



        if (fullPost.type === "post") {
            await deleteLikes(fullPost);
            const user = await findUserById(fullPost.userId);
            await handleSubtractPost(user);
        }
        await deleteComments(fullPost);
        await deleteReposts();
        await dispatch(deletePostThunk(post));
    }


    const renderPost = (postToRender, isRepost) => (
        <>
            {isRepost &&
                <div className='ps-4 pb-2'>
                    <i className="fas fa-retweet sf-anim-3 sf-small-hover pe-1 sf-tertiary"></i>
                    <Link to={`/profile/other/${fullPost.userId}`} className="sf-tertiary sf-underline-hover">{fullPost.username} reposted</Link>
                </div>
            }
            <div className="row">
                <div className="col-3 col-md-2 align-self-start text-center">
                    <img className="sf-pfp sf-clickable sf-darken-hover sf-anim-3" src={`/images/${postToRender.avatar}`} />
                </div>
                <div className="col">
                    <span className="col">
                        <div className="row">
                            <div className="col-11">
                                <Link to={`/profile/other/${postToRender.userId}`}>
                                    <span className="sf-font-bold sf-clickable sf-underline-hover sf-anim-3 pe-1 sf-secondary ">
                                        {postToRender.username}
                                    </span>
                                    {postUser.role === "admin" && <span className="fa-solid fa-circle-check sf-accent pe-1"></span>}
                                    {postUser.role === "artist" && <span className="sf-accent fa-solid fa-music pe-1"></span>}
                                    <span className="sf-font-normal sf-clickable sf-tertiary">@{postToRender.handle}</span>
                                </Link>
                                <div className="sf-font-normal sf-secondary pb-1 text-break">
                                    {postToRender.post}
                                </div>
                                <PostStats stats={postToRender} postLink={`/${postToRender.username}/${postToRender._id}`} />
                            </div>
                            {
                                currentUser && (postToRender.userId === currentUser._id || currentUser.role === "admin") && 
                                <div className="col-1 d-flex align-items-top justify-content-center">
                                    <Link to='#'>
                                        <div className='row text-center'>
                                            <i className="fa-solid fa-x px-1 sf-clickable sf-tertiary-alt-hover sf-large-hover sf-anim-3 sf-hw-100"
                                                onClick={() => deletePostHandler(post)}>
                                            </i>
                                        </div>
                                    </Link>
                                </div>
                            }
                        </div>
                    </span>
                </div>
            </div>
        </>
    );

    return (
        <div>
            {
                fullPost && postUser &&
                <Link to={`/${fullPost.username}/${post}`} state={{ from: location.pathname }}>
                    <div className="px-3 py-3 m-0 sf-home-item-container">
                        {fullPost.type === "post" && renderPost(fullPost, false)}
                        {fullPost.type === "repost" && originalPost && renderPost(originalPost, true)}
                    </div>
                </Link>
            }
        </div>
    );
};


export default PostItem;
