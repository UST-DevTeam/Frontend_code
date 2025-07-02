import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import CstmButton from "../../../components/CstmButton";
import FileUploader from "../../../components/FIleUploader";
import PTWActions from "../../../store/actions/ptw-actions";
import CommonActions from "../../../store/actions/common-actions";
import { Urls } from "../../../utils/url";
import { objectToQueryString } from "../../../utils/commonFunnction";

const ApproverPageL2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [fileOpen, setFileOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const Data = useRef("");

  const [year] = useState(new Date().getFullYear());

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dataAll = () => {
    dispatch(PTWActions.getApproverPage(true, "approverType=l2Approver"));
  };

  const handlePTWClick = (item) => {
    sessionStorage.setItem('ptwNo' ,item.ptwNumber )
    navigate(`/home/parentApproverCards/ptwApprover/ptwApproverPageL2`)
  };

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

      // Action buttons
      // getActionButtons: getActionButtons(itm),
    }));
  });
  console.log(approverList, "__approverLiust");

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

  const table = {
    columns: [
      {
        name: "PTW",
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
        name: "PTW Creation Date",
        value: "ptwCreationDate",
        style: "text-center min-w-[120px]",
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
        style: "text-center min-w-[100px]",
      },
      {
        name: "SR Number",
        value: "srNumber",
        style: "text-center min-w-[100px]",
      },
      {
        name: "Project Group",
        value: "projectGroupName",
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
      // {
      //   name: "Activity",
      //   value: "activity",
      //   style: "text-center min-w-[150px]",
      // },
      {
        name: "PTW Submission Date",
        value: "submissionDate",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Approval/Rejection Date",
        value: "actionDate",
        style: "text-center min-w-[180px]",
      },
      // {
      //   name: "Remarks",
      //   value: "rejectionReason",
      //   style: "text-center min-w-[200px]",
      // },
      {
        name: "L2 Action Date",
        value: "l2ActionDAte",
        style: "text-center min-w-[120px]",
      },
      {
        name: "L1-Aging",
        value: "l1Ageing",
        style: "text-center min-w-[100px]",
      },
      {
        name: "L2-Aging",
        value: "l2Ageing",
        style: "text-center min-w-[100px]",
      },
      {
        name: "PTW Form & Checklist Attachment",
        value: "ptwFormStatus",
        style: "text-center min-w-[180px]",
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
        name: "Logs",
        value: "logs",
        style: "text-center min-w-[100px]",
      },
      {
        name: "Action",
        value: "actionButtons",
        style: "text-center min-w-[200px]",
        render: (value) => value,
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
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
  }, [dispatch]);

  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-2">
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
        onSelectionChange={(selectedItems) => {}}
      />
      <Modal
        size="md"
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={handleModalClose}
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

export default ApproverPageL2;
