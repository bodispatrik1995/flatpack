import React from 'react';
import {CardDefault} from "./CardDefault.jsx";

function PropertyList(props) {

    if (!props.properties) {
        return (
            <div className={'nothing'}>
                <h2>There is nothing with your parameters</h2>
            </div>
        )
    }

    return (
        <div className={'grid grid-cols-3 justify-evenly gap-10 '}>
            {props.properties.map((item) => (
                <CardDefault price={item.price} address={item.city + " " + item.street + " " + item.house_number}
                             rooms={item.rooms} size={item.size} id={item.id} key={item.id}></CardDefault>
            ))}
        </div>
    );

}

export default PropertyList;