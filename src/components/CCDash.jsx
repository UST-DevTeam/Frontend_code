import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { backendassetUrl } from '../utils/url'

const CCDash = ({ showbtn = true, label = "", settype, approveddata }) => {

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
        {
            showbtn && <div className='flex p-2'>
                <Button classes='w-auto' onClick={() => {
                    settype(true)
                }} name={label} />
            </div>
        }
        <div className='p-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 grid col-span-12 rounded-md gap-4' >
            {approveddata}
        </div>
    </>
}

export default CCDash