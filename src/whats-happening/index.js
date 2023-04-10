import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { createPostThunk } from "../services/posts-thunk";
import FancyButton from "../FancyButton/button";
import { profileThunk } from "../services/user-thunk";

const WhatsHappening = () => {
    const [post, setPost] = useState("");
    const [profile, setProfile] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        const handleProfile = async () => {
            const newProfile = await dispatch(profileThunk());
            setProfile(newProfile.payload);
        }
        handleProfile().catch(console.error);
    }, []);
    const postClickHandler = () => {
        if (!profile) {
            alert("Not logged in");
            return;
        }
        console.log(profile);
        const newPost = {
            post,
            username: profile.username,
            handle: "" + profile.handle,
            avatar: profile.avatar
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
                <FancyButton onclick={postClickHandler} text="Post" />
            </div>
        </div>
    )
}

export default WhatsHappening;