import React from 'react';
import Input from "../Searchbar/Input.jsx";

function UploadFrom(props) {
    // console.log(localStorage.getItem('userToken'))
    const id = localStorage.getItem('userId')
    console.log(id)
    function handleChange (){
    }
    return (
        <div>
            <h1>This is wher you can upload a new property!</h1>
            <form>
                <label>Title:
                <Input name={'title'} value={""} type={"text"} placeholder={"Pls write a title"} onChange={handleChange()}/> </label>
                <label>Description:
                    <Input name={'description'} value={""} type={"text"} placeholder={"Pls write a description"} onChange={handleChange()}/> </label>
                <label>Size:
                    <Input name={'size'} value={""} type={"number"} placeholder={"Pls write a size"} onChange={handleChange()}/> </label>
                <h2>Address:</h2>
                <label>City:
                    <Input name={'city'} value={""} type={"text"} placeholder={"Pls write a city"} onChange={handleChange()}/> </label>
                <label>Street:
                    <Input name={'street'} value={""} type={"text"} placeholder={"Pls write a street"} onChange={handleChange()}/> </label>
                <label>House Number:
                    <Input name={'house_number'} value={""} type={"number"} placeholder={"Pls write a number"} onChange={handleChange()}/> </label>
                <label>Number of Rooms:
                    <Input name={'rooms'} value={""} type={"number"} placeholder={"Pls write a number"} onChange={handleChange()}/> </label>
                <label>Number of bathrooms:
                    <Input name={'bathroom_count'} value={""} type={"number"} placeholder={"Pls write a number"} onChange={handleChange()}/> </label>
                <label>Floor number:
                    <Input name={'floor'} value={""} type={"number"} placeholder={"Pls write a number"} onChange={handleChange()}/> </label>
                <label>Building material:
                    <Input name={'building_material'} value={""} type={"text"} placeholder={"Pls write a material"} onChange={handleChange()}/> </label>
                <label>Type:
                    <Input name={'type'} value={""} type={"text"} placeholder={"Pls write a type"} onChange={handleChange()}/> </label>
                <label>Plot Size:
                    <Input name={'plot_size'} value={""} type={"number"} placeholder={"Pls write a number"} onChange={handleChange()}/> </label>
                <label>Garage:
                    <Input name={'garage'} value={""} type={"checkbox"} placeholder={"Pls write a title"} onChange={handleChange()}/> </label>
                <label>Facing:
                    <Input name={'facing'} value={""} type={"text"} placeholder={"Pls write a facing"} onChange={handleChange()}/> </label>
                <label>Price:
                    <Input name={'price'} value={""} type={"number"} placeholder={"Pls write a number"} onChange={handleChange}/> </label>
                <label>Upload pictures:
                <input type={'file'} name={'addImage'} onChange={handleChange}/></label>
                <input type={'submit'}/>
            </form>
        </div>
    );
}

export default UploadFrom;
