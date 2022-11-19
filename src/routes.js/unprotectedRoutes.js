import React from 'react'
import { Routes, Route } from "react-router-dom";
import Signup from '../pages/signup';
import Login from '../pages/login'



function UnprotectedRoutes() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </>
    )
}

export default UnprotectedRoutes