import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getEarnValueMgmtFinancial:[],
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

        
    }
})

export const {GET_EARNVALUE_MGMT_FINANCIAL,} = FormssReducer.actions
export default FormssReducer.reducer