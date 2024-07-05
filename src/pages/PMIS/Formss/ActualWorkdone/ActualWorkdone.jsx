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
import ActualWorkdoneForm from "./ActualWorkdoneForm";

const ActualWorkdone = () => {
  
  const currentMonth = new Date().getMonth() + 1;
  const currrentYear = new Date().getFullYear();
  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
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

  console.log("extraColumns_____", extraColumns);

  // let circleList = useSelector((state) => {
  //   return state?.adminData?.getManageCircle.map((itm) => {
  //     return {
  //       label: itm?.circleName,
  //       value: itm?.uniqueId,
  //     };
  //   });
  // });

  // let projectTypeList = useSelector((state) => {
  //   return state?.adminData?.getCardProjectType.map((itm) => {
  //     return {
  //       label: itm?.projectType,
  //       value: itm?.uniqueId,
  //     };
  //   });
  // });

  // let ccList = useSelector((state) => {
  //   return state?.adminData?.getManageCostCenter.map((itm) => {
  //     return {
  //       label: itm?.costCenter,
  //       value: itm?.uniqueId,
  //     };
  //   });
  // });
  // let projectList = useSelector((state) => {
  //   return state?.adminData?.getProject.map((itm) => {
  //     return {
  //       label: itm?.projectId,
  //       value: itm?.uniqueId,
  //     };
  //   });
  // });

  let dbConfigList = useSelector((state) => {
    let interdata = state?.formssData?.getEVMDelivery || [];
    console.log("asdfasfasfafdadsfafd", interdata);
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        "uniqueId":"1",
        plan1: itm.earnvalueArray?.[0]?.["plan"],
        plan2: itm.earnvalueArray?.[1]?.["plan"],
        plan3: itm.earnvalueArray?.[2]?.["plan"],

        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  dispatch(FormssActions.getEVMDelivery(true));
                  setmodalHead("Edit Actual");
                  setmodalBody(
                    <>
                      <ActualWorkdoneForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                        year={year}
                        monthss={extraColumns}
                        weeks={extraColumns}
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
                              `${Urls.formss_EVM_delivery}/${itm.uniqueId}`,
                              () => {
                                dispatch(FormssActions.getEVMDelivery());
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
    let interdata = state?.formssData?.getEVMDelivery || [];
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
        name: "Circle",
        value: "circleName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Cost Center",
        value: "costCenter",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project ID",
        value: "projectId",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      ...newColumns,

      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      // {
      //     name: "Delete",
      //     value: "delete",
      //     style: "min-w-[100px] max-w-[200px] text-center"
      // }
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      // {
      //   label: "Cirlce",
      //   type: "autoSuggestion",
      //   name: "circleName",
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
      { id: 12, name: "Dec" },
    ],
  };

  const onSubmit = (data) => {
    console.log("jsjsjsjss", data);
    let value = data.reseter;
    delete data.reseter;
    dispatch(FormssActions.getEVMDelivery(value, objectToQueryString(data)));
  };
  useEffect(() => {
    dispatch(
      FormssActions.postEVMDelivery(
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
      label: "View As",
      name: "typeSelectional",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Monthly View",
          value: "Monthly",
        },
        {
          label: "Weekly View",
          value: "Weekly",
        },
      ],
      props: {
        onChange: (e) => {
          setValue("selectional", e.target.value);
          setValGm(e.target.value);
          setSelectType(e.target.value);
          console.log("afasfadfaamarafasdfasdfasdf", e.target.value);
          console.log(selectType, "adsfasfasdfasdfadfsa");
          // handle resert multiselect
          // alert()
        },
      },
      required: true,
      classes: "col-span-1",
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
        selectType: selectType,
      },
      hasSelectAll: true,
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
    
    extraColumns.forEach((index , i) => {
      if (ValGm && ValGm === "Monthly") {
        cols.push([
          {
            name: `PV Target (${monthMap[index]} ${year})`,
            value: "M-" + (index) + "_y",
            style: "min-w-[200px] max-w-[200px] text-center",
          },
          {
            name: `Achievement (${monthMap[index]} ${year})`,
            value: "MS2-M-" + (index) + "_y",
            style: "min-w-[200px] max-w-[200px] text-center",
          },
        ]);
      }
      // else  if (ValGm && ValGm === "Weekly") {
      //   cols.push([
      //       {
      //         // name: `PV Target (${listW[index]} ${year})`,
      //         name: `PV Target (${index} ${year})`,
      //         value: `${index}`,
      //         style: "min-w-[200px] max-w-[200px] text-center",
      //       },
      //       {
      //         // name: `Achievement (${listW[index]} ${year})`,
      //         name: `Achievement (${index} ${year})`,
      //         // value:"totalCountMS2",
      //         value:"MS2-W-" + index,
      //         style: "min-w-[200px] max-w-[200px] text-center",
      //       },
      //     ]);
      // }
      else {
        cols.push([

          {
            name: `PV Target (${index} ${year})`,
            // value: `${index}`,
            value:index,
            style: "min-w-[200px] max-w-[200px] text-center",
          },
          {
            name: `Achievement (${index} ${year})`,
            // value: "totalCountMS2",
            value:"MS2-" + index,
            style: "min-w-[200px] max-w-[200px] text-center",
          },
        ]);
      }
    });
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
        setExtraColumns(
          res?.viewBy?.split(",")?.sort((a, b) => {
            const numA = parseInt(a.split("-")[1]);
            const numB = parseInt(b.split("-")[1]);

            return numA - numB;
          })
        );
      }

      dispatch(FormssActions.postEVMDelivery(res, () => {}));
    } catch (error) {
      console.error("[ERROR] :: " + error.message);
    }
  };
  console.log("afadfasfasfadfadsfafaf", extraColumns);
  console.log("afasfdasfasfasfafds_amar");
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
        exportButton={["/export/EvmDelivery", "Export_EvmDelivery.xlsx","POST",{viewBy: extraColumns.join(","),
          year: `${currrentYear}`,
          yyear: `${currrentYear}`,
          selectional: "Monthly",
          typeSelectional: "Monthly",}]}
        filterAfter={onSubmit}
        tableName={"AcctualWorkdoneform"}
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
    </>
  );
};

export default ActualWorkdone;
