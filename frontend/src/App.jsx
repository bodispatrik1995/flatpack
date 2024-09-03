import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderIn from "./Components/HeaderIn.jsx";
import HeaderOut from "./Components/HeaderOut.jsx";

function App() {
    const [user, setUser] = useState(localStorage.getItem('userToken'))
    window.addEventListener("storage", () => {
        // When local storage changes, dump the list to
        // the console.
        setUser(localStorage.getItem('userToken'))
        console.log(window.localStorage.getItem("sampleList"));
    });
    // console.log(JSON.parse(window.localStorage.getItem("userToken")));
    // useEffect(() => {
    //     window.addEventListener('storage', () => {
    //         setUser(localStorage.getItem('userToken'))
    //     })
    // }, []);
    // localStorage.setItem('userToken', 'haha')
    // localStorage.clear()
    return (
        <BrowserRouter>
            {/*{localStorage.getItem('userToken') ? <HeaderIn/> : <HeaderOut/>}*/}
            {user ? <HeaderIn/> : <HeaderOut/>}
            <Routes>
                <Route path={'/'} element={<MainPage/>} />
                <Route path={'/login'} element={<LogInForm/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default App
