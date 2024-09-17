import React, {useEffect, useState} from 'react';
import Loading from "../Loading.jsx";

function PropertyCard(props) {
    const [property, setProperty] = useState(null);
    const [owner, setOwner] = useState(null)
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/property/${props.id}`);
                const foundData = await response.json();
                // foundData.unshift('Choose a type')
                console.log(foundData)
                await setProperty(foundData.property);

                const userResponse = await fetch(`http://127.0.0.1:8000/api/owner/${foundData.property['user_id']}`);
                const user = await userResponse.json();

                user.user !== null ? setOwner(user.user) : setOwner("N/A");
                await console.log(owner);
                await console.log(foundData.property['user_id']);
            } catch (error) {
                console.error('Error fetching property types:', error);
            }
        };

        fetchProperty();
    }, []);
    if (!property || !owner) {
        return <Loading/>
    } else {
        return (

            /*<div className={"grid gap-4 grid-cols-3 grid-rows-4"}>
                <div className={"apply-square-background row-span-3 col-span-2"}></div>
                <div className={"apply-square-background row-span-2"}></div>
                <div className={"apply-square-background"}></div>


                <div className={"apply-square-background col-span-2"}></div>
                <div className={"apply-square-background col-span-1"}></div>
            </div>*/

            <div className={"property-card"}>
                <div className={"grid gap-4 grid-cols-3 grid-rows-3 Property-headline"}>
                    <div className={"row-span-3 col-span-2 property-images apply-square-background"}>
                        <h1>Property images</h1>
                    </div>
                    <div className={"row-span-2 property-quick-data apply-square-background"}>
                        <h1>{property.title}</h1>
                        <h1>Price: {property.price}$</h1>
                        <h1>{property.size}m2</h1>
                    </div>
                    <div className={"property-quick-actions apply-square-background"}>
                        <button className={"button"}>Buy</button>
                        <button className={"button"}>Contact Owner</button>
                    </div>
                    <div className={"col-span-2 property-data apply-square-background"}>
                        <h1>Property data</h1>
                        <table className={"table-auto property-data-table"}>
                            <tbody>
                            <tr>
                                <th>Address</th>
                                <td>{property.city}, {property.street}, {property.house_number}</td>
                            </tr>
                            <tr>
                                <th>Size</th>
                                <td>{property.size} m2</td>
                            </tr>
                            <tr>
                                <th>Rooms</th>
                                <td>{property.rooms}</td>
                            </tr>
                            <tr>
                                <th>Bathrooms</th>
                                <td>{property.bathroom_count}</td>
                            </tr>
                            <tr>
                                <th>Stories</th>
                                <td>{property.floor}</td>
                            </tr>
                            <tr>
                                <th>Build material</th>
                                <td>{property.building_material}</td>
                            </tr>
                            <tr>
                                <th>Type</th>
                                <td>{property.type}</td>
                            </tr>
                            <tr>
                                <th>Plot size</th>
                                <td>{property.plot_size}</td>
                            </tr>
                            <tr>
                                <th>Garages</th>
                                <td>{property.garage}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={"col-span-1 property-owner apply-square-background"}>
                    <h1>Property owner</h1>
                        <h1>{owner['name']}</h1>
                        <h1>{owner['email']}</h1>
                    </div>
                </div>
            </div>

            /*<div
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
            </div>*/
        );
    }
}

export default PropertyCard;