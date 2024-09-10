import React from 'react';
import { moreinfo } from '../utils/commonFunnction';

const Modalmoreinfo = ({ value, setModalBody, setOpenModal,ctt=100 }) => {
    
    if (value?.length > 100) {
        return <>
            <div class="">
                <div class="group flex flex-col relative items-center w-full">
                    <p className='cursor-pointer text-center' onClick={()=>{
                        setOpenModal(true)
                        setModalBody(<p className='p-3 overflow-y-scroll text-center text-white'>{value}</p>)
                    }}>{moreinfo(value, ctt) + "..."}</p>
                    <span
                        class="pointer-events-none w-max absolute -top-1 -right-0 bg-green-400 z-50 rounded-md p-[4px] opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        {"Tap for moreInfo..."}
                    </span>
                </div>
            </div>
            <p data-tooltip-target="tooltip-hover"></p>
        </>
    } else {
        return <p>{value}</p>
    }

}

export default Modalmoreinfo