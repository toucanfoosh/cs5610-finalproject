import { BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import HomeComponent from "./home";
import NavBar from "./nav-bar/nav";
import MobileNavBar from "./nav-bar/mobile";
import SideBar from "./side-bar";
import EmptyCol from './empty-col';
import postReducer from "./reducers/posts/post-reducer";
import Profile from "./profile";
import LoadProfile from "./load-profile";
import userReducer from "./reducers/user/user-reducer";
import Login from "./login";
import RegisterScreen from "./register";
import SearchScreen from "./search";
import AlbumDetails from "./search/album-details";
import EditProfileScreen from "./edit-profile";
import reviewReducer from "./reducers/reviews/review-reducer";
import themeReducer from "./reducers/theme/theme-reducer";
import OtherProfile from "./other-profile";
import Post from "./post";
import commentReducer from "./reducers/comments/comment-reducer";

const store = configureStore(
    {
        reducer: {
            postsData: postReducer,
            user: userReducer,
            reviews: reviewReducer,
            comments: commentReducer,
            theme: themeReducer
        }
    }
)

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LoadProfile>
                    <div className="col sf-bg-primary">
                        <div className="d-block d-sm-none">
                            <div className="col-12">
                                <Routes>
                                    <Route index element={<HomeComponent />} />
                                    <Route path="/home" element={<HomeComponent />} />
                                    <Route path="/search" element={<SearchScreen />} />
                                    <Route path="/search/:searchTerm" element={<SearchScreen />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/profile/:uid" element={<OtherProfile />} />
                                    <Route path="/edit-profile" element={<EditProfileScreen />} />
                                    <Route path="/search/album/:id" element={<AlbumDetails />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<RegisterScreen />} />
                                    <Route path="/:username/:pid" element={<Post />} />
                                </Routes>
                            </div>
                            <div className="d-block d-sm-none fixed-bottom sf-no-highlight">
                                <Routes>
                                    <Route path="/" element={<MobileNavBar active="Home" />} />
                                    <Route path="/home" element={<MobileNavBar active="Home" />} />
                                    <Route path="/profile" element={<MobileNavBar active="Profile" />} />
                                    <Route path="/profile/:uid" element={<MobileNavBar active="Profile" />} />
                                    <Route path="/login" element={<MobileNavBar active="Profile" />} />
                                    <Route path="/register" element={<MobileNavBar active="Profile" />} />
                                    <Route path="/search" element={<MobileNavBar active="Search" />} />
                                    <Route path="/search/:searchTerm" element={<MobileNavBar active="Search" />} />
                                    <Route path="/edit-profile" element={<MobileNavBar active="Profile" />} />
                                    <Route path="/search/album/:id" element={<MobileNavBar active="Search" />} />
                                    <Route path="/:username/:pid" element={<MobileNavBar active="Home" />} />
                                </Routes>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-none d-sm-block col-sm-1 col-xl-3 px-2 sf-side sticky-top sf-right-border sf-no-highlight">
                                <Routes>
                                    <Route path="/" element={<NavBar active="Home" />} />
                                    <Route path="/home" element={<NavBar active="Home" />} />
                                    <Route path="/profile" element={<NavBar active="Profile" />} />
                                    <Route path="/profile/:uid" element={<NavBar active="Profile" />} />
                                    <Route path="/login" element={<NavBar active="Profile" />} />
                                    <Route path="/register" element={<NavBar active="Profile" />} />
                                    <Route path="/search" element={<NavBar active="Search" />} />
                                    <Route path="/search/:searchTerm" element={<NavBar active="Search" />} />
                                    <Route path="/edit-profile" element={<NavBar active="Profile" />} />
                                    <Route path="/search/album/:id" element={<NavBar active="Search" />} />
                                    <Route path="/:username/:pid" element={<NavBar active="Home" />} />

                                </Routes>
                            </div>
                            <div className="ms-md-0 d-none d-sm-block col-sm-10 col-lg-7 col-xl-6">
                                <Routes>
                                    <Route index element={<HomeComponent />} />
                                    <Route path="/home" element={<HomeComponent />} />
                                    <Route path="/search" element={<SearchScreen />} />
                                    <Route path="/search/:searchTerm" element={<SearchScreen />} />
                                    <Route path="/edit-profile" element={<EditProfileScreen />} />
                                    <Route path="/search/album/:id" element={<AlbumDetails />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/profile/:uid" element={<OtherProfile />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<RegisterScreen />} />
                                    <Route path="/:username/:pid" element={<Post />} />
                                </Routes>
                            </div>
                            <div className="d-none d-lg-block col-lg-4 col-xl-3 sf-side sticky-top sf-left-border">

                                <Routes>
                                    <Route path="/search" element={
                                        <EmptyCol />
                                    } />
                                    <Route path="/search/:searchTerm" element={
                                        <EmptyCol />
                                    } />
                                    <Route path='*' element={
                                        <SideBar />
                                    } />
                                </Routes>
                            </div>
                            <div className="d-none d-sm-block d-lg-none col sf-side sticky-top sf-left-border">
                                <EmptyCol />
                            </div>
                        </div>
                    </div>
                </LoadProfile>
            </BrowserRouter>
        </Provider >
    );
}

export default App;
