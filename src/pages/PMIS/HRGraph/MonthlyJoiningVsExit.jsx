import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GraphActions from "../../../store/actions/graph-actions";
import FilterActions from "../../../store/actions/filter-actions";
import Button from "../../../components/Button";
import DountChart from "../../../components/DountChart";
import PieChart from "../../../components/PieChart";
import { UilImport,UilSearch } from '@iconscout/react-unicons' 
import PolarChart from "../../../components/FormElements/PolarChart";
import BarGraph from "../../../components/BarGrpah";
import LineChartsss from "../../../components/LineChartsss";
import DoubleBarGraph from "../../../components/DoubleBarGraph";


const MonthlyJoiningVsExit = () => {
    const [type, setType] = useState(false);
    let dispatch = useDispatch();
    const [ data ,setData] = useState([])

    let customeruniqueId = "65dee316811c797c9f26d836"

    let projectGroupList = useSelector((state) => {
        return state?.filterData?.getProjectProjectGroup.map((itm) => {
          return {
            label: itm.ProjectGroup,
            value: itm.ProjectGroup,
          };
        });
      });

      let projectTypeList = useSelector((state) => {
        return state?.filterData?.getProjectProjectType.map((itm) => {
          return {
            label: itm.projectType,
            value: itm.projectType,
          };
        });
      });

      let projectManagerList = useSelector((state) => {
        return state?.filterData?.getProjectProjectManager.map((itm) => {
          return {
            label: itm.projectManager,
            value: itm.projectManager,
          };
        });
      });

    let GraphData = useSelector((state) => {
        return state?.GraphData?.getGraphMonthlyJoiningVsExit || []
    });
    console.log(GraphData,"GraphDataGraphDataGraphData")

    useEffect(() => {
        dispatch(GraphActions.getGraphMonthlyJoiningVsExit());
    }, []);

    return (
        <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
            
            <DoubleBarGraph data={GraphData} horizontal={false} title="Monthly Joining VS Exit"/>
            {/* <BarGraph data={GraphData} horizontal={type} /> */}
            {/* <button onClick={() => setType(true)}> <Unicons.UilHorizontalAlignLeft size="15" color="#13b497" /></button>
            <button onClick={() => setType(false)}> <Unicons.UilVerticalAlignBottom size="15" color="#13b497" /></button> */}
        </div>
    );
};
export default MonthlyJoiningVsExit;