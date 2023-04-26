import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { findListByIdThunk, updateListThunk } from "../services/lists-thunk";
import FancyButton from "../FancyButton/button";
import BackButton from "../back-button";
import './index.css'
import '../index.css'

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
            <div className="ps-3 pb-1">
                <BackButton path="/lists" />
            </div>
            <div className="row">
                {
                    list &&
                    <div>
                        <div className="p-3 pt-5">
                            <div className="row px-3">
                                <div className="col">
                                    {!editing && <h2 className="sf-secondary">{list.name}</h2>}
                                    {editing &&
                                        <div className="d-flex flex-column">
                                            <div className="">
                                                <label for="name" className="sf-secondary py-3">Name</label>
                                            </div>
                                            <div className="">
                                                <input onChange={(e) => setList({ ...list, name: e.target.value })} className="sf-form-control sf-folio-text-box" value={list.name} id="name" />
                                            </div>
                                        </div>
                                    }

                                    {!editing && <div className="sf-tertiary">{list.description}</div>}
                                    {editing &&
                                        <div className="d-flex flex-column">
                                            <div>
                                                <label for="description" className="sf-secondary py-3">Description</label>
                                            </div>
                                            <div>
                                                <input onChange={(e) => setList({ ...list, description: e.target.value })} className="sf-form-control sf-folio-text-box" value={list.description} id="description" />
                                            </div>
                                        </div>
                                    }
                                </div>
                                {!editing &&
                                    <div className="col-3">
                                        <FancyButton onclick={toggleEditing} text="Edit" />
                                    </div>
                                }
                                {editing &&
                                    <div className="row pt-5">

                                        <div className="row">
                                            <div className="col d-flex flex-column align-items-end">
                                                <div className="sf-folio-button">
                                                    <FancyButton onclick={handleEditAndSave} text="Save" />
                                                </div>
                                            </div>
                                            <div className="col d-flex flex-column align-items-start">
                                                <div className="sf-folio-button">
                                                    <FancyButton onclick={cancelEdit} text="Cancel" color="sf-bg-liked" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            {
                                !editing &&
                                <div className="sf-foilio-bundle-container p-3">
                                    <div className="sf-folio-bundle row">
                                        {
                                            list.albums.length > 0 &&
                                            list.albums.map(album =>
                                                <Link className="sf-folio-item col-4 pb-4" to={`/search/album/${album.albumId}`}>
                                                    <img src={album.albumImage} className="sf-folio-item-img img-fluid" />
                                                    <div className="sf-secondary fw-bold">{album.albumName}</div>
                                                    <div className="sf-accent">{album.albumMainArtist}</div>
                                                </Link>
                                            )
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default ListDetails;