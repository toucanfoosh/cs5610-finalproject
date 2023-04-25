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
            <h3>Likes {currentUser.likes.length}</h3>
            {
                loading &&
                <LoadingIcon />
            }
            {
                !loading && currentUser &&

                //TODO: add likes
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
            <h3>Posts {currentUser.posts}</h3>
            {
                loading &&
                <LoadingIcon />
            }
            {
                !loading &&
                <ul className="mb-2 list-group ps-0">
                    {posts.map(post => <PostItem post={post._id} />)}
                </ul>
            }
        </div>
    )
}

export const Reviews = ({ currentUser, reviews }) => {
    return (
        <div>
            <h3>Reviews {currentUser.reviews}</h3>
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
