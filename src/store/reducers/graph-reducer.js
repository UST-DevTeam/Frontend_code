import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    getGraphProjectStatus: [],
}

const GraphData = createSlice({
    name:'GraphData',
    initialState,
    reducers:{


        GET_GRAPH_PROJECT_STATUS:(state,{payload}) => {
            if(payload.reset){
                state.getGraphProjectStatus = payload.dataAll
            }else{
                state.getGraphProjectStatus  = [...state.getGraphProjectStatus,...payload.dataAll]
            }
        },

    }
})

export const {  GET_GRAPH_PROJECT_STATUS, 
            } = GraphData.actions
    
export default GraphData.reducer