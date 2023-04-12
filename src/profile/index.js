import { useDispatch, useSelector } from "react-redux";
import FancyButton from "../FancyButton/button";
import { logoutThunk, profileThunk } from "../services/user-thunk";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const handleLogout = async () => {
        await dispatch(logoutThunk());
        console.log("logged out");
        navigate("/login");
    }
    useEffect(() => {
        const handleProfile = async () => {
            const newProfile = await dispatch(profileThunk());
            setProfile(newProfile.payload);
        }
        handleProfile();
    }, []);
    return (
        <div>
            <h1>Profile</h1>
            {JSON.stringify(profile)}

            <FancyButton onclick={handleLogout} text="Logout" />
        </div>
    )
};

export default Profile;