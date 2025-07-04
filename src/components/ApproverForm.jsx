    // import React, { useEffect, useRef } from "react";
    // import { useDispatch, useSelector } from "react-redux";
    // import Button from "./Button";
    // import PTWActions from "../store/actions/ptw-actions";

    // const ApproverForm = ({
    // selectedRow,
    // type,
    // setmodalOpen,
    // setmodalBody,
    // setmodalHead,
    // setSelectedRow,
    // }) => {
    // const ApproverData = useRef("");
    // const dispatch = useDispatch();

    // console.log(selectedRow.projectType, "__rowData");
    // useEffect(() => {
    //     dispatch(
    //     PTWActions.getPtwApprover(true, `projectType=${selectedRow?.projectType}`)
    //     );
    // }, []);

    // const ptwApproverData = useSelector(
    //     (state) => state?.ptwData?.PtwApproverPage
    // );
    // console.log(ptwApproverData, "kkkkkkkkkkkkkkk");

    // const handleModalClose = () => {
    //     // dataAll();
    //     setmodalOpen(false);
    //     setmodalBody(<></>);
    //     setmodalHead(<></>);
    //     setSelectedRow(null);
    // };

    // const submitApproverAssignment = (rowData) => {
    //     const selectedApprover = ApproverData.current?.value;
    //     const comments = Data.current?.value || "";

    //     if (!selectedApprover) {
    //     alert("Please select an approver level");
    //     return;
    //     }

    //     const data = {
    //     ptwId: rowData.ptwId || rowData._id,
    //     ptwNumber: rowData.ptwNumber,
    //     approverLevel: selectedApprover,
    //     comments: comments,
    //     assignedBy: "current_user",
    //     assignedDate: new Date().toISOString(),
    //     };

    //     console.log("Assigning approver:", data);

    //     handleModalClose();
    //     dataAll();
    // };

    // return (
    //     <div className="p-4">
    //     <div className="mb-4">
    //         <label className="block text-sm font-medium mb-2">Approver</label>
    //         <select
    //         className="border rounded p-2 mb-4 w-full"
    //         // ref={ApproverData}
    //         defaultValue=""
    //         >
    //         <option value="" disabled>
    //             Select Approver
    //         </option>
    //         {/* {options} */}
    //         </select>
    //     </div>

    //     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
    //         <Button
    //         name="Submit"
    //         classes="mt-2 w-sm text-center flex mx-auto"
    //         onClick={() => submitApproverAssignment(rowData)}
    //         />
    //     </div>
    //     </div>
    // );
    // };

    // export default ApproverForm;



import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import PTWActions from "../store/actions/ptw-actions";

const ApproverForm = ({
  selectedRow,
  type,
  setmodalOpen,
  setmodalBody,
  setmodalHead,
  setSelectedRow,
  
}) => {
  const ApproverData = useRef("");
  const Data = useRef(""); 
  const dispatch = useDispatch();

  console.log(selectedRow.projectType, "__rowData");
  
  useEffect(() => {
    dispatch(
      PTWActions.getPtwApprover(true, `projectType=${selectedRow?.projectType}`)
    );
  }, [dispatch, selectedRow?.projectType]);

  const ptwApproverData = useSelector(
    (state) => state?.ptwData?.PtwApproverPage
  );
  
  console.log("Raw ptwApproverData:", ptwApproverData);
  console.log("ptwApproverData.data:", ptwApproverData?.data);
  console.log("State structure:", JSON.stringify(ptwApproverData, null, 2));
  
 
  const l2Approvers = React.useMemo(() => {
    console.log("=== FILTERING DEBUG ===");
    console.log("ptwApproverData:", ptwApproverData);
    
    
    let dataArray = null;
    
    if (ptwApproverData?.data && Array.isArray(ptwApproverData.data)) {
      dataArray = ptwApproverData.data;
      console.log("Using ptwApproverData.data");
    } else if (Array.isArray(ptwApproverData)) {
      dataArray = ptwApproverData;
      console.log("Using ptwApproverData directly");
    } else if (ptwApproverData?.response?.data && Array.isArray(ptwApproverData.response.data)) {
      dataArray = ptwApproverData.response.data;
      console.log("Using ptwApproverData.response.data");
    }
    
    console.log("dataArray:", dataArray);
    
    if (!dataArray || !Array.isArray(dataArray)) {
      console.log("No valid data array found");
      return [];
    }
    
    const filtered = dataArray.filter((approver) => {
      console.log("Checking approver:", approver);
      console.log("ApproverType:", approver?.ApproverType);
      console.log("Is L2-Approver:", approver?.ApproverType === "L2-Approver");
      return approver && approver.ApproverType === "L2-Approver";
    });
    
    console.log("Filtered L2 approvers:", filtered);
    console.log("=== END FILTERING DEBUG ===");
    return filtered;
  }, [ptwApproverData]);

  const handleModalClose = () => {
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
      _id:rowData.mileStoneId,
      empId: selectedApprover,
      ApproverType:"L2-Approver",
      approved:true,
      status:"L1-Approved",
    };
    dispatch(PTWActions.getPtwApproverPatch(true,data,""))

    console.log("Submitting approver assignment:", data);
    handleModalClose();
  };

 
  if (!ptwApproverData) {
    return (
      <div className="p-4">
        <div>Loading approvers...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Approver</label>
        <select
          className="border rounded p-2 mb-4 w-full"
          ref={ApproverData}
          defaultValue=""
        >
          <option value="" disabled>
            Select Approver
          </option>
          {l2Approvers && l2Approvers.length > 0 ? (
            l2Approvers.map((approver, index) => (
              <option key={approver.empId || index} value={approver.empId}>
                {approver.empName}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No L2-Approvers available
            </option>
          )}
        </select>
      </div>

     
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        <Button
          name="Submit"
          classes="mt-2 w-sm text-center flex mx-auto"
          onClick={() => submitApproverAssignment(selectedRow)}
        />
      </div>
    </div>
  );
};

export default ApproverForm;