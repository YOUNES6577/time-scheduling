import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Timeline from './component/TimeLine'
import Home from './component/Home'
import Dailywork from './component/DailyWork'
import History from './component/History'
import Login from './component/Login'
import {isAuthenticated} from './component/Login'
import useToken from './useToken';
import { Navigate } from "react-router-dom";


export default function App() {
    // localStorage.clear()
    const { token, setToken } = useToken();
    const authentication = isAuthenticated()
    return <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={!(authentication?.state )? <Login setToken={setToken} /> : <Navigate to='/' />} />
        <Route exact path="/timeline" element={!(authentication?.state )? <Login setToken={setToken} /> : <Timeline />} />
        <Route exact path="/dailyWork" element={!(authentication?.state )? <Login setToken={setToken} /> : <Dailywork />} />
        <Route exact path="/history" element={!(authentication?.state )? <Login setToken={setToken} /> : <History />} />
    </Routes>
}   