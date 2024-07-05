import React, { useState, useEffect, useRef } from 'react';


const WithSideImage = ({ form, labeling, formclass,sideImage }) => {

    return <>
        <div className='h-full w-full flex bg-gradient-to-r from-indigo-100 via-blue-300 to-violet-300'> 
            <div className={"md:w-1/2 flex bg-no-repeat bg-center overflow-hidden bg-gradient-to-r from-indigo-200 via-blue-400 to-violet-500"+sideImage}>
            <div className="flex justify-center items-center">
            <img className="w-3/4 h-3/4" src="/logo.png" alt="PIMS" />
            </div>
            </div>
            <div className="w-1/2 flex flex-col items-center m-auto dark:bg-darkBg" >

                <div className=" my-auto sm:w-full sm:max-w-sm md:max-w-xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex justify-center items-center">
                    <img className="w-24 h-14 " src="/logo.png" alt="PIMS" />
                    </div>
                        {/* <div className="mx-auto font-kat text-txt-neavy text-5xl text-center dark:text-darkBg">PMIS</div> */}
                        <h2 className="mt-2 text-center font-bold text-2xl font-body leading-9 tracking-tight text-txt-neavy dark:text-darkBg">{labeling}</h2>
                    </div>

                    <div className={`overflow-scroll nobar mt-4 bg-gradient-to-r from-blue-300 via-blue-400 to-violet-300 rounded-lg ${formclass}`}>

                        {form}
                    </div>
                </div>

            </div>
        </div>
    </>
}



export default WithSideImage;