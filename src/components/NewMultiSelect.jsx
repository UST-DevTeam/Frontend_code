import React, { useState } from 'react'
import { MultiSelect } from "react-multi-select-component";

const NewMultiSelects = ({ label, option = [], value = [], required = false, cb = (data) => { }, ...props }) => {
    const [length, setLength] = useState(0)
    return (
        <div className={`max-w-[150px] min-w-[100px]  relative p-0  ${props?.height || ''} ${props?.className || ''} w-full`}>
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label + (length > 0 ? " ( " + length + " )" : "")}</label> */}
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label}</label> */}
            <MultiSelect
                className="outline-none border font-extrabold rounded-md border-main mt-[2px]"
                options={option}
                value={value}
                defaultIsOpen={false}
                onChange={(data) => {
                    cb(data)
                    setLength(data.length)
                }}
                placeholder=" Select options"
            />
        </div>

    )
}


export const NewMultiSelects2 = ({ label, option = [], value = [], required = false, cb = (data) => { }, ...props }) => {
    const [length, setLength] = useState(0)
    return (
        <div className={`max-w-[200px] min-w-[200px]  relative p-0 z-50 ${props?.height || ''} ${props?.className || ''} w-full`}>
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label + (length > 0 ? " ( " + length + " )" : "")}</label> */}
            {/* <label htmlFor={label} className='text-white ml-2'>{required ? <span className='text-red-600 mr-1 '>*</span> : <></>}{label}</label> */}
            <MultiSelect
                className="outline-none border rounded-md border-main mt-[2px]"
                options={option}
                value={value}
                defaultIsOpen={false}
                onChange={(data) => {
                    cb(data)
                    setLength(data.length)
                }
                }
            />
        </div>

    )
}


export default NewMultiSelects;