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


const MileStoneChart = () => {
    
    const [type, settype] = useState(false);
    const [selectedProjectType, setselectedProjectType] = useState([]);
    const [selectedProjectGroup, setselectedProjectGroup] = useState([]);
    const [selectedProjectId, setselectedProjectId] = useState([]);
    const [selectedOptions4, setSelectedOptions4] = useState([]);
    
    let dispatch = useDispatch();
    const [ data ,setData] = useState([])

    let customeruniqueId = "65dee316811c797c9f26d836"

    let projectTypeList = useSelector((state) => {
      return state?.filterData?.getProjectProjectType.map((itm) => {
        return {
          label: itm.projectType,
          value: itm.projectType,
        };
      });
    });

    let projectGroupList = useSelector((state) => {
        return state?.filterData?.getProjectProjectGroup.map((itm) => {
          return {
            label: itm.ProjectGroup,
            value: itm.ProjectGroup,
          };
        });
      });


      let projectIdList = useSelector((state) => {
        return state?.filterData?.getProjectProjectId.map((itm) => {
          return {
            label: itm.projectId,
            value: itm.projectId,
          };
        });
      });

    let pieGraphData = useSelector((state) => {
        return state?.GraphData?.getGraphMilestoneStatus || [""]
    });


    useEffect(() => {
        dispatch(GraphActions.getGraphMilestoneStatus());
        dispatch(FilterActions.getProjectProjectGroup(`${customeruniqueId}`));
        dispatch(FilterActions.getProjectProjectType(`${customeruniqueId}`));
        dispatch(FilterActions.getProjectProjectId(`${customeruniqueId}`));
    }, []);

    const handleFilter = () => {
      const filterData = {
        ...(selectedProjectType.length && { selectedProjectType: selectedProjectType.map(item => item.value) }),
        ...(selectedProjectGroup.length && { selectedProjectGroup: selectedProjectGroup.map(item => item.value) }),
        ...(selectedProjectId.length && { selectedProjectId: selectedProjectId.map(item => item.value) }),
      }
  
      dispatch(GraphActions.postGraphMilestoneStatus(filterData, () => { }))
  
      console.info("filterData____", filterData)
    }

    const handleClear = () => {
      setselectedProjectType([]);
      setselectedProjectGroup([]);
      setselectedProjectId([]);
      dispatch(GraphActions.getGraphMilestoneStatus());
    };

    return (
            <div className="bg-transparent border-[1.5px] border-[#13b497] rounded-md h-full p-4">
              <div className=" flex items-center space-x-4 mb-8 justify-between">
                <div className="flex items-center space-x-4">
                  <NewMultiSelects label='Project Group' option={projectTypeList} value={selectedProjectType} cb={( data ) => setselectedProjectType(data)} />
                  <NewMultiSelects label='Project Type' option={projectGroupList} value={selectedProjectGroup} cb={( data ) => setselectedProjectGroup(data)} />
                  <NewMultiSelects label='Project Manager' option={projectIdList} value={selectedProjectId} cb={( data ) => setselectedProjectId(data)} />
                </div>
                <div className="flex items-center space-x-4">
                  <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleFilter} icon={<UilSearch size="18" className={"hello"} />}></Button>
                  <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleClear} icon={<UilRefresh size="36" />}></Button>
                </div>
              </div>
              <PieChart data={pieGraphData} />
            </div>
    );
};
export default MileStoneChart;