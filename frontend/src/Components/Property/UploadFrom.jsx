import React, { useState } from "react";
import { Input } from "@material-tailwind/react";

function UploadFrom(props) {
    const token = localStorage.getItem('userToken');
    const [propertyId, setPropertyId] = useState(null);
    const [image_path, setImage_path] = useState(null); // Changed to handle the file directly
    const [name, setName] = useState('name')
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
        plot_size: '',
        garage: false,
        facing: '',
        price: '',
    });

    async function fetchPropertyImg() {
        if(!image_path || !propertyId){
            console.error("image path or property id is missing");
            return;
        }
        const formData = new FormData();
        formData.append('image_path', image_path);
        formData.append('name', "name");
        formData.append('property_id',propertyId)

        const response = await fetch('http://127.0.0.1:8000/api/upload_image', {
            method: "POST",
            headers: {
                "Accept": "application/json", // Only Accept header is needed
            },
            body: formData
        });

        const data = await response.json();
        console.log(data);
    }

    const handleChangeImg = (e) => {
        setImage_path(e.target.files[0]); // Set the file directly
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormValues(prevValues => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/add/property', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(formValues),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Property uploaded successfully");
            setPropertyId(data.propertyId);
            await fetchPropertyImg(); // Upload image after property data
        } else {
            console.log("Error in uploading property");
            console.log(data);
        }
    };

    return (
        <div>
            <h1>This is where you can upload a new property!</h1>
            <form className={'grid grid-rows-2 justify-evenly gap-5 '} onSubmit={handleSubmit}>
                <Input label={'Title'} name={'title'} type={"text"} onChange={handleChange} value={formValues.title} />
                <Input label={'Description'} name={'description'} type={"text"} onChange={handleChange} value={formValues.description} />
                <Input label={'Size'} name={'size'} type={"number"} onChange={handleChange} value={formValues.size} />
                <h1>Address:</h1>
                <Input label={'City'} name={'city'} type={"text"} onChange={handleChange} value={formValues.city} />
                <Input label={'Street'} name={'street'} type={"text"} onChange={handleChange} value={formValues.street} />
                <Input label={'House Number'} name={'house_number'} type={"number"} onChange={handleChange} value={formValues.house_number} />
                <Input label={'Number of rooms'} name={'rooms'} type={"number"} onChange={handleChange} value={formValues.rooms} />
                <Input label={'Number of bathrooms'} name={'bathroom_count'} type={"number"} onChange={handleChange} value={formValues.bathroom_count} />
                <Input label={'Floor number'} name={'floor'} type={"number"} onChange={handleChange} value={formValues.floor} />
                <Input label={'Building Material'} name={'building_material'} type={"text"} onChange={handleChange} value={formValues.building_material} />
                <Input label={'Type'} name={'type'} type={"text"} onChange={handleChange} value={formValues.type} />
                <Input label={'Plot size'} name={'plot_size'} type={"number"} onChange={handleChange} value={formValues.plot_size} />
                <Input label={'Garage'} name={'garage'} type={"checkbox"} onChange={handleChange} value={formValues.garage} />
                <Input label={'Facing'} name={'facing'} type={"text"} onChange={handleChange} value={formValues.facing} />
                <Input label={'Price $'} name={'price'} type={"number"} onChange={handleChange} value={formValues.price} />
                <Input label={'Pictures'} name={'image_path'} type={"file"} onChange={handleChangeImg} />
                <button type={"submit"}>Upload</button>
            </form>
        </div>
    );
}

export default UploadFrom;
