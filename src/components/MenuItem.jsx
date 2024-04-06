import React, { useState } from 'react';

import * as Unicons from '@iconscout/react-unicons';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ itm, value, sidebarOpen, size, permission,checkp, parenting }) => {

    const sizeArr = [ "xs", "xs"]
    const [open, SetOpen] = useState(false)


    const { pathname } = useLocation()
    // const [open,SetOpen] = useState(true)
    // console.log(checkp,"permissionpermission")
    // if(checkp){
    //     console.log("29",permission,itm.link,parenting ? permission[parenting] : permission[parenting] && permission[parenting].indexOf(itm.link)!=-1 ,itm.link , "permissionpermission")
    // }
    return <>

        {
            itm.subMenu.length > 0 ?
                ((!checkp)||(checkp != {} && itm.link==parenting ? permission[parenting] : permission[parenting] && permission[parenting].indexOf(itm.link)!=-1)) && 
                    <button onClick={((prev) => { SetOpen(!open), console.log(!open) })} type="button" class={"pl-2 flex items-center w-full p-2 text-sm font-light transition duration-75 hover:bg-[#143b64] rounded-lg group text-white"} aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        {itm.icon}
                        {sidebarOpen && <span class={"text-" + sizeArr[size] + " flex-1 ml-3 text-left whitespace-nowrap hover:text-gray-200 hover:bg-[#143b64]"} sidebar-toggle-item>{itm.name}</span>}
                        {open ? <Unicons.UilAngleUp /> : <Unicons.UilAngleDown />}
                    </button> 
                
                : 
                
                ((!checkp)||(checkp && itm.link==parenting ? permission[parenting] : permission[parenting] && permission[parenting].indexOf(itm.link)!=-1)) && 
                    <div className={`pl-2 flex items-center w-full p-2 first-letter hover:text-gray-200 hover:rounded-md  ${itm.link == pathname && "text-[#e8c670]"}`}>
                        {itm.icon}
                        {
                            sidebarOpen && <Link to={itm.link} state={{ name: itm.name }} class={`text-${sizeArr[size]} pl-3 text-sm font-light hover:text-gray-200 hover:bg- transition duration-75 rounded-lg group ${itm.link == pathname && "text-[#e8c670]"}`}>
                                {itm.name}
                            </Link>
                        }
                    </div>


            // permission[itm?.link] && permission[itm?.link].indexOf(itm?.link) && <>
            //     
            // </> :
            //     permission[parenting] && permission[parenting].indexOf(itm?.link) &&
            //     <div className={`pl-2 flex items-center w-full p-2 first-letter  ${itm.link == pathname && "text-orange-400"}`}>
            //         {itm.icon}
            //         {
            //             sidebarOpen &&
            //             <Link to={itm.link} state={{ name: itm.name }} class={`text-${sizeArr[size]} pl-3 text-base font-normal  transition duration-75 rounded-lg group ${itm.link == pathname && "text-orange-400"}`}>
            //                 {itm.name}
            //             </Link>

            //         }
            //     </div>

        }

        {
            itm.subMenu.length > 0 && open && <ul id="dropdown-example" class="py-2 pl-3 space-y-2">
                {
                    itm.subMenu.map((nestItm) => {
                        return <MenuItem
                            itm={nestItm}
                            value={value + 10}
                            sidebarOpen={sidebarOpen}
                            size={size + 1}
                            checkp={checkp}
                            permission={permission}
                            parenting={itm.link}
                        />
                    })
                }
            </ul>
        }
    </>
}

export default MenuItem