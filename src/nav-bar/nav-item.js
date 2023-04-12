import { Link } from "react-router-dom";

function IsActive(title, active) {
    return active === title ? 'active' : ''
}

const NavItem = (
    {
        item = {
            "title": "Home",
            "href": "../home",
            "_id": "123",
            "icon": "fa fa-home"
        },
        active = 'Home'
    }
) => {
    return (
        <Link key={item._id} className={`list-group-item ${IsActive(item.title, active)}`} to={item.href}>
            <div className="d-flex-inline justify-content-center justify-content-xl-none sf-navbar-item">
                <div className="row">
                    <div className="col-12 col-xl-2 text-center sf-tertiary">
                        <span className={`${item.icon}`}></span>
                    </div>
                    <div className="d-none d-xl-inline col-xl-10">
                        <span>{item.title}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NavItem;