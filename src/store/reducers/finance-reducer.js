import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getPOInvoicedBased:[],
    getPOWorkDoneBased:[],

}

const FinanceReducer = createSlice({
    name:'financeReducer',
    initialState,
    reducers:{

        GET_POINVOICED_BASED:(state,{payload}) => {
            if(payload.reset){
                state.getPOInvoicedBased = payload.dataAll
            }else{
                state.getPOInvoicedBased  = [...state.getPOInvoicedBased,...payload.dataAll]
            }
        },

        GET_POWORKDONE_BASED:(state,{payload}) => {
            if(payload.reset){
                state.getPOWorkDoneBased = payload.dataAll
            }else{
                state.getPOWorkDoneBased  = [...state.getPOWorkDoneBased,...payload.dataAll]
            }
        },
    }
})

export const {GET_POINVOICED_BASED,GET_POWORKDONE_BASED,} = FinanceReducer.actions
export default FinanceReducer.reducer