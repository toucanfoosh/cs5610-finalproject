import MobileItem from "./mobile-item";
import sidebar from "./sidebar.json";
import '../index.css';
import "./index.css";

const MobileNavBar = ({ active = 'home' }) => {
    return (
        <div className="sticky-bottom sf-mobile-navbar">
            <div className="d-flex row">
                <div className="col-10 row">
                    {sidebar.map((sidebarItem) => (
                        <MobileItem item={sidebarItem} active={active} />
                    ))}
                </div>
                <div className="col-2 text-center">
                    <img src="./images/catjam.jpg" className="sf-mobile-nav-pfp" alt="profile" />
                </div>
            </div>
        </div>
    );
};

export default MobileNavBar;