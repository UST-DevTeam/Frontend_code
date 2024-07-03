// import React, { useState } from 'react';
// import Select from 'react-select';

// const NewSingleSelect = ({ label, options = [], value = null, required = false, cb = (data) => {}, ...props }) => {
//     const [selectedOption, setSelectedOption] = useState(value);

//     const handleChange = (selected) => {
//         setSelectedOption(selected);
//         cb(selected);
//     };

//     return (
//         <div className={`max-w-[150px] min-w-[150px] relative p-0 z-50 ${props?.height || ''} ${props?.className || ''} w-full`}>
//             {/* <label htmlFor={label} className='text-white ml-2'>
//                 {required ? <span className='text-red-600 mr-1 '>*</span> : null}
//                 {label}
//             </label> */}
//             <Select
//                 className="outline-none border rounded-md border-main mt-[2px]"
//                 options={options}
//                 value={selectedOption}
//                 onChange={handleChange}
//                 placeholder="Year.."
//                 isClearable={true}
//                 {...props}
//             />
//         </div>
//     );
// };
import React, { useState } from 'react'
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';

const NewSingleSelect = ({ label, option = [], value = [], required = false, cb = (data) => { },placeholder = "", ...props }) => {
    const [length, setLength] = useState(0)
    return (
        <div className={`max-w-[150px] min-w-[150px]  relative p-0 z-50 ${props?.height || ''} ${props?.className || ''} w-full`}>
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label + (length > 0 ? " ( " + length + " )" : "")}</label> */}
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label}</label> */}
            <Select
                className="outline-none border rounded-md border-main mt-[2px]"
                options={option}
                value={value}
                defaultIsOpen={false}
                onChange={(data) => {
                    cb(data)
                    setLength(data.length)
                }}
                placeholder={placeholder}
            />
        </div>

    )
}

export default NewSingleSelect;