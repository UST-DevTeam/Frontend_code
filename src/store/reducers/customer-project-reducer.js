import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectGroup=[],
    projectType=[],
    subTypeProject=[],
    projectId=[]
}

const customerProjectManagement = createSlice({
    name: "customerProjectManagement",
    initialState,
    reducers: {
       

        PROJECTGROUPLIST: (state, { payload }) => {
            if(payload.reset){
                state.projectGroupList = payload.dataAll
            }else{
                state.projectGroupList = [...state.projectGroupList, ...payload.dataAll];
            }
        },
        PROJECTTYPELIST: (state, { payload }) => {
            if(payload.reset){
                state.projectTypeList = payload.dataAll
            }else{
                state.projectTypeList = [...state.projectTypeList, ...payload.dataAll];
            }
        },
        SUBPROJECTTYPELIST: (state, { payload }) => {
            if(payload.reset){
                state.subprojecttypeList = payload.dataAll
            }else{
                state.subprojecttypeList = [...state.subprojecttypeList, ...payload.dataAll];
            }
        },
        PROJECTIDLIST: (state, { payload }) => {
            if(payload.reset){
                state.projectidList = payload.dataAll
            }else{
                state.projectidList = [...state.projectidList, ...payload.dataAll];
            }
        },


        
    }
})

export const { PROJECTGROUPLIST,PROJECTTYPELIST,SUBPROJECTTYPELIST,PROJECTIDLIST } = customerProjectManagement.actions
export default customerProjectManagement.reducer
