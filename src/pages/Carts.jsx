import React from 'react'


export let investor = [
    {
        id: 1,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Corn",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 2,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Steve Smith",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 3,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Mark Boucher",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 4,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Harry cook",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 5,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Mario Martinez",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 6,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Tim Draper",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 7,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Joe Preeze",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 8,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Hunter Walk",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 9,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Charles Hudson",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 10,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Sara Guo",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 11,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Bred feld",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 12,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Febrico Grinda",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 13,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Martin Guptil",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    },
    {
        id: 14,
        img: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740",
        name: "Brad feld",
        Date: "Aug 9, 2017 AT 12:00 AM",
        Text: "Conference call TO discuss synergies",
        status: "Owner You"
    }
];

function Carts() {
    return (
        <div>
            <div>
                <div className='  grid gap-8 p-4 grid-row-4 grid-cols-4 ' >

                    {investor.map((itm) => {

                        return <>
                            <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className='flex justify-start items-center text-lg text-gray-500 bg-gray-100 p-2'>
                                    <a href="#">
                                        <img className="rounded-t-lg" src={itm.img} alt="" width="60px" />
                                    </a>
                                    <div className="p-2">
                                        <p className='text-center font-bold'>{itm.name}</p>
                                    </div>
                                </div>
                                <div className='p-4 mt-2'>
                                    <p className='font-bold'>{itm.Date}</p>
                                    <p className=''>{itm.Text}</p>
                                </div>
                                <div className=' mt-2' style={{ backgroundColor: "#078a8a" }}>
                                    <p className='text-white p-2 text-xl '>{itm.status}</p>
                                </div>
                            </div>
                        </>
                    })}
                </div>

            </div>
        </div>
    )
}

export default Carts

