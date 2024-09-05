import React, {useEffect, useState} from 'react';
import DropDown from "./DropDown.jsx";
// import Input from "./Input.jsx";
import {useSearchParams} from "react-router-dom";
import {Input, Select} from "@material-tailwind/react"
import SelectOption from "@material-tailwind/react/components/Select/SelectOption.js";

function Searchbar(props) {
    const [queryParams, setQueryParams] = useSearchParams();
    const [types, setTypes] = useState(null)
    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/properties/types');
                const foundData = await response.json();
                // foundData.unshift('Choose a type')
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
                const foundData = await response.json()
                props.changeProperties(foundData);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties(queryParams.toString());
    }, [queryParams]);
    const formData = Object.fromEntries(queryParams.entries());


    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log("most ment a handlechange")
        console.log(event.target)
        const newFormData = {
            ...formData,
            [name]: value,
        };
        setQueryParams(newFormData);

    };
    return (
        <form className="flex justify-center">

               <Select color={'purple'} label={'Select Type'} name={'type'} onChange={handleChange} key={'key'}>
                   {types ? types.map((type) => {
                       return <SelectOption value={type}>{type}</SelectOption>
                   }) : <SelectOption> HEHE</SelectOption>}
               </Select>
            {/*<DropDown*/}
            {/*    name="type"*/}
            {/*    className="select"*/}
            {/*    list={types}*/}
            {/*    handleChange={(e) => {*/}
            {/*        handleChange(e);*/}
            {/*        // setSelectValue(e.target.text);*/}
            {/*    }}*/}
            {/*    // selectValue={selectValue}*/}
            {/*/>*/}
            <Input color={"black"} label={'City'} name={'city'} value={formData.city} type={"text"} onChange={handleChange} />
            <Input color={"black"} label={'Street'} name={'street'} value={formData.street} type={"text"} onChange={handleChange}/>
            <Input color={"black"} label={"House Number"} name={'house_number'} value={formData.house_number} type={"number"} onChange={handleChange}/>
            <Input color={"black"} label={"Max Price"} name={'price'} value={formData.price} type={"number"} onChange={handleChange}/>
            <Input color={"black"} label={"Max Size"} name={'size'} value={formData.size} type={"number"} onChange={handleChange}/>
            <Input color={"black"} label={"Number of rooms"} name={"rooms"} value={formData.rooms} type={"number"} onChange={handleChange}/>

             {/*<Input*/}
            {/*    name="city"*/}
            {/*    value={formData.city}*/}
            {/*    type="text"*/}
            {/*    onChange={handleChange}*/}
            {/*    placeholder="Enter city"*/}
            {/*    className="inputs"*/}
            {/*/>*/}
            {/*<Input*/}
            {/*    name="street"*/}
            {/*    value={formData.street}*/}
            {/*    type="text"*/}
            {/*    onChange={handleChange}*/}
            {/*    placeholder="Enter street"*/}
            {/*    className="inputs"*/}
            {/*/>*/}
            {/*<Input*/}
            {/*    name="house_number"*/}
            {/*    value={formData.house_number}*/}
            {/*    type="number"*/}
            {/*    onChange={handleChange}*/}
            {/*    placeholder="Enter House number"*/}
            {/*    className="inputs"*/}
            {/*/>*/}
            {/*<Input*/}
            {/*    name="price"*/}
            {/*    value={formData.price}*/}
            {/*    type="number"*/}
            {/*    onChange={handleChange}*/}
            {/*    placeholder="Enter maximum price"*/}
            {/*    className="inputs"*/}
            {/*/>*/}
            {/*<Input*/}
            {/*    name="size"*/}
            {/*    value={formData.size}*/}
            {/*    type="number"*/}
            {/*    onChange={handleChange}*/}
            {/*    placeholder="Enter minimum surface"*/}
            {/*    className="inputs"*/}
            {/*/>*/}
            {/*<Input*/}
            {/*    name="rooms"*/}
            {/*    value={formData.rooms}*/}
            {/*    type="number"*/}
            {/*    onChange={handleChange}*/}
            {/*    placeholder="Enter number of rooms"*/}
            {/*    className="inputs"*/}
            {/*/>*/}
            {/*<NumberInputs onChange={handleChange} name="rooms" value={formData.rooms}/>*/}
            {/*<Checkbox*/}
            {/*    name="garage"*/}
            {/*    type="checkbox"*/}
            {/*    onChange={handleChange}*/}
            {/*    className="inputs"*/}
            {/*/>*/}
            <button
                className={'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '}
                type={"reset"} onClick={() => setQueryParams('')}>Reset
            </button>


        </form>
    )
}

export default Searchbar;