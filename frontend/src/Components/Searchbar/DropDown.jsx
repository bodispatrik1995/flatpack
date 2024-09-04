import React, {useState} from 'react';
import Option from './Option';

function DropDown(props) {
    const optionList = Object.entries(props.list).map(([value, text], index) => (
            <Option value={value} key={index} text={text} />
    ));
    return (
        <select value={props.selectValue} className={props.className} name={props.name} onChange={props.handleChange}>
            {optionList}
        </select>
    );
}

export default DropDown;