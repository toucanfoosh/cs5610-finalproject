import { useDispatch } from "react-redux";
import { profileThunk } from "../services/user-thunk";
import { useEffect } from "react";

const LoadProfile = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profileThunk());
    }, []);
    return children;
}

export default LoadProfile;