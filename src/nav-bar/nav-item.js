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
        <div className="justify-content-center justify-content-xl-none sf-navbar-item my-xl-0 my-3 mx-xl-4 py-2 py-xl-4">
            <Link key={item._id} className={`list-group-item ${IsActive(item.title, active)}`} to={item.href}>
                <div className="sf-secondary">
                    <div className="row">
                        <div className="text-center text-xl-end sf-tertiary col-xl-5">
                            <span className={`${item.icon} sf-secondary`}></span>
                        </div>
                        <div className="d-none d-xl-inline text-start col-xl-7">
                            <span>{item.title}</span>
                        </div>
                    </div>
                </div>
            </Link >
        </div>
    );
};

export default NavItem;