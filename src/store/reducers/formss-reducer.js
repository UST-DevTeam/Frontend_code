import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getEarnValueMgmtFinancial:[],
    getEVMDelivery:[],
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

        
    }
})

export const {
    GET_EARNVALUE_MGMT_FINANCIAL,
    GET_EVM_DELIVERY,
} = FormssReducer.actions
export default FormssReducer.reducer