import React, {useEffect, useState} from 'react';
import PropertyList from "../PropertyList/PropertyList.jsx";
import {useNavigate} from "react-router-dom";

function MyFavorites(props) {
    const [favProperties, setFavProperties] = useState([]);
    const token = localStorage.getItem('userToken');
    let navigate = useNavigate();
    useEffect(() => {
        const fetchProperties = async () => {

            const response = await fetch(`/server/api/user/favorites`, {
                method: 'POST',
                headers : {
                    'Authorization': `Bearer ${token}`,
                    "Content-type" : "application/json",
                    'Accept': 'application/json',
                },
            });
           if(response.status === 401) {
               navigate('/login');
           }
                const foundData = await response.json()
                setFavProperties(foundData)


        }
        fetchProperties()
    }, []);
    return (
        <div>
            <PropertyList properties={favProperties}/>
        </div>
    );
}

export default MyFavorites;