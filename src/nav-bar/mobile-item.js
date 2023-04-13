import { Link } from "react-router-dom";

function IsActive(title, active) {
    return active === title ? 'active' : ''
}

const MobileItem = (
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
        <div className="col align-self-center">
            <div className="text-center sf-secondary">
                <Link key={item._id} className={`sf-secondary ${IsActive(item.title, active)} `} to={item.href}>
                    <div className="sf-mobile-navbar-item">
                        <span className={`${item.icon}`}></span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MobileItem;