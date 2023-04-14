import MobileItem from "./mobile-item";
import sidebar from "./sidebar.json";
import '../index.css';
import "./index.css";
import { Link } from "react-router-dom";


const MobileNavBar = ({ active = 'home' }) => {
    return (
        <div className="sf-mobile-navbar">
            <div className="d-flex row">
                <div className="col-10 row">
                    {sidebar.map((sidebarItem) => (
                        <MobileItem item={sidebarItem} active={active} />
                    ))}
                </div>
                <div className="col-2 text-center d-inline-flex align-items-center justify-content-center">
                    <Link to="/login">
                        <div className="sf-mobile-nav-pfp-container">
                            <img src="./images/catjam.jpg" className="sf-mobile-nav-pfp" alt="profile" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MobileNavBar;