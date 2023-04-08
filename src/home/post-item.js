import '../index.css'
import './index.css'
import PostStats from './post-stats';
import { useDispatch } from 'react-redux';
import { deletePostThunk } from '../services/posts-thunk';

const PostItem = ({ post }) => {
    const dispatch = useDispatch();
    const deletePostHandler = (id) => {
        dispatch(deletePostThunk(id));
    }

    return (
        <div className="sf-home-post-border sf-tertiary">
            <div className="row px-3">
                <div className="ps-2 pe-4 col-1 col-lg-1 ">
                    <div className='d-flex justify-content-center'>
                        <img className="sf-small-pfp" src={`./images/${post.avatar}`} />
                    </div>
                </div>
                <span className="sf-font-bold col-11 col-lg-11">
                    <i className="fa-solid fa-x float-end"
                        onClick={() => deletePostHandler(post._id)}></i>
                    {post.userName} <span class="fa-solid fa-circle-check sf-accent"></span>
                    <span className="sf-font-normal"> @{post.handle}</span>
                    <div className="sf-font-normal">
                        {post.post}
                    </div>
                    <PostStats stats={post} />
                </span>
            </div>
        </div >
    );
};


export default PostItem;
