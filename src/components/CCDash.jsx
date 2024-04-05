import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { backendassetUrl } from '../utils/url'

const CCDash = ({oppshowbtn=false, opplabel="", showbtn = true, onpassclick=()=>{},  label = "", settype, approveddata }) => {

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
            showbtn && <div className='flex p-4'>
                <Button classes='w-auto' onClick={() => {
                    settype(true)
                }} name={label} />
            </div>
        }
        {
            oppshowbtn && <div className='flex p-3 ml-auto'>
                <Button classes='w-auto' onClick={onpassclick} name={opplabel} />
            </div>
        }
        </div>
        <div className='p-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 grid col-span-12 rounded-md gap-2' >
            {approveddata}
        </div>
    </>
}

export default CCDash