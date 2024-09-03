import React, {useState} from 'react';

function Checkbox(props) {
    const [checked, setChecked] = useState(false)
    function handleChange (){
        setChecked(!checked)
    }
    return (
        <div>
            <input type={"checkbox"}
            value={checked}
            onChange={[handleChange, props.onChange]}/>
        </div>
    );
}

export default Checkbox;