import './index.css'
import '../index.css'
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
                            {user.username} {user.role === "admin" && <span class="fa-solid fa-circle-check sf-accent pe-1"></span>}
                        </div>
                        <div className='d-flex ps-3 flex-column flex-md-row text-end'>
                            <div className='text-nowrap sf-tertiary ps-3'>Followers <span className='fw-bold sf-secondary'>{user.followers.length}</span></div>
                            <div className='text-nowrap sf-tertiary ps-3'>Following <span className='fw-bold sf-secondary'>{user.following.length}</span></div>
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
                </div>
            </div>
        </div>
    )
}

export default Header;