import { useDispatch } from "react-redux";
import { registerThunk } from "../services/user-thunk";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import FancyButton from "../FancyButton/button";

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
            followers: 0,
            following: 0,
            firstName: "",
            lastName: "",
            posts: 0,
            reviews: 0,
            bio: "",
            avatar: "catjam.jpg",
            banner: "catjam.jpg",
            website: ""
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
            <button className="float-start" onClick={() => {
                navigate("/login");
            }}><i class="fa-solid fa-arrow-left"></i></button>
            <h1>Register</h1>
            {
                error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            }
            <label for="username">Username</label>
            <input onChange={(e) => {
                setUsername(e.target.value);
            }} className="form-control" type="text" id="username"></input>
            <label for="password">Password</label>
            <input onChange={(e) => {
                setPassword(e.target.value);
            }} className="mb-2 mt-2 form-control" type="password" id="password"></input>
            <label for="email">Email</label>
            <input onChange={(e) => {
                setEmail(e.target.value);
            }} className="mb-2 mt-2 form-control" type="email" id="email"></input>
            <label for="handle">Handle</label>
            <input onChange={(e) => {
                setHandle(e.target.value);
            }} className="mb-2 mt-2 form-control" type="text" id="handle"></input>
            <FancyButton onclick={handleRegister} text="Register" />
        </div>
    )
};

export default RegisterScreen;