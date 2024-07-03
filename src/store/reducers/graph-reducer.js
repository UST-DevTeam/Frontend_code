import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    getGraphProjectStatus: [],
    getGraphMilestoneStatus: [],
    getGraphPoStatus: [],
    getGraphPoTrackingWorkdone: [],
    getGraphAccrualRevenueTrend:[],
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

    }
})

export const {  GET_GRAPH_PROJECT_STATUS, GET_GRAPH_MILESTONE_STATUS, GET_GRAPH_PO_STATUS, GET_GRAPH_PO_Tracking_WorkDone,GET_GRAPH_ACCRUAL_REVENUE_TREND
            } = GraphData.actions
    
export default GraphData.reducer