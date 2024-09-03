import React from 'react';

function Input(props) {
    return (
        <div><input
            className={props.className}
            name={props.name}
            value={props.value === undefined ? "" : props.value}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
        ></input></div>
    );
}

export default Input;