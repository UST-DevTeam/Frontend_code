import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    investorList: [],
    usersList: []
}

const investorManagement = createSlice({
    name: "investorManagement",
    initialState,
    reducers: {
        INVESTORLIST: (state, { payload }) => {
            if(payload.reset){
                state.investorList = payload.dataAll
            }else{
                state.investorList = [...state.investorList, ...payload.dataAll];
            }
        },

        RESET_STATE: (state) => {
            state.roleList = [];
            state.usersList = {};
        }
    }
})

export const { INVESTORLIST,RESET_STATE } = investorManagement.actions
export default investorManagement.reducer
