import React from 'react';
import PropertyBox from "./PropertyBox.jsx";

function PropertyList(props) {


    return (
        <div>
            {props.properties.map((item) => (
                <PropertyBox price={item.price} address={item.city + " " + item.street + " " + item.house_number} rooms={item.rooms} size={item.size}/>
            ))}
        </div>
    );
}

export default PropertyList;