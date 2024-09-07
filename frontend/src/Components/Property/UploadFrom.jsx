import React, {useState} from "react";
import {Input} from "@material-tailwind/react";
// import Input from "../Searchbar/Input.jsx";

function UploadFrom(props) {
    const token = localStorage.getItem('userToken')
    const [propertyId, setPropertyId] = useState(null)
    const [imageValues, setImageValues] = useState({
        image_path: null,
        name: "name",
        property_id: propertyId

    })
    const [image_path, setImage_path] = useState();
    const [name, setName] = useState('name')

    console.log(token)
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
        // addImage: null,
    });

    async function fetchPropertyImg  () {
        const formData = new FormData();
            formData.append(image_path)
            const response = await fetch('http://127.0.0.1:8000/api/upload_image', {
                method:"POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "type": "formData"
                },
                body: formData, name, propertyId
            })


        const data = await response.json()
        console.log(data)
    }

    const id = localStorage.getItem('userId');
    console.log(id);

    function handleChangeImg(e) {
        const {name, files}= e.target
        setImageValues( prevState => ({
            ...prevState,
                [name]: files[0]
        }))
    }

    const handleChange = (event) => {
        const {name, value, type, checked, files} = event.target;

        setFormValues(prevValues => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
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
            // credentials: 'include', // Important for sending cookies with the request
            body: JSON.stringify(formValues),
        })
        const data =await response.json()
        console.log(data.propertyId)
        if (response.ok){
            console.log("Upload a property")
            console.log(data)
        } else {
            console.log("error")
            console.log(data)
        }
        setPropertyId(data.propertyId);
        fetchPropertyImg()

    };

    console.log(imageValues)
    return (
        <div>
            <h1>This is where you can upload a new property!</h1>
            <form className={'grid grid-rows-2 justify-evenly gap-5 '} onSubmit={handleSubmit}>
                <Input color={"black"} label={'Title'} name={'title'} type={"text"} onChange={handleChange}
                       value={formValues.title}/>
                <Input color={"black"} label={'Description'} name={'description'} type={"text"} onChange={handleChange}
                       value={formValues.description}/>
                <Input color={"black"} label={'Size'} name={'size'} type={"number"} onChange={handleChange}
                       value={formValues.size}/>
                <h1>Address:</h1>
                <Input color={"black"} label={'City'} name={'city'} type={"text"} onChange={handleChange}
                       value={formValues.city}/>
                <Input color={"black"} label={'Street'} name={'street'} type={"text"} onChange={handleChange}
                       value={formValues.street}/>
                <Input color={"black"} label={'House Number'} name={'house_number'} type={"number"}
                       onChange={handleChange} value={formValues.house_number}/>
                <Input color={"black"} label={'Number of rooms'} name={'rooms'} type={"number"} onChange={handleChange}
                       value={formValues.rooms}/>
                <Input color={"black"} label={'Number of bathrooms'} name={'bathroom_count'} type={"number"}
                       onChange={handleChange} value={formValues.bathroom_count}/>
                <Input color={"black"} label={'Floor number'} name={'floor'} type={"number"} onChange={handleChange}
                       value={formValues.floor}/>
                <Input color={"black"} label={'Building Material'} name={'building_material'} type={"text"}
                       onChange={handleChange} value={formValues.building_material}/>
                <Input color={"black"} label={'Type'} name={'type'} type={"text"} onChange={handleChange}
                       value={formValues.type}/>
                <Input color={"black"} label={'Plot size'} name={'plot_size'} type={"number"} onChange={handleChange}
                       value={formValues.plot_size}/>
                <Input color={"black"} label={'Garage'} name={'garage'} type={"checkbox"} onChange={handleChange}
                       value={formValues.garage}/>
                <Input color={"black"} label={'Facing'} name={'facing'} type={"text"} onChange={handleChange}
                       value={formValues.facing}/>
                <Input color={"black"} label={'Price $'} name={'price'} type={"number"} onChange={handleChange}
                       value={formValues.price}/>
                <Input color={"black"} label={'Pictures'} name={'image_path'} type={"file"} onChange={()=>{setImage_path(e.target.value)}}/>
                <button
                    className={'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '}
                    type={"submit"}>Upload
                </button>
                {/*<label>Title:*/}
                {/*    <Input name={'title'} value={formValues.title} type={"text"} placeholder={"Pls write a title"}*/}
                {/*           onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Description:*/}
                {/*    <Input name={'description'} value={formValues.description} type={"text"}*/}
                {/*           placeholder={"Pls write a description"} onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Size:*/}
                {/*    <Input name={'size'} value={formValues.size} type={"number"} placeholder={"Pls write a size"}*/}
                {/*           onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<h2>Address:</h2>*/}
                {/*<label>City:*/}
                {/*    <Input name={'city'} value={formValues.city} type={"text"} placeholder={"Pls write a city"}*/}
                {/*           onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Street:*/}
                {/*    <Input name={'street'} value={formValues.street} type={"text"} placeholder={"Pls write a street"}*/}
                {/*           onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>House Number:*/}
                {/*    <Input name={'house_number'} value={formValues.house_number} type={"number"}*/}
                {/*           placeholder={"Pls write a number"} onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Number of Rooms:*/}
                {/*    <Input name={'rooms'} value={formValues.rooms} type={"number"} placeholder={"Pls write a number"}*/}
                {/*           onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Number of bathrooms:*/}
                {/*    <Input name={'bathroom_count'} value={formValues.bathroom_count} type={"number"}*/}
                {/*           placeholder={"Pls write a number"} onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Floor number:*/}
                {/*    <Input name={'floor'} value={formValues.floor} type={"number"} placeholder={"Pls write a number"}*/}
                {/*           onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Building material:*/}
                {/*    <Input name={'building_material'} value={formValues.building_material} type={"text"}*/}
                {/*           placeholder={"Pls write a material"} onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Type:*/}
                {/*    <Input name={'type'} value={formValues.type} type={"text"} placeholder={"Pls write a type"}*/}
                {/*           onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Plot Size:*/}
                {/*    <Input name={'plot_size'} value={formValues.plot_size} type={"number"}*/}
                {/*           placeholder={"Pls write a number"} onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Garage:*/}
                {/*    <Input name={'garage'} checked={formValues.garage} type={"checkbox"} onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Facing:*/}
                {/*    <Input name={'facing'} value={formValues.facing} type={"text"} placeholder={"Pls write a facing"}*/}
                {/*           onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Price:*/}
                {/*    <Input name={'price'} value={formValues.price} type={"number"} placeholder={"Pls write a number"}*/}
                {/*           onChange={handleChange}/>*/}
                {/*</label>*/}
                {/*<label>Upload pictures:*/}
                {/*    <input type={'file'} name={'image_path'} onChange={handleChangeImg}/>*/}
                {/*</label>*/}
                {/*<input type={'submit'}/>*/}
            </form>
        </div>)

}

export default UploadFrom;