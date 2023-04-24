import '../index.css'
import './index.css'

const IsActive = (title, active) => {
    return active === title ? true : false
}

const Tab = (title, active) => {

    return (
        <div className="sf-tab">
            <div className={`${IsActive(title, active) ? "sf-bold sf-active" : ""}`}>{title}</div>
        </div>
    )
}

export default Tab