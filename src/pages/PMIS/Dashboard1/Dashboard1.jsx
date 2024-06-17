import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectChart from "./ProjectChart";
import ClaimAndAdvanceChart from "./ClaimAndAdvanceChart";
import MileStoneChart from "./MileStoneChart";
import PolarChart from "../../../components/FormElements/PolarChart";
import PoStatusChart from "./PoStatusChart";
import RadialBarChart from "../../../components/FormElements/RadialBarChart";





const Dashboard1 = () => {

    return (

        <div className="grid lg:grid-cols-2 m-2 gap-2">

            <ProjectChart />
            <ClaimAndAdvanceChart />
            <MileStoneChart />
            <PoStatusChart />
            
            
        </div>

    )


}
   


export default Dashboard1;

