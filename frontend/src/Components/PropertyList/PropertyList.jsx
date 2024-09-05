import React from 'react';
import PropertyBox from "./PropertyBox.jsx";

function PropertyList(props) {

    if (props.properties.length === 0){
        return (
            <div className={'nothing'}>
                <h2>There is nothing with your parameters</h2>
            </div>
        )
    } else {

        return (
            <div className={'flex flex-wrap '}>
                {props.properties.map((item) => (
                    <PropertyBox key={item.id} price={item.price} id={item.id}
                                 address={item.city + " " + item.street + " " + item.house_number} rooms={item.rooms}
                                 size={item.size}/>
                ))}
            </div>
        );
    }
}

export default PropertyList;