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
import { getAccessType, objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls } from "../../../../utils/url";
import EarnValueMgmtForm from "../EarnValueMgmtFinancial/EarnValueMgmtForm";
import FinanceActions from "../../../../store/actions/finance-actions";
import FormssActions from "../../../../store/actions/formss-actions";
import AdminActions from "../../../../store/actions/admin-actions";
import Multiselection from "../../../../components/FormElements/Multiselection";
import SelectDropDown from "../../../../components/FormElements/SelectDropDown";
import { data } from "autoprefixer";
import moment from "moment/moment";
import CommonForm from "../../../../components/CommonForm";

import PLform from "./PLform";
import { UilSearch } from "@iconscout/react-unicons";

const PL = () => {
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
  let dispatch = useDispatch();
  const [extraColumns, setExtraColumns] = useState([currentMonth]);
  const [newColumns, setNewColumns] = useState([]);
  const [selectType, setSelectType] = useState("");
  // let roleList = useSelector((state) => {
  //     let interdata = state?.operationManagement?.USERS_LIST
  //     return interdata
  // })



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

  let showType = getAccessType("Actions(P&L)")

  let shouldIncludeEditColumn = false

  if (showType === "visible"){
    shouldIncludeEditColumn = true
  }



  let dbConfigList = useSelector((state) => {
    const projectedCosts = {
      1 : 'projectedCost-1',
      2 : 'projectedCost-2',
      3 : 'projectedCost-3',
      4 : 'projectedCost-4',
      5 : 'projectedCost-5',
      6 : 'projectedCost-6',
      7 : 'projectedCost-7',
      8 : 'projectedCost-8',
      9 : 'projectedCost-9',
      10 : 'projectedCost-10',
      11 : 'projectedCost-11',
      12 : 'projectedCost-12',
    }
    const actualCosts = {
      1 : 'actualCost-1',
      2 : 'actualCost-2',
      3 : 'actualCost-3',
      4 : 'actualCost-4',
      5 : 'actualCost-5',
      6 : 'actualCost-6',
      7 : 'actualCost-7',
      8 : 'actualCost-8',
      9 : 'actualCost-9',
      10 : 'actualCost-10',
      11 : 'actualCost-11',
      12 : 'actualCost-12',
    }
    
    let interdata = state?.formssData?.getProfitloss || [];
    
    return interdata?.map((itm) => {

      let updateditm = {
        ...itm,

        // projectedGrossProfit : (+itm['totalAmount'] - (itm[`projectedCost-${+itm['month']}`] ?? 0 )) ?? 0,
        // projectedGrossProfit : (itm['projectedGrossProfit'] ?? 0),
        // projectedMargin: ((+itm['totalAmount'] - (itm[`projectedCost-${+itm['month']}`] ?? 0 )) / (itm['totalAmount'])).toFixed(2) ?? 0,

        // actualGrossProfit : Math.abs((+itm['actualRevenue'] - (itm[`actualCost-${+itm['month']}`] ?? 0)) ?? 0),
        // actualMargin:  (itm['actualRevenue'] ) ? (((+itm['actualRevenue'] - (itm[`actualCost-${+itm['month']}`] ?? 0)) / (itm['actualRevenue'])).toFixed(2)) : 0,



        // projectedCost : itm[projectedCosts[+itm?.month]],
        // actualCost : itm[actualCosts[+itm?.month]],
        projectedCost: (itm && itm.hasOwnProperty(projectedCosts[+itm?.month])) ? itm[projectedCosts[+itm?.month]] : 0,
        actualCost: (itm && itm.hasOwnProperty(actualCosts[+itm?.month])) ? itm[actualCosts[+itm?.month]] : 0,



        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  // dispatch(FormssActions.getEarnValueMgmtFinancial(true));
                  setmodalHead("Edit P&L");
                  setmodalBody(
                    <>
                      <PLform
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                        year = {year}
                        monthss = {[itm?.month]}
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
                              `${Urls.formss_earnValue_mgmt_financial}/${itm.uniqueId}`,
                              () => {
                                dispatch(
                                  FormssActions.getProfitloss()
                                );
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
    let interdata = state?.formssData?.getProfiltLoss || [];
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
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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
        name: "Year",
        value: "year",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Month",
        value: "month",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Customer",
        value: "customer",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "Cost Center",
        value: "costCenter",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project Group",
        value: "projectGroup",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "Projected Revenue",
        value: "achivement",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "Projected Revenue",
        value: "totalAmount",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "Projected Cost",
        value: "projectedCost",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "Projected Gros Profit",
        value: "projectedGrossProfit",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "Projected Margin(%)",
        value: "projectedMargin",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "Actual Revenue",
        value: "actualRevenue",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "Actual Cost",
        value: "actualCost",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "ActalGrosProfit",
        value: "actualGrossProfit",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "Actual Margin(%)",
        value: "actualMargin",
        style: "min-w-[200px] max-w-[200px] text-center",
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
    filter: [
      // {
      //   label: "Cirlce",
      //   type: "autoSuggestion",
      //   name: "cirlce",
      //   option: circleList,
      //   props: {},
      // },
      // {
      //   label: "Project Type",
      //   type: "autoSuggestion",
      //   name: "projectType",
      //   option: projectTypeList,
      //   props: {},
      // },
      // {
      //   label: "Cost Center",
      //   type: "autoSuggestion",
      //   name: "costCenter",
      //   option: ccList,
      //   props: {},
      // },
      // {
      //   label: "Project ID",
      //   type: "autoSuggestion",
      //   name: "projectId",
      //   option: projectList,
      //   props: {},
      // },
      // {
      //     label: "Project ID",
      //     type: "autoSuggestion",
      //     name: "projectId",
      //     option: `${}`,
      //     props: {
      //     }
      // },
    ],
  };

  let listYear = [];

  // let listYear=[]

  function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
  }

  function weeksInYear(year) {
    var month = 11,
      day = 31,
      week;

    // Find week that 31 Dec is in. If is first week, reduce date until
    // get previous week.
    do {
      let d = new Date(year, month, day--);
      week = getWeekNumber(d)[1];
    } while (week == 1);

    return week;
  }

  let listW = [];
  for (let wwq = 1; wwq <= +weeksInYear(year); wwq++) {
    const weekString = "W-" + wwq;
    listW.push({ id: weekString, name: weekString });
  }






  for (let ywq = 2021; ywq <= +endDate; ywq++) {
    listYear.push(ywq);
  }

  let listDict = {
    "": [],
    Weekly: listW,
    // Monthly: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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

  const onSubmit = (data) => {
    console.log("jsjsjsjss", data);
    let value = data.reseter;
    delete data.reseter;
    dispatch(FinanceActions.getProfiltLoss(value, objectToQueryString(data)));
  };
  useEffect(() => {
    dispatch(
      FormssActions.postProfiltLossOnSearch(
        {
          viewBy: extraColumns.join(","),
          year: `${currrentYear}`,
          yyear: `${currrentYear}`,
          selectional: "Monthly",
          typeSelectional: "Monthly",
        },
        () => {}
      )
    );
  }, []);

  const totalAmount = watch("totalAmount");
  const projectedCost = watch("projectedCost");

  // useEffect(() => {
  //   if(table.columns){
  //     reset({
        
  //         totalAmount:"",
  //         projectedCost:"",
       
  //     })
  //   }

  // }, [reset])

  // useEffect(() => {
  //   console.log(`totalAmount: ${totalAmount}, projectedCost: ${projectedCost}`);

  //   const projectedGrossProfit = totalAmount - projectedCost;

  //   console.log(`projectedGrossProfit: ${projectedGrossProfit}`);

  //   setValue("projectedGrossProfit", projectedGrossProfit>=0 ? projectedGrossProfit: 0);
  // }, [totalAmount, projectedCost, setValue]);

  let formD = [
    {
      label: "Year",
      name: "year",
      value: "Select",
      type: "select",
      option: listYear.map((itmYr) => {
        return {
          label: itmYr,
          value: itmYr,
        };
      }),
      props: {
        onChange: (e) => {
          setValue("yyear", e.target.value);
          setyear(e.target.value);
          // alert()
        },
      },
      required: true,
      classes: "col-span-1 h-38px",
    },


    {
      label: ValGm,
      name: "viewBy",
      value: "Select",
      type: "muitiSelect",
      option: listDict[ValGm].map((dasd) => {
        return {
          id: dasd?.id,
          name: dasd?.name,
        };
      }),
      props: {
        selectType:selectType
      },
      hasSelectAll:true,
      required: true,
      classes: "col-span-1 h-10",
    },
  ];

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
    // extraColumns.forEach((index) => {
    //   if (ValGm && ValGm === "Monthly") {
    //     cols.push([
    //       {
    //         name: `Projected Cost (${monthMap[index]} ${year})`,
    //         value: "projectedCost-"+index,
    //         style: "min-w-[200px] max-w-[200px] text-center",
    //       },
    //       {
    //         name: `Actual Cost (${monthMap[index]} ${year})`,
    //         value: "actualCost-"+index,
    //         style: "min-w-[200px] max-w-[200px] text-center",
    //       },
    //     ]);
    //   } else {
    //     cols.push([
    //       {
    //         name: `Projected Cost (${index} ${year})`,
    //         value: '',
    //         style: "min-w-[200px] max-w-[200px] text-center",
    //       },
    //       {
    //         name: `Actual Cost (${index} ${year})`,
    //         value: '',
    //         style: "min-w-[200px] max-w-[200px] text-center",
    //       },
        
    //     ]);
    //   }
    // });
    cols = cols.flat(Infinity);
    console.log("cols_cols_____", cols);

    setNewColumns(cols);

    // setValue('year',`${year}`)
    // setValue('typeSelectional',"Monthly")
    // setValue('viewBy',`${extraColumns.map(i=> `${i}`)}`)
  }, [extraColumns]);

  const handleAddActivity = (res) => {
    try {
      if (res?.typeSelectional === "Monthly") {
        setExtraColumns(
          res?.viewBy
            ?.split(",")
            ?.map((key) => +key)
            ?.sort((a, b) => a - b)
        );
      } else {
        setExtraColumns(res?.viewBy?.split(",")?.sort((a, b) => {
          const numA = parseInt(a.split("-")[1]);
          const numB = parseInt(b.split("-")[1]);
          
          return numA - numB;
        }));
      }

      dispatch(FormssActions.postProfiltLossOnSearch(res, () => {}));
    } catch (error) {
      console.error("[ERROR] :: " + error.message);
    }
  };
  console.log("afadfasfasfadfadsfafaf",extraColumns);

  return (
    <>
      <div className="flex">
        <CommonForm
          classes={"w-5/6 grid-cols-3 gap-1 h-[111px]"}
          Form={formD}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />

        <div className="pt-12 p-6  flex justify-center">
          <Button
            classes=""
            name="Search "
            icon={<UilSearch className="w-4 h-4 mx-2" />}
            onClick={handleSubmit(handleAddActivity)}
          />
        </div>
      </div>

      <AdvancedTable 
        headerButton={
          <>
            {/* <Button
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("New Plan");
                // setmodalBody(<EarnValueMgmtForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
              }}
              name={"Add New"}
            ></Button> */}
          </>
        }
        table={table}
        exportButton={["/export/profit&loss", "Export_Profit&Loss.xlsx","POST",{viewBy: extraColumns.join(","),
          year: year,
          yyear: year,
          selectional: "Monthly",
          typeSelectional: "Monthly",}]}

        filterAfter={onSubmit}
        tableName={"PLform"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        getaccessExport = {"Export(P&L)"}
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

export default PL;
