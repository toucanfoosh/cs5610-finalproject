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
        <Link key={item._id} className={`list-group-item ${IsActive(item.title, active)} col align-self-center`} to={item.href}>
            <div className="text-center sf-secondary">
                    <div className="sf-mobile-item-padding">
                        <span className={`${item.icon}`}></span>
                </div>
            </div>
        </Link>
    );
};

export default MobileItem;