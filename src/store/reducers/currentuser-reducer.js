import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    getcurrentuserPG: [],
    getcurrentuserPT: [],
    getcurrentuserPID: [],
}



const currentuserData = createSlice({
    name:'currentuserData',
    initialState,
    reducers:{

        GET_CURRENT_USER_PG:(state,{payload}) => {
            if(payload.reset){
                state.getcurrentuserPG = payload.dataAll
            }else{
                state.getcurrentuserPG  = [...state.getcurrentuserPG,...payload.dataAll]
            }
        },

        GET_CURRENT_USER_PT:(state,{payload}) => {
            if(payload.reset){
                state.getcurrentuserPT = payload.dataAll
            }else{
                state.getcurrentuserPT  = [...state.getcurrentuserPT,...payload.dataAll]
            }
        },

        GET_CURRENT_USER_PID:(state,{payload}) => {
            if(payload.reset){
                state.getcurrentuserPID = payload.dataAll
            }else{
                state.getcurrentuserPID  = [...state.getcurrentuserPID,...payload.dataAll]
            }
        },
    }

})


export const {GET_CURRENT_USER_PG, GET_CURRENT_USER_PT,GET_CURRENT_USER_PID} = currentuserData.actions

export default currentuserData.reducer