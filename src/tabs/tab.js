import { Link } from 'react-router-dom'
import '../index.css'
import './index.css'

const IsActive = (title, activeTab) => {
    return activeTab === title ? true : false
}

const Tab = ({ prop, activeTab }) => {
    return (
        <div className={`col d-flex justify-content-center sf-navbar-item`}>
            <Link key={prop._id} to={prop.path} className={`sf-tab`}>
                <div className='sf-w-100 d-flex flex-column justify-content-center align-items-center'>
                    <div className={`${IsActive(prop.title, activeTab) ? "fw-bold" : ""}`}>{prop.title}</div>
                    <div className={`sf-navbar-item-hover ${IsActive(prop.title, activeTab) ? "sf-active" : ""}`} />
                </div>
            </Link>
        </div>
    )
}

export default Tab