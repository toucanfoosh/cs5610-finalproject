import { useDispatch } from "react-redux";
import { registerThunk } from "../services/user-thunk";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import FancyButton from "../FancyButton/button";

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        const status = await dispatch(registerThunk({ username, password }));
        console.log(status);
        if (status === 409) {
            setError("User is already registered");
            return;
        }
        else {
            // navigate("/login");
            console.log(status);
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <label for="username">Username</label>
            <input onChange={(e) => {
                setUsername(e.target.value);
            }} className="form-control" type="text" id="username"></input>
            <label for="password">Password</label>
            <input onChange={(e) => {
                setPassword(e.target.value);
            }} className="mb-2 mt-2 form-control" type="password" id="password"></input>
            <FancyButton onclick={handleRegister} text="Register" />
            {username} <br />
            {password}
            {error}
        </div>
    )
};

export default RegisterScreen;