import React from 'react';
import HeaderIn from "./HeaderIn.jsx";
import HeaderOut from "./HeaderOut.jsx";
import Searchbar from "./Searchbar.jsx";

function MainPage(props) {
    return (
        <div>
            {/*{localStorage.getItem('userToken') ? <HeaderIn/> : <HeaderOut/>}*/}
            <div>
                <Searchbar/>
            </div>
        </div>
    );
}

export default MainPage;