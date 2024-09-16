import React, {useEffect, useState} from 'react';
import Loading from "../Loading.jsx";

function PropertyCard(props) {
    const [property, setProperty] = useState(null);
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/property/${props.id}`);
                const foundData = await response.json();
                // foundData.unshift('Choose a type')
                console.log(foundData)
                setProperty(foundData.property);
            } catch (error) {
                console.error('Error fetching property types:', error);
            }
        };

        fetchProperty();
    }, []);
    if (!property){
        return <Loading/>
    } else {
        return (
            <div
                className={'my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"'}>

                <h3 className="text-3xl  leading-tight">
                    Title:
                    <small className="text-surface/75 dark:text-white/75"
                    >{property.title}</small
                    >
                </h3>
                <h3 className="text-3xl font-medium leading-tight">
                    Size:
                    <small className="text-surface/75 dark:text-white/75"
                    >{property.size}</small
                    >
                </h3>
            </div>
        );
    }
}

export default PropertyCard;