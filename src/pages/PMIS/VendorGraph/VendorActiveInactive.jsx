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
import { UilImport, UilSearch, UilTimes, UilRefresh } from '@iconscout/react-unicons'
import AdminActions from "../../../store/actions/admin-actions";


const VendorActiveInactive = ({customeruniqueId}) => {
  const [type, settype] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedProjectManager, setSelectedProjectManager] = useState([]);
  let dispatch = useDispatch();
  const [data, setData] = useState([])

  // let customeruniqueId = "65dee316811c797c9f26d836"

  console.log(customeruniqueId,"_____customeruniqueId")

  let departmentList = useSelector((state) => {
    return state?.adminData?.getManageDepartment.map((itm) => {
      return {
        label: itm?.department,
        value: itm?.uniqueId,
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

  let pieGraphData = useSelector((state) => {
    return state?.GraphData?.getGraphVendorActiveInactive || [""]
  });


  useEffect(() => {
    
    dispatch(AdminActions.getManageDepartment());
    dispatch(FilterActions.getProjectProjectType(`${customeruniqueId}`));
    dispatch(FilterActions.getProjectProjectManager(`${customeruniqueId}`));
    dispatch(GraphActions.getGraphVendorActiveInactive());
  }, []);

  const handleFilter = () => {
    const filterData = {
      ...(setSelectedDepartment.length && { selectedDepartment: selectedDepartment.map(item => item.value) }),
      ...(selectedProjectType.length && { selectedProjectType: selectedProjectType.map(item => item.value) }),
      ...(selectedProjectManager.length && { selectedProjectManager: selectedProjectManager.map(item => item.value) }),
    }

    dispatch(GraphActions.getGraphVendorActiveInactive(filterData, () => { }))

  }
  const handleClear = () => {
    setSelectedDepartment([]);
    setSelectedProjectType([]);
    setSelectedProjectManager([]);
    dispatch(GraphActions.getGraphVendorActiveInactive());
  };

  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex space-x-4 justify-between w-full">
          <NewMultiSelects label='Partner' option={departmentList} value={selectedDepartment} cb={(data) => setSelectedDepartment(data)} />

          <NewMultiSelects label='Project Type' option={projectTypeList} value={selectedProjectType} cb={(data) => setSelectedProjectType(data)} />

          <NewMultiSelects label='Project Manager' option={projectManagerList} value={selectedProjectManager} cb={(data) => setSelectedProjectManager(data)} />

        <div className="flex space-x-4">
          <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleFilter} icon={<UilSearch size="18" className={"hello"} />}></Button>

          <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleClear} icon={<UilRefresh size="36" />}></Button>
        </div>

      </div>
      </div>

      <DountChart data={pieGraphData} label="Total Partners" />

    </div>

  );
};
export default VendorActiveInactive;