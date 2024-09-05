import React from 'react';

function PropertyBox(props) {
    return (
        <div className={'max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'} key={props.uniqueKey}>
            <img src={'https://irp.cdn-website.com/bf4fe880/dms3rep/multi/estate+vs+a+house+-+Ranger+Ridge.jpeg'} className={'rounded-t-lg'}/>
            <h3>Price: {props.price}</h3>
            <h3>Address: {props.address}</h3>
            <h3>Rooms: {props.rooms}</h3>
            <h3>Size: {props.size}</h3>
        </div>
    );
}

export default PropertyBox;