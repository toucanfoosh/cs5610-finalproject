import '../index.css'
import './index.css'
import PostStats from './post-stats';
import { useDispatch } from 'react-redux';
import { deletePostThunk } from '../services/posts-thunk';
import { Link } from 'react-router-dom';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { findUserById } from '../services/user-service';
import { updateUserThunk } from '../services/user-thunk';

const PostItem = ({ post }) => {
    const dispatch = useDispatch();
    const [postUser, setPostUser] = useStateWithCallbackLazy({});
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
        <div className="px-3 py-3 m-0 sf-home-item-container">
            <div className="row">
                <div className="col-3 col-md-2 align-self-start text-center">
                    <img className="sf-pfp sf-clickable sf-darken-hover" src={`/images/${post.avatar}`} />
                </div>
                <div className="col">
                    <span className="col">
                        <i className="fa-solid fa-x float-end sf-clickable sf-darken-hover sf-tertiary"
                            onClick={() => deletePostHandler(post._id)}></i>
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
                    </span>
                </div>
            </div>
        </div >
    );
};


export default PostItem;
