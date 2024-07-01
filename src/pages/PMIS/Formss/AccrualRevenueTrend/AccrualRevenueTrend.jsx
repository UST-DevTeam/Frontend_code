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
import AccrualRevenueTrendForm from "./AccrualRevenueTrendForm";
import { GET_ACCRUAL_REVENUE_TREND } from "../../../../store/reducers/formss-reducer";

const AccrualRevenueTrend = () => {

  const currentMonth = new Date().getMonth() + 1;
  // const currentMonth =  1;
  const currrentYear = new Date().getFullYear();

  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);

  const [ValGm, setValGm] = useState("Monthly");
  const endDate = moment().format("Y");
  const [year, setyear] = useState(currrentYear);
  const exportData = useRef([])
 

  let extraColumns;

  if (currentMonth === 1) {
    extraColumns = [
      {'month':11,"year":currrentYear-1},
      {'month':12,"year":currrentYear-1},
      {'month':1,"year":currrentYear}
    ];
  } else if (currentMonth === 2) {
    extraColumns = [
      {'month':12,"year":currrentYear-1},
      {'month':1,"year":currrentYear},
      {'month':2,"year":currrentYear}
    ];
  } else {
    extraColumns = [
      {'month':currentMonth-2,"year":currrentYear},
      {'month':currentMonth-1,"year":currrentYear},
      {'month':currentMonth,"year":currrentYear}
    ];
  }
  const [extraColumnsState, setExtraColumns] = useState(extraColumns);
  const [newColumns, setNewColumns] = useState([]);
  const [selectType, setSelectType] = useState("");

  let dispatch = useDispatch();


  // let circleList = useSelector((state) => {
  //   return state?.adminData?.getManageCircle.map((itm) => {
  //     return {
  //       label: itm?.circleName,
  //       value: itm?.uniqueId,
  //     };
  //   });
  // });


  let dbConfigList = useSelector((state) => {
    let interdata = state?.formssData?.getAccrualRevenueTrend || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        'edit': (
          <CstmButton
            
            className={"p-2"}
            child={
              <EditButton
                key={`edit-button-${itm.uniqueId}`}
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  setmodalHead("Edit Amount");
                  setmodalBody(
                    <>
                      <AccrualRevenueTrendForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                        year = {year}
                        monthss = {extraColumnsState}
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
                        classes="w-15 bg-green-500"
                        // onClick={() => {
                        //   dispatch(
                        //     CommonActions.deleteApiCaller(
                        //       `${Urls.formss_earnValue_mgmt_financial}/${itm.uniqueId}`,
                        //       () => {
                        //         dispatch(
                        //           FormssActions.getEarnValueMgmtFinancial()
                        //         );
                        //         dispatch(ALERTS({ show: false }));
                        //       }
                        //     )
                        //   );
                        // }}
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

  let table = {
    columns: [
      {
        name: "Customer",
        value: "customer",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Cost center",
        value: "costCenter",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "UST Project ID",
        value: "ustProjectid",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      
      ...newColumns,
     
      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
    //   {
    //     label: "Cirlce",
    //     type: "autoSuggestion",
    //     name: "cirlce",
    //     option: circleList,
    //     props: {},
    //   },
      
    ],
  };

  let listYear = [];
  for (let ywq = 2021; ywq <= +endDate; ywq++) {
    listYear.push(ywq);
  }

  let listDict = {
    "": [],
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
    let value = data.reseter;
    delete data.reseter;
  };

  useEffect(() => {
    extraColumnsState.forEach((itm) => {
      exportData.current =  [...exportData.current, 'M-'+itm.month+"Y-"+itm.year]
    });
    dispatch(
      FormssActions.postAccrualRevenueTrend(
        {
          Monthly: exportData.current.join(",")
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
        },
      },
      required: true,
      classes: "col-span-1 h-38px",
    },
    {
      label: ValGm,
      name: "viewBy",
      value: "Select",
      type: "newmuitiSelect2",
      option: listDict[ValGm].map((dasd) => {
        return {
          value: dasd?.id,
          label: dasd?.name,
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

    const monthMap = {1:"Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"};
    let cols = [];
    extraColumnsState.forEach((itm) => {
      let monthName = monthMap[itm.month];
      let year = itm.year;
      cols.push([
        {
          name: `${monthName} ${year}`,
          value: "M-"+itm.month+'Y-'+year,
          style: "min-w-[200px] max-w-[200px] text-center",
        },
      ]);
  
    });
    cols = cols.flat(Infinity);

    setNewColumns(cols);

  }, [extraColumnsState,  modalOpen]);

  const handleAddActivity = (res) => {
    try {
      let months = res?.Monthly?.split(",")?.map((key) => +key)?.sort((a, b) => a - b);
      let extraCol = months.map((month) => ({
        month: month,
        year: res.year
      }));
      setExtraColumns(extraCol);
      
      months.forEach((itm) => {
        
      exportData.current =  [...exportData.current,  'M-'+itm+"Y-"+res.year]
      }

      )
      dispatch(FormssActions.postAccrualRevenueTrend(
        {
          Monthly: exportData.current.join(",")
        }, () => {}));
    } catch (error) {
      console.error("[ERROR] :: " + error.message);
    }
  };

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
            name=""
            icon={<UilSearch className="w-4 h-4 mx-2" />}
            onClick={handleSubmit(handleAddActivity)}
          />
        </div>
      </div>
      <AdvancedTable 
        table={table}
        exportButton={["/export/accrualRevenueTrend", "Export_Accrual_Revenue_Trend_Form.xlsx","POST",{ Monthly  :exportData.current}]}
        filterAfter={onSubmit}
        tableName={"AccrualRevenueTrend"}
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
    </>
  );
};

export default AccrualRevenueTrend;