import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    globalFilters: "",
    
}

const globalFiltersData = createSlice({
    name:'globalFiltersData',
    initialState,
    reducers:{


        GET_GLOBAL_FILTERS:(state,{payload}) => {
            console.log(payload,"___payload__")
            if(payload.reset){
                state.getProjectCircle = payload.dataAll
            }else{
                state.globalFilters  = state.globalFilters?.length === 0 ? payload.dataAll:"&"+payload.dataAll
            }
        },


    }
})

export const { 
             GET_GLOBAL_FILTERS, 
               
            } = globalFiltersData.actions
    
export default globalFiltersData.reducer