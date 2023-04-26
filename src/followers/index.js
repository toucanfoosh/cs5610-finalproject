import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { findUserById } from "../services/user-service";
import BackButton from "../back-button";
import "../index.css"
import "./index.css"

const Followers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useSelector(state => state.user);
    const { uid } = useParams();
    const [followers, setFollowers] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    const fetchUser = async () => {
        const newUser = await findUserById(uid);
        console.log(newUser);
        setUser(newUser);
        getUsernamesFromFollowers(newUser).then(result => {
            setFollowers(result)
        });
        return newUser;
    }

    const fetchUserById = async (id) => {
        const response = await findUserById(id);
        return response;
    }

    const getUsernamesFromFollowers = async (user) => {
        return await Promise.all(user.followers.map((id) => fetchUserById(id)));
    }

    useEffect(() => {
        if (currentUser && (currentUser._id === uid || uid === undefined)) {
            setIsCurrentUser(true)
            if (location.pathname !== `/profile/followers`) {
                console.log("navigating");
                navigate(`/profile/followers`);
            }
            getUsernamesFromFollowers(currentUser).then(result => {
                setFollowers(result)
            });
        } else if (uid) {
            const newUser = fetchUser();
        }
    }, [currentUser]);

    return (

        <div className="">
            {!isCurrentUser && <BackButton path={`/profile/other/${uid}`} />}
            {isCurrentUser && <BackButton path={`/profile`} />}
            {isCurrentUser &&
                <h2 className="sf-secondary p-3 pb-0 pt-5">Followers {currentUser.followers.length}</h2>
            }
            {
                !isCurrentUser && user &&
                <h2 className="sf-secondary p-3 pb-0 pt-5">Followers {user.followers.length} </h2>
            }
            {
                followers &&
                <div className="d-flex flex-column p-3">
                    {followers.map(follower =>
                        <Link className="pb-1" to={`/profile/other/${follower._id}`}>
                            <div className="sf-secondary sf-underline-hover">
                                {follower.username}
                            </div>
                        </Link>)}
                </div>
            }

        </div>
    )
}

export default Followers;