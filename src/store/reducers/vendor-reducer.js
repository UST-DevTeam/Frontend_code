import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getManageVendorDetails:[],
}

const VendorReducer = createSlice({
    name:'VendorReducer',
    initialState,
    reducers:{

        GET_VENDOR_DETAILS:(state,{payload}) => {
            if(payload.reset){
                state.getManageVendorDetails = payload.dataAll
            }else{
                state.getManageVendorDetails  = [...state.getManageVendorDetails,...payload.dataAll]
            }
        },
    }
})

export const {GET_VENDOR_DETAILS,} = VendorReducer.actions
export default VendorReducer.reducer