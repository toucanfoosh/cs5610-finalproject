import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Routes, Route } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import HomeComponent from "./home";
import NavBar from "./nav-bar";
import SideBar from "./side-bar";
import EmptyCol from './empty-col';
import postReducer from "./reducers/posts/post-reducer";
import Profile from "./profile";
import LoadProfile from "./load-profile";
import userReducer from "./reducers/user/user-reducer";
import Login from "./login";

const store = configureStore(
    {
        reducer: {
            postsData: postReducer,
            user: userReducer
        }
    }
)

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LoadProfile>
                    <div className="row mt-2">
                        <div className="col-1 col-xl-3 px-2 sf-side sf-right-border">
                            <Routes>
                                <Route path="/" element={<NavBar active="Home" />} />
                                <Route path="/home" element={<NavBar active="Home" />} />
                                <Route path="/profile" element={<NavBar active="Profile" />} />
                                <Route path="/login" element={<NavBar active="Profile" />} />
                            </Routes>
                        </div>
                        <div className=" ms-md-0 col-10 col-lg-7 col-xl-6 sf-overflow">
                            <Routes>
                                <Route index element={<HomeComponent />} />
                                <Route path="/home" element={<HomeComponent />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </div>
                        <div className="d-none d-lg-block col-lg-4 col-xl-3 sf-side sf-left-border">
                            <SideBar />
                        </div>
                        <div className="d-block d-lg-none col sf-side sf-left-border">
                            <EmptyCol />
                        </div>
                    </div>
                </LoadProfile>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
