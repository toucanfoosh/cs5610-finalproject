import NavItem from "./nav-item";
import sidebar from "./sidebar.json";
import ThemeSwitcher from "../theme-switcher";

import '../index.css';
import "./index.css";
import { Link } from "react-router-dom";


const MobileNavBar = ({ active = 'home' }) => {
    return (
        <div className="sf-mobile-navbar">
            <div className="d-flex row">
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
                    <Link to="/login">
                        <div className="justify-content-center sf-navbar-item my-3 py-2">
                            <div className="sf-secondary">
                                <img src="./images/catjam.jpg" className="sf-mobile-nav-pfp" alt="profile" />
                            </div>
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