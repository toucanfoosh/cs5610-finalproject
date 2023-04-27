import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import "../index.css";
import "./index.css";
import FancyButton from "../FancyButton/button";
import { useNavigate } from "react-router";
import { profileThunk, updateUserThunk } from "../services/user-thunk";
import BackButton from "../back-button";

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
            <BackButton path="/profile" />
            <h1 className="sf-secondary p-3 pb-0 pt-5">Edit Profile</h1>
            {user &&
                <div className="d-flex flex-column p-3">
                    <label for="firstName">First Name</label>
                    <input onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        className="sf-form-control sf-edit-h" id="firstName" value={user.firstName}></input>
                    <label for="lastName">Last Name</label>
                    <input onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                        className="sf-form-control sf-edit-h" id="lastName" value={user.lastName}></input>
                    <label for="handle">Handle</label>
                    <input onChange={(e) => setUser({ ...user, handle: e.target.value })}
                        className="sf-form-control sf-edit-h" id="handle" value={user.handle}></input>
                    <label for="bio">Bio</label>
                    <input onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        className="sf-form-control sf-edit-h" id="bio" value={user.bio}></input>
                    <div className="row pt-5 d-flex justify-content-around">
                        <div className="col sf-edit-btn">
                            <FancyButton onclick={async () => {
                                await dispatch(updateUserThunk(user))
                                navigate("/profile");
                            }} text="Save" />
                        </div>
                        <div className="col sf-edit-btn">
                            <FancyButton onclick={() => {
                                navigate("/profile");
                            }} text="Cancel" />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EditProfileScreen;