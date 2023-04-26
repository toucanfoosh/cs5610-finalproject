import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { findUserById } from "../services/user-service";
import BackButton from "../back-button";
import '../index.css'
import '../followers/index.css'

const Following = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useSelector(state => state.user);
    const { uid } = useParams();
    const [following, setFollowing] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    const fetchUser = async () => {
        const newUser = await findUserById(uid);
        console.log(newUser);
        setUser(newUser);
        getUsernamesFromFollowing(newUser).then(result => {
            setFollowing(result)
        });
        return newUser;
    }

    const fetchUserById = async (id) => {
        const response = await findUserById(id);
        return response;
    }

    const getUsernamesFromFollowing = async (user) => {
        return await Promise.all(user.following.map((id) => fetchUserById(id)));
    }

    useEffect(() => {
        if (currentUser && (currentUser._id === uid || uid === undefined)) {
            setIsCurrentUser(true)
            if (location.pathname !== `/profile/following`) {
                console.log("navigating");
                navigate(`/profile/following`);
            }
            getUsernamesFromFollowing(currentUser).then(result => {
                setFollowing(result)
            });
        } else if (uid) {
            const newUser = fetchUser();
        }
    }, [currentUser]);

    return (

        <div>
            {!isCurrentUser && <BackButton path={`/profile/other/${uid}`} />}
            {isCurrentUser && <BackButton path={`/profile`} />}
            {isCurrentUser &&
                <h2 className="sf-secondary p-3 pb-0 pt-5">Following {currentUser.following.length}</h2>
            }
            {
                !isCurrentUser && user &&
                <h2 className="sf-secondary p-3 pb-0 pt-5">Following {user.following.length} </h2>
            }
            {
                following &&
                <ul className="d-flex flex-column p-3">
                    {following.map(follow =>
                        <Link className="pb-1" to={`/profile/other/${follow._id}`}>
                            <div className="sf-secondary sf-underline-hover">
                                {follow.username}
                            </div>
                        </Link>)}
                </ul>
            }

        </div>
    )
}

export default Following;