import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

function Header(props) {
    const [user] = useState(props.user)
    const navigate = useNavigate()

    function handleLogOut() {
        localStorage.clear()
        navigate('/');
        window.location.reload();
    }

    if (user) {
        return (
            <div>
                <h1>
                   Wellcome {props.username}
                </h1>
                <Link to={'/'}>
                    <button
                        className="button">
                        Home
                    </button>
                </Link>

                <button
                    className="button"
                    onClick={handleLogOut}>Log Out!
                </button>
                <Link to={`/upload`}>
                    <button
                        className="button">
                        Upload
                    </button>
                </Link>
                <Link to={'/favorites'}>
                    <button
                        className="button">
                        My Favorites
                    </button>
                </Link>
                <Link to={'/myproperties'}>
                    <button
                        className="button">
                        My Properties
                    </button>
                </Link>

            </div>
        );
    }
    return (
        <div>
            <Link to={'/'}>
                <button
                    className="button">
                    Home
                </button>
            </Link>
            <Link to={`/login`}>
                <button
                    className="button">
                    Login
                </button>
            </Link>
            <Link to={`/register`}>
                <button
                    className="button">
                    Sign In
                </button>
            </Link>

        </div>
    );

}

export default Header;