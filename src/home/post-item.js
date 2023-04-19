import '../index.css'
import './index.css'
import PostStats from './post-stats';
import { useDispatch } from 'react-redux';
import { deletePostThunk } from '../services/posts-thunk';
import { Link, useLocation } from 'react-router-dom';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { findUserById } from '../services/user-service';
import { updateUserThunk } from '../services/user-thunk';
import { useEffect } from 'react';

const PostItem = ({ post }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [postUser, setPostUser] = useStateWithCallbackLazy({});

    useEffect(() => {
        async function fetchUserById() {
            const user = await findUserById(post.userId);
            setPostUser(user);
            console.log(user);
        }
        fetchUserById();
    }, []);

    const handleSubtractPost = async (user) => {
        const newUser = {
            ...user,
            posts: user.posts - 1
        }

        const updatedUser = await dispatch(updateUserThunk(newUser));
        console.log(updatedUser);
    }

    const deletePostHandler = async (id) => {
        const user = await findUserById(post.userId);
        setPostUser(user, result => handleSubtractPost(result));
        await dispatch(deletePostThunk(id));
    }

    return (
        postUser &&
        <Link to={`/${postUser.username}/${post._id}`} state={{ from: location.pathname }}>
            <div className="px-3 py-3 m-0 sf-home-item-container">
                <div className="row">
                    <div className="col-3 col-md-2 align-self-start text-center">
                        <img className="sf-pfp sf-clickable sf-darken-hover" src={`/images/${post.avatar}`} />
                    </div>
                    <div className="col">
                        <span className="col">
                            <div className="row">
                                <div className="col-11">
                                    <Link to={`/profile/${post.userId}`}>
                                        <span className="sf-font-bold sf-clickable sf-underline-hover pe-1 sf-secondary ">
                                            {post.username}
                                        </span>
                                        <span class="fa-solid fa-circle-check sf-accent pe-1"></span>
                                        <span className="sf-font-normal sf-clickable sf-tertiary">@{post.handle}</span>
                                    </Link>
                                    <div className="sf-font-normal sf-secondary pb-1">
                                        {post.post}
                                    </div>
                                    <PostStats stats={post} />
                                </div>
                                <div className="col-1 d-flex align-items-top justify-content-center">
                                    <Link to='#'>
                                        <div className='row text-center'>
                                            <i className="fa-solid fa-x px-1 sf-clickable sf-tertiary-alt-hover sf-large-hover sf-hw-100"
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
    );
};


export default PostItem;
