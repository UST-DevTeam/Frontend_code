import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import FilterActions from "../../../store/actions/filter-actions";
import Button from "../../../components/Button";
import PieChart from "../../../components/PieChart";
import { UilImport,UilSearch,UilRefresh} from '@iconscout/react-unicons'
import NewSingleSelect from "../../../components/NewSingleSelect";

const MileStoneChart = (id) => {
  const months = [];
  const now = new Date();
  const monthsNumber = [];

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
  const [selectedYears, setSelectedYears] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
    
    let dispatch = useDispatch();
    const [ data ,setData] = useState([])

    // let customeruniqueId = id['customeruniqueId']

    // let projectTypeList = useSelector((state) => {
    //   return state?.filterData?.getProjectProjectType.map((itm) => {
    //     return {
    //       label: itm.projectType,
    //       value: itm.projectType,
    //     };
    //   });
    // });

    // let projectGroupList = useSelector((state) => {
    //     return state?.filterData?.getProjectProjectGroup.map((itm) => {
    //       return {
    //         label: itm.ProjectGroup,
    //         value: itm.ProjectGroup,
    //       };
    //     });
    //   });


    //   let projectIdList = useSelector((state) => {
    //     return state?.filterData?.getProjectProjectId.map((itm) => {
    //       return {
    //         label: itm.projectId,
    //         value: itm.projectId,
    //       };
    //     });
    //   });

    let pieGraphData = useSelector((state) => {
        return state?.GraphData?.getGraphMilestoneStatus || [""]
    });


    useEffect(() => {
        dispatch(GraphActions.getGraphMilestoneStatus());
        // dispatch(FilterActions.getProjectProjectGroup(`${customeruniqueId}`));
        // dispatch(FilterActions.getProjectProjectType(`${customeruniqueId}`));
        // dispatch(FilterActions.getProjectProjectId(`${customeruniqueId}`));
    }, []);

    const handleFilter = () => {
      const filterData = {};
    if (selectedYears) {
      filterData.year = selectedYears.value;
    }
    if (selectedMonths.length > 0) {
      filterData.month = selectedMonths?.map((Sweety) => Sweety.value);
    }
      dispatch(GraphActions.postGraphMilestoneStatus(filterData, () => { }))
  
    }

    const handleClear = () => {
      setSelectedYears(null);
      setSelectedMonths([]);
      dispatch(GraphActions.getGraphMilestoneStatus());
    };

    const years = Array.from(new Array(currentYear - 2020), (val, index) => ({
      label: 2021 + index,
      value: 2021 + index,
    }));
  
    const monthsList = [
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
    ];

    return (
            <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
              <div className="text-center mb-4">
            <h1 className="text-white text-base font-bold">Milestone Status</h1>
        </div>
        <div className="flex items-center space-x-4">
        <div className="flex space-x-1 h-14 justify-between w-full">
          <NewSingleSelect
            label="Year"
            option={years}
            value={selectedYears}
            placeholder="Year"
            cb={(data) => setSelectedYears(data)}
          />
          <NewMultiSelects
            label="Month"
            option={monthsList}
            value={selectedMonths}
            cb={(data) => setSelectedMonths(data)}
            placeholder="Month"
          />
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
              <PieChart data={pieGraphData} />
            </div>
    );
};
export default MileStoneChart;