import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ComponentActions from '../store/actions/component-actions';

const PopupMenu = ({ dataclasses = "", classes = "", popupname = "", name, child, icon, bgColor}) => {
    const buttonRef = useRef(null);
    const modalRef = useRef(null);
    const location = useLocation();
    const dispatch = useDispatch();

    const filterVisibility = useSelector((state) => state.component.popmenu);

    const handleClick = () => {
        dispatch(ComponentActions.popmenu(location.pathname + "_" + name, !filterVisibility));
    };

    const handleClickOutside = (event) => {
        if (!buttonRef?.current?.contains(event.target) && !modalRef?.current?.contains(event.target)) {
            dispatch(ComponentActions.popmenu(location.pathname + "_" + name, false));
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (filterVisibility === location.pathname + "_" + name) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const modalWidth = modalRef.current.offsetWidth;
            const screenWidth = window.innerWidth;
    
            if (buttonRect.right + modalWidth > screenWidth) {
                // Open on the left
                modalRef.current.style.right = `${screenWidth - buttonRect.right}px`;
                modalRef.current.style.left = "auto";
            } else {
                // Open on the right
                modalRef.current.style.left = `${buttonRect.left}px`;
                modalRef.current.style.right = "auto";
            }
        }
    }, [filterVisibility]);

    return (
        <div ref={buttonRef} className={`mr-1 h-10 z-40 relative left-0 right-0 mx-auto z-[1000] ${classes} ${popupname === "" ? "w-12" : "w-full"}`}>
            <Button classes={`h-full ${bgColor}`} onClick={handleClick} icon={icon} name={popupname} />
            {
                filterVisibility === location.pathname + "_" + name &&
                <div ref={modalRef} className={`${dataclasses} fixed border-black border-2 bg-white w-96 pos`}>
                    <div className='flex justify-center bg-secLine text-white '><h5 className='text-base font-bold'>{name}</h5></div>
                    {child}
                </div>
            }
        </div>
    );
}

export default PopupMenu;