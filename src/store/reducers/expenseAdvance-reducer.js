import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getExpADvPrjectDetails:[],
    getExpADvSiteID:[],
    getExpADvTaskName:[],
    getFillExpense:[],
    getFillAdvance:[],
    getUnitRateClaimType:[],
    getL1Data:[],
    getL2Data:[],
    getL3Data:[],
}

const ExpenseAdvanceReducer = createSlice({
    name:'ExpenseAdvanceReducer',
    initialState,
    reducers:{

        GET_FILL_EXPENSE:(state,{payload}) => {
            if(payload.reset){
                state.getFillExpense = payload.dataAll
            }else{
                state.getFillExpense  = [...state.getFillExpense,...payload.dataAll]
            }
        },

        GET_FILL_ADVANCE:(state,{payload}) => {
            if(payload.reset){
                state.getFillAdvance = payload.dataAll
            }else{
                state.getFillAdvance  = [...state.getFillAdvance,...payload.dataAll]
            }
        },

        GET_EXPADV_PROJECT_DETAILS:(state,{payload}) => {
            if(payload.reset){
                state.getExpADvPrjectDetails = payload.dataAll
            }else{
                state.getExpADvPrjectDetails  = [...state.getExpADvPrjectDetails,...payload.dataAll]
            }
        },

        GET_EXPADV_SITE_ID:(state,{payload}) => {
            if(payload.reset){
                state.getExpADvSiteID = payload.dataAll
            }else{
                state.getExpADvSiteID  = [...state.getExpADvSiteID,...payload.dataAll]
            }
        },

        GET_EXPADV_TASK_NAME:(state,{payload}) => {
            if(payload.reset){
                state.getExpADvTaskName = payload.dataAll
            }else{
                state.getExpADvTaskName  = [...state.getExpADvTaskName,...payload.dataAll]
            }
        },

        GET_UNIT_RATE_CLAIM_TYPE:(state,{payload}) => {
            if(payload.reset){
                state.getUnitRateClaimType = payload.dataAll
            }else{
                state.getUnitRateClaimType  = [...state.getUnitRateClaimType,...payload.dataAll]
            }
        },

        GET_L1_DATA:(state,{payload}) => {
            if(payload.reset){
                state.getL1Data = payload.dataAll
            }else{
                state.getL1Data  = [...state.getL1Data,...payload.dataAll]
            }
        },
        GET_L2_DATA:(state,{payload}) => {
            if(payload.reset){
                state.getL2Data = payload.dataAll
            }else{
                state.getL2Data  = [...state.getL2Data,...payload.dataAll]
            }
        },
        GET_L3_DATA:(state,{payload}) => {
            if(payload.reset){
                state.getL3Data = payload.dataAll
            }else{
                state.getL3Data  = [...state.getL3Data,...payload.dataAll]
            }
        },

        
    }
})

export const {
    GET_FILL_EXPENSE,
    GET_FILL_ADVANCE,
    GET_EXPADV_PROJECT_DETAILS,
    GET_EXPADV_SITE_ID,
    GET_EXPADV_TASK_NAME,
    GET_UNIT_RATE_CLAIM_TYPE,
    GET_L1_DATA,
    GET_L2_DATA,
    GET_L3_DATA,
} = ExpenseAdvanceReducer.actions
export default ExpenseAdvanceReducer.reducer