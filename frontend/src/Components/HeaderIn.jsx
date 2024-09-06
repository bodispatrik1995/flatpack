import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function HeaderIn(props) {
    const [user, setUser] = useState(localStorage.getItem('userToken'))
    const navigate = useNavigate()
    function handleLogOut (){
        localStorage.clear()
        navigate('/');
        window.location.reload();
    }
    return (
        <div>
            {/*<button>{localStorage.getItem('userToken')} </button>*/}
            <button className={"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}><Link to={'/'}>Home</Link></button>
            <button className={"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"} onClick={handleLogOut}>Log Out!</button>
            <button className={"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}><Link to={'/upload'}>Upload</Link></button>
        </div>
    );
}

export default HeaderIn;