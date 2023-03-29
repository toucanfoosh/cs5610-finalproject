import NavItem from "./nav-item";
import sidebar from "./sidebar.json";
import "./index.css";

const NavBar = ({ active = 'home' }) => {
    return (
        <div>
            <h1>SymFolio</h1>
            <div className="list-group">
                {sidebar.map((sidebarItem) => (
                    <NavItem item={sidebarItem} active={active} />
                ))}
                <div className="sf-center sf-frame">
                    <button className="mt-2 sf-custom-btn sf-btn-1">
                        <span>Post</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;