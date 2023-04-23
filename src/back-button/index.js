import { Link } from "react-router-dom";
import './index.css';

const BackButton = () => {
    return (
        <div>
            <Link to="/lists"><i class="fa-solid fa-arrow-left sf-arrow-size position-absolute p-3 sf-z-3"></i></Link>
        </div>
    )
}
export default BackButton;