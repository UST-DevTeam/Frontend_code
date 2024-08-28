import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import Button from "../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import BarGraph from "../../../components/BarGrpah";
import AdminActions from "../../../store/actions/admin-actions";
import NewSingleSelect from "../../../components/NewSingleSelect";
import DoubleBarGraph from "../../../components/DoubleBarGraph";

const AdvanceApprovalStatus = () => {

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
  // let departmentList = useSelector((state) => {
  //   return state?.adminData?.getManageDepartment?.map((itm) => ({
  //     label: itm?.department,
  //     value: itm?.uniqueId,
  //   }));
  // });
  let departmentList = useSelector((state) => {
    return state?.GraphData?.getGraphOrganizationLevel?.map((itm) => ({
      label: itm?.orgLevel,
      value: itm?.orgLevel,
    }));
  });

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphAdvanceApprovalStatus || [];
  });


  const SeriesData = [
    {
      name: "Value",
      data: GraphData?.map(item => item.count) || [],
    },
  ];

  useEffect(() => {
    dispatch(GraphActions.getWeeklyHorizontalName());
    // dispatch(GraphActions.getGraphOrganizationLevel());
    // dispatch(AdminActions.getManageDepartment());
    dispatch(GraphActions.getGraphAdvanceApprovalStatus());
    fetchGraphData();
  }, []);

  const fetchGraphData = () => {
    // exportData.current = extraColumnsState.map(
    //   (itm) => `M-${itm.month}Y-${itm.year}`
    // );
    dispatch(
      GraphActions.getGraphAdvanceApprovalStatus());};

  // const handleFilter = () => {
  //   const filterData = {
  //       description: selectedOrglevel?.map((item) => item.value) || [],
  //       orgLevel: selectedDepartment?.map((item) => item.value) || [],
  //   };

  //   dispatch(
  //     GraphActions.postGraphWeeklyActiveEmp(
  //       { description: filterData.description, orgLevel: filterData.orgLevel},
  //       () => {}
  //     )
  //   );
  // };

  const handleFilter = () => {
    const filterData = {};
    if (selectedOrglevel.length > 0) {
      filterData.description = selectedOrglevel?.map((Sweety) => Sweety.value);
    }
    if (selectedDepartment.length > 0) {
      filterData.orgLevel = selectedDepartment?.map((Sweety) => Sweety.value);
    }
    dispatch(GraphActions.postGraphWeeklyActiveEmp(filterData, () => {}));
  };


  const handleClear = () => {
    setSelectedOrgLevel([]);
    setSelectedDepartment([]);
    fetchGraphData();
  };


  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
        <div className="text-center mb-4">
            <h1 className="text-white text-base font-bold">Advance Approval Status</h1>
        </div>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-1 h-14 justify-between w-full">
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
            placeholder="Org Level"
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
      <BarGraph data={GraphData} seriesData={SeriesData} horizontal={false} dataLabelSuffix="L" colors={["#5db7a3","#fbd0d0","#c4f4a0","#f6a04c","#9ee6f1"]} />
    </div>
  );
};

export default AdvanceApprovalStatus;