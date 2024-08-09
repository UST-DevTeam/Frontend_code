// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as Unicons from "@iconscout/react-unicons";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import GraphActions from "../../../store/actions/graph-actions";
// import FilterActions from "../../../store/actions/filter-actions";
// import Button from "../../../components/Button";
// import { UilImport, UilSearch, UilTimes, UilRefresh } from '@iconscout/react-unicons'
// import BarGraph from "../../../components/BarGrpah";
// import AdminActions from "../../../store/actions/admin-actions";
// import NewSingleSelect from "../../../components/NewSingleSelect";
// import NewMultiSelects from "../../../components/NewMultiSelect";


// const WeeklyActiveEmpList = () => {
//     const [type, setType] = useState(false);
//     const [selectedDepartment, setSelectedDepartment] = useState([]);
//     const [selectedOptions1, setSelectedOptions1] = useState([]);
//     const [selectedOptions2, setSelectedOptions2] = useState([]);
//     const [selectedOptions3, setSelectedOptions3] = useState([]);
//     let dispatch = useDispatch();
//     const [ data ,setData] = useState([])

//     let departmentList = useSelector((state) => {
//         return state?.adminData?.getManageDepartment.map((itm) => {
//           return {
//             label: itm?.department,
//             value: itm?.uniqueId,
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
//         return state?.GraphData?.getGraphWeeklyActiveEmp || []
//     });

//     useEffect(() => {
//         dispatch(AdminActions.getManageDepartment());
//         dispatch(GraphActions.getGraphWeeklyActiveEmp());
//     }, []);

//     const handleFilter = () => {

        
//       const filterData = {
//         ...(setSelectedDepartment.length && { selectedDepartment: selectedDepartment?.map(item => item.department) }),
//       }
//       const departmentValue = selectedDepartment.length > 0 ? selectedDepartment[0].value : '';
  
//       dispatch(GraphActions.getGraphWeeklyActiveEmp(filterData, `department=${departmentValue}`))
  
//     }
//     const handleClear = () => {
//       setSelectedDepartment([]);
//       dispatch(GraphActions.getGraphWeeklyActiveEmp());
//     };


//     return (
//         <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
//             <div className="flex items-center space-x-4 mb-8">
//             <div className="flex space-x-4 justify-between w-full">
//               <NewMultiSelects label='Partner' option={departmentList} value={selectedDepartment} cb={(data) => setSelectedDepartment(data)} />
//             <div className="flex space-x-4">
//               <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleFilter} icon={<UilSearch size="18" className={"hello"} />}></Button>

//               <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleClear} icon={<UilRefresh size="36" />}></Button>
//             </div>

//           </div>
//         </div>
//             <BarGraph data={GraphData} horizontal={false} title="Weekly Active Employee" />
//             {/* <BarGraph data={GraphData} horizontal={type} /> */}
//             {/* <button onClick={() => setType(true)}> <Unicons.UilHorizontalAlignLeft size="15" color="#13b497" /></button>
//             <button onClick={() => setType(false)}> <Unicons.UilVerticalAlignBottom size="15" color="#13b497" /></button> */}
//         </div>
//     );
// };
// export default WeeklyActiveEmpList; 

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import Button from "../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import BarGraph from "../../../components/BarGrpah";
import AdminActions from "../../../store/actions/admin-actions";
import NewSingleSelect from "../../../components/NewSingleSelect";

const WeeklyActiveEmpList = () => {

//   const [extraColumnsState, setExtraColumns] = useState(months);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedOrglevel, setSelectedOrgLevel] = useState([]);
  const dispatch = useDispatch();

  let OrgLevelList = useSelector((state) => {
    return state?.GraphData?.getWeeklyHorizontalName?.map((itm) => ({
      label: itm?.description,
      value: itm?.description,
    }));
  });
  let departmentList = useSelector((state) => {
    return state?.adminData?.getManageDepartment?.map((itm) => ({
      label: itm?.department,
      value: itm?.uniqueId,
    }));
  });

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphWeeklyActiveEmp || [];
  });

  useEffect(() => {
    dispatch(GraphActions.getWeeklyHorizontalName());
    dispatch(AdminActions.getManageDepartment());
    dispatch(GraphActions.getGraphWeeklyActiveEmp());
    fetchGraphData();
  }, []);

  const fetchGraphData = () => {
    // exportData.current = extraColumnsState.map(
    //   (itm) => `M-${itm.month}Y-${itm.year}`
    // );
    dispatch(
      GraphActions.getGraphWeeklyActiveEmp());};

  const handleFilter = () => {
    const filterData = {
        description: selectedOrgleve?.map((item) => item.value) || [],
      department: selectedDepartment?.map((item) => item.value) || [],
    };

    dispatch(
      GraphActions.postGraphWeeklyActiveEmp(
        { description: filterData.description, department: filterData.department},
        () => {}
      )
    );
  };


  const handleClear = () => {
    setSelectedOrgLevel([]);
    setSelectedDepartment([]);
    fetchGraphData();
  };


  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex space-x-1 justify-between w-full">
          <NewMultiSelects
            label="Org Level"
            option={OrgLevelList}
            value={selectedOrglevel}
            placeholder="Description"
            cb={(data) => setSelectedOrgLevel(data)}
          />
          <NewMultiSelects
            label="Department"
            option={departmentList}
            value={selectedDepartment}
            placeholder="Department"
            cb={(data) => setSelectedDepartment(data)}
          />
          <div className="flex space-x-1">
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
      <BarGraph data={GraphData} horizontal={false} title="Weekly Active Employee" />
    </div>
  );
};

export default WeeklyActiveEmpList;