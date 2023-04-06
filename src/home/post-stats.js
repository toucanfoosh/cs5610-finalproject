import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";

function isLiked(liked) {
    return (liked ? 'fa-solid color-red' : 'fa-regular');
}

function changeLikedValue(stats) {
    return stats.liked ? stats.likes - 1 : stats.likes + 1;
}

const PostStats = ({ stats }) => {
    const dispatch = useDispatch();
    return (
        <div>
            <div className="mt-4 row">
                <div className="col-3">
                    <Link className="text-secondary sf-no-link-decor" to="#">
                        <i className="fa-regular fa-comment"></i>
                        <span className="ms-sm-1 ms-md-3">{stats.replies}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link className="text-secondary sf-no-link-decor" to="#">
                        <i className="fas fa-retweet"></i>
                        <span className="ms-sm-1 ms-md-3">{stats.retuits}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link className="text-secondary sf-no-link-decor" to="#" >
                        <i className={`fa-heart ${isLiked(stats.liked)}`}></i>
                        <span className="ms-sm-1 ms-md-3">{stats.likes}</span>
                    </Link>
                </div>
                <div className="col-3">
                    <Link className="text-secondary sf-no-link-decor" to="#">
                        <i className="fa fa-arrow-up-from-bracket"></i>
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default PostStats;