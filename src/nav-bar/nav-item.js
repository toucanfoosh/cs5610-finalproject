import { Link } from "react-router-dom";

function IsActive(title, active) {
    return active === title ? true : false
}

const NavItem = (
    {
        item = {
            "title": "Home",
            "href": "../home",
            "_id": "123",
            "icon": "fa fa-home",
            "activeIcon": "fa fa-home"
        },
        active = 'Home'
    }
) => {
    function refreshPage() {
        setTimeout(() => {
            window.location.reload(false);
        }, 100);
        console.log('page to reload')
    }

    return (
        <Link key={item._id} className={`list-group-item ${IsActive(item.title, active) ? "fw-bold" : ""}`} to={item.href}>
            <div className="sf-navbar-item mt-xl-0 mt-3 mx-xl-4 pt-2 pt-xl-4">
                <div className="sf-secondary">
                    <div className="row">
                        <div className="text-center text-xl-end sf-tertiary col-xl-5">
                            <span className={`${IsActive(item.title, active) ? item.activeIcon : item.icon} sf-secondary`}></span>
                        </div>
                        <div className="d-none d-xl-inline text-start col-xl-7">
                            <span>{item.title}</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className={`sf-navbar-item-hover ${IsActive(item.title, active) ? "sf-active" : ""}`} />
                </div>
            </div>
        </Link >

    );
};

export default NavItem;