import React from 'react';
import {Link} from "react-router-dom";

function HeaderOut(props) {
    console.log("ennek kell kijonnie")
    return (
        <div>
            <button><Link to={'/login'}> Log In!</Link></button>
            <button> Sign in!</button>
        </div>
    );
}

export default HeaderOut;