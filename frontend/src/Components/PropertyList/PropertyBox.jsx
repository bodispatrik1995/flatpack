import React from 'react';

function PropertyBox(props) {
    return (
        <div className={'propertyBox'}>
            <h4>Ez a kep</h4>
            <h3>Price: ${props.price}</h3>
            <h3>Address: ${props.address}</h3>
            <h3>Rooms: ${props.rooms}</h3>
            <h3>Size: ${props.size}</h3>
        </div>
    );
}

export default PropertyBox;