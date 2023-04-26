import './index.css'
import '../index.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = ({ user, profileItems }) => {
    return (

        <div>
            <div className="d-flex pt-3 px-5">
                <div className="">
                    <img src={`/images/${user.avatar}`} className="sf-profile-pfp" />
                </div>
                <div className="d-flex flex-column justify-content-end px-4">
                    <div className='d-flex align-items-center sf-w-100'>
                        <div className="sf-secondary sf-text-bold fs-3 p-1 text-nowrap">
                            {user.username} {user.role === "admin" && <span className="fa-solid fa-circle-check sf-accent pe-1"></span>} {user.role === "artist" && <span className="sf-accent fa-solid fa-music"></span>}
                        </div>
                    </div>
                    <div className="sf-accent px-1 pb-1 text-nowrap">
                        <span>{user.firstName} </span>
                        <span>{user.lastName}</span>
                    </div>
                    <div className="sf-tertiary px-1 pb-1 text-nowrap">@{user.handle}</div>
                    <div className="sf-secondary px-1 pb-1">
                        {user.bio}
                    </div>
                    <div className='d-flex flex-row pb-3'>
                        <Link to={`/profile/other/${user._id}/followers`} className='text-nowrap sf-tertiary'>Followers <span className='fw-bold sf-secondary'>{user.followers.length}</span></Link>
                        <Link to={`/profile/other/${user._id}/following`} className='text-nowrap sf-tertiary ps-3'>Following <span className='fw-bold sf-secondary'>{user.following.length}</span></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;