import React from 'react';
import PropertyBox from "./PropertyBox.jsx";
import {CardDefault} from "./CardDefault.jsx";

function PropertyList(props) {

    if (props.properties.length === 0){
        return (
            <div className={'nothing'}>
                <h2>There is nothing with your parameters</h2>
            </div>
        )
    } else {

        return (
            <div className={'grid grid-cols-3 justify-evenly gap-10 '}>
                {props.properties.map((item) => (
                    <CardDefault price={item.price} address={item.city + " " + item.street + " " + item.house_number} rooms={item.rooms} size={item.size} id={item.id} ></CardDefault>
                    // <PropertyBox key={item.id} price={item.price} id={item.id}
                    //              address={item.city + " " + item.street + " " + item.house_number} rooms={item.rooms}
                    //              size={item.size}/>
                ))}
            </div>
        );
    }
}

export default PropertyList;