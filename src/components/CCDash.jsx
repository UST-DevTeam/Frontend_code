import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { backendassetUrl } from '../utils/url'

const CCDash = ({ data, name, img = "", url = "", label = "", settype,nextNavigate }) => {

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
        <div className='flex p-2'>
            <Button classes='w-auto' onClick={() => {
                settype(true)
            }} name={label} />
        </div>
        <div className='p-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 grid col-span-12 rounded-md gap-4' >
            {
                data?.map((itm => {
                    return <>
                        <div
                            className='bg-pink-100 shadow-md hover:shadow-rxl w-full flex h-24 cursor-pointer'
                            onClick={() => {
                                navigate(`${nextNavigate}/${itm["uniqueId"]}}`)
                            }}>
                            {itm[img] && itm[img] != "" && <><img className='m-auto w-24' src={backendassetUrl+itm[img]} /></>}
                            <div className='m-auto '>{itm[name]}</div>
                        </div>
                    </>
                }))
            }

        </div>
    </>
}

export default CCDash