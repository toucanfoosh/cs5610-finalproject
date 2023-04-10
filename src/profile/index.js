import { useDispatch } from "react-redux";
import FancyButton from "../FancyButton/button";
import { logoutThunk } from "../services/user-thunk";
import { useNavigate } from "react-router";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutThunk());
        navigate("/login");
    }
    return (
        <div>
            <h1>Profile</h1>
            <FancyButton onclick={handleLogout} text="Logout" />
        </div>
    )
};

export default Profile;