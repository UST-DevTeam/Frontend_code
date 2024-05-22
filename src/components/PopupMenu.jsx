// import React, { useEffect, useRef, useState } from "react";
// import Button from "./Button";
// import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import ComponentActions from "../store/actions/component-actions";

// const PopupMenu = ({
//   dataclasses = "",
//   classes = "",
//   popupname = "",
//   name,
//   child,
//   icon,
//   bgColor,
// }) => {
//   const buttonRef = useRef(null);
//   const modalRef = useRef(null);
//   const topmodalRef = useRef(null);
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const filterVisibility = useSelector((state) => state.component.popmenu);

//   const handleClick = () => {
//     dispatch(
//       ComponentActions.popmenu(
//         location.pathname + "_" + name,
//         !filterVisibility
//       )
//     );
//   };

//   const handleClickOutside = (event) => {
//     console.log(
//       !buttonRef?.current?.contains(event.target) &&
//         !document.getElementById("modalInner").contains(event.target),
//       "sahdashdksadsa"
//     );

//     // if (
//     //   !buttonRef?.current?.contains(event.target) &&
//     //   !document.getElementById("modalInner").contains(event.target)
//     // ) {
//     //   dispatch(ComponentActions.popmenu(location.pathname + "_" + name, false));
//     // }

//     // const isOutsideModal =
//     //   !buttonRef?.current?.contains(event.target) &&
//     //   !document.getElementById("modalInner").contains(event.target);

//     // const isInsideModalInner = event.target.closest("#modalInner") !== null;

//     // // Check if the click is outside the modal but not inside the modal inner
//     // if (isOutsideModal && !isInsideModalInner) {
//     //   dispatch(ComponentActions.popmenu(location.pathname + "_" + name, false));
//     // }

//     const isOutsideModal =
//       !buttonRef?.current?.contains(event.target) &&
//       !event.target.closest("#modalInner button");

//     // Check if the click is outside the modal but not inside the buttons inside the modal
//     if (isOutsideModal && !event.target.closest("#modalInner button")) {
//       dispatch(ComponentActions.popmenu(location.pathname + "_" + name, false));
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     if (filterVisibility === location.pathname + "_" + name) {
//       const buttonRect = buttonRef.current.getBoundingClientRect();
//       const modalWidth = modalRef.current.offsetWidth;
//       const screenWidth = window.innerWidth;

//       if (buttonRect.right + modalWidth > screenWidth) {
//         // Open on the left
//         modalRef.current.style.right = `${screenWidth - buttonRect.right}px`;
//         modalRef.current.style.left = "auto";
//       } else {
//         // Open on the right
//         modalRef.current.style.left = `${buttonRect.left}px`;
//         modalRef.current.style.right = "auto";
//       }
//     }
//   }, [filterVisibility, modalRef.current]);

//   useEffect(() => {
//     modalRef.current?.addEventListener("click", (e) => {
//       console.log("modalRef.current77", modalRef.current, e);
//       e.stopPropagation();
//     });
//     console.log("modalRef.current80", modalRef.current);
//   }, [modalRef.current]);

//   return (
//     <div
//       ref={buttonRef}
//       className={`mr-1 h-10 z-40 relative left-0 right-0 mx-auto z-[1000] ${classes} ${
//         popupname === "" ? "w-12" : "w-full"
//       }`}
//     >
//       <Button
//         classes={`h-full ${bgColor}`}
//         onClick={handleClick}
//         icon={icon}
//         name={popupname}
//       />
//       {filterVisibility === location.pathname + "_" + name && (
//         <div
//           ref={modalRef}
//           id="modalInner"
//           className={`${dataclasses} fixed border-black border-2 bg-white w-96 pos`}
//         >
//           <div className="flex justify-center bg-secLine text-white ">
//             <h5 className="text-base font-bold">{name}</h5>
//           </div>
//           {child}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PopupMenu;




import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ComponentActions from '../store/actions/component-actions';

const PopupMenu = ({ dataclasses = "", classes = "", popupname = "", name, child, icon }) => {
    const buttonRef = useRef(null);
    const modalRef = useRef(null);
    const location = useLocation();
    const dispatch = useDispatch();

    const filterVisibility = useSelector((state) => state.component.popmenu);

    const handleClick = () => {
        dispatch(ComponentActions.popmenu(location.pathname + "_" + name, !filterVisibility));
    };

    const handleClickOutside = (event) => {
        if (!buttonRef.current.contains(event.target) && !modalRef.current.contains(event.target)) {
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
            <Button classes={"h-full"} onClick={handleClick} icon={icon} name={popupname} />
            {
                filterVisibility === location.pathname + "_" + name &&
                <div ref={modalRef} className={`${dataclasses} fixed border-black border-2 w-96 bg-white pos`}>
                    <div className='flex justify-center bg-secLine text-white '><h5 className='text-base font-bold'>{name}</h5></div>
                    {child}
                </div>
            }
        </div>
    );
}

export default PopupMenu;