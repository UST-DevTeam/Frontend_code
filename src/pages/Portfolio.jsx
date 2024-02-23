import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



export let portfoliocart = [
    {
        id: 1,
        name: "previous company",
        Date: "Aug 15, 2019 AT 09:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 2,
        name: "Investor Deatil",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "confirmed"
    },
    {
        id: 2,
        name: "Previous investment",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "confirmed"
    },
    {
        id: 2,
        name: "current Investment",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "confirmed"
    },
    {
        id: 2,
        name: "Next company",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "confirmed"
    },
    {
        id: 2,
        name: "Next company",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "confirmed"
    },
]

// const getdata = async (data) => {
//     const res = await Api.get({ url: Urls.profile, data: data })
//     if (res?.data !== 200) {
//         console.log(res?.data, "fyetwfyefewf")
//     }
// }



function Portfolio() {
    // useEffect(() => {
    //     getdata('chauhan')
    // }, [])
    return (
        <div className='p-4'>

            <h2 className='text-gray-500 mb-2'>Portfolio</h2>
            <div className="transition-all ease-in-out delay-100 hover:translate-y-1 hover:scale-104 duration-300 shadow-xl grid grid-cols-1 p-4 rounded-lg bg-gray-200">
                <div className="flex gap-4 ">
                    <div>
                        <div>
                            <p className="text-sm  mt-6">First Name:</p>
                        </div>
                        <div>
                            <p className="text-sm mt-6">Last Name:</p>
                        </div>
                        <div>
                            <p className="text-sm mt-6">Email Adress:</p>
                        </div>
                        <div>
                            <p className="text-sm mt-6">Mobile Number:</p>
                        </div>

                    </div>
                    <div>
                        <div>
                            <p className="text-sm font-bold mt-6">
                                deepak
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-bold mt-6">
                                chauhan
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-bold mt-6">dc1536326@gmail.com</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold mt-6">7505620556</p>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 mt-4 gap-6">
                {portfoliocart.map((itm) => (
                    <div className='shadow-xl transition-all ease-in-out delay-100 hover:translate-y-1 hover:scale-105 duration-300 bg-gray-200 p-4 rounded-lg'>
                        <p>{itm.name}</p>
                        <p className='mt-2'>{itm.Date}</p>
                        <p className='mt-2'>{itm.status}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Portfolio
