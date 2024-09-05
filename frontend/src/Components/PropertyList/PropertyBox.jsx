import React, { useEffect, useState } from 'react';

function PropertyBox(props) {
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    const imgUrl = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/image/${props.id}`);
            const data = await response.json();

            if (response.ok && data.success) {
                setImg(`http://localhost:8000/${data.image}`);
            } else {
                setImg('https://kep.cdn.indexvas.hu/1/0/2098/20980/209807/20980782_1335884_a378a0520a6450953bd777efc34d0fe3_wm.jpg')
            }
        } catch (err) {
            setError('Error fetching image');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        imgUrl();
    }, []);

    return (
        <div className={'max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'} key={props.uniqueKey}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <img src={img} alt="Property" className={'rounded-t-lg'} />
            )}
            <h3>Price: {props.price}</h3>
            <h3>Address: {props.address}</h3>
            <h3>Rooms: {props.rooms}</h3>
            <h3>Size: {props.size}</h3>
        </div>
    );
}

export default PropertyBox;
