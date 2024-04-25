import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getPoLifeCycle:[],
}

const FinanceReducer = createSlice({
    name:'financeReducer',
    initialState,
    reducers:{

        GET_POLIFECYCLE:(state,{payload}) => {
            if(payload.reset){
                state.getPoLifeCycle = payload.dataAll
            }else{
                state.getPoLifeCycle  = [...state.getPoLifeCycle,...payload.dataAll]
            }
        },
    }
})

export const {GET_POLIFECYCLE,} = FinanceReducer.actions
export default FinanceReducer.reducer