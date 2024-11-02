import React, { useEffect, useState } from 'react';
import Loading from "../Loading.jsx";
import ImageGallery from "./ImageGallery.jsx";
import { useParams } from "react-router-dom";
import FavoriteButton from "./Buttons/FavoriteButton.jsx";
import MessageInput from "./MessageInput.jsx";
import DeleteButton from "./Buttons/DeleteButton.jsx";

function PropertyCard() {
    const { id: propertyId } = useParams();
    const [property, setProperty] = useState(null);
    const [owner, setOwner] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const propertyResponse = await fetch(`http://127.0.0.1:8000/api/property/${propertyId}`,
                    {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
                    })


                if (!propertyResponse.ok ) {
                    throw new Error('Failed to fetch property or owner');
                }

                const propertyData = await propertyResponse.json();
                // const ownerData = await ownerResponse.json();

                setProperty(propertyData.property);
                //  setOwner(ownerData.user || "N/A");
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load property information');
            }
        };



        fetchProperty();

    }, [propertyId]);

    useEffect(() => {
        const fetchOwner = async (ownerID)=>{
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/owner/${ownerID}`,
                    {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
                    });
                const ownerData = await response.json();
                setOwner(ownerData.user);
            }catch (error){
                console.error('Error fetching data:', error);
                setError('Failed to load  owner information');
            }
        }
        if(property){
            fetchOwner(property.user_id);
        }
    }, [property]);



    const currencyFormat = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    const checkOwnerIsLoggedIn = () => {
        const userId = localStorage.getItem('userId');
        return owner && owner.id == userId;
    };

    if (error) return <div>{error}</div>;

    if (!property) return <Loading />;

    return (
        <div className="property-card">
            <div className="grid gap-4 grid-cols-3 grid-rows-3 Property-headline">
                {/* Property Images */}
                <div className="row-span-3 col-span-2 property-images apply-square-background">
                    <h1>Property images</h1>
                    <ImageGallery />
                </div>


                <div className="row-span-2 property-quick-data apply-square-background">
                    <h1>{property.title}</h1>
                    <h1>Price: {currencyFormat(property.price)} $</h1>
                    <h1>{property.size}m2</h1>
                </div>

                {/* Quick Actions */}
                <div className="property-quick-actions apply-square-background">
                    <button className="button">Buy</button>
                    {localStorage.getItem('userToken') && <FavoriteButton property_id={propertyId} />}
                    {checkOwnerIsLoggedIn() && <DeleteButton />}
                </div>

                {/* Message Input */}
                {owner && <MessageInput owner={owner} />}

                {/* Property Data Table */}
                <div className="col-span-2 property-data apply-square-background">
                    <h1>Property data</h1>
                    <table className="table-auto property-data-table">
                        <tbody>
                        <tr><th>Address</th><td>{property.city}, {property.street}, {property.house_number}</td></tr>
                        <tr><th>Size</th><td>{property.size} m2</td></tr>
                        <tr><th>Rooms</th><td>{property.rooms}</td></tr>
                        <tr><th>Bathrooms</th><td>{property.bathroom_count}</td></tr>
                        <tr><th>Stories</th><td>{property.floor}</td></tr>
                        <tr><th>Build material</th><td>{property.building_material}</td></tr>
                        <tr><th>Type</th><td>{property.type}</td></tr>
                        <tr><th>Plot size</th><td>{property.plot_size}</td></tr>
                        <tr><th>Garages</th><td>{property.garage}</td></tr>
                        </tbody>
                    </table>
                </div>


                <div className="col-span-1 property-owner apply-square-background">
                    <h1>Property owner</h1>
                    {owner ? (
                        <>
                            <h1>{owner.name}</h1>
                            <h1>{owner.email}</h1>
                        </>
                    ) : (
                        <h1>Failed to fetch owner</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;
