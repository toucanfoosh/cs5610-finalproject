import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Routes, Route } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import HomeComponent from "./home";
import NavBar from "./nav-bar";
import SideBar from "./side-bar";

const store = configureStore(
    {
        reducer: {}
    }
)

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="row mt-2">
                    <div className="col-2 col-md-2 col-lg-1 col-xl-3">
                        <Routes>
                            <Route path="/" element={<NavBar active="home"/>} />
                        </Routes>
                    </div>
                    <div className="col-10 col-md-10 col-lg-7 col-xl-6">
                        <Routes>
                            <Route index element={<HomeComponent/>} />
                            <Route path="/home" element={<HomeComponent/>} />
                        </Routes>
                    </div>
                    <div className="d-none d-lg-block col-lg-4 col-xl-3">
                        <SideBar />
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
