import './index.css'
import '../index.css'
import { useSelector } from 'react-redux'

const Header = ({ user }) => {
    return (
        <div className="d-flex pt-3 px-5">
            <div className="">
                <img src={`/images/${user.avatar}`} className="sf-profile-pfp" />
            </div>
            <div className="d-flex flex-column justify-content-end px-4">
                <div className="sf-secondary sf-text-bold fs-3 p-1">{user.username}</div>
                <div className="sf-accent px-1 pb-1">
                    <span>{user.firstName} </span>
                    <span>{user.lastName}</span>
                </div>
                <div className="sf-tertiary px-1 pb-1">@{user.handle}</div>
                <div className="sf-secondary px-1 pb-1">
                    {user.bio}
                </div>
            </div>
        </div>
    )
}

export default Header;