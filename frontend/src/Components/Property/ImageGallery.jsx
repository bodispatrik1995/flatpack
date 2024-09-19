import {useEffect, useState} from "react";

export default function ImageGallery({propertyImages}){
    const [images, setImages] = useState(propertyImages ? propertyImages : []);
    const [currentImageIndex, setCurrentImageIndex] = useState(1)

    console.log(images)

    const [currentImage, setCurrentImage] = useState(`http://localhost:8000/${images[currentImageIndex]['image_path']}`)

    useEffect(()=>{
        setCurrentImage(`http://localhost:8000/${images[currentImageIndex]['image_path']}`);
    }, [currentImageIndex])

    if(images.length === 0){
        return (
            <h1>No images</h1>
        )
    }

    const next = () => {
        console.log("current image index: " + currentImageIndex);
        if(currentImageIndex+1 < images.length){
            setCurrentImageIndex(currentImageIndex + 1);
            console.log("image index set to: " + currentImageIndex);
        }
        else{
            setCurrentImageIndex(0);
            console.log("image index set to: " + currentImageIndex);
        }
    }

    const previous = () => {
        console.log("current image index: " + currentImageIndex);
        if(currentImageIndex > 0){
            setCurrentImageIndex(currentImageIndex - 1);
            console.log("image index set to: " + currentImageIndex);
        }
        else{
            setCurrentImageIndex(images.length -1 );
            console.log("image index set to: " + currentImageIndex);
        }
    }

    return (
        <>
            <img src={currentImage}/>
            <div className={'gallery-menu-bar'}>
                <button className={'gallery-menu-buttons-left'} onClick={previous}>
                    Previous
                </button>
                <button className={'gallery-menu-buttons-right'} onClick={next}>
                    Next
                </button>

            </div>
        </>
    );
};