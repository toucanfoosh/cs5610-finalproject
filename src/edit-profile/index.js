import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import "../index.css";
import FancyButton from "../FancyButton/button";
import { useNavigate } from "react-router";
import { profileThunk, updateUserThunk } from "../services/user-thunk";

const EditProfileScreen = () => {
    const { currentUser } = useSelector(state => state.user);
    useEffect(() => {
        dispatch(profileThunk());
    }, [])
    let [user, setUser] = useState(currentUser);
    console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="sf-secondary">Edit Profile</h1>
            {user &&
                <div>
                    <label for="firstName">First Name</label>
                    <input onChange={(e) => setUser({ ...user, firstName: e.target.value })} className="form-control" id="firstName" value={user.firstName}></input>
                    <label for="lastName">Last Name</label>
                    <input onChange={(e) => setUser({ ...user, lastName: e.target.value })} className="form-control" id="lastName" value={user.lastName}></input>
                    <FancyButton onclick={async () => {
                        await dispatch(updateUserThunk(user))
                        navigate("/profile");
                    }} text="Save" />
                </div>

            }
        </div>
    )
}

export default EditProfileScreen;