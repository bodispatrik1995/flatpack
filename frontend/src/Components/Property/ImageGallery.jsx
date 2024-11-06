import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function ImageGallery(props) {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const propertyId = useParams()
    const [currentImage, setCurrentImage] = useState(null)


    useEffect(() => {
        const fetchImages = async () => {
            const imagesPromise = await fetch(`/server/api/images/${propertyId.id}`,
                {
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                    }
                })

            if (imagesPromise.ok) {
                const imagesData = await imagesPromise.json();
                const imagesDown = imagesData.images[0].original
                await setImages(imagesData.images[0].original);
                // console.log(imagesDown)
                if (imagesDown.length > 0) {
                    setCurrentImage(`http://localhost:8000/${imagesDown[currentImageIndex]['image_path']}`);
                } else {
                    setCurrentImageIndex(null)
                }
            }
        }
        fetchImages()
    }, [currentImageIndex])

    const next = () => {
        // console.log("current image index: " + currentImageIndex);
        if (currentImageIndex + 1 < images.length) {
            setCurrentImageIndex(currentImageIndex + 1);
            // console.log("image index set to: " + currentImageIndex);
        } else {
            setCurrentImageIndex(0);
            // console.log("image index set to: " + currentImageIndex);
        }
    }

    const previous = () => {
        // console.log("current image index: " + currentImageIndex);
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
            // console.log("image index set to: " + currentImageIndex);
        } else {
            setCurrentImageIndex(images.length - 1);
            // console.log("image index set to: " + currentImageIndex);
        }
    }

    if (currentImage === null) {
        return (
            <h1>There are no images for this property!</h1>
        )
    } else {

        return (
            <>

                <img src={currentImage} alt={'key'}/>
                <div className={'gallery-menu-bar'}>
                    <button className={'min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800  focus:bg-slate-800 focus:border-slate-800 active:border-slate-800  active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'}
                            onClick={previous}>
                        Previous
                    </button>
                    <button className={'min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800  focus:bg-slate-800 focus:border-slate-800 active:border-slate-800  active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'}
                            onClick={next}>
                        Next
                    </button>

                </div>
            </>
        );
    }
};
