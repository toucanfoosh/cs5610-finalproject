import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAccessToken, getAlbum } from "../services/search-service";

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
    return (
        <div>
            {album.data &&
                <div>
                    <div>
                        <h1>{album.data.name}</h1>
                        <div>{album.data.release_date.substring(0, 4)} • {album.data.album_type}</div>
                        <img src={album.data.images[1].url} />
                        <div>
                            {album.data.artists && album.data.artists.map(artist => <span>{artist.name} </span>)}
                        </div>
                    </div>
                    <div className="mt-2">
                        <h2>Tracks</h2>
                        {album.data.tracks.items.map(track =>
                            <div>{track.name}</div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default AlbumDetails;