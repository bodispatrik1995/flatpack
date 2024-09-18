import React from 'react';

function OwnButtons(props) {
    return (
        <div>
            <button className={'button'}>Add to favorites</button>
            <button className={'button'}>Delete</button>
            <button className={'button'}>Update</button>
        </div>
    );
}

export default OwnButtons;