import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getEarnValueMgmtFinancial:[],
    getEVMDelivery:[],
    getProfitloss:[],
    getAccrualRevenueTrend:[],
    getSobdata:[],
    getSobdataDynamic:[],
}

const FormssReducer = createSlice({
    name:'formssReducer',
    initialState,
    reducers:{

        GET_EARNVALUE_MGMT_FINANCIAL:(state,{payload}) => {
            if(payload.reset){
                state.getEarnValueMgmtFinancial = payload.dataAll
            }else{
                state.getEarnValueMgmtFinancial  = [...state.getEarnValueMgmtFinancial,...payload.dataAll]
            }
        },

        GET_EVM_DELIVERY:(state,{payload}) => {
            if(payload.reset){
                state.getEVMDelivery = payload.dataAll
            }else{
                state.getEVMDelivery  = [...state.getEVMDelivery,...payload.dataAll]
            }
        },

        GET_PROFIT_LOSS:(state,{payload}) => {
            if(payload.reset){
                state.getProfitloss = payload.dataAll
            }else{
                state.getProfitloss  = [...state.getProfitloss,...payload.dataAll]
            }
        },

        GET_ACCRUAL_REVENUE_TREND:(state,{payload}) => {
            if(payload.reset){
                state.getAccrualRevenueTrend = payload.dataAll
            }else{
                state.getAccrualRevenueTrend  = [...state.getAccrualRevenueTrend,...payload.dataAll]
            }
        },
        
        GET_SOB_DYNAMIIC:(state,{payload}) => {
            if(payload.reset){
                state.getSobdataDynamic = payload.dataAll
            }else{
                state.getSobdataDynamic  = [...state.getSobdataDynamic,...payload.dataAll]
            }
        },

        GET_SOB:(state,{payload}) => {
            if(payload.reset){
                state.getSobdata = payload.dataAll
            }else{
                state.getSobdata  = [...state.getSobdata,...payload.dataAll]
            }
        },

        
    }
})

export const {
    GET_EARNVALUE_MGMT_FINANCIAL,
    GET_EVM_DELIVERY,
    GET_PROFIT_LOSS,
    GET_ACCRUAL_REVENUE_TREND,
    GET_SOB,
    GET_SOB_DYNAMIIC,
} = FormssReducer.actions
export default FormssReducer.reducer