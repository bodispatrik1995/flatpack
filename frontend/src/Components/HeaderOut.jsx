import React from 'react';
import {Link} from "react-router-dom";

function HeaderOut(props) {
    return (
        <div>
            <button><Link to={'/login'}>Log In!</Link></button>
            <button><Link to={'/'}>Home</Link></button>
            <button><Link to={'/register'}>Sign in!</Link></button>
        </div>
    );
}

export default HeaderOut;