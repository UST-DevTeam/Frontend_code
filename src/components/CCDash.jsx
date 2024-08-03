import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { backendassetUrl } from '../utils/url'
import { getAccessType } from '../utils/commonFunnction'
import ConditionalButton from './ConditionalButton'


const CCDash = ({oppshowbtn=false, opplabel="", showbtn = true, onpassclick=()=>{},  label = "", settype, approveddata, className }) => {

    const navigate = useNavigate()

    // let data = [
    //     ["bg-", "bg-[#143b64]"],
    //     ["w-", "w-full"]
    // ]

    // let tkn = 1
    // let value = ""

    // data.map((itm) => {
    //     if (classes.search(itm[0]) == -1) {
    //         value = value + " " + itm[1]
    //     }
    // })

    // classes = classes + value



    {/* <div>{itm[innerCmp]}</div> */ }



    return <>
        <div className='flex'>
        {
            showbtn && 
            <div className='flex p-2'>
                <ConditionalButton showType={getAccessType(label)} classes='w-auto h-10 bg-yellow-600 border-[0.5px] border-yellow-800 text-[#3e454d]' onClick={() => {
                    settype(true)
                }} name={label} />
            </div>
        }
        {
            oppshowbtn && <div className='flex mr-2 ml-auto'>

                <ConditionalButton showType={getAccessType(opplabel)} classes='w-auto h-12 bg-orange-400 text-[18px] border-[0.5px] border-orange-500 custom-classs' onClick={onpassclick} name={opplabel} />
            </div>
        }
        </div>
        <div className='p-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 grid col-span-12 rounded-md gap-3' >
            {approveddata}
        </div>
        {/* <div className={`p-2 w-1/6 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 col-span-12 rounded-md gap-2 flex flex-wrap justify-center items-start ${className}`}>
            {approveddata}
        </div> */}

    </>
}

export default CCDash