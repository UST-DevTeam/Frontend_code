import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import ToggleButton from "../../../../components/ToggleButton";
import { objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls } from "../../../../utils/url";
import FinanceActions from "../../../../store/actions/finance-actions";
import FileUploader from "../../../../components/FIleUploader";
import AdminActions from '../../../../store/actions/admin-actions';
import projectListActions from "../../../../store/actions/projectList-actions";
import InvoiceForm from "../InvoiceManagement/InvoiceForm";

const Invoice = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [fileOpen, setFileOpen] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  let dispatch = useDispatch();
  // let roleList = useSelector((state) => {
  //     let interdata = state?.operationManagement?.USERS_LIST
  //     return interdata
  // })
  let dbConfigList = useSelector((state) => {
    console.log(state, "state statejjjj");
    let interdata = state?.financeData?.getInvoice || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  dispatch(AdminActions.getManageProjectGroup(true,`customer=${itm?.customer}`))
                  dispatch(AdminActions.getPOProjectType(true,`customer=${itm?.customer}`))
                  dispatch(AdminActions.getPOProjectID(true,`projectGroup=${itm?.projectGroup}`))
                  dispatch(AdminActions.getInvoiceSiteId(true,`projectId=${itm?.projectId}`))
                  dispatch(FinanceActions.getInvoice());
                  setmodalHead("Edit Invoice");
                  setmodalBody(
                    <>
                      <InvoiceForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                      />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                  console.log("ahshshhs", itm);
                  //setmodalOpen(false)
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
                              `${Urls.finance_Invoice}/${itm.uniqueId}`,
                              () => {
                                dispatch(FinanceActions.getInvoice());
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
                          console.log("snnsnsnsns");
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
      };
      return updateditm;
    });
  });
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.financeData?.getInvoice;
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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let table = {
    columns: [
      {
        name: "Year",
        value: "year",
        style: "min-w-[70px] max-w-[160px] text-center sticky left-0 bg-white"
      },
      {
        name: "Month",
        value: "month",
        style: "min-w-[100px] max-w-[160px] text-center sticky left-0 bg-white"
      },
      {
        name: "Customer",
        value: "customerName",
        style: "min-w-[160px] max-w-[160px] text-center sticky left-0 bg-white"
      },
      {
        name: "Project Group",
        value: "projectGroupId",
        style: "min-w-[140px] max-w-[200px] text-center sticky left-[159px] bg-white",
      },
      {
        name: "Project Type",
        value: "projectTypeName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Sub-Project",
        value: "subProjectName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project ID",
        value: "projectIdName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "SSID",
        value: "ssidName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Site Id",
        value: "siteIdName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "WCC No",
        value: "wccNumber",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "WCC SignOff Date",
        value: "wccSignOffdate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "PO Number",
        value: "poNumber",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code",
        value: "itemCode",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Invoiced Quantity",
        value: "qty",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Invoice Number",
        value: "invoiceNumber",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Invoice Date",
        value: "invoiceDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Unit Rate",
        value: "unitRate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Amount",
        value: "amount",
        style: "min-w-[120px] max-w-[200px] text-center",
      },
      {
        name: "Status",
        value: "status",
        style: "min-w-[120px] max-w-[200px] text-center",
      },
      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      {
        name: "Delete",
        value: "delete",
        style: "min-w-[100px] max-w-[200px] text-center",
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
    console.log("jsjsjsjss", data);
    let value = data.reseter;
    delete data.reseter;
    dispatch(FinanceActions.getInvoice(value, objectToQueryString(data)));
  };
  useEffect(() => {
    dispatch(FinanceActions.getInvoice());
  }, []);

  const onTableViewSubmit = (data) => {
    data["fileType"] = "invoice";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(FinanceActions.getInvoice());
        setFileOpen(false);
        resetting("");
      })
    );
  };


  return (
    <>
      <AdvancedTable
        headerButton={
          <>
            <Button
            classes="w-auto mr-1"
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("New Invoice");
                setmodalBody(
                  <InvoiceForm
                    isOpen={modalOpen}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                  />
                );
              }}
              name={"Add Invoice"}
            ></Button>
            <Button
              name={"Upload File"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen((prev) => !prev);
              }}
            ></Button>
          </>
        }
        table={table}
        exportButton={["/export/Invoice/" , "Export_Invoice.xlsx",]}
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
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
        tempbtn={true} 
        tempbtnlink = {["/template/Invoice.xlsx","Invoice.xlsx"]}
      />
      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      {/* <CommonForm/> */}
    </>
  );
};

export default Invoice;
