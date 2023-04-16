import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { findUserById } from "../services/user-service";

const OtherProfile = () => {
    const { uid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [profile, setProfile] = useState({});
    const fetchUser = async () => {
        const response = await findUserById(uid);
        console.log(response);
        setProfile(response);
    }

    useEffect(() => {
        if (currentUser) {
            if (uid === currentUser._id) {
                navigate("/profile");
            }
        }
        fetchUser();
    }, []);

    return (
        <div>
            {profile &&
                <div>
                    <h1>{profile.firstName} {profile.lastName}</h1>
                    <h2>{profile.username} @{profile.handle}</h2>
                    <img src={`/images/${profile.avatar}`} />
                    <div>{profile.bio}</div>
                    <h3>Reviews</h3>
                    <h3>Posts</h3>
                </div>
            }
        </div>
    )
}

export default OtherProfile;