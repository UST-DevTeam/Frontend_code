import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // roleList: [],
    // kycstatus: [],
    investmentList:[],
}

const investmentDetailsManagement = createSlice({
    name: "investmentDetailsManagement",
    initialState,
    reducers: {
        // ROLE_LIST: (state, { payload }) => {
        //     if(payload.reset){
        //         state.roleList = payload.dataAll
        //     }else{ 
        //         state.roleList = [...state.roleList, ...payload.dataAll];
        //     }
        // },
        INVESTMENT_LIST: (state, { payload }) => {
            if(payload.reset){
                state.usersList = payload.dataAll
            }else{
                state.usersList = [...state.usersList, ...payload.dataAll];
            }
        },
        // KYC_STATUS: (state, { payload }) => {
        //     if(payload.reset){
        //         state.kycstatus = payload.dataAll
        //     }else{
        //         state.kycstatus = [...state.kycstatus, ...payload.dataAll];
        //     }
        // },
        RESET_STATE: (state) => {
            state.usersList = {};
        }
    }
})

export const {  INVESTMENT_LIST, RESET_STATE } = investmentDetailsManagement.actions
export default investmentDetailsManagement.reducer
