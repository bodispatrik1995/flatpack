import React, {useEffect, useState} from 'react';
import DropDown from "./DropDown.jsx";
import Input from "./Input.jsx";
import {useSearchParams} from "react-router-dom";
import Checkbox from "./Checkbox.jsx";

function Searchbar(props) {
    const [selectValue, setSelectValue] = useState("Choose Type");
    const [queryParams, setQueryParams] = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [types, setTypes] = useState([])
console.log(properties)
    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/properties/types');
                const foundData = await response.json();
                setTypes(foundData);
            } catch (error) {
                console.error('Error fetching property types:', error);
            }
        };

        fetchPropertyTypes();
    }, []);

    useEffect(() => {
        const fetchProperties = async (search) => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/properties/search?${search}`);
                const foundData = await  response.json()
                setProperties(foundData);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties(queryParams.toString());
    }, [queryParams]);
    const formData = Object.fromEntries(queryParams.entries());


    const handleChange = (event) => {
        const { name, value } = event.target;
        const newFormData = {
            ...formData,
            [name]: value,
        };
        setQueryParams(newFormData);

    };
    return (
        <form
            className="searchBar"
            onReset={(e) => {
                e.preventDefault();
                setSelectValue("Choose");
                setQueryParams({});
            }}
        >
            {/*<DropDown*/}
            {/*    name="type"*/}
            {/*    className="select"*/}
            {/*    list={types}*/}
            {/*    handleChange={(e) => {*/}
            {/*        handleChange(e);*/}
            {/*        setSelectValue(e.target.value);*/}
            {/*    }}*/}
            {/*    selectValue={selectValue}*/}
            {/*/>*/}
            <Input
                name="city"
                value={formData.city}
                type="text"
                onChange={handleChange}
                placeholder="Enter city"
                className="inputs"
            />
            <Input
                name="street"
                value={formData.street}
                type="text"
                onChange={handleChange}
                placeholder="Enter street"
                className="inputs"
            />
            <Input
                name="house_number"
                value={formData.location}
                type="number"
                onChange={handleChange}
                placeholder="Enter House number"
                className="inputs"
            />
            <Input
                name="maxPrice"
                value={formData.price}
                type="number"
                onChange={handleChange}
                placeholder="Enter maximum price"
                className="inputs"
            />
            <Input
                name="size"
                value={formData.size}
                type="number"
                onChange={handleChange}
                placeholder="Enter minimum surface"
                className="inputs"
            />
            <Input
                name="numberOfRooms"
                value={formData.numberOfRooms}
                type="number"
                onChange={handleChange}
                placeholder="Enter number of rooms"
                className="inputs"
            />
            {/*<Checkbox*/}
            {/*    name="garage"*/}
            {/*    type="checkbox"*/}
            {/*    onChange={handleChange}*/}
            {/*    className="inputs"*/}
            {/*/>*/}


            </form>
    )
}

export default Searchbar;