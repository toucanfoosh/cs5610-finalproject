import { useDispatch, useSelector } from "react-redux";
import FancyButton from "../FancyButton/button";
import { useEffect } from "react";

const Lists = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    const createNewList = async () => {
        const newList = {

        }
    }

    const fetchListsByUser = async () => {

    }

    useEffect(() => {

    }, [])
    return (
        <div>
            <h1>Folios</h1>
            {
                !currentUser &&
                <div>
                    Log in to view Folios
                </div>
            }
            {
                currentUser &&
                <div>
                    <FancyButton onclick={createNewList} text="+" />
                </div>
            }
        </div>
    )
}

export default Lists;