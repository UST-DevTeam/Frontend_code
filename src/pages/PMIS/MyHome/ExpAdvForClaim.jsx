import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
import EmpDetails from "./EmpDetails";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
import ToggleButton from "../../../components/ToggleButton";
import { objectToQueryString } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import HrActions from "../../../store/actions/hr-actions";
import { useNavigate, useParams } from "react-router-dom";
import FileUploader from "../../../components/FIleUploader";
import ExpenseAdvanceActions from "../../../store/actions/expenseAdvance-actions";
import DownloadButton from "../../../components/DownloadButton";

const ExpAdvForClaim = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  const monthMap = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" };
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let dbConfigList = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getHRAllExpenses || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        Month: monthMap[itm.Month] || itm.Month,
      
        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  // dispatch(HrActions.getManageEmpDetails())
                  setmodalHead("Edit Customer Details")
                  setmodalBody(
                    <>
                      <EmpDetails resetting={false} formValue={itm} />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></EditButton>
            }
          />
        ),

        delete: (
          <CstmButton
            child={
              <DeleteButton
                name={""}
                onClick={() => {
                  let msgdata = {
                    show: true,
                    icon: "warning",
                    buttons: [
                      <Button
                        classes="w-15 bg-green-500"
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.expAdv_hr_all_expenses}/${itm.uniqueId}`,
                              () => {
                                dispatch(ExpenseAdvanceActions.getHRAllExpenses());
                                dispatch(ALERTS({ show: false }));
                              }
                            )
                          );
                        }}
                        name={"OK"}
                      />,
                      <Button
                        classes="w-24"
                        onClick={() => {
                          dispatch(ALERTS({ show: false }));
                        }}
                        name={"Cancel"}
                      />,
                    ],
                    text: "Are you sure you want to Delete?",
                  };
                  dispatch(ALERTS(msgdata));
                }}
              ></DeleteButton>
            }
          />
        ),
        attachment: (
          <CstmButton
            className={"p-2"}
            child={
            <DownloadButton
                name={""}
                onClick={() => {
                    dispatch(CommonActions.commondownload("/expenses/DownloadAttachment"+"?"+`expenseId=${itm["Expense number"]}`,"expense.pdf"))                      
                }}
              ></DownloadButton>
            }
          />
        ),

        view: (
          <CstmButton
            className={"p-5"}
            child={
              <Button
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  setmodalHead("Show PDF");
                  setmodalBody(
                    <>
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></Button>
            }
          />
        ),
      };
      return updateditm;
    });
  });
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getHRAllExpenses;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });
  // let Form = [
  //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
  //     { label: "Custom Queries", value: "", type: "textarea" }
  // ]

  let table = {
    columns: [
        {
            name: "Month",
            value: "Month",
            style: "min-w-[80px] max-w-[200px] text-center",
        },
        {
            name: "Employee Name",
            value: "Employee Name",
            style: "min-w-[150px] max-w-[200px] text-center sticky left-0",
        },
        {
            name: "Employee Code",
            value: "Employee Code",
            style: "min-w-[130px] max-w-[450px] text-center sticky left-0",
        },
        {
            name: "Contact No.",
            value: "Contact Number",
            style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
            name: "Expense No.",
            value: "Expense number",
            style: "min-w-[120px] max-w-[450px] text-center",
        },
        {
            name: "Claim Date",
            value: "Claim Date",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Claim Type",
            value: "Claim Type",
            style: "min-w-[250px] max-w-[450px] text-center",
        },
        {
            name: "Category",
            value: "Category",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Circle",
            value: "Circle",
            style: "min-w-[200px] max-w-[200px] text-center",
        },
        {
            name: "Project ID",
            value: "Project ID",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Cost Center",
            value: "Cost Center",
            style: "min-w-[120px] max-w-[450px] text-center",
        },
        {
            name: "Site ID",
            value: "Site ID",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Task Name",
            value: "Task",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Amount",
            value: "Amount",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "Submission Date",
            value: "Submission Date",
            style: "min-w-[120px] max-w-[450px] text-center",
        },
        {
            name: "Approval Amount",
            value: "Approved Amount",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Bill No",
            value: "Bill No",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "Start KM",
            value: "Start KM",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "End KM",
            value: "End KM",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "Start Location",
            value: "Start Location",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "End Location",
            value: "End Location",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Transportation Mode",
            value: "Transport Mode",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Last Action Date",
            value: "Last Action Date",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "L1 Status",
            value: "L1 Status",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "L2 Status",
            value: "L2 Status",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "Finance Approve Status",
            value: "L3 Status",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "L1 Approver",
            value: "L1 Approver",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "L2 Approver",
            value: "L2 Approver",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Finance Approver",
            value: "L3 Approver",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Remarks",
            value: "Remarks",
            style: "min-w-[200px] max-w-[450px] text-center",
        },
        {
            name: "Attachment",
            value: "attachment",
            style: "min-w-[200px] max-w-[450px] text-center",
        },
    ],

    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      // {
      //     label: "Role",
      //     type: "select",
      //     name: "rolename",
      //     option: roleList,
      //     props: {
      //     }
      // }
    ],
  };
  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(ExpenseAdvanceActions.getHRAllExpenses(value, objectToQueryString(data)));
  };
  useEffect(() => {
    dispatch(ExpenseAdvanceActions.getHRAllExpenses());
  }, []);
  const onTableViewSubmit = (data) => {
    data["fileType"] = "ManageEmployee";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(ExpenseAdvanceActions.getHRAllExpenses());
        setFileOpen(false);
        resetting("");
      })
    );
  };
  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-1">
            {" "}
            <Button
              classes="w-auto"
              onClick={(e) => {
                navigate("/hr/Claim");
              }}
              name={"Expense"}
            ></Button>
            <Button
              classes="w-auto mr-1"
              onClick={(e) => {
                navigate("/hr/Advance");
              }}
              name={"Advance"}
            ></Button>
            {/* <Button
              name={"Upload File"}
              classes="w-auto"
              onClick={(e) => {
                setFileOpen((prev) => !prev);
              }}
            ></Button> */}
          </div>
        }
        table={table}
        exportButton={["export/AllExpenses","Export_AllExpenses.xlsx"]}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
      />

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      {/* <CommonForm/> */}
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
      />
    </>
  );
};

export default ExpAdvForClaim;
