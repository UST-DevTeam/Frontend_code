import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getManageCustomer: [],
    getManageCircle:[],
    getManageProject:[],
    getManageZone:[],
    getAssetRegistration:[],
    getManageCostCenter:[],
    getManageProjectGroup:[]
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

        GET_MANAGE_PROJECT_TYPE:(state,{payload}) => {
            if(payload.reset){
                state.getManageProject = payload.dataAll
            }else{
                state.getManageProject  = [...state.getManageProject,...payload.dataAll]
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

        GET_MANAGE_ZONE:(state,{payload}) => {
            if(payload.reset){
                state.getManageZone = payload.dataAll
            }else{
                state.getManageZone  = [...state.getManageZone,...payload.dataAll]
            }
        },

        GET_MANAGE_COST_CENTER:(state,{payload}) => {
            if(payload.reset){
                state.getManageCostCenter = payload.dataAll
            }else{
                state.getManageCostCenter  = [...state.getManageCostCenter,...payload.dataAll]
            }
        },

        GET_MANAGE_PROJECT_GROUP:(state,{payload}) => {
            if(payload.reset){
                state.getManageProjectGroup = payload.dataAll
            }else{
                state.getManageProjectGroup  = [...state.getManageProjectGroup,...payload.dataAll]
            }
        },
















        GET_ASSET_REGISTRATION:(state,{payload}) => {
            if(payload.reset){
                state.getAssetRegistration = payload.dataAll
            }else{
                state.getAssetRegistration  = [...state.getAssetRegistration,...payload.dataAll]
            }
        },
    }
})

export const { GET_MANAGE_CUSTOMER,GET_MANAGE_PROJECT_TYPE,GET_MANAGE_CIRCLE, 
                GET_MANAGE_PROJECT,GET_MANAGE_ZONE,GET_MANAGE_COST_CENTER, GET_MANAGE_PROJECT_GROUP,                 GET_ASSET_REGISTRATION} = adminData.actions
    
export default adminData.reducer