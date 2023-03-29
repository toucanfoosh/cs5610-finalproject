const PostItem = ({post}) => {
    return (
        <div className="list-group-item">
            <div className="row">
                <img className="col-2 col-lg-1 rounded-circle" src={`/src/images/${post.avatar}`} width="50px" height="50px"/>
                <span className="sf-font-bold col-10 col-lg-11">
                    {post.userName} <span class="fa-solid fa-circle-check sf-accent"></span>
                    <span className="sf-font-normal"> @{post.handle}</span>
                    <div className="sf-font-normal">
                        {post.post}
                    </div>
                </span>
            </div>
        </div>
    );
};


export default PostItem;
