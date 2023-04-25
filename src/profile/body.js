import { Routes, Route } from "react-router";
import Tabs from "../tabs";
import { Followers, Following, Likes, Posts, Reviews } from "./util";

export const Body = ({ profileItems, currentUser, loading, posts, reviews, followers, following }) => {
    return (
        <div className="sf-secondary">
            <div>
                <Routes>
                    <Route index element={<Tabs props={profileItems} active="Posts" />} />
                    <Route path="/reviews" element={<Tabs props={profileItems} active="Reviews" />} />
                    <Route path="/likes" element={<Tabs props={profileItems} active="Likes" />} />
                </Routes>
            </div>
            <div>
                <Routes>
                    <Route index element={<Posts currentUser={currentUser} loading={loading} posts={posts} />} />
                    <Route path="/reviews" element={<Reviews currentUser={currentUser} reviews={reviews} />} />
                    <Route path="/likes" element={<Likes currentUser={currentUser} loading={loading} />} />
                </Routes>
            </div>
        </div>
    )
}
