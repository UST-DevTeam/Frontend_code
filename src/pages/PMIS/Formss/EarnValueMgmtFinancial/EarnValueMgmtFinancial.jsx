import React, { useEffect, useRef, useState } from "react";
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
import { getAccessType, objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls } from "../../../../utils/url";
import EarnValueMgmtForm from "../../../../pages/PMIS/Formss/EarnValueMgmtFinancial/EarnValueMgmtForm";
import FinanceActions from "../../../../store/actions/finance-actions";
import FormssActions from "../../../../store/actions/formss-actions";
import AdminActions from "../../../../store/actions/admin-actions";
import Multiselection from "../../../../components/FormElements/Multiselection";
import SelectDropDown from "../../../../components/FormElements/SelectDropDown";
import { data } from "autoprefixer";
import moment from "moment/moment";
import CommonForm from "../../../../components/CommonForm";

import { UilSearch } from "@iconscout/react-unicons";
import FileUploader from "../../../../components/FIleUploader";
import { SET_TABLE } from "../../../../store/reducers/table-reducer";
import Api from "../../../../utils/api";
import Tabs from "../../../../components/Tabs";
import CurrentuserActions from "../../../../store/actions/currentuser-action";
import gpTrackingActions from "../../../../store/actions/gpTrackingActions";




const EarnValueMgmtFinancial = () => {
  const Data = useRef("")
  const currentMonth = new Date().getMonth() + 1;
  const currrentYear = new Date().getFullYear();
  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [modalBody, setmodalBody] = useState(<></> );
  const [ValGm, setValGm] = useState("Monthly");
  const endDate = moment().format("Y");
  const [year, setyear] = useState(currrentYear);
  const [modalHead, setmodalHead] = useState(<></>);
  const [extraColumns, setExtraColumns] = useState([currentMonth]);
  const [newColumns, setNewColumns] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [fileOpen, setFileOpen] = useState(false)

  let dispatch = useDispatch();

  let circleList = useSelector((state) => {
    return state?.adminData?.getManageCircle.map((itm) => {
      return {
        label: itm?.circleName,
        value: itm?.uniqueId,
      };
    });
  });

  let projectTypeList = useSelector((state) => {
    return state?.adminData?.getCardProjectType.map((itm) => {
      return {
        label: itm?.projectType,
        value: itm?.uniqueId,
      };
    });
  });

  let ccList = useSelector((state) => {
    return state?.adminData?.getManageCostCenter.map((itm) => {
      return {
        label: itm?.costCenter,
        value: itm?.uniqueId,
      };
    });
  });
  let projectList = useSelector((state) => {
    return state?.adminData?.getProject.map((itm) => {
      return {
        label: itm?.projectId,
        value: itm?.uniqueId,
      };
    });
  });

  let showType = getAccessType("Actions(EVM-Financial)")


  let shouldIncludeEditColumn = false

  if (showType === "visible"){
    shouldIncludeEditColumn = true
  } 




  let dbConfigList = useSelector((state) => {
    let interdata = state?.formssData?.getEarnValueMgmtFinancial || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        // plan1: itm.earnvalueArray?.[0]?.["plan"],
        // plan2: itm.earnvalueArray?.[1]?.["plan"],
        // plan3: itm.earnvalueArray?.[2]?.["plan"],

        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  // dispatch(FormssActions.getEarnValueMgmtFinancial(true));
                  setmodalHead("Edit Plan");
                  setmodalBody(
                    <>
                      <EarnValueMgmtForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                        year = {year}
                        monthss = {extraColumns}
                      />
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
                        classes='w-15 bg-rose-400'
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.formss_earnValue_mgmt_financial}/${itm.uniqueId}`,
                              () => {
                                dispatch(
                                  FormssActions.getEarnValueMgmtFinancial()
                                );
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
    let interdata = state?.formssData?.getEarnValueMgmtFinancial || [];
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
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


  // const months = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];
  const months = [
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

  const getPreviousCurrentAndNextMonth = () => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const currentYear = currentDate.getFullYear();
    const previousMonthYear =
      currentMonthIndex === 0 ? currentYear - 1 : currentYear;
    const nextMonthYear =
      currentMonthIndex === 11 ? currentYear + 1 : currentYear;

    return [
      { month: months[previousMonthIndex], year: previousMonthYear },
      { month: months[currentMonthIndex], year: currentYear },
      { month: months[nextMonthIndex], year: nextMonthYear },
    ];
  };

  const [previousMonthData, currentMonthData, nextMonthData] =
    getPreviousCurrentAndNextMonth();

  let table = {
    columns: [
      {
        name: "Cost Center",
        value: "costCenter",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      ...newColumns,
    
      ...(shouldIncludeEditColumn
        ? [
            {
              name: "Edit",
              value: "edit",
              style: "min-w-[100px] max-w-[200px] text-center",
            },
          ]
        : [])
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
  };

  let listYear = [];
  for (let ywq = 2023; ywq <= +endDate; ywq++) {
    listYear.push({ label: ywq, value: ywq });
  }
  function getWeekNumber(d) {
    d = new Date(+d);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var yearStart = new Date(d.getFullYear(), 0, 1);
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return [d.getFullYear(), weekNo];
  }

  function weeksInYear(year) {
    var month = 11,
      day = 31,
      week;


    do {
      let d = new Date(year, month, day--);
      week = getWeekNumber(d)[1];
    } 
    while (week == 1);

    return week;
  }

  let listW = [];
  for (let wwq = 1; wwq <= +weeksInYear(year); wwq++) {
    const weekString = "W-" + wwq;
    listW.push({ id: weekString, name: weekString });
  }


  // for (let ywq = 2021; ywq <= +endDate; ywq++) {
  //   listYear.push(ywq);
  // }

  let listDict = {
    "": [],
    Weekly: listW,
    Monthly: [
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
      { id: 12, name: "Dec" }
    ],
  };
  let bussinessUnit = useSelector((state) => {
    return Array.isArray(state?.dropDown?.bussinessUnit)?state?.dropDown?.bussinessUnit.map((itm) => {
      return {
        label: itm,
        value: itm,
      };
    }):[]
  });
   let customerList = useSelector((state) => {
      return state?.gpTrackingReducer?.getCustomer.map((itm) => {
        return {
          label: itm?.customer,
          value: itm?.uniqueId,
        };
      });
    });
    let costCenterList = useSelector((state) => {
      return state?.gpTrackingReducer?.getCostCenter.map((itm) => {
        return {
          label: itm?.costCenter,
          value: itm?.costCenterId,
        };
      });
    });
  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(FinanceActions.getPoLifeCycle(value, objectToQueryString(data)));
  };
  useEffect(() => {
    dispatch(
      FormssActions.postEarnValueMgmtFinancial(
        {
          viewBy: extraColumns.join(","),
          year: `${currrentYear}`,
          yyear: `${currrentYear}`
        },
        () => {}
      )
    );
  }, []);

  const handleCustomerChange = (value) => {
    const selectedValue = value;
    // dispatch(gpTrackingActions.getGPProjectGroup(selectedValue,true));
    dispatch( gpTrackingActions.getGPCostCenter(selectedValue,true));


  };

  useEffect(() => {
    const monthMap = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",  
      12: "Dec",
    };
    let cols = [];
    extraColumns.forEach((index) => {
      if (ValGm && ValGm === "Monthly") {
        cols.push([
            // {
            //   name: `AOP Target (${monthMap[index]} ${year})`,
            //   value: "aop-"+index,
            //   style: "min-w-[200px] max-w-[200px] text-center",
            // },
          {
            name: `PV Target (${monthMap[index]} ${year})`,
            value: "pv-"+index,
            style: "min-w-[200px] max-w-[200px] text-center",
          },
          {
            name: `Achievement (${monthMap[index]} ${year})`,
            value: "amount-" + index,
            style: "min-w-[200px] max-w-[200px] text-center",
          },
        ]);
      } else {
        cols.push([
          {
            name: `AOP Target (${index} ${year})`,
            value: '',
            style: "min-w-[200px] max-w-[200px] text-center",
          },
          {
            name: `PV Target (${index} ${year})`,
            value: '',
            style: "min-w-[200px] max-w-[200px] text-center",
          },
          {
            name: `Achievement (${index} ${year})`,
            value: index,
            style: "min-w-[200px] max-w-[200px] text-center",
          },
        ]);
      }
    });
    cols = cols.flat(Infinity);

    setNewColumns(cols);

  }, [extraColumns]);

  // const handleAddActivity = (res) => {
  //   res['viewBy'] = res['Monthly']
  //   try {
  //     if (res?.typeSelectional === "Monthly") {
  //       setExtraColumns(
  //         res?.viewBy
  //           ?.split(",")
  //           ?.map((key) => +key)
  //           ?.sort((a, b) => a - b)
  //       );
  //     } else {
  //       setExtraColumns(res?.viewBy?.split(",")?.sort((a, b) => {
  //         const numA = parseInt(a.split("-")[1]);
  //         const numB = parseInt(b.split("-")[1]);
          
  //         return numA - numB;
  //       }));
  //     }

  //     dispatch(FormssActions.postEarnValueMgmtFinancial(res, () => {}));
  //   } catch (error) {
  //     console.error("[ERROR] :: " + error.message);
  //   }
  // };

  let formD = [
  
    {
      label: "Year",
      value: "",
      name: "year",
      type: "select",
      option: listYear,
      required: true,
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    },
    {
      label: "Month",
      value: "",
      name: "month",
      type:"select",
      option: months,
      required: true,
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    },
    {
      label: 'Business unit',
      name: "businessUnit",
      value: "select",
      type: "newmuitiSelect2",
      option: bussinessUnit,
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10 ",
    },
    {
      label: "Customer",
      value: "",
      name:"customerId",
      type:"select",
      option: customerList,
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      props: {
        onChange: (e) => {
          handleCustomerChange(e?.target?.value);
        },
      },
      // required: true,
    },

   
    {
      label: 'Cost Center',
      name: "costCenter",
      value: "select",
      type: "newmuitiSelect2",
      option: costCenterList,
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10",
    },
    
  ];
 

  let cummulativeFilter = [
   
    {
      label: "Year",
      value: "",
      name: "year",
      type: "select",
      option: listYear,
      required: true,
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    },
    // {
    //   label: "Month",
    //   value: "",
    //   name: "month",
    //   type:"select",
    //   option: months,
    //   required: true,
    //   bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    // },
    {
      label: 'Month',
      name: "month",
      value: "select",
      type: "newmuitiSelect2",
      option: months,
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10 ",
    },
    
    // {
    //   label: "Cost Center",
    //   value: "",
    //   name:"costCenterId",
    //   type:  "select",
    //   option: costCenterList,
    //   required: true,
    // },
    {
      label: 'Business unit',
      name: "businessUnit",
      value: "select",
      type: "newmuitiSelect2",
      option: bussinessUnit,
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10 ",
    },
    {
      label: "Customer",
      value: "",
      name:"customerId",
      type:"select",
      option: customerList,
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      props: {
        onChange: (e) => {
          handleCustomerChange(e?.target?.value);
        },
      },
      // required: true,
    },
    {
      label: 'Cost Center',
      name: "costCenter",
      value: "select",
      type: "newmuitiSelect2",
      option: costCenterList,
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10",
    },
    
  ];

  let formDate = [
    {
      label: "", 
      name: "dateTime",
      value: "Select",
      type: "datetimeRange",
      // required: true,
      classes: "col-span-1",
    },
  ];


  const tabs = [
    {
      label: "Month",
      body:
          <div className="flex items-center justify-start">

        
            <div className="w-full">
              <CommonForm
                classes="grid grid-cols-6  p-2"
                Form={formD}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
              />
            </div>
            <div className="flex w-fit mt-4 -ml-3 items-center justify-center">
              <Button
                classes="flex h-fit"
                name=""
                icon={<UilSearch className="w-5 m-2 h-5" />}
                onClick={handleSubmit(handleAddActivity)}
              />
            </div>
          </div>
    },
    {
      label: "Cumulative",
      body: <div className="flex items-center justify-start">

        
      <div className="w-full">
        <CommonForm
          classes="grid grid-cols-6  p-2"
          Form={cummulativeFilter}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
      </div>
      <div className="flex w-fit mt-4 -ml-3 items-center justify-center">
        <Button
          classes="flex h-fit"
          name=""
          icon={<UilSearch className="w-5 m-2 h-5" />}
          onClick={handleSubmit(handleAddActivity)}
        />
      </div>
    </div>
    },
  ]
  const [enable, setEnable] = useState(tabs[0].label)
  async  function handleAddActivity(res){
    // Data.current = ""
    // setExtraColumns(res['Month'])
    Data.current = res['CostCenter']
    // FRERFER
    console.log("============", res)
    if (enable=="Cumulative"){
      
      res['month']=res['Month']
    }
    
    
    const resp = await Api.post({ data: res, url: Urls.formss_earnValue_mgmt_financial})
    if (resp.status == 200) {
      dispatch(SET_TABLE(resp?.data?.data))
    }
    // dispatch(tableAction.getTable(Urls.aop+"?filter=true", SET_TABLE))
    // dispatch(FormssActions.postProfiltLossOnSearch(res, () => {}));
  };

  const onTableViewSubmit = (data) => { 
    data["fileType"]="EVMFinancial"
    dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        setFileOpen(false)
    }))
  }

  useEffect(()=>{
    dispatch(gpTrackingActions.getGPCustomer());
  },[])
  return (
    <>
      {/* <div className="flex items-center justify-start">
        <div className="col-span-1 md:col-span-1">
          <CommonForm
            classes="grid grid-cols-2 w-[400px] overflow-y-hidden p-2"
            Form={formD}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
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
      <Tabs data={tabs} date={true} setEnable={setEnable} enable={enable} />
      <AdvancedTable  
        headerButton={
          <>
            <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}>
            </Button>
          </>
        }
        table={table}
        exportButton={["/export/EvmFinancial", "Export_EvmFinancial.xlsx","POST",{viewBy: extraColumns.join(","),
          year:year,
          yyear:year,
          selectional: "Monthly",
          typeSelectional: "Monthly",}]}
        filterAfter={onSubmit}
        tableName={"EvmFinancialForm"}
        TableHeight = "h-[52vh]" 
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        getaccessExport={"Export(EVM-Financial)"}
        heading = {'Total Count :- '}
      />

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/EvmFinancial.xlsx","EvmFinancial.xlsx"]} />
    </>
  );
};

export default EarnValueMgmtFinancial;
