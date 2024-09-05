import React, {useEffect, useState} from 'react';
import HeaderIn from "./HeaderIn.jsx";
import HeaderOut from "./HeaderOut.jsx";
import Searchbar from "./Searchbar/Searchbar.jsx";
import PropertyList from "./PropertyList/PropertyList.jsx";
import {useSearchParams} from "react-router-dom";

function MainPage(props) {
    const [properties, setProperties] = useState([]);
    console.log(properties)
    return (
        <div>
            {/*{localStorage.getItem('userToken') ? <HeaderIn/> : <HeaderOut/>}*/}
            <div>
                <Searchbar properties={properties} changeProperties={(e) => setProperties(e)}/>
                <PropertyList properties={properties}/>
            </div>
        </div>
    );
}

export default MainPage;