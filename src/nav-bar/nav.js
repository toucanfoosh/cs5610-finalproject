import NavItem from "./nav-item";
import sidebar from "./sidebar.json";
import '../index.css';
import "./index.css";

const NavBar = ({ active = 'home' }) => {
    return (
        <div className="sticky-top sf-m-top sf-navbar sf-bg-primary">
            <div className="sf-navbar">
                {sidebar.map((sidebarItem) => (
                    <NavItem item={sidebarItem} active={active} />
                ))}
            </div>
            <div className="d-block d-xl-none text-center mt-5 mb-4">
                <img src="./images/catjam.jpg" className="sf-nav-pfp" />
            </div>
            <div className="d-none d-xl-block sf-nav-profile-full mt-5 mb-4 mx-4">
                <div className="d-flex-inline justify-content-center justify-content-xl-none sf-nav-profile-item">
                    <div className="row sf-secondary">
                        <div className="d-none d-xl-block col-3"></div>
                        <div className="col-12 col-xl-2 text-center sf-tertiary">
                            <img src="./images/catjam.jpg" className="sf-nav-pfp" />
                        </div>
                        <div className="d-none d-xl-inline col-xl-7">
                            <span>CatJam</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;