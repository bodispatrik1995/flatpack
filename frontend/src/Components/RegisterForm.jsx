import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Loading from "./Loading.jsx";
import SystemMessage from "./SystemMessage.jsx";

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [responseMessages, setResponseMessages] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setResponseMessages(null);
        fetch('http://127.0.0.1:8000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username' : username,
                'email' : email,
                'password' : password,
                'password_confirmation' : passwordAgain
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((info) => {
                if (info.status) {
                    console.log("Registration was successful!");
                    setResponseMessages({
                        type : 'confirm',
                        messages : ['Registration successful!']
                    })
                    navigate('/login');
                } else {

                    console.log("Registration failed:", info);
                    const errors = Object.values(info.errors);
                    setResponseMessages({
                        type : 'error',
                        messages : errors
                    });
                }
            })
            .catch((e) => {
                console.log("ERROR:", e.message);
                setResponseMessages(['There was a fatal error in the system! Try reloading the page, or retry later']);
            })
            .finally(() => {
                setLoading(false);
            });

        console.log('registering....');
    }

    function setInfo(e) {
        const targetField = e.target.name;

        const setters = {
            'username': setUsername,
            'email': setEmail,
            'password': setPassword,
            'password_confirmation': setPasswordAgain,
        };

        if (setters[targetField]) {
            setters[targetField](e.target.value);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="register-username-input">Username</label>
                <input type="text" name={'username'} id={'register-username-input'} required onChange={setInfo}/>
                <br/>
                <label htmlFor="register-email-input">E-mail</label>
                <input type="email" name={'email'} id={'register-email-input'} required onChange={setInfo}/>
                <br/>
                <label htmlFor="register-password-input">Password</label>
                <input type="password" name={'password'} id={'register-password-input'} required onChange={setInfo}/>
                <br/>
                <label htmlFor="register-password-confirm-input">Password again</label>
                <input type="password" name={'password_confirmation'} id={'register-password-confirm-input'} required onChange={setInfo}/>
                <br/>
                <input type="submit" value="Register"/>
            </form>
            {loading ? <Loading/> : ''}
            {responseMessages ?
                responseMessages.messages.map((m) =>
                    <SystemMessage message={m} messageType={responseMessages.type}/>
                )
                :
                ''
            }
        </div>
    );
}
