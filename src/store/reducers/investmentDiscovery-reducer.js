import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    company_list: [],
    investor_crm_list: [],
    usersList: []
}

const investmentDiscovery = createSlice({
    name: "investmentdiscovery",
    initialState,
    reducers: {
        COMPANY_LIST: (state, { payload }) => {
            if(payload.reset){
                state.company_list = payload.dataAll
            }else{
                state.company_list = [...state.company_list, ...payload.dataAll];
            }
        },

        INVESTOR_CRM_LIST: (state, { payload }) => {
            if(payload.reset){
                state.investor_crm_list = payload.dataAll
            }else{
                state.investor_crm_list = [...state.investor_crm_list, ...payload.dataAll];
            }
        },
        RESET_STATE: (state) => {
            state.roleList = [];
            state.usersList = {};
        }
    }
})

export const { COMPANY_LIST,INVESTOR_CRM_LIST,RESET_STATE } = investmentDiscovery.actions
export default investmentDiscovery.reducer
