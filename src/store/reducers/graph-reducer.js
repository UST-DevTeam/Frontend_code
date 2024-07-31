import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    getGraphProjectStatus: [],
    getGraphMilestoneStatus: [],
    getGraphPoStatus: [],
    getGraphPoTrackingWorkdone: [],
    getGraphAccrualRevenueTrend:[],
    getmonthjoining:[],
    getmonthJoiningandresign:[]
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

    }
})

export const {  GET_GRAPH_PROJECT_STATUS, GET_GRAPH_MILESTONE_STATUS, GET_GRAPH_PO_STATUS, GET_GRAPH_PO_Tracking_WorkDone,GET_GRAPH_ACCRUAL_REVENUE_TREND,GET_GRAPH_ActiveEmp_With_CC,
    GET_MONTHLY_JOINING,GET_MONTHLY_JOINING_AND_RESIGN_DATE} = GraphData.actions
    
export default GraphData.reducer