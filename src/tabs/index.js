import '../index.css'
import './index.css'
import Tab from './tab'

const Tabs = ({props, active}) => {
    return (
        <div className="sf-tabs row">
            {props.map((prop) => (
                <Tab prop={prop} activeTab={active} />
            ))}
        </div>
    )
}

export default Tabs