import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Header(props) {
    const [user] = useState(props.user)
    const navigate = useNavigate()
    function handleLogOut (){
        localStorage.clear()
        navigate('/');
        window.location.reload();
    }

    if (user){
        return (
            <div>
                <h3>{props.username}</h3>
                <Link to={'/'}>
                <button className={"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}>
                    Home
                </button></Link>

                <button className={"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"} onClick={handleLogOut}>Log Out!</button>
                <Link to={`/upload`}>
                    <button
                        className={"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}>
                        Upload
                    </button>
                </Link>
                <Link to={'/favorites'}>
                    <button
                        className={"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}>
                        My favorites
                    </button>
                </Link>
                <Link to={'/myproperties'}>
                    <button
                        className={"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}>
                        My properties
                    </button>
                </Link>

            </div>
        );
    }
    return (
        <div>
            <Link to={'/'}>
                <button
                    className={"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}>
                    Home
                </button>
            </Link>
            <Link to={`/login`}>
                <button
                    className={"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}>
                    Login
                </button>
            </Link>
            <Link to={`/register`}>
                <button
                    className={"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}>
                    Sign in
                </button>
            </Link>

        </div>
    );

}

export default Header;