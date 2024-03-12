import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getManageEmpDetails:[],
}

const hrReducer = createSlice({
    name:'hrReducer',
    initialState,
    reducers:{

        GET_EMPLOYEE_DETAILS:(state,{payload}) => {
            if(payload.reset){
                state.getManageEmpDetails = payload.dataAll
            }else{
                state.getManageEmpDetails  = [...state.getManageEmpDetails,...payload.dataAll]
            }
        },
    }
})

export const {GET_EMPLOYEE_DETAILS,} = hrReducer.actions
export default hrReducer.reducer