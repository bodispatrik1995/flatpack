import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

function DeleteButton(props) {
    const propertyId = useParams()
    const navigate = useNavigate()
    const fetchDeleteProperty = async () => {
        console.log(propertyId.id)
        const response = await fetch(`/server/api/deleteProperty/${propertyId.id}`, {
            method: "DELETE",
            headers: {'Authorization': `Bearer ${localStorage.getItem('userToken')}`}
        })
        const messages = await response.json()
        console.log(messages.message)
        navigate('/')
    }

    function deletePropertyClick() {
        fetchDeleteProperty()
    }

    return (
        <div>
            <button className={'button'} onClick={deletePropertyClick}>Delete</button>
        </div>
    );
}

export default DeleteButton;