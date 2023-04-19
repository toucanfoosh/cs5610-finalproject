import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
import '../index.css';

function isLiked(liked) {
    return (liked ? 'fa-solid sf-liked' : 'fa-regular');
}

function changeLikedValue(stats) {
    return stats.liked ? stats.likes - 1 : stats.likes + 1;
}

function copyLink(link) {
    console.log("link" + link)
    navigator.clipboard.writeText(link);
}

const PostStats = ({ stats, postLink }) => {
    const dispatch = useDispatch();
    return (
        <div>
            <div className="mt-4 row">
                <div className="col-3">
                    <Link className="text-secondary sf-no-link-decor" to={`/${postLink}`}>
                        <i className="fa-regular fa-comment sf-anim-3 sf-small-hover"></i>
                        <span className="ms-sm-1 ms-md-3">{stats.comments}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link className="text-secondary sf-no-link-decor" to="#">
                        <i className="fas fa-retweet sf-anim-3 sf-small-hover"></i>
                        <span className="ms-sm-1 ms-md-3">{stats.reposts}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link className="text-secondary sf-no-link-decor" to="#" >
                        <i className={`fa-heart ${isLiked(stats.liked)} pe-1 sf-anim-3 sf-small-hover`}></i>
                        <span className="">{stats.likes}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link className="text-secondary sf-no-link-decor" to="#" onClick={copyLink(`http://localhost:3000${postLink}`)}>
                    {/* http://localhost:3000/faosldkjfhf/643f500154771083e7f76c38 */}
                    {/* http://localhost:3000//toucanfish/6440431208e1affcb9e243a9 */}
                    {/* http://localhost:3000/toucanfish/6440431208e1affcb9e243a9 */}
                        <i className="fa fa-arrow-up-from-bracket sf-anim-3 sf-small-hover"></i>
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default PostStats;