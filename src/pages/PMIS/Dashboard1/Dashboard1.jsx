import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProjectChart from "./ProjectChart";
import ClaimAndAdvanceChart from "./ClaimAndAdvanceChart";
import MileStoneChart from "./MileStoneChart";
import PolarChart from "../../../components/FormElements/PolarChart";
import PoStatusChart from "./PoStatusChart";
import RadialBarChart from "../../../components/FormElements/RadialBarChart";
import ColumnChart from "../../../components/Columnchart";
import PoTrackingWorkdoneChart from "./PoTrackingWorkdoneChart";
import AccrualRevenueTrendChart from "./AccrualRevenueTrendChart";
import ActiveEmpwithCostCenter from "../HRGraph/ActiveEmpwithCostCenter";
import NewJoiningMonthly from "../HRGraph/NewJoiningMonthly";
import MonthlyActiveTrend from "../HRGraph/MonthlyActiveTrend";
import MonthlyJoiningVsExit from "../HRGraph/MonthlyJoiningVsExit";
import WeeklyActiveEmpList from "../HRGraph/WeeklyActiveEmpList";
import MonthRevenueTrend from "../Formss/FinancialGraph/MonthRevenueTrend";
import MonthlyRevenueCircle from "../Formss/FinancialGraph/MonthlyRevenueCircle";





const Dashboard1 = () => {

    const { cname, customeruniqueId } = useParams();


    return (

        <div className="grid lg:grid-cols-1 m-2 gap-2">
             <ActiveEmpwithCostCenter />
            <NewJoiningMonthly />
            <MonthlyActiveTrend />
            <MonthlyJoiningVsExit />
            <WeeklyActiveEmpList />
            <MonthRevenueTrend />
            <MonthlyRevenueCircle />
            <ProjectChart customeruniqueId = {customeruniqueId} />
            <ClaimAndAdvanceChart customeruniqueId = {customeruniqueId} />
            <MileStoneChart customeruniqueId = {customeruniqueId} />
            <PoStatusChart customeruniqueId = {customeruniqueId} />
            <PoTrackingWorkdoneChart customeruniqueId = {customeruniqueId} />
            <AccrualRevenueTrendChart customeruniqueId = {customeruniqueId} />
    
            
            
        </div>

    )


}
   


export default Dashboard1;

