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
            <button><Link to={'/'}>Home</Link></button>
            <button onClick={handleLogOut}>Log Out!</button>
            <button><Link to={'/upload'}>Upload</Link></button>
        </div>
    );
}

export default HeaderIn;