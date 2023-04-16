import NavItem from "./nav-item";
import sidebar from "./sidebar.json";
import '../index.css';
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { profileThunk } from "../services/user-thunk";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../theme-switcher";

const NavBar = ({ active = 'home' }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(profileThunk());
    }, []);



    const { currentUser } = useSelector(state => state.user);
    return (
        <div className="sf-navbar sf-bg-primary">
            <div className="sf-navbar">
                {sidebar.map((sidebarItem) => (
                    <NavItem item={sidebarItem} active={active} />
                ))}
                <ThemeSwitcher />
            </div>
            <Link to="/login">
                <div className="d-block sf-nav-profile-full py-2">
                    <div className="justify-content-center justify-content-xl-none sf-nav-profile-item">
                        <div className="sf-secondary">
                            <div className="row">
                                <div className="d-block text-center align-self-center sf-tertiary col-xl-4 px-1">
                                    {
                                        currentUser &&
                                        <img src={`/images/${currentUser.avatar}`} className="sf-nav-pfp" />
                                    }
                                    {
                                        !currentUser &&
                                        <img src="/images/catjam.jpg" className="sf-nav-pfp" />
                                    }
                                </div>
                                <div className="d-none d-xl-inline-flex text-start col-xl-8 align-items-center">
                                    {
                                        currentUser &&
                                        <div>
                                            <div className="py-1 sf-secondary text-decoration-none">{currentUser.username}</div>
                                            <div className="py-1 sf-tertiary text-decoration-none">@{currentUser.handle}</div>
                                        </div>
                                    }
                                    {
                                        !currentUser &&
                                        <div>
                                            <div className="py-1 sf-secondary text-decoration-none">Sign Up/Log In</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link >
        </div >
    );
};

export default NavBar;