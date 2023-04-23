import NavItem from "./nav-item";
import sidebar from "./sidebar.json";
import ThemeSwitcher from "../theme-switcher";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { profileThunk } from "../services/user-thunk";
import '../index.css';
import "./index.css";
import { Link } from "react-router-dom";


function IsActive(active) {
    return (active === 'Profile') ? 'active' : ''
}
const MobileNavBar = ({ active = 'home' }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(profileThunk());
    }, []);

    const { currentUser } = useSelector(state => state.user);

    return (
        <div className="sf-mobile-navbar">
            <div className="row">
                <div className="col-10 row">
                    {sidebar.map((sidebarItem) => (
                        <div className="col text-center">
                            <NavItem item={sidebarItem} active={active} />
                        </div>
                    ))}
                    <div className="col text-center">
                        <ThemeSwitcher />
                    </div>
                </div>
                <div className="col text-center">
                    <Link to="/login" className={`${IsActive(active)}`}>
                        <div className="sf-navbar-item mt-3 pt-2">
                            <div className="sf-secondary">
                                {
                                    currentUser &&
                                    <img src={`/images/${currentUser.avatar}`} className="sf-mobile-nav-pfp" />
                                }
                                {
                                    !currentUser &&
                                    <img src="/images/catjam.jpg" className="sf-mobile-nav-pfp" />
                                }                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="sf-navbar-item-hover" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MobileNavBar;