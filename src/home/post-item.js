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
        <div className="sf-tertiary p-3">
            <div className="row">
                <div className="col-2 col-md-1 d-flex-inline align-self-center">
                    <div className='d-flex justify-content-center'>
                        <img className="sf-pfp" src={`./images/${post.avatar}`} />
                    </div>
                </div>
                <span className="sf-font-bold ccol">
                    <i className="fa-solid fa-x float-end"
                        onClick={() => deletePostHandler(post._id)}></i>
                    {post.username} <span class="fa-solid fa-circle-check sf-accent"></span>
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
