import { Link } from "react-router-dom";
import PostItem from "../home/post-item";
import LoadingIcon from "../loading-icon";
import './index.css'
import '../index.css'

export const Followers = ({ currentUser, followers }) => {
    return (
        <div>
            <h3>Followers {currentUser.followers.length}</h3>
            {
                followers &&
                followers.map(follower =>
                    <Link className="sf-underline-hover" to={`/profile/other/${follower._id}`}>
                        {follower.username}
                    </Link>)
            }
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
    // const fetchAlbums = async () => {
    //     if (currentUser) {
    //         const response = await getAccessToken();
    //         console.log(response);
    //     }
    // }
    return (
        <div>
        </div>
    )
}

export const Reviews = ({ currentUser, reviews }) => {
    return (
        <div>
            <div className="sf-tertiary ps-1 pt-1">{currentUser.reviews} results</div>
            {
                reviews &&
                <ul className="list-group">
                    {reviews.map(item =>
                        <li className="list-group-item">
                            {item.score} <br />
                            <Link to={`/search/album/${item.albumId}`} className="sf-underline-hover sf-anim-3 float-end">{item.albumName} by {item.albumMainArtist}</Link>
                            {item.review}
                        </li>)
                    }
                </ul>
            }
        </div>
    )
}
