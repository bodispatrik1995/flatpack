import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderIn from "./Components/HeaderIn.jsx";
import HeaderOut from "./Components/HeaderOut.jsx";
import MainPage from "./Components/MainPage.jsx";
import LogInForm from "./Components/LogInForm.jsx";

function App() {
    // localStorage.setItem('userToken', 'haha')
    // localStorage.clear()
    return (
        <BrowserRouter>
            {localStorage.getItem('userToken') ? <HeaderIn/> : <HeaderOut/>}
            <Routes>
                <Route path={'/'} element={<MainPage/>} />
                <Route path={'/login'} element={<LogInForm/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default App
