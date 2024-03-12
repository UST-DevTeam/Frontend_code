import React from 'react';

const SelectDropDown = ({ itm, errors, handleSubmit, setValue, getValues, register }) => {
    console.log(itm, "SelectDropDownSelectDropDownSelectDropDown");
    return (
        itm && <>

            <div className='flex flex-col'>
                <select
                    onChange={itm.onChanging ? itm.onChanging : null}
                    {...register(itm?.name, {
                        required: itm?.required ? "This Field is required" : false,
                        ...itm?.props
                    })}
                    className={"bg-white block h-full w-full rounded-md text-white-900 shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                >
                    <option selected value={"Select"} disabled>Select</option>
                    {
                        itm?.option?.map((selitm) => {
                            return <option key={selitm.value} value={selitm.value}>{selitm.label}</option>
                        })
                    }
                </select>
                {/* <p className='text-xs text-red-700'>{errors[itm?.name]?.message}</p> */}

                {itm.value == "Dropdown" ? <input type={"text"} /> : <></>}
            </div>
        </>

        // <>
        //     {itm.amp ? (
        //         <>
        //           <select
        //                 onChange={itm.onChanging ? itm.onChanging : null}
        //                 {...register(itm.name, {
        //                     required: itm.required ? "This Field is required" : false,
        //                     ...itm.props
        //                 })}
        //                 className={"bg-white border-black border block h-8 w-full rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
        //             >
        //                 <option selected value={"Select"} disabled>Select</option>
        //                 {
        //                     itm.option.map((selitm) => {
        //                         return <option key={selitm.value} value={selitm.value}>{selitm.label}</option>
        //                     })
        //                 }
        //             </select>  
        //         </>
        //     ) : (
        //         <>
        //             <select
        //                 onChange={itm.onChanging ? itm.onChanging : null}
        //                 {...register(itm.name, {
        //                     required: itm.required ? "This Field is required" : false,
        //                     ...itm.props
        //                 })}
        //                 className={"bg-white border-black border block h-8 w-full rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
        //             >
        //                 <option selected value={"Select"} disabled>Select</option>
        //                 {
        //                     itm.option.map((selitm) => {
        //                         return <option key={selitm.value} value={selitm.value}>{selitm.label}</option>
        //                     })
        //                 }
        //             </select>
        //         </>
        //     )}
        //     <p className='text-xs text-red-700'>{errors[itm.name]?.message}</p>
        // </>
    );
};

export default SelectDropDown;
