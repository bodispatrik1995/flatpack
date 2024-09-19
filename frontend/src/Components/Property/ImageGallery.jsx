import {useEffect, useState} from "react";

export default function ImageGallery({propertyImages}){
    const [images, setImages] = useState(propertyImages ? propertyImages : []);
    const [currentImageIndex, setCurrentImageIndex] = useState(1)

    console.log(images)

    const [currentImage, setCurrentImage] = useState(images > 0 ? `http://localhost:8000/${images[currentImageIndex]['image_path']}` : null)

    useEffect(()=>{
        if (images.length > 0){
            setCurrentImage(`http://localhost:8000/${images[currentImageIndex]['image_path']}`);
        }
        else{
            setCurrentImageIndex(null);
        }
    }, [currentImageIndex])

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

    if (currentImage === null){
        return (
            <h1>There are no images for this property!</h1>
        )
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
