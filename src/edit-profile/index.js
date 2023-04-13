import { useSelector } from "react-redux"
import { useState } from "react";
import "../index.css";

const EditProfileScreen = () => {
    const { currentUser } = useSelector(state => state.user);
    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    return (
        <div>
            <h1 className="sf-secondary">Edit Profile</h1>
            {currentUser &&
                <div>
                    <label for="firstName">First Name</label>
                    <input onChange={(e) => setFirstName(e.target.value)} className="form-control" id="firstName" value={lastName}></input>
                    <label for="lastName">Last Name</label>
                    <input onChange={(e) => setFirstName(e.target.value)} className="form-control" id="lastName" value={lastName}></input>
                </div>
            }
        </div>
    )
}

export default EditProfileScreen;