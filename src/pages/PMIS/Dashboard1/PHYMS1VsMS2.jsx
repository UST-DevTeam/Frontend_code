import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import Button from "../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import BarGraph from "../../../components/BarGrpah";
import AdminActions from "../../../store/actions/admin-actions";
import NewSingleSelect from "../../../components/NewSingleSelect";

const PHYMS1VsMS2 = () => {

//   const [extraColumnsState, setExtraColumns] = useState(months);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedOrglevel, setSelectedOrgLevel] = useState([]);
  const dispatch = useDispatch();

  let OrgLevelList = useSelector((state) => {
    return state?.GraphData?.getGraphOrganizationLevel?.map((itm) => ({
      label: itm?.orgLevel,
      value: itm?.orgLevel,
    }));
  });

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphphyMS1vsMS2 || [];
  });

  const seriesData = [
    {
        name: "Count",
        data: GraphData?.map(item => item.count) ||[],
    },
];
  
  useEffect(() => {
    dispatch(GraphActions.getGraphphyMS1vsMS2());
    dispatch(GraphActions.getGraphOrganizationLevel());
  }, []);

  useEffect(() => {
  }, [GraphData]);

  const handleFilter = () => {
    const filterData = {
      orgLevel: selectedOrglevel?.map((item) => item.value) || [],
    };
    dispatch(
      GraphActions.getGraphphyMS1vsMS2(
        { orgLevel: filterData.orgLevel},
        () => {}
      )
    );
  };


  const handleClear = () => {
    setSelectedOrgLevel([]);
    dispatch(GraphActions.getGraphphyMS1vsMS2());
  };


  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md w-auto p-4">
          <div className="text-center flex-1 mr-32">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">PHY MS1 Vs MS2</h1>
          </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
          {/* <NewMultiSelects
            label="Org Level"
            option={OrgLevelList}
            value={selectedOrglevel}
            placeholder="Org Level"
            cb={(data) => setSelectedOrgLevel(data)}
          /> */}
           </div>
      <div className="flex space-x-2">
            {/* <Button
              classes="w-12 h-10 text-white mt-1 flex justify-center bg-transparent border-solid border-[#64676d] border-2"
              onClick={handleFilter}
              icon={<UilSearch size="36" className="text-[#f4d3a8]"/>}
            ></Button>
            <Button
              classes="w-12 h-10 text-white mt-1 flex justify-center bg-transparent border-solid border-[#64676d] border-2"
              onClick={handleClear}
              icon={<UilRefresh size="36" className = "text-[#f4d3a8]"/>}
            ></Button> */}
          </div>
        </div>
      <BarGraph data={GraphData} seriesData={seriesData} horizontal={false}  columnWidth='60%' />
    </div>
  );
};
export default PHYMS1VsMS2;