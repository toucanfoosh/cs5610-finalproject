import "./index.css";
import "../index.css";
import { useSelector } from "react-redux";
import PostItem from "./post-item";
import WhatsHappening from "../whats-happening";

const HomeComponent = () => {
    const posts = useSelector(state => state.posts);
    return (
        <div>
            <WhatsHappening />
            <div className="mb-2 list-group ps-0 sf-home-min-width sf-home-border">
                {posts.map((post) => (
                    <PostItem post={post} />
                ))}
            </div>
        </div>
    );
};

export default HomeComponent;