import { useEffect, useState } from "react";
import { useParams } from "react-router";

const AlbumDetails = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState({});
    useEffect(() => {
        const getAlbum = async () => {

        }
    })
    return (
        <div>
            <h1> Album Details </h1>
        </div>
    )
}

export default AlbumDetails;