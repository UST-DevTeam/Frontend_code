// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     getPtwCustomers:[],
//     getPtwEmployee:[],
//     getPtwProjectType:[],
//     getPtwProjectGroup:[],
//     getPtwMilestone:[],

    
// }

// const ptwData = createSlice({
//     name:'ptwData',
//     initialState,
//     reducers:{

//         GET_PTW_CUSTOMERS:(state,{payload}) => {
//             if(payload.reset){
//                 state.getPtwCustomers = payload.dataAll
//             }else{
//                 state.getPtwCustomers  = [...state.getPtwCustomers,...payload.dataAll]
//             }
//         },
//         GET_PTW_EMPLOYEE:(state,{payload}) => {
//             if(payload.reset){
//                 state.getPtwEmployee = payload.dataAll
//             }else{
//                 state.getPtwEmployee  = [...state.getPtwEmployee,...payload.dataAll]
//             }
//         },
//         GET_PTW_PROJECTTYPE:(state,{payload}) => {
//             if(payload.reset){
//                 state.getPtwProjectType = payload.dataAll
//             }else{
//                 state.getPtwProjectType  = [...state.getPtwProjectType,...payload.dataAll]
//             }
//         },
//         GET_PTW_PROJECTGROUP:(state,{payload}) => {
//             if(payload.reset){
//                 state.getPtwProjectGroup = payload.dataAll
//             }else{
//                 state.getPtwProjectGroup  = [...state.getPtwProjectGroup,...payload.dataAll]
//             }
//         },
//         GET_PTW_MILESTONE:(state,{payload}) => {
//             if(payload.reset){
//                 state.getPtwMilestone = payload.dataAll
//             }else{
//                 state.getPtwMilestone  = [...state.getPtwMilestone,...payload.dataAll]
//             }
//         },

        
//     }
// })

// export const {GET_PTW_CUSTOMERS,GET_PTW_EMPLOYEE,GET_PTW_PROJECTTYPE,GET_PTW_PROJECTGROUP,GET_PTW_MILESTONE} = ptwData.actions
// export default ptwData.reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getPtwCustomers: [],
    getPtwEmployee: [],
    getPtwProjectType: [],
    getPtwProjectGroup: [],
    getPtwMilestone: [],
    getL1ApproverData: [], // New state for L1 Approver table data
    totalCount: 0, // For pagination
}

const ptwData = createSlice({
    name: 'ptwData',
    initialState,
    reducers: {
        GET_PTW_CUSTOMERS: (state, { payload }) => {
            if (payload.reset) {
                state.getPtwCustomers = payload.dataAll
            } else {
                state.getPtwCustomers = [...state.getPtwCustomers, ...payload.dataAll]
            }
        },
        GET_PTW_EMPLOYEE: (state, { payload }) => {
            if (payload.reset) {
                state.getPtwEmployee = payload.dataAll
            } else {
                state.getPtwEmployee = [...state.getPtwEmployee, ...payload.dataAll]
            }
        },
        GET_PTW_PROJECTTYPE: (state, { payload }) => {
            if (payload.reset) {
                state.getPtwProjectType = payload.dataAll
            } else {
                state.getPtwProjectType = [...state.getPtwProjectType, ...payload.dataAll]
            }
        },
        GET_PTW_PROJECTGROUP: (state, { payload }) => {
            if (payload.reset) {
                state.getPtwProjectGroup = payload.dataAll
            } else {
                state.getPtwProjectGroup = [...state.getPtwProjectGroup, ...payload.dataAll]
            }
        },
        GET_PTW_MILESTONE: (state, { payload }) => {
            if (payload.reset) {
                state.getPtwMilestone = payload.dataAll
            } else {
                state.getPtwMilestone = [...state.getPtwMilestone, ...payload.dataAll]
            }
        },
       
        GET_PTW_APPROVER_DATA: (state, { payload }) => {
            if (payload.reset) {
                state.getL1ApproverData = payload.dataAll
            } else {
                state.getL1ApproverData = [...state.getL1ApproverData, ...payload.dataAll]
            }          
            if (payload.dataAll && payload.dataAll.length > 0 && payload.dataAll[0].overall_table_count) {
                state.totalCount = payload.dataAll[0].overall_table_count;
            }
        },
        // ADD_PTW_APPROVER_DATA: (state, { payload }) => {
            
        //     state.getL1ApproverData = [payload, ...state.getL1ApproverData];
        //     state.totalCount += 1;
        // },
        // UPDATE_PTW_APPROVER_DATA: (state, { payload }) => {
        //     // Update existing item
        //     const index = state.getL1ApproverData.findIndex(
        //         item => item.uniqueId === payload.uniqueId
        //     );
        //     if (index !== -1) {
        //         state.getL1ApproverData[index] = { ...state.getL1ApproverData[index], ...payload.data };
        //     }
        // },
        // DELETE_PTW_APPROVER_DATA: (state, { payload }) => {
        //     // Remove item from array
        //     state.getL1ApproverData = state.getL1ApproverData.filter(
        //         item => item.uniqueId !== payload
        //     );
        //     state.totalCount = Math.max(0, state.totalCount - 1);
        // },
    }
})

export const {
    GET_PTW_CUSTOMERS,
    GET_PTW_EMPLOYEE,
    GET_PTW_PROJECTTYPE,
    GET_PTW_PROJECTGROUP,
    GET_PTW_MILESTONE,
    GET_PTW_APPROVER_DATA,
    ADD_PTW_APPROVER_DATA,
    UPDATE_PTW_APPROVER_DATA,
    DELETE_PTW_APPROVER_DATA
} = ptwData.actions

export default ptwData.reducer