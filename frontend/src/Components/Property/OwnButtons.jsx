import React, {useState} from 'react';

function OwnButtons(props) {
    const [favoriteClicked, setFavoriteClicked] = useState(false)
    const token = localStorage.getItem('userToken');
    async function fetchAddFavorites (property_id){
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/favorites`, {
                method: "POST",
                headers : {
                    'Authorization': `Bearer ${token}`,
                    "Content-type" : "application/json",
                    'Accept': 'application/json',
                },
                body : JSON.stringify({
                    // user_id : user_id,
                    property_id : property_id
                })
            });
            // const foundData = await response.json();

        } catch (error) {
            console.error('Error fetching property types:', error);
        }
    }
    async function fetchDeleteFavorites (property_id){
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/favorites/delete`, {
                method: "POST",
                headers : {
                    'Authorization': `Bearer ${token}`,
                    "Content-type" : "application/json",
                    'Accept': 'application/json',
                },
                body : JSON.stringify({
                    // user_id : user_id,
                    property_id : property_id
                })
            });
            const foundData = await response.json();
            console.log(foundData)
        } catch (error) {
            console.error('Error fetching property types:', error);
        }
    }
   async function favoriteChange (){
        if(!favoriteClicked){
           await fetchAddFavorites(props.property_id)
        } else {
          await  fetchDeleteFavorites(props.property_id)
        }
        setFavoriteClicked(!favoriteClicked);

    }

    return (
        <div>
            {favoriteClicked ? <button className={'button'} onClick={favoriteChange}>Delete from favorites</button> :
                <button className={'button'} onClick={favoriteChange}>Add to favorites</button>}
            <button className={'button'}>Delete</button>
            <button className={'button'}>Update</button>
        </div>
    );
}

export default OwnButtons;