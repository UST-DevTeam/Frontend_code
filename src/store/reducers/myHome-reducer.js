import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getMyHome: [],
    getPersonalInfo:[],
}

const myHome = createSlice({
    name:'myHome',
    initialState,
    reducers:{

        GET_MY_HOME:(state,{payload}) => {
            if(payload.reset){
                state.getMyHome = payload.dataAll
            }else{
                state.getMyHome  = [...state.getMyHome,...payload.dataAll]
            }
        },

        GET_PERSONAL_INFO:(state,{payload}) => {
            if(payload.reset){
                state.getPersonalInfo = payload.dataAll
            }else{
                state.getPersonalInfo  = [...state.getPersonalInfo,...payload.dataAll]
            }
        },
    }
})

export const { GET_MY_HOME, GET_PERSONAL_INFO, } = myHome.actions
export default myHome.reducer