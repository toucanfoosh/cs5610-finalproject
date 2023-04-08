import "./index.css";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { createPostThunk } from "../services/posts-thunk";

const WhatsHappening = () => {
    const [post, setPost] = useState("");
    const dispatch = useDispatch();
    const postClickHandler = () => {
        const newPost = {
            post
        }
        dispatch(createPostThunk(newPost));
    }
    return (
        <div className="sf-padding-20 row">
            <div className="col-2 col-md-1">
                <img className='rounded-circle' src={`./images/catjam.jpg`} height='50px' width='50px' />
            </div>
            <div className="ms-2 col-9 col-md-10">
                <textarea onChange={(e) => {
                    setPost(e.target.value);
                }} className="sf-text-area-no-resize form-control" placeholder="What's happening?"></textarea>
            </div>
            <div className="sf-center sf-frame">
                <button onClick={postClickHandler} className="mt-2 sf-custom-btn sf-btn-1">
                    <span>Post</span>
                </button>
            </div>
            {post}
        </div>
    )
}

export default WhatsHappening;