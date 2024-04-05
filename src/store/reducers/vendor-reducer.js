import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getManageVendorDetails:[],
    getVendorProjectList:[],
}

const vendorData = createSlice({
    name:'vendorData',
    initialState,
    reducers:{

        GET_VENDOR_DETAILS:(state,{payload}) => {
            if(payload.reset){
                state.getManageVendorDetails = payload.dataAll
            }else{
                state.getManageVendorDetails  = [...state.getManageVendorDetails,...payload.dataAll]
            }
        },

        GET_VENDOR_PROJECT_LIST:(state,{payload}) => {
            if(payload.reset){
                state.getVendorProjectList = payload.dataAll
            }else{
                state.getVendorProjectList  = [...state.getVendorProjectList,...payload.dataAll]
            }
        },
    }
})

export const {GET_VENDOR_DETAILS,GET_VENDOR_PROJECT_LIST} = vendorData.actions
export default vendorData.reducer