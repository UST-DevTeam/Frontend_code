// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as Unicons from "@iconscout/react-unicons";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import GraphActions from "../../../store/actions/graph-actions";
// import FilterActions from "../../../store/actions/filter-actions";
// import Button from "../../../components/Button";
// import DountChart from "../../../components/DountChart";
// import PieChart from "../../../components/PieChart";
// import { UilImport,UilSearch } from '@iconscout/react-unicons' 
// import PolarChart from "../../../components/FormElements/PolarChart";
// import BarGraph from "../../../components/BarGrpah";
// import LineChartsss from "../../../components/LineChartsss";
// import DoubleBarGraph from "../../../components/DoubleBarGraph";


// const MonthlyJoiningVsExit = () => {
//     const [type, setType] = useState(false);
//     let dispatch = useDispatch();
//     const [ data ,setData] = useState([])

//     let customeruniqueId = "65dee316811c797c9f26d836"

//     let projectGroupList = useSelector((state) => {
//         return state?.filterData?.getProjectProjectGroup.map((itm) => {
//           return {
//             label: itm.ProjectGroup,
//             value: itm.ProjectGroup,
//           };
//         });
//       });

//       let projectTypeList = useSelector((state) => {
//         return state?.filterData?.getProjectProjectType.map((itm) => {
//           return {
//             label: itm.projectType,
//             value: itm.projectType,
//           };
//         });
//       });

//       let projectManagerList = useSelector((state) => {
//         return state?.filterData?.getProjectProjectManager.map((itm) => {
//           return {
//             label: itm.projectManager,
//             value: itm.projectManager,
//           };
//         });
//       });

//     let GraphData = useSelector((state) => {
//         return state?.GraphData?.getGraphMonthlyJoiningVsExit || []
//     });
//     console.log(GraphData,"GraphDataGraphDataGraphData")

//     useEffect(() => {
//         dispatch(GraphActions.getGraphMonthlyJoiningVsExit());
//     }, []);

//     return (
//         <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
            
//             <DoubleBarGraph data={GraphData} horizontal={false} title="Monthly Joining VS Exit"/>
//             {/* <BarGraph data={GraphData} horizontal={type} /> */}
//             {/* <button onClick={() => setType(true)}> <Unicons.UilHorizontalAlignLeft size="15" color="#13b497" /></button>
//             <button onClick={() => setType(false)}> <Unicons.UilVerticalAlignBottom size="15" color="#13b497" /></button> */}
//         </div>
//     );
// };
// export default MonthlyJoiningVsExit;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../../components/NewMultiSelect";
import GraphActions from "../../../../store/actions/graph-actions";
import Button from "../../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import BarGraph from "../../../../components/BarGrpah";
import AdminActions from "../../../../store/actions/admin-actions";
import NewSingleSelect from "../../../../components/NewSingleSelect";
import DoubleBarGraph from "../../../../components/DoubleBarGraph";
import TripleBarGraph from "../../../../components/TripleBarGraph";
import BarLineGraph from "../../../../components/BarLineGraph";

const TrendPlanVSActualWorkdone = () => {
  const exportData = useRef([]);
  const months = [];
  const now = new Date();
  const monthsNumber = [];
  const month=8

  for (let i = 0; i < 6; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.getMonth() + 1;
    monthsNumber.push(month);
    const year = date.getFullYear();
    months.push({ month, year });
  }

  months.reverse();
  monthsNumber.reverse();

  const [extraColumnsState, setExtraColumns] = useState(months);

  const currentYear = new Date().getFullYear();
//   const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectedCircle, setSelectedCircle] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedYears, setSelectedYears] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedView, setSelectedView] = useState([]);
  const dispatch = useDispatch();

  const monthStr = `${month}`;

//   let departmentList = useSelector((state) => {
//     return state?.GraphData?.getGraphOrganizationLevel?.map((itm) => ({
//       label: itm?.orgLevel,
//       value: itm?.orgLevel,
//     }));
//   });
let CircleList = useSelector((state) => {
    return state?.adminData?.getManageCircle?.map((itm) => ({
      label: itm?.circleName,
      value: itm?.circleName,
    }));
  });

  let AllProjectTypeList = useSelector((state) => {
    return state?.GraphData?.getGraphAllProjectType?.map((itm) => ({
      label: itm?.projectType,
      value: itm?.projectType,
    }));
  });

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphTrendPlanVSActualWorkdone || [];
  });

//   const percentageData = GraphData?.map(item => {
//     const plan = item.plan || 1;
//     const achieved = item.achievement || 0;
//     return ((achieved / plan) * 100).toFixed(2);
//   });


//   const SeriesData = [
//     {
//         name: "Planned",
//         type: "bar",
//         data: GraphData?.map(item => item.plan) || [],
//       },
//       {
//         name: "Achieved",
//         type: "bar",
//         data: GraphData?.map(item => item.achievement) || [],
//       },
//       {
//         name: "Achievement",
//         type: "line",
//         data: percentageData || [],
//       },
//   ];
//   console.log(SeriesData, "SeriesData");

  useEffect(() => {
    // dispatch(AdminActions.getManageDepartment());
    dispatch(AdminActions.getManageCircle());
    dispatch(GraphActions.getGraphAllProjectType());
    dispatch(GraphActions.getGraphTrendPlanVSActualWorkdone());
    fetchGraphData();
  }, []);

  const fetchGraphData = () => {
    dispatch(
      GraphActions.getGraphTrendPlanVSActualWorkdone(
        { month: exportData.current.join(",") },
        () => {}
      )
    );
  };

const handleFilter = () => {
    const filterData = {};
    if (selectedCircle.length > 0) {
      filterData.circleName = selectedCircle?.map((Sweety) => Sweety.value);
    }
    if (selectedProjectType.length > 0) {
      filterData.projectType = selectedProjectType?.map((Sweety) => Sweety.value);
    }
    if (selectedYears) {
      filterData.year = selectedYears.value;
    }
    if (selectedView?.value === "Monthly" && selectedMonths.length > 0) {
        filterData.month = selectedMonths.map((item) => item.value);
      } else if (selectedView?.value === "Weekly" && selectedMonths.length > 0) {
        filterData.week = selectedMonths.map((item) => item.value);
      }filterData.month = selectedMonths?.map((Sweety) => Sweety.value);
      
    dispatch(GraphActions.postGraphRevenuePlanVSActual_Circle(filterData, () => {}));
  };


  const handleClear = () => {
    setSelectedCircle([]);
    setSelectedProjectType([]);
    setSelectedYears(null);
    setSelectedView([]);
    setSelectedMonths([]);
    fetchGraphData(); 
  };

  const years = Array.from(new Array(currentYear - 2020), (val, index) => ({
    label: 2021 + index,
    value: 2021 + index,
  }));

  const generateWeeks = () => {
    return Array.from({ length: 52 }, (_, index) => ({
      value: `WK#${(index + 1).toString().padStart(2, '0')}`,
      label: `WK#${(index + 1).toString().padStart(2, '0')}`,
    }));
  };

  const listDict = {
    "": [],
    Weekly: generateWeeks(),
    Monthly: [
        { value: 1, label: "Jan" },
        { value: 2, label: "Feb" },
        { value: 3, label: "Mar" },
        { value: 4, label: "Apr" },
        { value: 5, label: "May" },
        { value: 6, label: "Jun" },
        { value: 7, label: "Jul" },
        { value: 8, label: "Aug" },
        { value: 9, label: "Sep" },
        { value: 10, label: "Oct" },
        { value: 11, label: "Nov" },
        { value: 12, label: "Dec" },
    ],
  };

  const viewAs = [
    {
      label: "Monthly View",
      value: "Monthly",
    },
    {
      label: "Weekly View",
      value: "Weekly",
    },
  ];

  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
         <div className="text-center mb-4">
            <h1 className="text-white text-base font-bold">Trend - Plan VS Actual Workdone</h1>
        </div>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-1 h-14 justify-between w-full">
        <div className="flex space-x-1 h-14 justify-between w-full">
          <NewMultiSelects
            label="Circle"
            option={CircleList}
            value={selectedCircle}
            cb={(data) => setSelectedCircle(data)}
            placeholder="Circle"
          />
          <NewMultiSelects
            label="Project Type"
            option={AllProjectTypeList}
            value={selectedProjectType}
            cb={(data) => setSelectedProjectType(data)}
            placeholder="Project Type"
          />
          <NewSingleSelect
            label="Year"
            option={years}
            value={selectedYears}
            placeholder="Year"
            cb={(data) => setSelectedYears(data)}
          />
          <NewSingleSelect
            label="View As"
            option={viewAs}
            value={selectedView}
            cb={(data) => {
              setSelectedView(data);
              setExtraColumns(listDict[data.value]);
            }}
            placeholder="View As"
          />
          <NewMultiSelects
            label={selectedView?.value === "Weekly" ? "Weeks" : "Months"}
            option={extraColumnsState}
            value={selectedMonths}
            cb={(data) => setSelectedMonths(data)}
            placeholder={selectedView?.value === "Weekly" ? "Weeks" : "Months"}
          />
        </div>
          <div className="flex space-x-1 ">
            <Button
              classes="w-12 h-10 text-white mt-1 flex justify-center bg-transparent border-solid border-[#64676d] border-2"
              onClick={handleFilter}
              icon={<UilSearch size="18" className={"hello"} />}
            ></Button>
            <Button
              classes="w-12 h-10 text-white mt-1 flex justify-center bg-transparent border-solid border-[#64676d] border-2"
              onClick={handleClear}
              icon={<UilRefresh size="36" />}
            ></Button>
          </div>
        </div>
      </div>
      <BarLineGraph data={GraphData} horizontal={false}/>
    </div>
  );
};

export default TrendPlanVSActualWorkdone;