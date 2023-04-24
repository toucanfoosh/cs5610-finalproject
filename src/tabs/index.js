import '../index.css'
import './index.css'
import Tab from './tab'

const Tabs = (props, activeTab) => {
    return (
        <div className="sf-tabs">
            {props.map((prop) => (
                <Tab title={prop.title} active={activeTab} />
            ))}
        </div>
    )
}

export default Tabs