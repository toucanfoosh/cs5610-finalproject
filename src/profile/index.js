import { useDispatch, useSelector } from "react-redux";
import FancyButton from "../FancyButton/button";
import { logoutThunk, profileThunk } from "../services/user-thunk";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user);
    const [profile, setProfile] = useState(null);
    const handleLogout = () => {
        dispatch(logoutThunk());
        navigate("/login");
    }
    return (
        <div>
            <h1>Profile</h1>
            {JSON.stringify(currentUser)}

            <FancyButton onclick={handleLogout} text="Logout" />
        </div>
    )
};

export default Profile;