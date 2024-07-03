import React, { useEffect,useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import FilterActions from "../../../store/actions/filter-actions";
import Button from "../../../components/Button";
import DountChart from "../../../components/DountChart";
import PieChart from "../../../components/PieChart";
import { UilImport,UilSearch } from '@iconscout/react-unicons'
import PolarChart from "../../../components/FormElements/PolarChart";
import AreaChart from "../../../components/AreaChart";
import moment from "moment/moment";
import FormssActions from "../../../store/actions/formss-actions";
import NewSingleSelect from "../../../components/NewSingleSelect";


const AccrualRevenueTrendChart = () => {

    const exportData = useRef([])
    const months = [];
    const now = new Date();

  for (let i = 0; i < 6; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    months.push({ month, year });
  }

  months.reverse();

  const [extraColumnsState, setExtraColumns] = useState(months);

    const currrentYear = new Date().getFullYear();

    const [type, settype] = useState(false);
    const [selectedOptions1, setSelectedOptions1] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [selectedOptions3, setSelectedOptions3] = useState([]);
    const endDate = moment().format("Y");
    const [year, setyear] = useState(currrentYear);
    let dispatch = useDispatch();
    const [ data ,setData] = useState([])



    console.log(selectedOptions1,"_______selectedOptions1")
    console.log(selectedOptions2,"_______selectedOptions1")
    console.log(selectedOptions3,"_______selectedOptions1")
   


    



    let customeruniqueId = "667d593927f39f1ac03d7863"

    let costCenterList = useSelector((state) => {
        return state?.formssData?.getAccrualRevenueTrend.map((itm) => {
          return {
            label: itm.costCenter,
            value: itm.uniqueId,
          };
        });
      });

    let listYear = [];
        for (let ywq = 2021; ywq <= +endDate; ywq++) {
            listYear.push({
                label:ywq,
                value:ywq
            });
        }


    let listMonth = [
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

      

    let pieGraphData = useSelector((state) => {
        return state?.GraphData?.getGraphAccrualRevenueTrend ||['']
    });


    // let pieGraphData = [

    //   {"status":"Approved Claims","count":20},
    //   {"status":"L1 Approved","count":30},
    //   {"status":"L2 Approved","count":50},
    //   {"status":"Rejected claims","count":60},
    //   {"status":"Submitted Claims","count":30},
    // ]


    useEffect(() => {
        extraColumnsState.forEach((itm) => {
            exportData.current =  [...exportData.current, 'M-'+itm.month+"Y-"+itm.year]
          });
          dispatch(
                GraphActions.postGraphAccrualRevenueTrend(
              {
                Monthly: exportData.current.join(",")
              },
              () => {}
            )
          );
          dispatch(
                FormssActions.postAccrualRevenueTrend(
              {
                Monthly: exportData.current.join(",")
              },
              () => {}
            )
          );
    }, []);



    const handleFilter = () => {
      const filterData = {
        selectedOptions1: selectedOptions1.value || "",
        selectedOptions2: selectedOptions2.value || currrentYear,
        ...(selectedOptions3.length && { selectedOptions3: selectedOptions3.map(item => item.value) }),
      }
    }


    




    return (
            <div className="bg-[#1c1c1c] h-full p-4">
              
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="flex flex-col flex-1">
                            {/* <label className = "text-white">Project Group</label>*/}
                            <NewSingleSelect label='Cost Center' option={costCenterList} value={selectedOptions1} cb={( data ) => setSelectedOptions1(data)} placeholder = "Cost Center" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <NewSingleSelect label='Year' option={listYear} value={selectedOptions2} cb={( data ) => setSelectedOptions2(data)} placeholder = "Year" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <NewMultiSelects label='Month' option={listMonth} value={selectedOptions3} cb={( data ) => setSelectedOptions3(data)} />
                        </div>
                        <div className="flex flex-col flex-1">
                        {/* <Button classes = "text-white !py-2 mt-6 flex justify-center text-[15px]" name={"Search"}></Button> */}
                        <Button classes = "w-12 h-10 text-white mt-1 flex justify-center bg-[#252525]" onClick={handleFilter}  icon={<UilSearch size="18" className={"hello"} />}></Button>
                        </div>
                    </div>

                <AreaChart data = {pieGraphData}/>
            </div>

    );
};
export default AccrualRevenueTrendChart;