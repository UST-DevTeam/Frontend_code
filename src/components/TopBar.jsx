import React, { useState } from 'react';

import * as Unicons from '@iconscout/react-unicons';
import MenuItem from './MenuItem';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CommonActions from '../store/actions/common-actions';

const TopBar = ({ sidebarOpen, setsidebarOpenn }) => {

    const dispatch = useDispatch()
    const { state } = useLocation()
    const name = state?.name
    const navigate = useNavigate()
    // console.log(useLocation(), "userloc")

    const calllogout = () => {
        // localStorage.setItem("auth",false)
        // localStorage.removeItem("token")
        // localStorage.removeItem("user")
        // navigate("/login")


        dispatch(CommonActions.logoutCaller(() => {
            navigate("/login")
        }))
    }

    return <>

        <div class="flex justify-between ml-0 px-3 py-3 bg-oppprimaryLine overflow-y-auto duration-150 bg-topbarLine dark:bg-topbarLine font-oxygen font-bold">
            {/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" onClick={() => {
                console.log('sdfjhkhkjshd')
                setsidebarOpenn(prev => !prev)
            }} aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button> */}
            <div className='flex space-x-4 items-center'>
                <button onClick={() => { setsidebarOpenn(prev => !prev) }} className={`border-[1.5px] rounded-full ${sidebarOpen && 'rotate-180'}`}>
                    {/* <Unicons.UilArrowCircleLeft size="36" style={{ color: "white" }} /> */}
                    <Unicons.UilArrowRight 
                    className="hover:text-heading transition-all duration-300 text-white"
                    size="24" 
                    // style={{ color: isHovered ? "green" :"white",
                    // transition: 'all 300ms ease-in-out'
                    // }} 
                    // onMouseEnter ={()=>{setIsHovered(true)}}
                    // onMouseLeave ={()=>{setIsHovered(false)}}
                    />
                </button>
                <h1 className='font-semibold text-white'>{name || ""}</h1>
            </div>   

            <div onClick={() => { calllogout() }} className='dark:text-white flex space-x-1 cursor-pointer items-center'>
                <span className='text-white pr-1 hover:text-heading hover:cursor-pointer'>Logout</span>
                <Unicons.UilSignout fill="#13b497" className="hover:text-heading hover:cursor-pointer" />
            </div>
        </div>

    </>
}

export default TopBar


// import React, { useState } from 'react';
// import * as Unicons from '@iconscout/react-unicons';
// import MenuItem from './MenuItem';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import CommonActions from '../store/actions/common-actions';

// const TopBar = ({ sidebarOpen, setsidebarOpenn }) => {
//     const dispatch = useDispatch();
//     const [openProfile, setOpenProfile] = useState(false);
//     const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//     const { state } = useLocation();
//     const name = state?.name;
//     const navigate = useNavigate();
//     console.log(useLocation(), "userloc");

//     const calllogout = () => {
//         dispatch(CommonActions.logoutCaller(() => {
//             navigate("/login");
//         }));
//     };

//     const links = [
//         {
//             name: "Log Out",
//             href: "/signout"
//         },
//     ];

//     return (
//         <>
//             <div className="flex justify-between ml-0 px-3 py-3 bg-oppprimaryLine overflow-y-auto duration-150 bg-topbarLine dark:bg-topbarLine font-oxygen font-bold">
//                 <div className='flex space-x-4 items-center'>
//                     <button
//                         onClick={() => { setsidebarOpenn(prev => !prev) }}
//                         className={`border-[1.5px] rounded-full ${sidebarOpen && 'rotate-180'}`}
//                     >
//                         <Unicons.UilArrowRight
//                             className="hover:text-heading transition-all duration-300 text-white"
//                             size="24"
//                         />
//                     </button>
//                     <h1 className='font-semibold text-white'>{name || ""}</h1>
//                 </div>

//                 <div
//                     onClick={() => setOpenProfile(prev => !prev)}
//                     className='flex px-3 py-1 rounded-full relative cursor-pointer items-center space-x-1 sm:space-x-3'
//                 >
//                     <div className='flex gap-3'>
//                         <div className='w-10 h-10 sm:w-11 sm:h-11 overflow-hidden'></div>
//                     </div>
//                     {
//                         openProfile && (
//                             <div className="absolute z-[9999] shadow-2xl top-[120%] after:content-[''] after:w-4 after:h-4 after:-top-2 after:right-0 after:rotate-180 after:rounded-br-full after:bg-main after:-z-100 after:absolute profile-box right-4 bg-white dark:bg-gray-800">
//                                 {
//                                     links.map(item => {
//                                         return (
//                                             <div
//                                                 key={item.name}
//                                                 className="hover:bg-hover bg-white dark:bg-gray-700 z-50 cursor-pointer px-4 py-2 w-[160px] after:content-[''] after:transition-all hover:after:bg-main after:w-1 after:left-0 after:top-0 after:bottom-0 after:h-full after:absolute relative"
//                                                 onClick={() => setShowLogoutConfirm(true)}
//                                             >
//                                                 <span className="text-sm">{item.name}</span>
//                                             </div>
//                                         );
//                                     })
//                                 }
//                             </div>
//                         )
//                     }
//                 </div>

//                 <div className='relative'>
//                     <div
//                         onClick={() => setShowLogoutConfirm(true)}
//                         className='dark:text-white flex space-x-1 cursor-pointer items-center'
//                     >
//                         <span className='text-white pr-1 hover:text-heading hover:cursor-pointer'>Logout</span>
//                         <Unicons.UilSignout fill="#13b497" className="hover:text-heading hover:cursor-pointer" />
//                     </div>
//                 </div>
//             </div>

//             {showLogoutConfirm && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
//                     <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
//                         <p className="mb-4">Are you sure you want to log out?</p>
//                         <div className="flex justify-end space-x-2">
//                             <button
//                                 className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
//                                 onClick={() => setShowLogoutConfirm(false)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                                 onClick={() => {
//                                     setShowLogoutConfirm(false);
//                                     calllogout();
//                                 }}
//                             >
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default TopBar;
