import { createSlice } from "@reduxjs/toolkit";

import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
const initialState = {
    dynamicForm: {}
}

const projectList = createSlice({
    name: "projectList",
    initialState,
    reducers: {
        SET_DYNAMIC_FORM: (state, { payload }) => {

            if (payload.reseter) {
                state.dynamicForm = {
                    ...state.dynamicForm,
                    [payload.label]: payload.value
                }
            } else {
                console.log(state.dynamicForm[payload.label], "state.dynamicForm[payload.label]");
                state.dynamicForm = {
                    ...state.dynamicForm,
                    [payload.label]: state.dynamicForm[payload.label] ? [...state.dynamicForm[payload.label], payload.value] : [payload.value]
                }
            }

        },

        SET_DYNAMIC_RM_INDEX: (state, { payload }) => {

            state.dynamicForm[payload.label].splice(payload.indexToUpdate, 1)

        },

        SET_DYNAMIC_FORM_MOVE: (state, { payload }) => {

            // state.dynamicForm[payload.label].splice(payload.indexToUpdate, 1)

            console.log(payload,"SET_DYNAMIC_FORM_MOVE")

            // let temp = state.dynamicForm[payload.label][payload.oldIndex];
            // state.dynamicForm[payload.label][payload.oldIndex] = state.dynamicForm[payload.label][payload.newIndex];
            // state.dynamicForm[payload.label][payload.newIndex] = temp;
            state.dynamicForm[payload.label]=arrayMove(state.dynamicForm[payload.label],payload.oldIndex,payload.newIndex)

        },
        SET_DYNAMIC_FORM_INDEX: (state, { payload }) => {

            // const oldDataon = prev[indexToUpdate];

            //   console.log(oldDataon, "oldDataonoldDataon")

            //   console.log(oldDataon[its.name], "oldDataonoldDataononew")

            //   const updatedData = {
            //     ...oldDataon,
            //     [its.name]: e.target.value // Assuming e.target.value is the new field value
            //   };



            //   const updatedListing = [...prev];
            //   updatedListing[indexToUpdate] = updatedData;
            //   console.log(updatedListing, "updatedDataupdatedData")
            //   return updatedListing




            //   return prev
            // console.log(state.dynamicForm,state.dynamicForm[payload.label][payload.indexToUpdate], "state.dynamicForm[payload.label]");
            // state.dynamicForm = {
            //     ...state.dynamicForm,
            //     [payload.label]: state.dynamicForm[payload.label] ? [...state.dynamicForm[payload.label], payload.value] : [payload.value]
            // }

            // state.dynamicForm = {
            //     ...state.dynamicForm,
            //     [payload.label]: state.dynamicForm[payload.label] ? state.dynamicForm[payload.label].map((item, index) => index === payload.indexToUpdate ? payload.value : item) : [payload.value]
            // };

            state.dynamicForm[payload.label][payload.indexToUpdate][payload.valer] = payload.fieldNameValue;



        },
        RESET_STATE: (state) => {
            state.databaseList = [];
            state.tableList = {};
            generatedSqlQuery: { }
        }
    }
})

export const { SET_DYNAMIC_FORM, SET_DYNAMIC_FORM_INDEX, SET_DYNAMIC_RM_INDEX,SET_DYNAMIC_FORM_MOVE, RESET_STATE } = projectList.actions
export default projectList.reducer
