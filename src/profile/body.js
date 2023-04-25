import { Routes, Route } from "react-router";
import { Followers, Following, Likes, Posts, Reviews, Albums } from "./util";

export const Body = ({ currentUser, loading, posts, reviews, followers, following }) => {
    return (
        <div className="sf-secondary">
            <div>
                <Routes>
                    <Route index element={<Posts currentUser={currentUser} loading={loading} posts={posts} />} />
                    <Route path="/reviews" element={<Reviews currentUser={currentUser} reviews={reviews} />} />
                    <Route path="/likes" element={<Likes currentUser={currentUser} loading={loading} />} />
                    <Route path="/albums" element={<Albums currentUser={currentUser} />} />
                </Routes>
            </div>
        </div>
    )
}
