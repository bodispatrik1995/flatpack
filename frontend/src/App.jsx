import {useEffect, useState} from 'react'
import './Components/Css/App.css'
import './Components/Css/SystemStyles.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderIn from "./Components/HeaderIn.jsx";
import HeaderOut from "./Components/HeaderOut.jsx";
import MainPage from "./Components/MainPage.jsx";
import LogInForm from "./Components/LogInForm.jsx";
import RegisterForm from "./Components/RegisterForm.jsx";

function App() {
    const [user] = useState(localStorage.getItem('userToken'))
    const [username] = useState(localStorage.getItem('username'))
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
            {username}
            <Routes>
                <Route path={'/'} element={<MainPage/>} />
                <Route path={'/login'} element={<LogInForm/>}/>
                <Route path={'/register'} element={<RegisterForm/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default App
