import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getMyHome: [],
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
    }
})

export const { GET_MY_HOME} = myHome.actions
export default myHome.reducer