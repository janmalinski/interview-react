import React, { useState } from "react";

import "./Toggle.css";

const Toggle = ({ label, data, onToggle }) => {

    const [toggle, setToggle] = useState(false); 

    const handleOnChange = () => {
        if(!toggle){
            const alphabetizedData =  data.sort((a, b) => a.name.localeCompare(b.name))
            onToggle(alphabetizedData);
            setToggle(true);
        } else {
           const sortedByIdData = data.sort((a, b) => a.id - b.id);
           onToggle(sortedByIdData);
           setToggle(false);
        };
    };

    return (
        <>
        {label}{" "}
            <div className="toggle-switch">
                <input type="checkbox" className="checkbox"
                    name={label} id={label} onChange={handleOnChange}/>
                <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" /> 
                </label>
            </div>
        </>
    );
};

export default Toggle;
