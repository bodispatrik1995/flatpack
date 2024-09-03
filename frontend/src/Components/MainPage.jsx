import React, {useEffect} from 'react';
import HeaderIn from "./HeaderIn.jsx";
import HeaderOut from "./HeaderOut.jsx";
import Searchbar from "./Searchbar/Searchbar.jsx";

function MainPage(props) {
    // useEffect(() => {
    //     fetchProperties(queryParams);
    // }, [queryParams]);
    //
    // const formData = Object.fromEntries(queryParams.entries());
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