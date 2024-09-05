import React, {useState} from 'react';
import {Link} from "react-router-dom";

function HeaderIn(props) {
    const [user, setUser] = useState(localStorage.getItem('userToken'))
    function handleLogOut (){
        localStorage.clear()
    }
    return (
        <div>
            {/*<button>{localStorage.getItem('userToken')} </button>*/}
            <button onClick={handleLogOut}>Log Out!</button>
            <button><Link to={'/upload'}>Upload</Link></button>
        </div>
    );
}

export default HeaderIn;