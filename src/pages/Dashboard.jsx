import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PieChart from "../components/PieChart";
import BarGraph from "../components/BarGrpah";
import GraphActions from "../store/actions/graph-actions";


const Dashboard = () => {
    const [type, settype] = useState(false);
    let dispatch = useDispatch();

    let pieGraphData = useSelector((state) => {
        return state?.GraphData?.getGraphProjectStatus || [""]
    });


    console.table(pieGraphData)





    useEffect(() => {
        dispatch(GraphActions.getGraphProjectStatus());
    }, []);

    return (
        <div className='border p-4 rounded-md  col-span-2 grid grid-cols-2 bg-[#24292D]'>
            {/* <div>
                <select>
                    <option>hi</option>
                    <option>hello</option>
                </select>

                <PieChart data={pieGraphData} />

            </div> */}

            <PieChart data={pieGraphData} />

            {/* <BarGraph data={""} /> */}
        </div>

    );
};
export default Dashboard;

