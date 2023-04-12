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
    function refreshPage() {
        setTimeout(() => {
            window.location.reload(false);
        }, 100);
        console.log('page to reload')
    }

    return (
        <Link onClick={refreshPage} key={item._id} className={`list-group-item ${IsActive(item.title, active)}`} to={item.href}>
            <div className="d-flex-inline justify-content-center justify-content-xl-none sf-navbar-item">
                <div className="row sf-secondary">
                    <div className="d-none d-xl-block col-3"></div>
                    <div className="col-12 col-xl-2 text-center sf-tertiary">
                        <span className={`${item.icon} sf-secondary`}></span>
                    </div>
                    <div className="d-none d-xl-inline col-xl-7">
                        <span>{item.title}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NavItem;