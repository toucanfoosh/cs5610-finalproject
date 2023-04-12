import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAccessToken, getAlbum } from "../services/search-service";

const AlbumDetails = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState({});
    // const [accessToken, setAccessToken] = useState("");
    useEffect(() => {
        const getToken = async () => {
            const token = await getAccessToken();
            // setAccessToken(token);
            return token;
        }

        const getAlbums = async () => {
            const token = await getToken();
            console.log(token);
            const params = {
                id,
                token
            }
            const album = await getAlbum(params);
            setAlbum(album);
            console.log(album.data);
        }
        getToken();
        getAlbums();
    }, []);
    return (
        <div>
            {album.data &&
                <div>
                    <h1>{album.data.name}</h1>
                    <img src={album.data.images[1].url} />
                    <div>
                        {album.data.artists && album.data.artists.map(artist => <span>{artist.name} </span>)}
                    </div>
                </div>
            }
        </div>
    )
}

export default AlbumDetails;