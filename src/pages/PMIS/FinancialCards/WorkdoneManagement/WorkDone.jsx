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
import {
  getAccessType,
  objectToQueryString,
} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls } from "../../../../utils/url";
import FileUploader from "../../../../components/FIleUploader";
import FinanceActions from "../../../../store/actions/finance-actions";
import WorkDoneForm from "../WorkdoneManagement/WorkDoneForm";
import { GET_POWORKDONE_ITEMCODE } from "../../../../store/reducers/finance-reducer";
import FilterActions from "../../../../store/actions/filter-actions";
import ConditionalButton from "../../../../components/ConditionalButton";
import CommonForm from "../../../../components/CommonForm";
import { UilSearch } from "@iconscout/react-unicons";
import moment from "moment";

const WorkDone = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(
    now.getTime() + istOffset + now.getTimezoneOffset() * 60 * 1000
  );
  const currentMonth = istTime.getUTCMonth() + 1;
  const currentYear = istTime.getUTCFullYear();

  const [modalOpen, setmodalOpen] = useState(false);
  const [callSt, setcallSt] = useState(false);

  const [modalBody, setmodalBody] = useState(<></>);
  const [fileOpen, setFileOpen] = useState(false);
  const [strValFil, setstrVal] = useState(false);
  const [month, setmonth] = useState(currentMonth);
  const [year, setyear] = useState(currentYear);
  const [selectType, setSelectType] = useState("");
  const [modalHead, setmodalHead] = useState(<></>);
  const [ValGm, setValGm] = useState("Month");
  const endDate = moment().format("Y");

  let dispatch = useDispatch();

  let showType = getAccessType("Actions(Workdone)");

  let shouldIncludeEditColumn = false;

  if (showType === "visible") {
    shouldIncludeEditColumn = true;
  }

  let dbConfigList = useSelector((state) => {
    let interdata = state?.financeData?.getPOWorkDoneBased || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        // itemCode1: itm.itemCodeArray?.[0]?.["itemCode"],
        // itemCode2: itm.itemCodeArray?.[1]?.["itemCode"],
        // itemCode3: itm.itemCodeArray?.[2]?.["itemCode"],
        // itemCode4: itm.itemCodeArray?.[3]?.["itemCode"],
        // itemCode5: itm.itemCodeArray?.[4]?.["itemCode"],
        // itemCode6: itm.itemCodeArray?.[5]?.["itemCode"],
        // itemCode7: itm.itemCodeArray?.[6]?.["itemCode"],

        // quantity1: itm.itemCodeArray?.[0]?.["quantity"],
        // quantity2: itm.itemCodeArray?.[1]?.["quantity"],
        // quantity3: itm.itemCodeArray?.[2]?.["quantity"],
        // quantity4: itm.itemCodeArray?.[3]?.["quantity"],
        // quantity5: itm.itemCodeArray?.[4]?.["quantity"],
        // quantity6: itm.itemCodeArray?.[5]?.["quantity"],
        // quantity7: itm.itemCodeArray?.[6]?.["quantity"],

        // amount1: itm.itemCodeArray?.[0]?.["amount"],
        // amount2: itm.itemCodeArray?.[1]?.["amount"],
        // amount3: itm.itemCodeArray?.[2]?.["amount"],
        // amount4: itm.itemCodeArray?.[3]?.["amount"],
        // amount5: itm.itemCodeArray?.[4]?.["amount"],
        // amount6: itm.itemCodeArray?.[5]?.["amount"],
        // amount7: itm.itemCodeArray?.[6]?.["amount"],

        // workdonebucket: itm.itemCodeArray?.[0]?.["workdonebucket"],
        // invoicebucket: itm.itemCodeArray?.[0]?.["invoicebucket"],

        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  dispatch(
                    GET_POWORKDONE_ITEMCODE({ dataAll: [], reset: true })
                  );
                  dispatch(
                    FinanceActions.getPOWorkDoneItemCode(
                      true,
                      `subProjectId=${itm?.SubProjectId}`,
                      setmodalOpen(true)
                    )
                  );
                  setmodalHead("Edit Workdone");
                  setcallSt(true);
                  setmodalBody(
                    <>
                      <WorkDoneForm
                        // setupDatq={setupDatq}
                        // currentPage={currentPage}
                        // setcurrentPage={setcurrentPage}
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        callSt={callSt}
                        setcallSt={setcallSt}
                        resetting={false}
                        formValue={{
                          ...itm,
                          // itemCode1: itm.itemCodeArray?.[0]?.["itemCode"],
                          // itemCode2: itm.itemCodeArray?.[1]?.["itemCode"],
                          // itemCode3: itm.itemCodeArray?.[2]?.["itemCode"],
                          // itemCode4: itm.itemCodeArray?.[3]?.["itemCode"],
                          // itemCode5: itm.itemCodeArray?.[4]?.["itemCode"],
                          // itemCode6: itm.itemCodeArray?.[5]?.["itemCode"],
                          // itemCode7: itm.itemCodeArray?.[6]?.["itemCode"],
                          // quantity1: itm.itemCodeArray?.[0]?.["quantity"],
                          // quantity2: itm.itemCodeArray?.[1]?.["quantity"],
                          // quantity3: itm.itemCodeArray?.[2]?.["quantity"],
                          // quantity4: itm.itemCodeArray?.[3]?.["quantity"],
                          // quantity5: itm.itemCodeArray?.[4]?.["quantity"],
                          // quantity6: itm.itemCodeArray?.[5]?.["quantity"],
                          // quantity7: itm.itemCodeArray?.[6]?.["quantity"],
                          // amount1: itm.itemCodeArray?.[0]?.["amount"],
                          // amount2: itm.itemCodeArray?.[1]?.["amount"],
                          // amount3: itm.itemCodeArray?.[2]?.["amount"],
                          // amount4: itm.itemCodeArray?.[3]?.["amount"],
                          // amount5: itm.itemCodeArray?.[4]?.["amount"],
                          // amount6: itm.itemCodeArray?.[5]?.["amount"],
                          // amount7: itm.itemCodeArray?.[6]?.["amount"],
                          // workdonebucket:
                          //   itm.itemCodeArray?.[0]?.["workdonebucket"],
                          // invoicebucket:
                          //   itm.itemCodeArray?.[0]?.["invoicebucket"],
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
                        classes="w-15 bg-rose-400"
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
                        classes="w-auto"
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

  // let projectType =

  let projectTypeList = useSelector((state) => {
    return state?.filterData?.getfinancialworkdoneprojecttype.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.uid,
      };
    });
  });

  let listYear = [];

  // for (let ywq = 2019; ywq <= +endDate; ywq++) {
  //   listYear.push({'label':ywq,'value':ywq});
  // }
  for (let ywq = 2021; ywq <= +endDate; ywq++) {
    listYear.push(ywq);
  }

  let monthList = [
    { label: "Jan", value: 1 },
    { label: "Feb", value: 2 },
    { label: "Mar", value: 3 },
    { label: "Apr", value: 4 },
    { label: "May", value: 5 },
    { label: "Jun", value: 6 },
    { label: "Jul", value: 7 },
    { label: "Aug", value: 8 },
    { label: "Sep", value: 9 },
    { label: "Oct", value: 10 },
    { label: "Nov", value: 11 },
    { label: "Dec", value: 12 },
  ];

  let listDict = {
    "": [],
    Month: [
      { id: 1, name: "Jan" },
      { id: 2, name: "Feb" },
      { id: 3, name: "Mar" },
      { id: 4, name: "Apr" },
      { id: 5, name: "May" },
      { id: 6, name: "Jun" },
      { id: 7, name: "Jul" },
      { id: 8, name: "Aug" },
      { id: 9, name: "Sep" },
      { id: 10, name: "Oct" },
      { id: 11, name: "Nov" },
      { id: 12, name: "Dec" },
    ],
  };

  let customerList = useSelector((state) => {
    return state?.filterData?.getfinancialPoWOrkDoneCustomer.map((itm) => {
      return {
        label: itm.customer,
        value: itm.customer,
      };
    });
  });

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
      // {
      //   name: "Customer",
      //   value: "customer",
      //   style: "min-w-[120px] max-w-[200px] text-center sticky left-0 bg-[#3e454d] z-10",
      // },
      // {
      //   name: "Project Group",
      //   value: "projectGroup",
      //   style: "min-w-[140px] max-w-[200px] text-center sticky left-[120px] bg-[#3e454d] z-10",
      // },
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[100px] max-w-[200px] text-center p-2",
      },
      {
        name: "Project ID",
        value: "projectId",
        style: "min-w-[160px] max-w-[200px] text-center  bg-[#3e454d] z-10",
      },
      {
        name: "Sub Project",
        value: "subProject",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "SSID",
        value: "systemId",
        style: "min-w-[120px] max-w-[200px] text-center bg-[#3e454d] z-10",
      },
      {
        name: "Site ID",
        value: "Site Id",
        style: "min-w-[140px] max-w-[200px] text-center bg-[#3e454d] z-10",
      },
      {
        name: "BAND",
        value: "BAND",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Activity",
        value: "ACTIVITY",
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
        name: "Invoice Date",
        value: "invoiceDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Unbilled MS1 Done",
        value: "amount1",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Unbilled MS2 Done",
        value: "amount2",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Total Unbilled",
        value: "final_amount",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      // {
      //   name: "Work Done Bucket",
      //   value: "workdonebucket",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      // {
      //   name: "Invoice Bucket",
      //   value: "invoicebucket",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      {
        name: "Item Code 1",
        value: "itemCode01",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Quantity 1",
      //   value: "quantity1",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      // {
      //   name: "Amount 1",
      //   value: "amount1",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      {
        name: "Item Code 2",
        value: "itemCode02",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Quantity 2",
      //   value: "quantity2",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      // {
      //   name: "Amount 2",
      //   value: "amount2",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      {
        name: "Item Code 3",
        value: "itemCode03",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Quantity 3",
      //   value: "quantity3",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      // {
      //   name: "Amount 3",
      //   value: "amount3",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      {
        name: "Item Code 4",
        value: "itemCode04",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Quantity 4",
      //   value: "quantity4",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      // {
      //   name: "Amount 4",
      //   value: "amount4",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      {
        name: "Item Code 5",
        value: "itemCode05",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Quantity 5",
      //   value: "quantity5",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      // {
      //   name: "Amount 5",
      //   value: "amount5",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      {
        name: "Item Code 6",
        value: "itemCode06",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Quantity 6",
      //   value: "quantity6",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      // {
      //   name: "Amount 6",
      //   value: "amount6",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      {
        name: "Item Code 7",
        value: "itemCode07",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Quantity 7",
      //   value: "quantity7",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      // {
      //   name: "Amount 7",
      //   value: "amount7",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },

      // ...(shouldIncludeEditColumn
      //   ? [
      //     {
      //       name: "Edit",
      //       value: "edit",
      //       style: "min-w-[100px] max-w-[200px] text-center"
      //   },
      //     ]
      //   : [])
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      // {
      //   label: "Select Milestone",
      //   type: "select",
      //   name: "milestone",
      //   required: true,
      //   option:[
      //     {label:'MS1',value:'MS1'},
      //     {label:'MS2',value:'MS2'},
      //     {label:'MS1 & MS2 Both',value:'both'},

      //   ],
      //   props: {},
      // },
      // {
      //   label: "Customer",
      //   type: "select",
      //   name: "customer",
      //   option:customerList,
      //   props: {},
      // },
      // {
      //   label: "Year",
      //   type: "select",
      //   name: "year",
      //   option:listYear,
      //   props: {},
      // },
      // {
      //   label: "Month",
      //   type: "select",
      //   name: "month",
      //   option:monthList,
      //   props: {},
      // },
      {
        label: "Project Type",
        type: "select",
        name: "projectType",
        option: projectTypeList,
        props: {},
      },
      // {
      //   label: "Project ID",
      //   type: "text",
      //   name: "projectId",
      //   props: {},
      // },
      {
        label: "Site ID",
        type: "text",
        name: "siteId",
        props: {},
      },
      {
        label: "Billing Status",
        type: "select",
        name: "siteBillingStatus",
        option: [
          { label: "Billed", value: "Billed" },
          { label: "Unbilled", value: "Unbilled" },
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
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
    setstrVal(strVal);
    // dispatch(FinanceActions.putPOWorkDoneBased(true,{'year':year,'viewBy':month},() => {},strVal));
    dispatch(FinanceActions.getPOWorkDoneBased(true, "", strVal));
  };

  useEffect(() => {
    dispatch(FinanceActions.getPOWorkDoneBased());
    dispatch(FilterActions.getfinancialWorkDoneProjectType(true,"",0));
  }, [dispatch]);

  const onTableViewSubmit = (data) => {
    data["fileType"] = "ItemCodeforWork";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(
          FinanceActions.putPOWorkDoneBased(
            true,
            { year: currentYear, viewBy: currentMonth },
            () => {}
          )
        );
        setFileOpen(false);
        resetting("");
      })
    );
  };

  // let milestoneList = [
  //     {label:'MS1',value:'MS1'},
  //     {label:'MS2',value:'MS2'},
  //     {label:'MS1 & MS2 Both',value:'both'},
  //   ]

  // let formD = [
  //   {
  //       label: "Milestone",
  //       name: "milestone",
  //       value: "Select",
  //       bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
  //       type: "select",
  //       option: [
  //         {label:'MS1',value:'MS1'},
  //         {label:'MS2',value:'MS2'},
  //         {label:'MS1 & MS2 Both',value:'both'},
  //       ],
  //       props: {
  //         onChange: (e) => {
  //           setValue(e.target.value);
  //         },
  //       },
  //       required: true,
  //       classes: "col-span-1",
  //     },
  //     {
  //       label: "Year",
  //       name: "year",
  //       value: "Select",
  //       bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
  //       type: "select",
  //       required: true,
  //       option: listYear.map((itmYr) => {
  //         return {
  //           label: itmYr,
  //           value: itmYr,
  //         };
  //       }),

  //       props: {
  //         onChange: (e) => {
  //           setValue("year", e.target.value);
  //         },
  //       },
  //       classes: "col-span-1",
  //     },
  //   {
  //     label: ValGm,
  //     name: "viewBy",
  //     value: "Select",
  //     type: "select",
  //     bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
  //     option: listDict[ValGm].map((dasd) => {
  //       return {
  //         value: dasd?.id,
  //         label: dasd?.name,
  //       };
  //     }),
  //     props: {
  //       selectType:selectType
  //     },
  //     hasSelectAll:true,
  //     required: true,
  //     classes: "col-span-1 ",
  //   },
  // ];

  const handleAddActivity = (res) => {
    setmonth(res?.viewBy);
    setyear(res?.year);
    try {
      dispatch(FinanceActions.putPOWorkDoneBased(true, res, () => {}));
    } catch (error) {
      console.error("[ERROR] :: " + error.message);
    }
  };

  return (
    <>
      {/* <div className="flex items-center justify-start gap-5">
          <div className="col-span-1 md:col-span-1">
            
          </div>
          <div className="flex w-fit mt-4 -ml-3 items-center justify-center">
            <Button
              classes=" flex h-fit "
              name=""
              icon={<UilSearch className="w-5 m-2 h-5" />}
              onClick={handleSubmit(handleAddActivity)}
            />
          </div>
        </div> */}
      <AdvancedTable
        headerButton={
          <>
            <ConditionalButton
              showType={getAccessType("Export(Workdone)")}
              name={"Export"}
              classes="w-auto mr-1"
              onClick={() => {
                dispatch(CommonActions.commondownload("/export/poWorkDone" + "?" + strValFil,"Export_PO_WorkDone.xlsx"))
              }}
            ></ConditionalButton>
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
        heading={"Total Count:- "}
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

{
  /* <CommonForm
              classes="grid grid-cols-4 w-[550px] sm:grid-cols-6 xl:grid-cols-3 xl:w-[550px] sm:w-full overflow-y-hidden p-2"
              Form={formD}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />  */
}
