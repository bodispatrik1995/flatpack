import React, {useState} from 'react';

function HeaderIn(props) {
    const [user, setUser] = useState(localStorage.getItem('userToken'))
    function handleLogOut (){
        localStorage.clear()
    }
    console.log("ennek kell kijonnie")
    return (
        <div>
            {/*<button>{localStorage.getItem('userToken')} </button>*/}
            <button onClick={handleLogOut}>Log Out!</button>
        </div>
    );
}

export default HeaderIn;