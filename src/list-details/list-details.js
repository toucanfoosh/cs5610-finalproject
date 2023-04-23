import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { findListByIdThunk, updateListThunk } from "../services/lists-thunk";
import FancyButton from "../FancyButton/button";
import BackButton from "../back-button";

const ListDetails = () => {
    const dispatch = useDispatch();
    const [list, setList] = useState(undefined);
    const [ogList, setOgList] = useState(undefined);
    const [editing, setEditing] = useState(false);
    const { lid } = useParams();

    const fetchList = async () => {
        const response = await dispatch(findListByIdThunk(lid));
        setList(response.payload);
        setOgList(response.payload);
        return response.payload;
    }

    const toggleEditing = () => {
        setEditing(!editing);
    }

    const handleEditAndSave = async () => {
        setEditing(!editing);
        const response = await dispatch(updateListThunk(list));
        setOgList(response.payload);
    }

    const cancelEdit = async () => {
        setEditing(!editing);
        setList(ogList);
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div>
            <BackButton path="/lists" />
            <div className="row">
                <h1>Folio</h1>
                {
                    list &&
                    <div>
                        <div>
                            {!editing && <h2>{list.name}</h2>}
                            {editing && <label for="name">Name</label>}
                            {editing && <input onChange={(e) => setList({ ...list, name: e.target.value })} className="form-control" value={list.name} id="name" />}

                            {!editing && <div>{list.description}</div>}
                            {editing && <label for="description">Description</label>}
                            {editing && <input onChange={(e) => setList({ ...list, description: e.target.value })} className="form-control" value={list.description} id="description" />}

                            {
                                !editing &&
                                <div>
                                    <h2>Albums</h2>
                                    <ul className="list-group">
                                        {
                                            list.albums.length > 0 &&
                                            list.albums.map(album =>
                                                <Link className="list-group-item" to={`/search/album/${album.albumId}`}>
                                                    <img src={album.albumImage} />
                                                    <h1 className="">{album.albumName}</h1>
                                                    <div className="">{album.albumMainArtist}</div>
                                                </Link>
                                            )
                                        }
                                    </ul>
                                </div>
                            }
                        </div>
                        {!editing && <FancyButton onclick={toggleEditing} text="Edit" />}
                        {editing && <FancyButton onclick={handleEditAndSave} text="Save" />}
                        {editing && <FancyButton onclick={cancelEdit} text="Cancel" color="sf-bg-liked" />}
                    </div>
                }
            </div>
        </div >
    )
}

export default ListDetails;