import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { loginThunk } from "../services/user-thunk";
import { Link } from "react-router-dom";

const Login = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [username, setUsername] = useState("jack123");
    const [password, setPassword] = useState("123");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const status = await dispatch(loginThunk({ username, password }));
        if (status === 404) {
            setError("Failed to login");
        }
        // navigate("/profile");
    };

    const handleRegister = () => {
        navigate("/register");
    }

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
            <button onClick={handleLogin} className="mt-5 sf-custom-btn sf-btn-1">
                Login
            </button>
            <button onClick={handleRegister} className="mt-5 sf-custom-btn sf-btn-1">
                Register
            </button>
            {currentUser && (
                <div>
                    <h1>Welcome {currentUser.username}</h1>
                </div>
            )}
        </div>
    );
};

export default Login;