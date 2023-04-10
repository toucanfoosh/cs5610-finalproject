import NavItem from "./nav-item";
import sidebar from "./sidebar.json";
import '../index.css';
import "./index.css";

const NavBar = ({ active = 'home' }) => {
    return (
        <div className="sticky-top sf-m-top sf-navbar">
            <div className="sf-navbar-min-width">
                <div className="sf-navbar">
                    {sidebar.map((sidebarItem) => (
                        <NavItem item={sidebarItem} active={active} />
                    ))}
                </div>
                <div className="sf-navbar-profile">
                    <div>hi</div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;