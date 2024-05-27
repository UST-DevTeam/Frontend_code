import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deckList: [],
    usersList: []
}

const deckManagement = createSlice({
    name: "deckManagement",
    initialState,
    reducers: {
        // ROLE_LIST: (state, { payload }) => {
        //     if(payload.reset){
        //         state.roleList = payload.dataAll
        //     }else{
        //         state.roleList = [...state.roleList, ...payload.dataAll];
        //     }
        // },

        DECKLIST: (state, { payload }) => {
            if(payload.reset){
                state.deckList = payload.dataAll
            }else{
                state.deckList = [...state.deckList, ...payload.dataAll];
            }
        },

        RESET_STATE: (state) => {
            state.roleList = [];
            state.usersList = {};
        }
    }
})

export const { DECKLIST,RESET_STATE } = deckManagement.actions
export default deckManagement.reducer
