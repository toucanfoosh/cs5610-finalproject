import { useSelector } from "react-redux"
import "../index.css";

const EditProfileScreen = () => {
    const { currentUser } = useSelector(state => state.user);
    return (
        <div>
            <h1 className="sf-secondary">Edit Profile</h1>
            {currentUser &&
                <div>
                    <label for="firstName">First Name</label>
                    <input className="form-control" id="firstName"></input>
                </div>
            }
        </div>
    )
}

export default EditProfileScreen;