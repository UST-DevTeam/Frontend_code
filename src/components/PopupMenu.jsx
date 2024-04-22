import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { UilFilter } from '@iconscout/react-unicons'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ComponentActions from '../store/actions/component-actions'


const PopupMenu = ({ dataclasses = "", classes = "", popupname = "", name, child, icon }) => {

    // const [filterVisiblity, setfilterVisiblity] = useState(false)

    let filterVisiblity = useSelector((state) => {
        return state.component.popmenu
    })

    const buttonRef = useRef(null);
    const location = useLocation()
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(ComponentActions.popmenu(location.pathname + "_" + name,true))
    };

    const handleClickOutside = (event) => {
        console.log(buttonRef.current && !buttonRef.current.contains(event.target), "event.target")
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            dispatch(ComponentActions.popmenu(location.pathname + "_" + name,false))
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    console.log(location.pathname, filterVisiblity, 'navigate')

    return <>
        <div ref={buttonRef} className={`mr-1 h-full z-40 relative ${classes} ${popupname == "" ? "w-12" : "w-full"}`}>
            <Button classes={" h-full"} onClick={handleClick} icon={icon} name={popupname} />

            {/* <PopupMenu visiblity={filterVisiblity} /> */}
            {
                filterVisiblity == location.pathname + "_" + name ? <div className={dataclasses + ' absolute top-12 right-0 border-black border-2 w-96 bg-white pos'}>
                    <div className='flex justify-center bg-secLine text-white'><h5 className='text-base font-bold'>{name}</h5></div>
                    {child}</div> : ""
            }

        </div>
    </>
}

export default PopupMenu
