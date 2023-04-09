import "./index.css";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { createPostThunk } from "../services/posts-thunk";
import BubblyButton from "./button.js";

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
        <div className="p-3 row">
            <div className="col-9 row">
                <div className="col-2 col-md-1 d-flex-inline align-self-center">
                    <img className='rounded-circle sf-pfp' src={`./images/catjam.jpg`} />
                </div>
                <div className="col-1" />
                <div className="col">
                    <textarea onChange={(e) => {
                        setPost(e.target.value);
                    }} className="sf-text-area" placeholder="What's happening?"></textarea>
                </div>
            </div>
            <div className="col">
                <BubblyButton onclick={postClickHandler} text="Post" />
            </div>
        </div>
    )
}

export default WhatsHappening;