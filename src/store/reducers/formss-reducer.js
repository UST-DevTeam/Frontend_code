import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getEarnValueMgmtFinancial:[],
    getEVMDelivery:[],
    getProfitloss:[],
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

        
    }
})

export const {
    GET_EARNVALUE_MGMT_FINANCIAL,
    GET_EVM_DELIVERY,
    GET_PROFIT_LOSS,
} = FormssReducer.actions
export default FormssReducer.reducer