import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    getGraphProjectStatus: [],
    getGraphMilestoneStatus: [],
    getGraphPoStatus: [],
    getGraphOrganizationLevel: [],
    getGraphAllProjectType: [],
    getGraphPoTrackingWorkdone: [],
    getGraphAccrualRevenueTrend:[],
    getmonthjoining:[],
    getAirtelActiveEmpVerticalName:[],
    getmonthJoiningandresign:[],
    getGraphNewJoiningMonthly:[],
    getGraphMonthlyJoiningVsExit:[],
    getGraphMonthlyActiveTrend:[],
    getGraphWeeklyActiveEmp:[],
    getWeeklyHorizontalName:[],
    getGraphVendorActiveInactive:[],
    getGraphRevenuePlanVSActual_Trend:[],
    getGraphRevenuePlanVSActual_Circle:[],
} 
 
const GraphData = createSlice({
    name:'GraphData',
    initialState,
    reducers:{


        GET_GRAPH_PROJECT_STATUS:(state,{payload}) => {
            if(payload.reset){
                state.getGraphProjectStatus = payload.dataAll
            }else{
                state.getGraphProjectStatus  = [...state.getGraphProjectStatus,...payload.dataAll]
            }
        },

        GET_GRAPH_MILESTONE_STATUS:(state,{payload}) => {
            if(payload.reset){
                state.getGraphMilestoneStatus = payload.dataAll
            }else{
                state.getGraphMilestoneStatus  = [...state.getGraphMilestoneStatus,...payload.dataAll]
            }
        },

        GET_GRAPH_PO_STATUS:(state,{payload}) => {
            if(payload.reset){
                state.getGraphPoStatus = payload.dataAll
            }else{
                state.getGraphPoStatus  = [...state.getGraphPoStatus,...payload.dataAll]
            }
        },

        GET_GRAPH_ORG_LEVEL:(state,{payload}) => {
            if(payload.reset){
                state.getGraphOrganizationLevel = payload.dataAll
            }else{
                state.getGraphOrganizationLevel  = [...state.getGraphOrganizationLevel,...payload.dataAll]
            }
        },

        GET_GRAPH_ALL_PROJECT_TYPE:(state,{payload}) => {
            if(payload.reset){
                state.getGraphAllProjectType = payload.dataAll
            }else{
                state.getGraphAllProjectType  = [...state.getGraphAllProjectType,...payload.dataAll]
            }
        },

        GET_GRAPH_PO_Tracking_WorkDone:(state,{payload}) => {
            if(payload.reset){
                state.getGraphPoTrackingWorkdone = payload.dataAll
            }else{
                state.getGraphPoTrackingWorkdone  = [...state.getGraphPoTrackingWorkdone,...payload.dataAll]
            }
        },

        GET_GRAPH_ACCRUAL_REVENUE_TREND:(state,{payload}) => {
            if(payload.reset){
                state.getGraphAccrualRevenueTrend = payload.dataAll
            }else{
                state.getGraphAccrualRevenueTrend  = [...state.getGraphAccrualRevenueTrend,...payload.dataAll]
            }
        },
        GET_MONTHLY_JOINING:(state,{payload}) => {
            if(payload.reset){
                state.getmonthjoining = payload.dataAll
            }else{
                state.getmonthjoining  = [...state.getmonthjoining,...payload.dataAll]
            }
        },
        GET_MONTHLY_JOINING_AND_RESIGN_DATE:(state,{payload}) => {
            if(payload.reset){
                state.getmonthJoiningandresign = payload.dataAll
            }else{
                state.getmonthJoiningandresign  = [...state.getmonthJoiningandresign,...payload.dataAll]
            }
        },

        GET_GRAPH_ActiveEmp_With_CC:(state,{payload}) => {
            if(payload.reset){
                state.getGraphActiveEmpWithCC = payload.dataAll
            }else{
                state.getGraphActiveEmpWithCC  = [...state.getGraphActiveEmpWithCC,...payload.dataAll]
            }
        },

        GET_AIRTEL_ACTIVE_EMP_VERTICAL_NAME:(state,{payload}) => {
            if(payload.reset){
                state.getAirtelActiveEmpVerticalName = payload.dataAll
            }else{
                state.getAirtelActiveEmpVerticalName  = [...state.getAirtelActiveEmpVerticalName,...payload.dataAll]
            }
        },

        GET_GRAPH_NEW_JOINING_MONTHLY:(state,{payload}) => {
            if(payload.reset){
                state.getGraphNewJoiningMonthly = payload.dataAll
            }else{
                state.getGraphNewJoiningMonthly  = [...state.getGraphNewJoiningMonthly,...payload.dataAll]
            }
        },

        GET_GRAPH_MONTHLY_JOINING_VS_EXIT:(state,{payload}) => {
            if(payload.reset){
                state.getGraphMonthlyJoiningVsExit = payload.dataAll
            }else{
                state.getGraphMonthlyJoiningVsExit  = [...state.getGraphMonthlyJoiningVsExit,...payload.dataAll]
            }
        },

        GET_GRAPH_MONTHLY_ACTIVE_TREND:(state,{payload}) => {
            if(payload.reset){
                state.getGraphMonthlyActiveTrend = payload.dataAll
            }else{
                state.getGraphMonthlyActiveTrend  = [...state.getGraphMonthlyActiveTrend,...payload.dataAll]
            }
        },

        GET_GRAPH_WEEKLY_ACTIVE_EMP:(state,{payload}) => {
            if(payload.reset){
                state.getGraphWeeklyActiveEmp = payload.dataAll
            }else{
                state.getGraphWeeklyActiveEmp  = [...state.getGraphWeeklyActiveEmp,...payload.dataAll]
            }
        },

        GET_WEEKLY_HORIZONTAL_NAME:(state,{payload}) => {
            if(payload.reset){
                state.getWeeklyHorizontalName = payload.dataAll
            }else{
                state.getWeeklyHorizontalName  = [...state.getWeeklyHorizontalName,...payload.dataAll]
            }
        },

        GET_GRAPH_VENDOR_ACTIVE_INACTIVE:(state,{payload}) => {
            if(payload.reset){
                state.getGraphVendorActiveInactive = payload.dataAll
            }else{
                state.getGraphVendorActiveInactive  = [...state.getGraphVendorActiveInactive,...payload.dataAll]
            }
        },

        GET_GRAPH_REVENUE_PLAN_VS_ACTUAL:(state,{payload}) => {
            if(payload.reset){
                state.getGraphRevenuePlanVSActual_Trend = payload.dataAll
            }else{
                state.getGraphRevenuePlanVSActual_Trend  = [...state.getGraphRevenuePlanVSActual_Trend,...payload.dataAll]
            }
        },

        GET_GRAPH_REVENUE_PLAN_VS_ACTUAL_Circle:(state,{payload}) => {
            if(payload.reset){
                state.getGraphRevenuePlanVSActual_Circle = payload.dataAll
            }else{
                state.getGraphRevenuePlanVSActual_Circle  = [...state.getGraphRevenuePlanVSActual_Circle,...payload.dataAll]
            }
        },

    }
})

export const {  GET_GRAPH_PROJECT_STATUS,
    GET_GRAPH_MILESTONE_STATUS,
    GET_GRAPH_PO_STATUS,
    GET_GRAPH_ORG_LEVEL,
    GET_GRAPH_ALL_PROJECT_TYPE,
    GET_GRAPH_PO_Tracking_WorkDone,
    GET_GRAPH_ACCRUAL_REVENUE_TREND,
    GET_MONTHLY_JOINING,
    GET_MONTHLY_JOINING_AND_RESIGN_DATE,
    GET_GRAPH_ActiveEmp_With_CC,
    GET_AIRTEL_ACTIVE_EMP_VERTICAL_NAME,
    GET_GRAPH_NEW_JOINING_MONTHLY,
    GET_GRAPH_MONTHLY_JOINING_VS_EXIT,
    GET_GRAPH_MONTHLY_ACTIVE_TREND,
    GET_GRAPH_WEEKLY_ACTIVE_EMP,
    GET_WEEKLY_HORIZONTAL_NAME,
    GET_GRAPH_VENDOR_ACTIVE_INACTIVE,
    GET_GRAPH_REVENUE_PLAN_VS_ACTUAL,
    GET_GRAPH_REVENUE_PLAN_VS_ACTUAL_Circle,
} = GraphData.actions
    
export default GraphData.reducer    