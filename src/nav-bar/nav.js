import NavItem from "./nav-item";
import sidebar from "./sidebar.json";
import '../index.css';
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { profileThunk } from "../services/user-thunk";
import { Link } from "react-router-dom";

const NavBar = ({ active = 'home' }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(profileThunk());
    }, []);

    const { currentUser } = useSelector(state => state.user);
    return (
        <div className="sticky-top sf-m-top sf-navbar sf-bg-primary">
            <div className="sf-navbar">
                {sidebar.map((sidebarItem) => (
                    <NavItem item={sidebarItem} active={active} />
                ))}
            </div>
            {
                !currentUser &&
                <Link to="/login">
                    <div className="d-none d-xl-block sf-nav-profile-full mt-5 mb-4 mx-4">
                        <div className="d-flex-inline justify-content-center justify-content-xl-none sf-nav-profile-item">
                            <div className="row sf-secondary">
                                <div className="d-none d-xl-block col-3"></div>
                                <div className="col-12 col-xl-2 text-center sf-tertiary">
                                    <img src="./images/catjam.jpg" className="sf-nav-pfp" />
                                </div>
                                <div className="d-none d-xl-inline col-xl-7">
                                    <span>Sign Up/Log In</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            }
            {
                currentUser &&
                <Link to="/login">
                    <div className="d-none d-xl-block sf-nav-profile-full mt-5 mb-4 mx-4">
                        <div className="d-flex-inline justify-content-center justify-content-xl-none sf-nav-profile-item">
                            <div className="row sf-secondary">
                                <div className="d-none d-xl-block col-3"></div>
                                <div className="col-12 col-xl-2 text-center sf-tertiary">
                                    <img src={`./images/${currentUser.avatar}`} className="sf-nav-pfp" />
                                </div>
                                <div className="d-none d-xl-inline col-xl-7">
                                    <span>{currentUser.username}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            }

        </div>
    );
};

export default NavBar;