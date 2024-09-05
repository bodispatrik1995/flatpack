import React from 'react';

function Input(props) {
    return (
        <div><input
            className={'h-10 font-mono border-2 text-blue-300 px-3 text-1xl bg-black te flex rounded-lg shadow-sm'}
            name={props.name}
            value={props.value === undefined ? "" : props.value}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
        ></input></div>
    );
}

export default Input;