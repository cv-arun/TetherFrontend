import React from 'react'
import { Routes, Route, } from "react-router-dom";

import Home from '../pages/home';
import Feed from '../pages/feedPage';
import Mycommunity from '../pages/myCommunity';
import Notification from '../pages/notification';
import Profile from '../pages/profile';
import Settings from '../pages/settings';
import Chat from '../pages/chat';

import io from "socket.io-client";
import { socketReducer } from '../redux/socketSlice';
import { useDispatch } from 'react-redux';





function ProtectedRoutes() {
    const dispatch = useDispatch();
    const socket = io.connect("http://44.236.61.154/");
    dispatch(socketReducer(socket))

    return (
        <>
            <Routes>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/" element={<Feed />} />
                <Route exact path="/chat" element={<Chat />} />
                <Route exact path="/community" element={<Mycommunity />} />
                <Route exact path="/notification" element={<Notification />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/settings" element={<Settings />} />
            </Routes>
        </>
    )
}

export default ProtectedRoutes