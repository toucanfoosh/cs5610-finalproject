import { useDispatch, useSelector } from "react-redux";
import FancyButton from "../FancyButton/button";
import { useEffect, useState } from "react";
import { createListThunk, deleteListThunk, findListsByUserThunk } from "../services/lists-thunk";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import './index.css'
import '../index.css'

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
            <h1 className="pt-4 sf-secondary text-center">Your Folios</h1>
            {
                !currentUser &&
                <div className="sf-secondary p-3">
                    Log in to view Folios
                </div>
            }
            {
                currentUser &&
                <div>
                    <div className="row pb-3 sf-bottom-border">
                        <div className="d-flex justify-content-center">
                            <div className="p-3 sf-folio-preview-button">
                                <FancyButton onclick={createNewList} text="Create New Folio" />
                            </div>
                        </div>
                    </div>
                    {
                        lists.length > 0 &&
                        <div className="">
                            {lists.map(list =>
                                <Link to={`/lists/${list._id}`} className="row">
                                    <div className="sf-folio-preview p-3 d-flex justify-content-between">
                                        <div className="col-11 sf-folio-preview-text">
                                            <div className="sf-secondary fw-bold text-truncate">{list.name}</div>
                                            <div className="sf-tertiary text-truncate">{list.description}</div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <i onClick={() => handleDelete(list._id)} className="fa-solid fa-x sf-small-hover sf-secondary"></i>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    }
                    {
                        lists.length === 0 &&
                        <div className="sf-secondary">
                            No folios found.
                        </div>
                    }
                </div>
            }
            <div className="sf-bottom-post"></div>
        </div >
    )
}

export default Lists;