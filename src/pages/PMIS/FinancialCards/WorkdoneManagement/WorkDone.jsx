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
import FileUploader from "../../../../components/FIleUploader";
import OperationManagementActions from "../../../../store/actions/OperationManagement-actions";
import FinanceActions from "../../../../store/actions/finance-actions";
// import POWorkDoneBasedForm from '../POWorkDoneBased/POWorkDoneBasedForm'
import WorkDoneForm from "../WorkdoneManagement/WorkDoneForm";
import { GET_POWORKDONE_ITEMCODE } from "../../../../store/reducers/finance-reducer";

const WorkDone = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [callSt, setcallSt] = useState(false);
  
  const [modalBody, setmodalBody] = useState(<></>);
  const [fileOpen, setFileOpen] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  let dispatch = useDispatch();

  let dbConfigList = useSelector((state) => {
    let interdata = state?.financeData?.getPOWorkDoneBased || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        itemCode1: itm.itemCodeArray?.[0]?.["itemCode"],
        itemCode2: itm.itemCodeArray?.[1]?.["itemCode"],
        itemCode3: itm.itemCodeArray?.[2]?.["itemCode"],
        itemCode4: itm.itemCodeArray?.[3]?.["itemCode"],
        itemCode5: itm.itemCodeArray?.[4]?.["itemCode"],
        itemCode6: itm.itemCodeArray?.[5]?.["itemCode"],
        itemCode7: itm.itemCodeArray?.[6]?.["itemCode"],

        quantity1: itm.itemCodeArray?.[0]?.["quantity"],
        quantity2: itm.itemCodeArray?.[1]?.["quantity"],
        quantity3: itm.itemCodeArray?.[2]?.["quantity"],
        quantity4: itm.itemCodeArray?.[3]?.["quantity"],
        quantity5: itm.itemCodeArray?.[4]?.["quantity"],
        quantity6: itm.itemCodeArray?.[5]?.["quantity"],
        quantity7: itm.itemCodeArray?.[6]?.["quantity"],

        amount1: itm.itemCodeArray?.[0]?.["amount"],
        amount2: itm.itemCodeArray?.[1]?.["amount"],
        amount3: itm.itemCodeArray?.[2]?.["amount"],
        amount4: itm.itemCodeArray?.[3]?.["amount"],
        amount5: itm.itemCodeArray?.[4]?.["amount"],
        amount6: itm.itemCodeArray?.[5]?.["amount"],
        amount7: itm.itemCodeArray?.[6]?.["amount"],

        workdonebucket: itm.itemCodeArray?.[0]?.["workdonebucket"],
        invoicebucket: itm.itemCodeArray?.[0]?.["invoicebucket"],

        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  dispatch(
                    FinanceActions.getPOWorkDoneItemCode(
                      true,
                      `subProjectId=${itm?.SubProjectId}`,
                      setmodalOpen(true)
                    )
                  );
                  // dispatch(FinanceActions.getPOWorkDoneBased())
                  setmodalHead("Edit Workdone");

                  dispatch(
                    GET_POWORKDONE_ITEMCODE({ dataAll: [], reset: true })
                  );

                  //   console.log(itm.itemCodeArray.map((itqq,itqqindex)=>{
                  //     return {["itemCode"+itqqindex]:itqq["itemCode"]}
                  //   }),"itm.itemCodeArray")
                  setcallSt(true)
                  setmodalBody(
                    <>
                      <WorkDoneForm

                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        callSt={callSt}
                        setcallSt={setcallSt}
                        resetting={false}
                        formValue={{
                          ...itm,
                          itemCode1: itm.itemCodeArray?.[0]?.["itemCode"],
                          itemCode2: itm.itemCodeArray?.[1]?.["itemCode"],
                          itemCode3: itm.itemCodeArray?.[2]?.["itemCode"],
                          itemCode4: itm.itemCodeArray?.[3]?.["itemCode"],
                          itemCode5: itm.itemCodeArray?.[4]?.["itemCode"],
                          itemCode6: itm.itemCodeArray?.[5]?.["itemCode"],
                          itemCode7: itm.itemCodeArray?.[6]?.["itemCode"],
                          quantity1: itm.itemCodeArray?.[0]?.["quantity"],
                          quantity2: itm.itemCodeArray?.[1]?.["quantity"],
                          quantity3: itm.itemCodeArray?.[2]?.["quantity"],
                          quantity4: itm.itemCodeArray?.[3]?.["quantity"],
                          quantity5: itm.itemCodeArray?.[4]?.["quantity"],
                          quantity6: itm.itemCodeArray?.[5]?.["quantity"],
                          quantity7: itm.itemCodeArray?.[6]?.["quantity"],
                          amount1: itm.itemCodeArray?.[0]?.["amount"],
                          amount2: itm.itemCodeArray?.[1]?.["amount"],
                          amount3: itm.itemCodeArray?.[2]?.["amount"],
                          amount4: itm.itemCodeArray?.[3]?.["amount"],
                          amount5: itm.itemCodeArray?.[4]?.["amount"],
                          amount6: itm.itemCodeArray?.[5]?.["amount"],
                          amount7: itm.itemCodeArray?.[6]?.["amount"],
                          workdonebucket:
                            itm.itemCodeArray?.[0]?.["workdonebucket"],
                          invoicebucket:
                            itm.itemCodeArray?.[0]?.["invoicebucket"],
                        }}
                      />
                    </>
                  );
                  // console.log('ahshshhs',itm)
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
                              `${Urls.finance_poworkdone_based}/${itm.uniqueId}`,
                              () => {
                                dispatch(FinanceActions.getPOWorkDoneBased());
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
      };
      return updateditm;
    });
  });
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.financeData?.getPOWorkDoneBased || [];
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
        name: "Customer",
        value: "customer",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project Group",
        value: "projectGroup",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project ID",
        value: "projectId",
        style: "min-w-[160px] max-w-[200px] text-center",
      },
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      {
        name: "Sub Project",
        value: "subProject",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "SSID",
        value: "systemId",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Site ID",
        value: "Site Id",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Configuration",
        value: "Configuration",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Activity",
        value: "Activity",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "MS1 Completion Date",
        value: "MS1",
        style: "min-w-[160px] max-w-[200px] text-center",
      },
      {
        name: "MS2 Completion Date",
        value: "MS2",
        style: "min-w-[160px] max-w-[200px] text-center",
      },
      {
        name: "Billing Status",
        value: "siteBillingStatus",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Work Done Bucket",
        value: "workdonebucket",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Invoice Bucket",
        value: "invoicebucket",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 1",
        value: "itemCode1",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Quantity 1",
        value: "quantity1",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Amount 1",
        value: "amount1",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 2",
        value: "itemCode2",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Quantity 2",
        value: "quantity2",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Amount 2",
        value: "amount2",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 3",
        value: "itemCode3",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Quantity 3",
        value: "quantity3",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Amount 3",
        value: "amount3",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 4",
        value: "itemCode4",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Quantity 4",
        value: "quantity4",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Amount 4",
        value: "amount4",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 5",
        value: "itemCode5",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Quantity 5",
        value: "quantity5",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Amount 5",
        value: "amount5",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 6",
        value: "itemCode6",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Quantity 6",
        value: "quantity6",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Amount 6",
        value: "amount6",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 7",
        value: "itemCode7",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Quantity 7",
        value: "quantity7",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Amount 7",
        value: "amount7",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Unbilled MS1 Done",
        value: "ms1Amount",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Unbilled MS2 Done",
        value: "ms2Amount",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Total Unbilled",
        value: "totalAmount",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      {
        name: "Edit",
        value: "edit",
        style: "min-w-[40px] max-w-[50px] text-center",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Type",
        type: "select",
        name: "status",
        option: [
          { label: "Billed", value: "Billed" },
          { label: "UnBilled", value: "Unbilled" },
        ],
        props: {},
      },
      // {
      //     label: "Type",
      //     type: "autoSuggestion",
      //     name: "stus",
      //     option: [
      //       { label: "Billed", value: "Billed" },
      //       { label: "UnBilled", value: "Unbilled" },
      //     ],
      //     props: {},
      // },
      // {
      //     label: "Type",
      //     type: "text",
      //     name: "stus",
      //     option: [
      //       { label: "Billed", value: "Billed" },
      //       { label: "UnBilled", value: "Unbilled" },
      //     ],
      //     props: {},
      // },
      // {
      //     label: "Type",
      //     type: "datetime",
      //     name: "stus",
      //     option: [
      //       { label: "Billed", value: "Billed" },
      //       { label: "UnBilled", value: "Unbilled" },
      //     ],
      //     props: {},
      // }
    ],
  };
  const onSubmit = (data) => {
    // console.log("jsjsjsjss", data)
    let value = data.reseter;
    delete data.reseter;
    dispatch(
      FinanceActions.getPOWorkDoneBased(value, objectToQueryString(data))
    );
  };
  useEffect(() => {
    dispatch(FinanceActions.getPOWorkDoneBased());
  }, []);

  const onTableViewSubmit = (data) => {
    data["fileType"] = "ItemCodeforWork";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(FinanceActions.getPOWorkDoneBased());
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
            {/* <Button onClick={(e) => {
                setmodalOpen(prev => !prev)
                setmodalHead("New PO Life Cycle ")
                setmodalBody(<POWorkDoneBasedForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add New"}></Button> */}
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
        size={"smsh"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
        tempbtn={true}
        tempbtnlink={[
          "/template/Work_Done_Template.xlsx",
          "Work_Done_Template.xlsx",
        ]}
      />

      {/* <CommonForm/> */}
    </>
  );
};

export default WorkDone;
