import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { profileThunk, loginThunk } from "../services/user-thunk";
import FancyButton from "../FancyButton/button";

const Login = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const status = await dispatch(loginThunk({ username, password }));
        console.log(status);
        if (status.type === "user/login/rejected") {
            setError("Failed to login");
            return;
        }
        navigate("/profile");
    };

    const handleRegister = () => {
        navigate("/register");
    }

    useEffect(() => {
        if (currentUser) {
            console.log("navigating to profile");
            navigate("/profile");
        }

    }, [currentUser]);

    return (
        <div>
            <h1>
                Login Screen
            </h1>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div>
                <label>Username</label>
                <br />
                <input
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <FancyButton onclick={handleLogin} text="Login" />
            <FancyButton onclick={handleRegister} text="Register" />

            {currentUser && (
                <div>
                    <h1>Welcome {currentUser.username}</h1>
                </div>
            )}
        </div>
    );
};

export default Login;