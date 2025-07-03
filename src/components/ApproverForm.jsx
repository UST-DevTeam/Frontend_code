import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import PTWActions from '../store/actions/ptw-actions';

const ApproverForm = ({selectedRow ,type,setmodalOpen,setmodalBody,setmodalHead,setSelectedRow}) => {
     const ApproverData = useRef(""); 
    const dispatch = useDispatch();

    console.log(selectedRow.projectType,"__rowData")
    useEffect(()=>{
        dispatch(PTWActions.getPtwApprover(true,`projectType=${selectedRow?.projectType}`));
    },[])



    const ptwApproverData = useSelector((state)=>state?.ptwData?.PtwApproverPage);
    console.log(ptwApproverData,"   ")

 const handleModalClose = () => {
    // dataAll();   
    setmodalOpen(false);
    setmodalBody(<></>);
    setmodalHead(<></>);
    setSelectedRow(null);
  };
    
  const submitApproverAssignment = (rowData) => {
    const selectedApprover = ApproverData.current?.value;
    const comments = Data.current?.value || "";

    if (!selectedApprover) {
      alert("Please select an approver level");
      return;
    }

    const data = {
      ptwId: rowData.ptwId || rowData._id,
      ptwNumber: rowData.ptwNumber,
      approverLevel: selectedApprover,
      comments: comments,
      assignedBy: "current_user",
      assignedDate: new Date().toISOString(),
    };

    console.log("Assigning approver:", data);

    handleModalClose();
    dataAll();
  };

  return (
     <div className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Approver</label>
          <select
            className="border rounded p-2 mb-4 w-full"
            // ref={ApproverData}
            defaultValue=""
          >
            <option value="" disabled>
              Select Approver
            </option>
            {/* {options} */}
          </select>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
          <Button
            name="Submit"
            classes="mt-2 w-sm text-center flex mx-auto"
            onClick={() => submitApproverAssignment(rowData)}
          />
        </div>
      </div>
  )
}

export default ApproverForm
