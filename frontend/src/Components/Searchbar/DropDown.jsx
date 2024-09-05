import React, {useState} from 'react';

function DropDown(props) {
    return (
        <select  value={"csuzz"} className={'bg-black text-blue-300 '} name={props.name} onChange={props.handleChange}>
            <option value={''} disabled selected >Choose a type2</option>
            {(props.list).map((item, index) => {
                return <option value={item} key={index} className={"block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"}>{item}</option>
            })}
        </select>
    );
}

export default DropDown;