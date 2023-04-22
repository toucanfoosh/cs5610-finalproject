import { useDispatch } from "react-redux";
import { profileThunk } from "../services/user-thunk";
import { useEffect } from "react";
import { findPostsThunk } from "../services/posts-thunk";

const LoadProfile = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profileThunk());
        dispatch(findPostsThunk());
    }, []);
    return children;
}

export default LoadProfile;