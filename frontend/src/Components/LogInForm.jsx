import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Loading from "./Loading.jsx";

function LogInForm(props) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handleSubmit(e)  {
        e.preventDefault();
        console.log('setting loading to true');
        setLoading(true);
        console.log('loading state is: ' + loading);
            fetch('http://127.0.0.1:8000/api/user/login', {
                method : 'POST',
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    email : email,
                    password : password
                })


            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status){
                        console.log("login was successful! Backend returned token")
                        const token = data['token'];
                        localStorage.setItem('userToken', token);
                        localStorage.setItem('username', data.username);
                        navigate('/');
                        window.location.reload();

                    }
                    else if (!data.status){
                        console.error("Backend couldnt found user. Login was unsuccessful")
                    }
                    else{
                        console.error('Fatal error: ' + data.message);
                        console.log(data);
                    }

                })
                .catch( (e) => {
                    console.error('Error, fetch was unsuccessful! ' + e);
                })
                .finally(() => setLoading(false))
        }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label for={'login-email-input'}>E-mail:</label>
                <input type="text" id={'login-email-input'} name={'login-email-input'} onChange={handleEmailChange}/>
                <br/>
                <label for={'login-password-form'}>Password:</label>
                <input type="password" id={'login-password-form'} name={'login-password-form'} onChange={handlePasswordChange}/>
                <br/>
                <button type="submit">Sign In</button>
            </form>
            {loading ? <Loading/> : ''}
        </div>
    );
}

export default LogInForm;