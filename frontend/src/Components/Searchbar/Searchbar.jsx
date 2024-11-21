import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {Input, Option, Select} from "@material-tailwind/react"

function Searchbar(props) {
    const [queryParams, setQueryParams] = useSearchParams();
    const [types, setTypes] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await fetch('/server/api/properties/types');
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
                clickChange(props.page)
                const response = await fetch(`/server/api/properties/search?${search}`);
                const foundData = await response.json()
                props.changePageNumber(foundData.pageNumber)
                props.changeProperties(foundData.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties(queryParams.toString());
    }, [queryParams, props.page]);
    const formData = Object.fromEntries(queryParams.entries());
    const handleChangeDropDown = (value) => {
        setSelectedType(value);
        const newFormData = {...formData, type: value};
        props.changePage(1);
        setQueryParams(newFormData);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        const newFormData = {
            ...formData,
            [name]: value,
        };
        props.changePage(1);
        setQueryParams(newFormData);

    };
    const clickChange = (number) => {
        const newFormData = {
            ...formData,
            page: number
        }
        setQueryParams(newFormData)

    }
    return (

        <form className="flex justify-center">

            <Select color={'purple'} label={'Select Type'} name={'type'} value={selectedType}
                    onChange={handleChangeDropDown}>
                {types && types.length > 0 ? types.map((type) => {
                    return <Option value={type} key={type}>{type}</Option>
                }) : <Option> There is no properties with this parameter</Option>}
            </Select>
            <Input color={"black"} label={'City'} name={'city'} value={formData.city || ''} type={"text"}
                   onChange={handleChange}/>
            <Input color={"black"} label={'Street'} name={'street'} value={formData.street || ''} type={"text"}
                   onChange={handleChange}/>
            <Input color={"black"} label={"House Number"} name={'house_number'} value={formData.house_number || ''}
                   type={"number"} onChange={handleChange}/>
            <Input color={"black"} label={"Max Price"} name={'price'} value={formData.price || ''} type={"number"}
                   onChange={handleChange}/>
            <Input color={"black"} label={"Max Size"} name={'size'} value={formData.size || ''} type={"number"}
                   onChange={handleChange}/>
            <Input color={"black"} label={"Number of rooms"} name={"rooms"} value={formData.rooms || ''} type={"number"}
                   onChange={handleChange}/>
            <button
                className='button'
                type={"reset"} onClick={() => setQueryParams('')}>Reset
            </button>
        </form>
    )
}

export default Searchbar;