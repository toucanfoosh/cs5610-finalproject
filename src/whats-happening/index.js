import "./index.css";
import "../home/index.css"
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { createPostThunk } from "../services/posts-thunk";
import FancyButton from "../FancyButton/button";
import { profileThunk } from "../services/user-thunk";
import { updateUserThunk } from "../services/user-thunk";

const WhatsHappening = () => {
    const { currentUser } = useSelector(state => state.user);
    const [post, setPost] = useState("");
    const [profile, setProfile] = useState({});
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        const handleProfile = async () => {
            const newProfile = await dispatch(profileThunk());
            setProfile(newProfile.payload);
        }
        handleProfile().catch(console.error);
    }, []);
    const postClickHandler = async () => {
        if (post === "") {
            return;
        }
        if (!profile) {
            setError("Must be logged in to post");
            return;
        }
        console.log(profile);
        const newPost = {
            post,
            username: profile.username,
            handle: profile.handle,
            avatar: profile.avatar,
            userId: profile._id,
            likeUsers: [],
            repostUsers: [],
            reposts: [],
            comments: 0
        }
        var getValue = document.getElementById("postbox");
        getValue.value = "";
        await dispatch(createPostThunk(newPost));

        const newUser = {
            ...currentUser,
            posts: currentUser.posts + 1
        }

        const updatedUser = await dispatch(updateUserThunk(newUser));
        console.log(updatedUser);
    }
    return (
        <div className="px-3 py-4 sf-home-item-container m-0">
            {
                error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            }
            <div className="row">
                <div className="col-3 col-md-2 align-self-center text-center">
                    <img className='rounded-circle sf-pfp sf-clickable sf-darken-hover sf-anim-3' src={`./images/catjam.jpg`} />
                </div>
                <div className="col-6 col-md-7">
                    <textarea onChange={(e) => {
                        setPost(e.target.value);
                    }} className="sf-text-area" placeholder="What's happening?" id="postbox"></textarea>
                </div>
                <div className="col-3 px-1">
                    <FancyButton onclick={postClickHandler} text="Post" />
                </div>
            </div>
        </div>
    )
}

export default WhatsHappening;