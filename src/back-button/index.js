import { Link } from "react-router-dom";
import './index.css';

const BackButton = ({path="/"}) => {
    console.log("path: "+ path)
    return (
        <div className="pb-1">
            <Link to={`${path}`}><i class="fa-solid fa-arrow-left sf-arrow-size position-absolute p-3 sf-z-3 sf-secondary"></i></Link>
        </div>
    )
}
export default BackButton;