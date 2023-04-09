import "./index.css";
import "../index.css";
import { useSelector } from "react-redux";
import PostItem from "./post-item";
import WhatsHappening from "../whats-happening";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { findPostsThunk } from "../services/posts-thunk";

const HomeComponent = () => {
    const { posts, loading } = useSelector(state => state.postsData);
    console.log(posts);
    console.log(loading);
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findPostsThunk())
    }, [])

    return (
        <div className="row">
            <div className="sf-home-border">
                <WhatsHappening className="sf-bottom-border"/>
                {
                    loading &&
                    <div className="mb-2 list-group ps-0">
                        <div className="sf-tertiary">
                            Loading...
                        </div>
                    </div>
                }
                {
                    !loading &&
                    <div className="mb-2 sf-bottom-border list-group ps-0">
                        {posts.map((post) => (
                            <PostItem post={post} />
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default HomeComponent;