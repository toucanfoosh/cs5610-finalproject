import "./index.css";
import "../index.css";
import { useSelector } from "react-redux";
import PostItem from "./post-item";

const HomeComponent = () => {
    const posts = useSelector(state => state.posts);
    return (
        <div>
            <div className="list-group ps-0 sf-home-min-width">
                {posts.map((post) => (
                    <PostItem post={post} />
                ))}
            </div>
        </div>
    );
};

export default HomeComponent;