import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TbPlayerEjectFilled } from "react-icons/tb";
import moment from "moment";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import CstmButton from "../../../components/CstmButton";
import FileUploader from "../../../components/FIleUploader";
import PTWActions from "../../../store/actions/ptw-actions";
import { AiOutlineEdit } from "react-icons/ai";
import CommonActions from "../../../store/actions/common-actions";
import { Urls } from "../../../utils/url";
import { objectToQueryString } from "../../../utils/commonFunnction";
import ApproverForm from "../../../components/ApproverForm";
import RejectionForm from "../../../components/RejectionForm";
import CommonAlert from "../../../components/Common Alert/CommonAlert";
import Api from "../../../utils/api";
import CommonForm from "../../../components/CommonForm";
import { CiFilter } from "react-icons/ci";
import { GET_APPROVER_PAGE } from "../../../store/reducers/ptw-reducer";
import PTWApproverFormEdit from "../../../components/PTW form Edit Approver Page/PTWApproverFormEdit";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa";



const ApproverPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type } = useParams();
  const { projectType } = useParams();
  const { _id } = useParams();
  const [modalOpen, setmodalOpen] = useState(false);
  const [rejectionModal, setRejectionModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filter, setFilter] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const RejectionForm = useRef(null);
  const [fileOpen, setFileOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  let { uniqueId } = JSON.parse(localStorage.getItem("user"));
  const Data = useRef("");
  const options = [

    
    ...(type === 'l1Approver' ? [{ id: "Submitted", name: "Submitted" },{ id: "L1-Rejected", name: "L1-Rejected" }] : [] ),
    { id: "L1-Approved", name: "L1-Approved" },
    { id: "L2-Approved", name: "L2-Approved" },
    
    { id: "L2-Rejected", name: "L2-Rejected" },
    { id: "Closed", name: "Closed" },
    { id: "Auto Closed", name: "Auto Closed" },
  ];
  const {
    register,
    handleSubmit,
    SubmitTask,
    watch,
    setValue,
    setValues,
    setError,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const [year] = useState(new Date().getFullYear());

  const dataAll = () => {
    dispatch(PTWActions.getApproverPage(true, `ApproverType=${type}`));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems([...options]);
    } else {
      setSelectedItems([]);
    }
  };
  const handleCheckboxChange = (optionId, optionName) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((item) => item.id === optionId);

      if (isSelected) {
        // Remove item if already selected
        return prev.filter((item) => item.id !== optionId);
      } else {
        // Add item if not selected
        return [...prev, { id: optionId, name: optionName }];
      }
    });
  };
  const handleContinue = async () => {
    const res = await Api.post({
      url: '/approverData',
      data: {
        userUniqueId: uniqueId,
        ApproverType: type === 'l1Approver' ? 'l1Approver' : 'l2Approver',
        status: selectedItems?.map(item => item.id)
      }
    })
    console.log(res?.data?.data, 'fasdfasdfasdfasdfasdfasdfasdfasdfas')
    if (res?.status === 200) {
      dispatch(GET_APPROVER_PAGE({ dataAll: res?.data?.data, reset: true }));
      setFilter(false)
    }

  }

  const handleEdit = async (item) => {
    const res = await Api.get({
      url: `/ptwFormData?ptwNumber=${item?.ptwNumber}`,
    })
    console.log(item,"___itemdata")
    if(res?.status === 200){

      console.log(res?.data?.data , 'afsdfasdfasdfasdfasdfs')
      
      const formType = res?.data?.data?.formType
      const formData = res?.data?.data?.formData
      console.log(formType,"__FormType")
      
      
      setmodalBody(<PTWApproverFormEdit formType={formType} formData={formData} setmodalOpen={setmodalOpen} flowType={res?.data?.data?.flow} itemData={item} setmodalHead={setmodalHead}/>)
      setmodalOpen(true)


    }
  }



  const extractRowData = (rowData) => {
    const extractedData = {};

    Object.keys(tableData).forEach((key) => {
      if (rowData.hasOwnProperty(key)) {
        extractedData[key] = rowData[key];
      }
    });

    extractedData.downloadTimestamp = new Date().toISOString();
    extractedData.downloadType = "";

    return extractedData;
  };

  const handleRejection = async (data, id) => {
    const allData = {
      rejectionReason: data,
      approved: false,
      empId: uniqueId,
      ApproverType: type === 'l1Approver' ? 'L1-Approver' : 'L2-Approver',
      status: type === 'l1Approver' ? 'L1-Rejected' : 'L2-Rejected',
    };
    const res = await Api.patch({
      url: `/submit/rejection/${id}`,
      data: allData,
    })
    if (res?.status === 200) {
      setRejectionModal(false)
      dataAll()
    }
  };

  const table = {
     columns: [
      {
        name: "PTW No.",
        value: "ptwNumber",
        style: "text-center min-w-[100px]",
        render: (value, row) => (
          <span
            className="text-blue-600 hover:text-blue-800 cursor-pointer underline font-medium"
            onClick={() => handlePTWClick(row)}
            title="Click to view PTW details"
          >
            {value}
          </span>
        ),
      },

      {
        name: "Milestone",
        value: "Milestone",
        style: "text-center min-w-[100px]",
      },
      {
        name: "Site ID",
        value: "siteId",
        style: "text-center min-w-[100px]",
      },
      {
        name: "SSID",
        value: "ssId",
       
        style: "text-center min-w-[100px]",
      },
      {
        name: "Unique ID",
        value: "uniqueId",
        hide : true,
        style: "text-center min-w-[100px]",
      },
      {
        name: "SR Number",
        value: "srNumber",
        hide : true,
        style: "text-center min-w-[100px]",
      },
      {
        name: "Project Group",
        value: "projectGroupName",
        hide : true,
        style: "text-center min-w-[120px]",
      },
      {
        name: "Project ID",
        value: "projectID",
        style: "text-center min-w-[100px]",
      },
      {
        name: "Project Type",
        value: "projectType",
        style: "text-center min-w-[120px]",
      },
      {
        name: "Sub Project",
        value: "subProject",
        style: "text-center min-w-[120px]",
      },
      {
        name: "Submission Date",
        value: "submissionDate",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Completion Date",
        value: "ptwCreationDate",
        style: "text-center min-w-[120px]",
      },
      {
        name: "Approval/Rejection Date",
        value: "actionDate",
        style: "text-center min-w-[180px]",
      },
      {
        name: "L2 Action Date",
        value: "l2ActionDAte",
        style: "text-center min-w-[120px]",
      },
      {
        name: "L1-Aging",
        value: "l1Ageing",
        hide : true,
        style: "text-center min-w-[100px]",
      },
      {
        name: "L2-Aging",
        value: "l2Ageing",
        hide : true,
        style: "text-center min-w-[100px]",
      },
      {
        name: "Form & Checklist Attachment",
        value: "ptwFormStatus",
        style: "text-center min-w-[210px]",
        // render: (value, rowData) => {
        //   console.log("Rendering buttons for row:", rowData);
        //   return (
        //     <div className="flex justify-center gap-2">
        //       <button
        //         onClick={(e) => {
        //           e.stopPropagation();
        //           handlePdfDownload(rowData);
        //         }}
        //         className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition flex items-center gap-1"
        //         title="Download PDF"
        //       >
               
        //       </button>
        //       <button
        //         onClick={(e) => {
        //           e.stopPropagation();
        //           handleExcelDownload(rowData);
        //         }}
        //         className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition flex items-center gap-1"
        //         title="Download Excel"
        //       >
        //         <svg
        //           width="12"
        //           height="12"
        //           viewBox="0 0 24 24"
        //           fill="currentColor"
        //         >
        //           <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M12.5,13L9.5,17H11.5L13.25,15L15,17H17L14,13L17,9H15L13.25,11L11.5,9H9.5L12.5,13Z" />
        //         </svg>
        //         Excel
        //       </button>
        //     </div>
        //   );
        // },
      },
      {
        name: "Current Status",
        value: "status",
        style: "text-center min-w-[120px]",
        render: (value, row) => (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              value === "Approved"
                ? "bg-green-100 text-green-800"
                : value === "Rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {value}
          </span>
        ),
      },
      
      {
        name: "Action",
        value: "action",
        style: "text-center min-w-[100px]",
        render: (value, rowData) => {
          console.log("Rendering buttons for row:", rowData);
          return (
            <div className="flex justify-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprover(rowData);
                }}
                className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition flex items-center gap-1"
                title="Approve"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
                </svg>
                Approve
              </button>
            </div>
          );
        },
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
  };

  const handleApprove = (rowData) => { };
  const handleReject = async (itm) => {
    const res = await Api.get({
      url: "/show/ptw/rejectionreason",
    });
    if (res?.status === 200) {
      RejectionForm.current = {
        mId: itm?.mileStoneId,
        form: res?.data?.data[0]["rejectionreason"]?.map(
          (item) => {
            return {
              ...item,
              label: item?.fieldName,

              // disabled :  item?.dataType === 'AutoFill' ? true : false ,
              name: item?.fieldName,
              type:
                item?.dataType === "AutoFill"
                  ? "sdisabled"
                  : item?.dataType === "Dropdown"
                    ? "select"
                    : item?.dataType === "DateTime"
                      ? "datetime-local"
                      : item?.dataType?.toLowerCase() === "date"
                        ? "datetime"
                        : item?.dataType === "img"
                          ? "file"
                          : item?.dataType?.toLowerCase(),
              ...(item?.dataType === "Dropdown"
                ? {
                  option: item?.dropdownValue.split(",")?.map((item) => {
                    return {
                      label: item.trim(),
                      value: item.trim(),
                    };
                  }),
                }
                : {}),

              required: item?.required === "Yes" ? true : false,
            };
          }
        )
      }

      setRejectionModal(true);
    }
  };

  const handleApprover = (rowData) => {
    console.log(rowData, "___rowadsdad");
    setSelectedRow(rowData);
    setmodalHead(rowData?.ptwNumber || "Select Approver");

    let modalBodyData = <></>;
    console.log(type, "___type");
    if (type === "l1Approver") {
      setmodalBody(
        <>
          <ApproverForm
            selectedRow={rowData}
            type={type}
            _id={_id}
            projectType={projectType}
            setmodalHead={setmodalHead}
            setmodalBody={setmodalBody}
            setmodalOpen={setmodalOpen}
            setSelectedRow={setSelectedRow}
          />
        </>
      );
    } else {
      const sendData = {
        _id: rowData?.mileStoneId,
        approved: true,
        status: "L2-Approved",
      };
      setmodalBody(
        <>
          <CommonAlert
          
            Heading={"Are yopu Sure ?"}
            setmodalOpen={setmodalOpen}
            sendData={sendData}
          />
        </>
      );
    }

    setmodalOpen(true);
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

  const handlePdfDownload = (rowData) => {
    console.log("Downloading PDF for:", rowData);

    const extractedData = extractRowData(rowData);
    const exportType = "PDF";

    const queryParams = new URLSearchParams();
    queryParams.append("exportType", exportType);
    queryParams.append("uniqueId", rowData?._id);
    queryParams.append("ptwNumber", rowData?.ptwNumber);
    queryParams.append("l1Approver", "l1Approver");

    const endpoint = `/ptw_export?${queryParams.toString()}`;

    console.log("PDF Download endpoint:", endpoint);
    console.log("Row data being sent:", extractedData);

    dispatch(
      CommonActions.commondownloadpost(
        endpoint,
        `PTW_${extractedData.ptwNumber || rowData.ptwNumber || Date.now()}.pdf`,
        "POST",
        { rowData, columns: table["columns"] }
      )
    );
  };

  const handleExcelDownload = (rowData) => {
    console.log("Downloading Excel for:", rowData);

    const extractedData = extractRowData(rowData);
    const exportType = "EXCEL";

    const queryParams = new URLSearchParams();

    queryParams.append("exportType", exportType);
    queryParams.append("uniqueId", rowData?._id);
    queryParams.append("ptwNumber", rowData?.ptwNumber);
    queryParams.append("l1Approver", "l1Approver");

    const endpoint = `/ptw_export?${queryParams.toString()}`;

    console.log("Excel Download endpoint:", endpoint);
    console.log("Row data being sent:", extractedData);

    dispatch(
      CommonActions.commondownloadpost(
        endpoint,
        `PTW_${extractedData.ptwNumber || rowData.ptwNumber || Date.now()
        }.xlsx`,
        "POST",
        {
          rowData,
          columns: table["columns"],
        }
      )
    );
  };

  const handlePTWClick = (item) => {
    sessionStorage.setItem("ptwNo", item.ptwNumber);
    navigate(`/home/parentApproverCards/ptwApprover/ptwApproverPage`);
  };
  // const ApproverType = useSelector ((state)=>{
  // console.log(state,"sdsdfssdsdsf");
  // const AproverTypeList = state?.ptwData?.ptwApproverPage || [];
  // // const approverTypeList = state
  //   })
  const approverList = useSelector((state) => {
    console.log("Redux state:", state);
    const interdata = state?.ptwData?.getApproverPage || [];
    return interdata.map((itm) => ({
      ...itm,

      activityDate: itm.activityDate
        ? moment(itm.activityDate).format("DD-MM-YYYY")
        : "",
      approvalRejectionTime: itm.approvalRejectionTime
        ? moment(itm.approvalRejectionTime).format("DD-MM-YYYY HH:mm")
        : "",
      closerTime: itm.closerTime
        ? moment(itm.closerTime).format("DD-MM-YYYY HH:mm")
        : "",

      ptwStatusDisplay:
        itm.ptwStatus === "APPROVED"
          ? "Approved"
          : itm.ptwStatus === "REJECTED"
            ? "Rejected"
            : itm.ptwStatus || "Pending",

      ptwNumber: (
        <div onClick={() => handlePTWClick(itm)}>{itm?.ptwNumber}</div>
      ),

      ptwFormStatus: (
        <div className="flex justify-center gap-2">
          <button
            onClick={() =>  { 
              
              handlePdfDownload(itm)}}
            className="bg-red-500 text-white text-xs p-1 rounded-md hover:bg-red-600 transition flex items-center gap-1"
            title="Download PDF"
          >
           <FaRegFilePdf size={22} />
          </button>
          <button
            onClick={() => handleExcelDownload(itm)}
            className="bg-green-500 text-white text-xs p-1 rounded-md hover:bg-green-600 transition flex items-center gap-1"
            title="Download Excel"
          >
            <FaRegFileExcel className="" size={22} />
          </button>
        </div>
      ),
      action: (
        <div className="flex justify-end gap-2">
          {(type === 'l1Approver' ? ['Submitted'].includes(itm.status) : ['L1-Approved'].includes(itm.status)) &&<button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(itm);
            }}
            className="bg-yellow-500 text-white text-xs p-1 rounded hover:bg-green-600 transition flex items-center gap-1"
            title="Edit"
          >
            <AiOutlineEdit size={28} />
            
          </button>}
          {console.log(type , 'fasdfasdfasdfasdfasdf')}
          { (type === 'l1Approver' ? ['Submitted'].includes(itm.status) : ['L1-Approved'].includes(itm.status)) && <button
            onClick={(e) => {
              e.stopPropagation();
              handleApprover(itm);
            }}
            className="bg-green-500 text-white text-xs p-1 px-2 rounded hover:bg-green-600 transition flex items-center gap-1"
            title="Approve"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
            </svg>
            
          </button>}
          {(type === 'l1Approver' ? ['Submitted'].includes(itm.status) : ['L1-Approved'].includes(itm.status)) &&<button
            onClick={(e) => {
              e.stopPropagation();
              handleReject(itm);
            }}
            className="bg-red-500 text-white text-xs px-2 p-1 rounded hover:bg-red-600 transition flex items-center gap-1"
            title="Reject"
          >
            <TbPlayerEjectFilled size={28} />
          
          </button>}
        </div>
      ),
    }));
  });

  const approverTotalCount = useSelector((state) => {
    const interdata = state?.ptwData?.getApproverPage || [];
    return interdata.length > 0 ? interdata[0]["overall_table_count"] : 0;
  });

  const getActionButtons = (item) => {
    const buttons = [];

    if (item.ptwStatus === "PENDING") {
      buttons.push(
        <Button
          key="approve"
          name="Approve"
          classes="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs mr-1"
          onClick={() => handleApproveReject(item, "APPROVED")}
        />,
        <Button
          key="reject"
          name="Reject"
          classes="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs mr-1"
          onClick={() => handleApproveReject(item, "REJECTED")}
        />
      );
    }

    buttons.push(
      <Button
        key="download"
        name="Download"
        classes="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs mr-1"
        onClick={() => handleDownload(item)}
      />
    );

    if (item.ptwStatus === "APPROVED") {
      buttons.push(
        <Button
          key="log"
          name="Log"
          classes="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 text-xs"
          onClick={() => handleLog(item)}
        />
      );
    }

    return <div className="flex flex-wrap gap-1">{buttons}</div>;
  };
  console.log(modalOpen, "__modalOpen");
  const handleApproveReject = (item, status) => {
    if (status === "REJECTED") {
      setSelectedRow(item);
      setmodalHead(<h3>Rejection Reason</h3>);
      setmodalBody(
        <div className="p-4">
          <textarea
            className="w-full border rounded p-2 mb-4"
            rows="4"
            placeholder="Enter rejection reason..."
            ref={(el) => (Data.current = el)}
          />
          <div className="flex justify-end gap-2">
            <Button
              name="Cancel"
              classes="bg-gray-500 hover:bg-gray-600 text-white"
              onClick={handleModalClose}
            />
            <Button
              name="Submit"
              classes="bg-red-500 hover:bg-red-600 text-white"
              onClick={() =>
                submitApprovalAction(item, status, Data.current?.value)
              }
            />
          </div>
        </div>
      );
      setmodalOpen(true);
    } else {
      submitApprovalAction(item, status);
    }
  };

  const submitApprovalAction = (item, status, rejectionReason = "") => {
    const data = {
      ptwId: item.ptwId,
      status: status,
      rejectionReason: rejectionReason,
      approverComments: rejectionReason,
    };

    dispatch(
      PTWActions.updatePTWStatus(data, () => {
        handleModalClose();
        dataAll();
      })
    );
  };

  const handleDownload = (item) => {
    dispatch(
      CommonActions.commondownloadpost(
        "/Export/ptwDocument",
        `PTW_${item.ptwNo}.pdf`,
        "POST",
        { ptwId: item.ptwId }
      )
    );
  };

  const handleLog = (item) => {
    setSelectedRow(item);
    setmodalHead(<h3>Log Entry for PTW: {item.ptwNo}</h3>);
    setmodalBody(
      <div className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Log Type:</label>
          <select
            className="w-full border rounded p-2"
            ref={(el) => (Data.current = el)}
          >
            <option value="L1_Aging">L1 Aging</option>
            <option value="L2_Aging">L2 Aging</option>
            <option value="L3_Action_Date">L3 Action Date</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Comments:</label>
          <textarea
            className="w-full border rounded p-2"
            rows="3"
            placeholder="Enter log comments..."
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            name="Cancel"
            classes="bg-gray-500 hover:bg-gray-600 text-white"
            onClick={handleModalClose}
          />
          <Button
            name="Submit Log"
            classes="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => submitLog(item)}
          />
        </div>
      </div>
    );
    setmodalOpen(true);
  };

  const submitLog = (item) => {
    console.log("Submitting log for:", item);
    handleModalClose();
  };

  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    const strVal = objectToQueryString(data);
    dispatch(PTWActions.getApproverPage(true, strVal));
  };

  const onTableViewSubmit = (data) => {
    data["fileType"] = "Approver_MDB";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        setFileOpen(false);
        dispatch(PTWActions.getApproverPage(true, ""));
      })
    );
  };

  const handleModalClose = () => {
    dataAll();
    setmodalOpen(false);
    setmodalBody(<></>);
    setmodalHead(<></>);
    
    setSelectedRow(null);
  };

  useEffect(() => {
    dataAll();
  }, [dispatch , modalOpen]);

  const tableData = {
    ptwNumber: "PTW Number",
    ptwCreationDate: "PTW Creation Date",
    Milestone: "Milestone",
    siteId: "Site ID",
    ssId: "SSID",
    uniqueId: "Unique ID",
    srNumber: "SR Number",
    projectGroupName: "Project Group",
    projectID: "Project ID",
    projectType: "Project Type",
    subProject: "Sub Project",
    submissionDate: "PTW Submission Date",
    actionDate: "Approval/Rejection Date",
    l2ActionDAte: "L2 Action Date",
    l1Ageing: "L1-Aging",
    l2Ageing: "L2-Aging",
    status: "Current Status",
    logs: "Logs",
    ptwId: "PTW ID",
    rejectionReason: "Rejection Reason",
    action: "Action",
  };

  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-2">
            <div className="relative">
              <Button
                classes="h-full "
                name={<CiFilter size={32} />}
                onClick={() => {
                  setSelectedItems([])
                  setFilter(filter ? false : true)
                }}
                title="Filter"
              />
              {filter && <div className="absolute w-[250px]  -right-3  top-12 z-[9999999]">
                <div className="max-w-md mx-auto p-3 bg-white  rounded-lg shadow-lg ">
                  <h1 className="text-xl font-semibold text-center  text-gray-700 my-2">Select Filter</h1>
                  <hr className="mb-3" />

                  <div className="space-y-3  mb-6">

                    <label className="flex items-center space-x-3 cursor-pointer mb-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === options.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-4 h-4 text-gray-700 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-gray-800 font-semibold text-lg"> All</span>
                    </label>

                    {options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedItems.some((item) => item.id === option.id)}
                          onChange={() =>
                            handleCheckboxChange(option.id, option.name)
                          }
                          className="w-4 h-4 text-gray-700 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-gray-700 text-lg">{option.name}</span>
                      </label>
                    ))}

                  </div>

                  <button
                    onClick={() => {
                      if(selectedItems.length){
                        handleContinue()
                      }
                      else{
                        setFilter(false)
                      }
                    }}
                    className="w-full bg-[#13B497] text-white py-2 px-4 rounded-lg hover:bg-[#0c8b74] transition-colors duration-200 font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>}
            </div>

            <Button
              name={"Export"}
              classes="w-auto"
              onClick={(e) => {
                dispatch(
                  CommonActions.commondownloadpost(
                    "/Export/ptwMDB",
                    "Export_Approval.xlsx",
                    "POST",
                    {}
                  )
                );
              }}
            />
          </div>
        }
        table={table}
        filterAfter={onSubmit}
        tableName="PTW Approver Dashboard"
        TableHeight="h-[68vh]"
        handleSubmit={handleSubmit}
        data={approverList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={approverTotalCount}
        heading="Total Count :-"
        selectable={true}
        onSelectionChange={(selectedItems) => { }}
        defaultHide = {true}
      />
      <Modal
        size="sm"
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={handleModalClose}
      />
   <Modal
        size="lg"
        modalHead={<h1>Rejection Reason</h1>}
        children={
          <div className="h-full" >
            <CommonForm
              classes="grid-cols-2 h-full  "
              Form={RejectionForm.current && RejectionForm.current?.form}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
            {errors.root && (
              <p className="text-red-500 text-sm mt-2">{errors.root.message}</p>
            )}
            <Button
              name="Submit"
              classes="w-fit"
              onClick={handleSubmit((data) => {
                const values = Object.values(data);
                const hasAnyValue = values.some(
                  (value) =>
                    value !== null && value !== undefined && value !== ""
                );

                if (!hasAnyValue) {
                  setError("root", {
                    type: "manual",
                    message: "At least one field is required",
                  });
                  return;
                }

                handleRejection(data, RejectionForm.current?.mId);
              })}
            />
          </div>
        }
        isOpen={rejectionModal}
        setIsOpen={setRejectionModal}
      />
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
        tempbtn={true}
        tempbtnlink={["/template/MDB_Approver.xlsx", "MDB_Approver.xlsx"]}
      />
    </>
  );
};

export default ApproverPage;
