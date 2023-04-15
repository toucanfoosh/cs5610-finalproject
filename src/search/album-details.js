import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAccessToken, getAlbum } from "../services/search-service";
import "../index.css";

const AlbumDetails = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState({});
    useEffect(() => {
        const getToken = async () => {
            if (!localStorage.getItem("token")) {
                const temp = await getAccessToken();
                localStorage.setItem("token", temp);
            }
            return localStorage.getItem("token");
        }

        const getAlbums = async (token) => {
            const params = {
                id,
                token
            }
            const album = await getAlbum(params);
            setAlbum(album);
            console.log(album.data);
        }
        getToken().then(result => getAlbums(result));
    }, []);

    function convertMS(track) {
        const minutes = Math.floor(track.duration_ms / 1000 / 60)
        const seconds = Math.floor((track.duration_ms / 1000) % 60)
        return (
            <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
        )
    }
    return (
        <div>
            {album.data &&
                <div>
                    <div>
                        <h1 className="sf-secondary">{album.data.name}</h1>
                        <div>{album.data.release_date.substring(0, 4)} • {album.data.album_type}</div>
                        <img src={album.data.images[1].url} />
                        <div>
                            {album.data.artists && album.data.artists.map(artist => <span>{artist.name} </span>)}
                        </div>
                    </div>
                    <div className="mt-2">
                        <h2 className="sf-secondary">Tracks</h2>
                        {album.data.tracks.items.map(track => {
                            return (
                                <div>
                                    <span>{track.name}</span>
                                    <div className="float-end">{convertMS(track)}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default AlbumDetails;