

import React, { useEffect, useState } from 'react';
import { UilMultiply } from '@iconscout/react-unicons'
import { parseTwoDigit } from '../utils/commonFunnction';

const ProgressBar = ({ text,percent, notifyType }) => {
    let colorList = {
        "error": ["bg-red-900", "bg-red-500"],
        "alert": ["bg-red-900", "bg-red-500"],
        "warning": ["bg-yellow-900", "bg-yellow-500"],
        "success": ["bg-green-900", "bg-green-500"],
        "info": ["bg-blue-900", "bg-blue-500"]
    }
    console.log(notifyType, "notifyType colorList", colorList)
    return <div class="w-[84%] relative bg-gray-200 rounded-full h-5 dark:bg-gray-700 m-2">
        <div className='flex absolute w-full justify-center'>
            <p className='text-center '>{text}</p>
        </div>
        <div class={`${colorList[notifyType][1]} h-5 rounded-full`} style={{ width: `${percent}%` }}>
        </div>
    </div>
    return <div><span class={`${colorList[notifyType][1]} flex rounded-full uppercase px-2 py-1 w-fit text-xs text-white font-bold mr-3`}>{text}</span></div>
}

export default ProgressBar
