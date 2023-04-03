import '../index.css'
import './index.css'

const PostItem = ({ post }) => {
    return (
        <div className="sf-home-post-border sf-tertiary">
            <div className="row px-3">
                <div className="ps-2 pe-4 col-1 col-lg-1 ">
                    <div className='d-flex justify-content-center'>
                        <img className="sf-small-pfp" src={`./images/${post.avatar}`} />
                    </div>
                </div>
                <span className="sf-font-bold col-11 col-lg-11">
                    {post.userName} <span class="fa-solid fa-circle-check sf-accent"></span>
                    <span className="sf-font-normal"> @{post.handle}</span>
                    <div className="sf-font-normal">
                        {post.post}
                    </div>
                </span>
            </div>
        </div >
    );
};


export default PostItem;
