import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getManageCustomer: [],
    getManageCircle:[],
    getManageProject:[],
}

const adminData = createSlice({
    name:'adminData',
    initialState,
    reducers:{

        GET_MANAGE_CUSTOMER:(state,{payload}) => {
            if(payload.reset){
                state.getManageCustomer = payload.dataAll
            }else{
                state.getManageCustomer  = [...state.getManageCustomer,...payload.dataAll]
            }
        },
        GET_MANAGE_CIRCLE:(state,{payload}) => {
            if(payload.reset){
                state.getManageCircle = payload.dataAll
            }else{
                state.getManageCircle  = [...state.getManageCircle,...payload.dataAll]
            }
        },
        GET_MANAGE_PROJECT:(state,{payload}) => {
            if(payload.reset){
                state.getManageProject = payload.dataAll
            }else{
                state.getManageProject  = [...state.getManageProject,...payload.dataAll]
            }
        },
    }
})

export const { GET_MANAGE_CUSTOMER,GET_MANAGE_CIRCLE, GET_MANAGE_PROJECT} = adminData.actions
export default adminData.reducer