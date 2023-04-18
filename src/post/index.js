import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import FancyButton from "../FancyButton/button";

const Post = () => {
    const location = useLocation();
    const { from } = location.state;
    const { username, pid } = useParams();
    return (
        <div className="row">
            <Link className="col-1" to={`${from}`}><i class="fa-solid fa-arrow-left"></i></Link>
            <h1 className="col-11">Post</h1>
            <textarea placeholder="Leave a comment" className="form-control" />
            <FancyButton text="Comment" />
        </div>
    );
};

export default Post;