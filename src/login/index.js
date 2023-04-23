import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { profileThunk, loginThunk } from "../services/user-thunk";
import FancyButton from "../FancyButton/button";
import './index.css';
import '../index.css';
import '../login/index.css'

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
        <div className="sf-w-100 sf-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex flex-column align-items-start pb-4">
                    <label for="username" className="sf-secondary">Username</label>
                    <input
                        id="username"
                        className="sf-form-control sf-login-box fs-3"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin();
                            }
                        }}
                    />
                </div>
                <div className="d-flex flex-column align-items-start">
                    <label for="password" className="sf-secondary">Password</label>
                    <input
                        id="password"
                        className="sf-form-control sf-login-box fs-3"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin();
                            }
                        }}
                    />
                </div>
            </div>
            <div className="d-flex flex-column align-items-center p-5 sf-w-100">
                <div className="sf-login-button">
                    <FancyButton onclick={handleLogin} text="Login" />
                </div>
                <div className="p-4">
                    Don't have an account? <a href="#" className="sf-accent sf-underline-hover" onClick={handleRegister}>Register</a>
                </div>
            </div>

            {error && (
                <div className="position-absolute sf-liked">
                    Sorry, we couldn't find that account.
                </div>
            )}
            {/* {currentUser && (
                <div>
                    <h1>Welcome {currentUser.username}</h1>
                </div>
            )} */}
        </div>
    );
};

export default Login;