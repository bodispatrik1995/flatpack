import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function LogInForm(props) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate()

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        const userData = {
            name: username,
            password: password,
        };
            localStorage.setItem('userToken', 'userData')
        window.location.reload()
        navigate('/')
        // props.onSubmit(userData);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" onChange={handleUsernameChange} />
            </label>
            <label>
                Password:
                <input type="password" onChange={handlePasswordChange} />
            </label>
            <button  type="submit">
                Sign In
            </button>
        </form>
    );
}

export default LogInForm;