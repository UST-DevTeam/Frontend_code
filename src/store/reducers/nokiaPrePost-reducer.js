import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    PrePostData: [],
    networkAnalyticsPro:{},
    networkAnalyticsProSorter:[]
}

const nokiaPrePost = createSlice({
    name: "nokiaPrePost",
    initialState,
    reducers: {
        GET_ISON_FORM: (state, { payload }) => {
            state.getisonForm = payload
        },
        GET_NOKIA_PRE_POST: (state, { payload }) => {
            if(payload.reset){
                state.PrePostData = payload.dataAll
            }else{
                state.PrePostData = [...state.PrePostData, ...payload.dataAll];
            }
        },
        GET_NETWORK_ANALYTICS_PRO: (state, { payload }) => {
            if(payload.reset){
                state.networkAnalyticsPro = payload.dataAll
            }else{
                state.networkAnalyticsPro = [...state.networkAnalyticsPro, ...payload.dataAll];
            }
        },
        GET_NETWORK_ANALYTICS_PRO_SORTER: (state, { payload }) => {
            if(payload.reset){
                state.networkAnalyticsProSorter = payload.dataSorter
            }else{
                state.networkAnalyticsProSorter = [...state.networkAnalyticsProSorter, ...payload.dataAll];
            }
        },
        
        RESET_STATE: (state) => {
            state.databaseList = [];
            state.tableList = {};
            generatedSqlQuery:{}
        }
    }
})

export const { GET_NOKIA_PRE_POST,GET_NETWORK_ANALYTICS_PRO,GET_NETWORK_ANALYTICS_PRO_SORTER, RESET_STATE } = nokiaPrePost.actions
export default nokiaPrePost.reducer
