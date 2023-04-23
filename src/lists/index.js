import { useDispatch, useSelector } from "react-redux";
import FancyButton from "../FancyButton/button";
import { useEffect, useState } from "react";
import { createListThunk, deleteListThunk, findListsByUserThunk } from "../services/lists-thunk";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Lists = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [lists, setLists] = useState([]);

    const createNewList = async () => {
        if (currentUser) {
            const newList = {
                userId: currentUser._id,
                albums: [],
                name: "Untitled Folio",
                description: ""
            }

            const response = await dispatch(createListThunk(newList));
            console.log(response.payload);

            const resList = response.payload;

            navigate(`/lists/${resList._id}`);
        }

    }

    const fetchListsByUser = async () => {
        if (currentUser) {
            console.log(currentUser);
            const response = await dispatch(findListsByUserThunk(currentUser._id));
            console.log(response.payload);
            setLists(response.payload);
        }

    }

    const handleDelete = async (id) => {
        const response = await dispatch(deleteListThunk(id));

        const result = await fetchListsByUser();
    }

    useEffect(() => {
        fetchListsByUser();
    }, [currentUser])
    return (
        <div>
            <h1>Your Folios</h1>
            {
                !currentUser &&
                <div>
                    Log in to view Folios
                </div>
            }
            {
                currentUser &&
                <div>
                    {
                        lists.length > 0 &&
                        <ul className="list-group">
                            {lists.map(list =>
                                <li className="list-group-item">
                                    <Link to={`/lists/${list._id}`} className="sf-underline-hover">{list.name}</Link>
                                    <div className="sf-tertiary">{list.description}</div>
                                    <i onClick={() => handleDelete(list._id)} className="float-end fa-solid fa-x sf-small-hover"></i>
                                </li>
                            )}
                        </ul>
                    }
                    {
                        lists.length === 0 &&
                        <div>
                            No folios found.
                        </div>
                    }
                    <FancyButton onclick={createNewList} text="+" />
                </div>
            }
        </div >
    )
}

export default Lists;