import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import {useNavigate, useParams} from "react-router-dom";

function UploadImages() {
    const [imageFiles, setImageFiles] = useState([]);

    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();

    const propertyId = useParams();
    // Handle image selection
    const handleImageChange = (e) => {
        setImageFiles([...e.target.files]); // Store selected images in an array
    };

    // Fetch and upload multiple images
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!imageFiles.length || !propertyId) {
            console.error("No images selected or property ID is missing");
            return;
        }

        const formData = new FormData();

        // Loop through each image and append to formData
        imageFiles.forEach((file, index) => {
            formData.append(`image_path`, file);
            formData.append('name', `${index + 1}`);
        });

        formData.append('property_id', propertyId);

        const response = await fetch('http://127.0.0.1:8000/api/upload_images', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Accept": "application/json", // Only Accept header is needed
            },
            body: formData,
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            console.log("Images uploaded successfully");
            // You can navigate somewhere after successful upload
        } else {
            console.log("Error in uploading images", data);
        }
    };

    return (
        <div>
            <h1>Upload Multiple Images for Property</h1>
            <form onSubmit={handleUpload}>
                <Input
                    label={'Select Images'}
                    name={'images'}
                    type={"file"}
                    onChange={handleImageChange}
                    multiple
                />
                <button type="submit">Upload Images</button>
            </form>
        </div>
    );
}

export default UploadImages;
