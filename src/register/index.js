import { useDispatch } from "react-redux";
import { registerThunk } from "../services/user-thunk";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import FancyButton from "../FancyButton/button";
import BackButton from "../back-button";

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [handle, setHandle] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        const newUser = {
            username,
            password,
            handle,
            email,
            followers: [],
            following: [],
            firstName: "",
            lastName: "",
            posts: 0,
            reviews: 0,
            bio: "",
            avatar: "catjam.jpg",
            banner: "catjam.jpg",
            website: "",
            likes: [],
            reposts: []
        }
        const status = await dispatch(registerThunk(newUser));
        console.log(status);
        if (status.payload === 404) {
            setError("Missing fields");
        }
        else if (status.payload === 409) {
            setError("Username or handle already exists");
        }
        else {
            setError('');
            navigate("/profile");
        }

    }

    return (
        <div>
            <BackButton />
            {
                error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            }
            <div className="sf-w-100 sf-vh-100 d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-column align-items-start pb-4">
                        <label for="handle">Username</label>
                        <input onChange={(e) => {
                            setHandle(e.target.value);
                        }} className="sf-form-control sf-login-box fs-3" type="text" id="handle" placeholder="johndoe123"></input>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-column align-items-start pb-4">
                        <label for="username">Display Name</label>
                        <input onChange={(e) => {
                            setUsername(e.target.value);
                        }} className="sf-form-control sf-login-box fs-3" type="text" id="username" placeholder="John Doe"></input>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-column align-items-start pb-4">
                        <label for="password">Password</label>
                        <input onChange={(e) => {
                            setPassword(e.target.value);
                        }} className="sf-form-control sf-login-box fs-3" type="password" id="password" placeholder="At least 0 characters"></input>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-column align-items-start pb-4">
                        <label for="email">Email</label>
                        <input onChange={(e) => {
                            setEmail(e.target.value);
                        }} className="sf-form-control sf-login-box fs-3" type="email" id="email" placeholder="john@example.com"></input>
                    </div>
                </div >
                <div className="d-flex flex-column align-items-center p-5 sf-w-100">
                    <div className="sf-login-button">
                        <FancyButton onclick={handleRegister} text="Register" />
                    </div>
                </div >
            </div >
        </div >
    )
};

export default RegisterScreen;