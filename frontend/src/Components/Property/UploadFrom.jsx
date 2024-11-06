import React, {useState} from "react";
import {Input, Option, Select} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

function UploadForm(props) {
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        size: '',
        city: '',
        street: '',
        house_number: '',
        rooms: '',
        bathroom_count: '',
        floor: '',
        building_material: '',
        type: '',
        plot_size: 0,
        garage: false,
        facing: '',
        price: '',
    });

    const handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSelectChange = (value, name) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/server/api/add/property', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(formValues),
        });

        const data = await response.json();
        const propertyID = data.propertyId;
        if (response.ok) {
            console.log("Property uploaded successfully");
            if (propertyID) {
                navigate(`/upload/images/${propertyID}`);
            }
        } else {
            console.log("Error in uploading property", data);
        }
    };

    return (
        <div>
            <h1>This is where you can upload a new property!</h1>
            <form className={'grid grid-rows-2 justify-evenly gap-5'} onSubmit={handleSubmit}>
                <Input label="Title" name="title" type="text" onChange={handleChange} value={formValues.title}/>
                <Input label="Description" name="description" type="text" onChange={handleChange}
                       value={formValues.description}/>
                <Input label="Size" name="size" type="number" onChange={handleChange} value={formValues.size}/>


                <h1>Address:</h1>
                <Input label="City" name="city" type="text" onChange={handleChange} value={formValues.city}/>
                <Input label="Street" name="street" type="text" onChange={handleChange} value={formValues.street}/>
                <Input label="House Number" name="house_number" type="number" onChange={handleChange}
                       value={formValues.house_number}/>
                <Input label="Number of rooms" name="rooms" type="number" onChange={handleChange}
                       value={formValues.rooms}/>
                <Input label="Number of bathrooms" name="bathroom_count" type="number" onChange={handleChange}
                       value={formValues.bathroom_count}/>
                <Input label="Floor number" name="floor" type="number" onChange={handleChange}
                       value={formValues.floor}/>

                <h5>Select Building Material:</h5>
                <Select
                    name="building_material"
                    value={formValues.building_material}
                    onChange={(value) => handleSelectChange(value, 'building_material')}
                >
                    <Option disabled value="">Select Building Material</Option>
                    <Option value="Brick">Brick</Option>
                    <Option value="Wood">Wood</Option>
                    <Option value="Mud">Mud</Option>
                    <Option value="Disc">Disc</Option>
                </Select>

                <h5>Select Type:</h5>
                <Select
                    name="type"
                    value={formValues.type}
                    onChange={(value) => handleSelectChange(value, 'type')}
                >
                    <Option disabled value="">Select Property Type</Option>
                    <Option value="flat">Flat</Option>
                    <Option value="house">House</Option>
                </Select>
                <h5>Select Facing:</h5>
                <Select
                    name="facing"
                    value={formValues.facing}
                    onChange={(value) => handleSelectChange(value, 'facing')}
                >
                    <Option disabled value="">Select Facing</Option>
                    <Option value="E">E</Option>
                    <Option value="W">W</Option>
                    <Option value="N">N</Option>
                    <Option value="S">S</Option>
                    <Option value="NW">NW</Option>
                    <Option vaule="NE">NE</Option>
                    <Option value="SW">SW</Option>
                    <Option value="SE">SE</Option>
                </Select>
                {formValues.type === 'flat' ? (
                    <>
                        <Input label="Price $" name="price" type="number" onChange={handleChange}
                               value={formValues.price}/>
                        <Input label="Garage" name="garage" type="checkbox" onChange={handleChange}
                               checked={formValues.garage}/>
                    </>
                ) : (
                    <>
                        <Input label="Plot size" name="plot_size" type="number" onChange={handleChange}
                               value={formValues.plot_size}/>
                        <Input label="Garage" name="garage" type="checkbox" onChange={handleChange}
                               checked={formValues.garage}/>
                        <Input label="Price $" name="price" type="number" onChange={handleChange}
                               value={formValues.price}/>
                    </>
                )}

                <button type="submit">Next</button>
            </form>
        </div>
    );
}

export default UploadForm;
