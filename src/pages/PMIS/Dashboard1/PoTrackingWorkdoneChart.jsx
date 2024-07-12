import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import FilterActions from "../../../store/actions/filter-actions";
import Button from "../../../components/Button";
import DountChart from "../../../components/DountChart";
import { UilImport, UilSearch,UilTimes,UilRefresh } from '@iconscout/react-unicons'
import PieChart from "../../../components/PieChart";
import RadialBarChart from "../../../components/FormElements/RadialBarChart";
import ColumnChart from "../../../components/Columnchart";


const PoTrackingWorkdoneChart = () => {
  const [type, settype] = useState(false);
  const [selectedProjectGroup, setSelectedProjectGroup] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedProjectManager, setSelectedProjectManager] = useState([]);
  let dispatch = useDispatch();
  const [data, setData] = useState([])

  let projectGroupList = useSelector((state) => {
    return state?.filterData?.getfinancialPoManagementProjectGroup
    .map((itm) => {
      return {
        label: itm.projectGroup,
        value: itm.projectGroup,
      };
    });
  });

  

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphPoTrackingWorkdone || [""]
  });


  let value = []

  if (GraphData.length > 0) {
    const { invoicedQty = 0, workDoneQty = 0, openQty = 0 } = GraphData[0];
    value.push(invoicedQty, workDoneQty, openQty);
  } else {
    value.push(0, 0, 0);
  }



  let colors = ['#003459','#007EA7','#00A8E8']

  useEffect(() => {
    dispatch(GraphActions.getGraphPOTrackingWorkdone());
  }, []);




  const handleFilter = () => {
    const filterData = {
      ...(selectedProjectGroup.length && { selectedProjectGroup: selectedProjectGroup.map(item => item.value) }),
    }

    dispatch(GraphActions.postGraphPOTrackingWorkdone(filterData,() => {}))
  }

  

  const handleClear = () => {
    setSelectedProjectGroup([]);
    dispatch(GraphActions.getGraphPOTrackingWorkdone());
  };

  return (
    <div className="bg-transparent border-[1.5px] border-[#13b497] rounded-md h-full p-4">
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex space-x-4 justify-between w-full">
          <NewMultiSelects label='Project Group' option={projectGroupList} value={selectedProjectGroup} cb={(data) => setSelectedProjectGroup(data)} />
          <div className="flex space-x-4">
            <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleFilter} icon={<UilSearch size="18" className={"hello"}/>}></Button>
            <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleClear} icon={<UilRefresh size="36" />}></Button>
          </div>
        </div>
      </div>
      <ColumnChart data={value}/>
    </div>

  );
};
export default PoTrackingWorkdoneChart;