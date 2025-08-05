    import React, { useEffect, useRef } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import Button from "./Button";
    import PTWActions from "../store/actions/ptw-actions";

    const RejectionForm = ({
    selectedRow,
    type,
    setmodalOpen,
    setmodalBody,
    setmodalHead,
    setSelectedRow,
    }) => {

 <div className=''>
        <p>{Heading}</p>
        
        <Button
              name={"Ok"}
              classes="w-auto"
              onClick={(e) => {
                dispatch(PTWActions.getPtwApproverAlert(true,sendData,""))

                
              }}
            />
            <Button
              name={"Cancel"}
              classes="w-auto"
              onClick={(e) => {
               setmodalOpen(false)
              }}
            />
    </div>
    };

    export default RejectionForm;