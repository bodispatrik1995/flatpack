import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter} from "react-router-dom";
import HeaderIn from "./Components/HeaderIn.jsx";
import HeaderOut from "./Components/HeaderOut.jsx";

function App() {
    localStorage.setItem('userToken', 'haha')
    // localStorage.clear()
    return (
        <BrowserRouter>
            {localStorage.getItem('userToken') ? <HeaderIn/> : <HeaderOut/>}
        </BrowserRouter>
    )
}
export default App
