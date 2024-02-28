import React, { useState, useEffect, useRef } from 'react';


const WithSideImage = ({ form, labeling, formclass,sideImage }) => {

    return <>
        <div className='h-full w-full flex'> 
            <div className={"md:w-1/2 flex bg-no-repeat bg-center overflow-hidden bg-orange-50 "+sideImage}>
            </div>
            <div className="w-1/2 flex flex-col items-center m-auto dark:bg-darkBg" >

                <div className=" my-auto sm:w-full sm:max-w-sm md:max-w-xl p-4">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {/* <img className="mx-auto w-[240px]" src="/logo.png" alt="Datayog" /> */}
                        <div className="mx-auto font-kat text-txt-neavy text-5xl text-center dark:text-darkBg">PMIS</div>
                        <h2 className="mt-4 text-center text-2xl font-body leading-9 tracking-tight text-txt-neavy dark:text-darkBg">{labeling}</h2>
                    </div>

                    <div className={`overflow-scroll nobar mb-4 bg-orange-50 rounded-lg ${formclass}`}>

                        {form}
                    </div>
                </div>

            </div>
        </div>
    </>
}



export default WithSideImage;