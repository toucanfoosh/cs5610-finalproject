import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import "../index.css";
import FancyButton from "../FancyButton/button";
import { useNavigate } from "react-router";
import { profileThunk, updateUserThunk } from "../services/user-thunk";

const EditProfileScreen = () => {
    const { currentUser } = useSelector(state => state.user);
    useEffect(() => {
        dispatch(profileThunk()).then(value => setUser(value.payload));
    }, []);
    const [user, setUser] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(user);
    return (
        <div>
            <h1 className="sf-secondary">Edit Profile</h1>
            {user &&
                <div>
                    <label for="firstName">First Name</label>
                    <input onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        className="form-control" id="firstName" value={user.firstName}></input>
                    <label for="lastName">Last Name</label>
                    <input onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                        className="form-control" id="lastName" value={user.lastName}></input>
                    <label for="handle">Handle</label>
                    <input onChange={(e) => setUser({ ...user, handle: e.target.value })}
                        className="form-control" id="handle" value={user.handle}></input>
                    <label for="bio">Bio</label>
                    <input onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        className="form-control" id="bio" value={user.bio}></input>
                    <FancyButton onclick={async () => {
                        await dispatch(updateUserThunk(user))
                        navigate("/profile");
                    }} text="Save" />
                    <FancyButton onclick={() => {
                        navigate("/profile");
                    }} text="Cancel" />
                </div>
            }
        </div>
    )
}

export default EditProfileScreen;