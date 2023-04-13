import { useDispatch, useSelector } from "react-redux";
import FancyButton from "../FancyButton/button";
import { logoutThunk, profileThunk } from "../services/user-thunk";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "../index.css"

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await dispatch(logoutThunk());
        console.log("logged out");
        navigate("/login");
    }
    const handleEditProfile = () => {
        navigate("/edit-profile");
    }
    useEffect(() => {
        dispatch(profileThunk());
    }, []);
    const { currentUser } = useSelector(state => state.user);
    return (
        <div>
            {currentUser &&
                <div>
                    <h1 className="sf-secondary">Profile</h1>
                    <div className="sf-secondary">{currentUser.firstName} {currentUser.lastName}</div>
                    <img src={`./images/${currentUser.avatar}`} />
                    <div className="sf-secondary sf-text-bold">{currentUser.username}
                        <span className="sf-text-normal">@{currentUser.handle}</span></div>
                    <div className="sf-secondary">
                        <div>Followers: {currentUser.followers}</div>
                        <div>Following: {currentUser.following}</div>
                        <div>Posts: {currentUser.posts}</div>
                        <div>Reviews: {currentUser.reviews}</div>
                    </div>
                    <FancyButton onclick={handleEditProfile} text="Edit Profile" />
                    <FancyButton onclick={handleLogout} text="Logout" />

                </div>
            }
        </div>
    )
};

export default Profile;