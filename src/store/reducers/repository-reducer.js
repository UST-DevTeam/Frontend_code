import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getCustomers: [],
    getProjectGroups: [],
    getProjectIds: []
}

const repository = createSlice({
    name: "repository",
    initialState,
    reducers: {
        GET_CUSTOMERS: (state, { payload }) => {
            state.getCustomers = payload
        },
        GET_PROJECT_GROUPS: (state, { payload }) => {
            state.getProjectGroups = payload
        },
        GET_PROJECT_IDS: (state, { payload }) => {
            state.getProjectIds = payload
        },
        RESET: (state, _) => {
            state.getCustomers = []
            state.getProjectGroups = []
            state.getProjectIds = []
        }
    }
})

export default repository.reducer
export const { GET_CUSTOMERS, GET_PROJECT_GROUPS, GET_PROJECT_IDS, RESET } = repository.actions