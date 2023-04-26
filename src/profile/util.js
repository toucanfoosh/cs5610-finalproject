import { Link } from "react-router-dom";
import PostItem from "../home/post-item";
import LoadingIcon from "../loading-icon";
import './index.css'
import '../index.css'
import {getAccessToken, getArtistAlbums} from "../services/search-service";
import ReviewItem from "../search/review-item";
import {useState, useEffect} from "react"

export const Followers = ({ currentUser, followers }) => {
    return (
        <div>
        </div>
    )
}

export const Following = ({ currentUser, following }) => {
    return (
        <div>
            <h3>Following {currentUser.following.length}</h3>
            {
                following &&
                following.map(following =>
                    <Link className="sf-underline-hover" to={`/profile/other/${following._id}`}>
                        {following.username}
                    </Link>)
            }
        </div>
    )
}

export const Likes = ({ currentUser, loading }) => {
    return (
        <div>
            <div className="sf-tertiary ps-1 pt-1">{currentUser.likes.length} results</div>
            {
                loading &&
                <LoadingIcon />
            }
            {
                !loading && currentUser &&

                <ul className="mb-2 list-group ps-0">
                    {currentUser.likes.map(like => <PostItem post={like} />)}
                </ul>

            }
        </div>
    )
}

export const Posts = ({ currentUser, loading, posts }) => {
    return (
        <div>
            <div className="sf-tertiary ps-1 pt-1">{currentUser.posts + currentUser.reposts.length} results</div>
            {
                loading &&
                <LoadingIcon />
            }
            {
                !loading &&
                <div className="mb-2 list-group">
                    {posts.map(post => <PostItem post={post._id} />)}
                </div>
            }
        </div>
    )
}



export const Albums = ({ currentUser }) => {
    const [albums, setAlbums] = useState(undefined);

    const fetchAlbums = async () => {
        if (currentUser) {
            const response = await getAccessToken();

            const results = await getArtistAlbums({id: currentUser.artistId, accessToken: response});
            console.log(results);
            setAlbums(results);
        }
    }

    useEffect(() => {
        fetchAlbums();
    }, [])


    return (
        <div>
            {
                albums && 
                albums.data.items.map(result => 
                    <Link className="sf-no-text-decor" to={`/search/album/${result.id}`}>
                    <div className="p-1">
                        <div className="sf-result-container sf-result-hover d-flex align-items-center">
                            <div className="sf-result-body-container d-flex sf-w-100">
                                <div className="col-9 d-flex">
                                    <img src={result.images[0].url} className="sf-result-img p-2" />
                                    <div className="ps-3 sf-flex-col justify-content-center align-items-start text-truncate sf-result-body">
                                        <div className="sf-w-100 sf-secondary sf-text-bold text-truncate">{result.name}</div>
                                        <div className="sf-tertiary text-truncate">{result.artists[0].name}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                )
            }
        </div>
    )
}

export const Reviews = ({ currentUser, reviews }) => {
    return (
        <div>
            <div className="sf-tertiary ps-1 pt-1">{currentUser.reviews} results</div>
            {
                reviews &&
                <div>
                    {reviews.map(review =>
                        <ReviewItem item={review} show={true}/>
                    )}
                </div>
            }
        </div>
    )
}
