import {useEffect, useState} from 'react'
import './Components/Css/App.css'
import './Components/Css/SystemStyles.css'
import './Components/Css/gallery.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./Components/Header.jsx";
import MainPage from "./Components/MainPage.jsx";
import LogInForm from "./Components/LogInForm.jsx";
import RegisterForm from "./Components/RegisterForm.jsx";
import UploadFrom from "./Components/Property/UploadFrom.jsx";
import {Footer} from "./Components/Footer.jsx";
import PropertyCard from "./Components/Property/PropertyCard.jsx";
import UploadImages from "./Components/Property/UploadImages.jsx";
import MyFavorites from "./Components/Favorites/MyFavorites.jsx";
import Inbox from "./Components/Messages/Inbox.jsx";

function App() {
    const [user, setUser] = useState(localStorage.getItem('userToken'))
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [propertyId, setPropertyId] = useState(localStorage.getItem('propertyId'));
    window.addEventListener("storage", () => {
        // When local storage changes, dump the list to
        // the console.
        setUser(localStorage.getItem('userToken'))
        setPropertyId(localStorage.getItem('propertyId'))
        setUsername(localStorage.getItem('username'))
        console.log(window.localStorage.getItem("sampleList"));
    });
    return (
        <BrowserRouter>
            <Header user={user} username={username}></Header>
            <Routes>
                <Route path={'/'} element={<MainPage/>} />
                <Route path={'/login'} element={<LogInForm/>}/>
                <Route path={'/upload'} element={<UploadFrom/>}/>
                <Route path={'/upload/images/:id'} element={<UploadImages/>}/>
                <Route path={'/register'} element={<RegisterForm/>}/>
                <Route path={'/property/:id'} element={<PropertyCard/>}/>
                <Route path={'/favorites'} element={<MyFavorites/>}/>'
                <Route path={'/inbox'} element={<Inbox/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}
export default App
