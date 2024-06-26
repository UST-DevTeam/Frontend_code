import { createSlice } from "@reduxjs/toolkit";

import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
const initialState = {
    dynamicForm: {},
    getProjectTypeSub: {},
    getprojectalllist: [],
    getuserallocatedproject: [],
    getprojectcircle:[],
    getMappedData:[],
    getCircleWithPGData:[],
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

        GET_PROJECT_TYPE_SUB: (state, { payload }) => {
            if (payload.reset) {
                state.getProjectTypeSub = payload.dataAll
            } else {
                state.getProjectTypeSub = [...state.getProjectTypeSub, ...payload.dataAll]
            }
        },

        GET_MAPPED_DATA: (state, { payload }) => {
            if (payload.reset) {
                state.getMappedData = payload.dataAll
            } else {
                state.getMappedData = [...state.getMappedData, ...payload.dataAll]
            }
        },

        GET_CIRCLE_WITH_PG_DATA: (state, { payload }) => {
            if (payload.reset) {
                state.getCircleWithPGData = payload.dataAll
            } else {
                state.getCircleWithPGData = [...state.getCircleWithPGData, ...payload.dataAll]
            }
        },


        GET_PROJECT_ALL_LIST: (state, { payload }) => {
            if (payload.reset) {
                state.getprojectalllist = payload.dataAll
            } else {
                state.getprojectalllist = [...state.getprojectalllist, ...payload.dataAll]
            }
        },

        GET_USER_ALLLOCATED_PROJECT: (state, { payload }) => {
            if (payload.reset) {
                state.getuserallocatedproject = payload.dataAll
            } else {
                state.getuserallocatedproject = [
                    ...state.getprojectalllist, ...payload.dataAll
                ]
            }
        },

        GET_PROJECT_CIRCLE: (state, { payload }) => {
            if (payload.reset) {
                state.getprojectcircle = payload.dataAll
            } else {
                state.getprojectcircle = [...state.getprojectcircle, ...payload.dataAll]
            }
        },





        SET_DYNAMIC_RM_INDEX: (state, { payload }) => {

            state.dynamicForm[payload.label].splice(payload.indexToUpdate, 1)

        },




        SET_DYNAMIC_FORM_MOVE: (state, { payload }) => {

            // state.dynamicForm[payload.label].splice(payload.indexToUpdate, 1)

            console.log(payload, "SET_DYNAMIC_FORM_MOVE")

            // let temp = state.dynamicForm[payload.label][payload.oldIndex];
            // state.dynamicForm[payload.label][payload.oldIndex] = state.dynamicForm[payload.label][payload.newIndex];
            // state.dynamicForm[payload.label][payload.newIndex] = temp;
            state.dynamicForm[payload.label] = arrayMove(state.dynamicForm[payload.label], payload.oldIndex, payload.newIndex)

        },
        SET_DYNAMIC_FORM_INDEX_INNER:(state, { payload }) => {

            console.log(payload,"85payloadpayloadpayloadpayloadpayloadpayload")

            state.dynamicForm[payload.label][payload.indexToUpdate] = {
                ...state.dynamicForm[payload.label][payload.indexToUpdate],
                ...payload.value
            }
            // state.dynamicForm[payload.label][payload.indexToUpdate][payload.valer] = payload.fieldNameValue;
            // state.dynamicForm[payload.label][payload.indexToUpdate][payload.valer] = payload.fieldNameValue;
        },
        SET_DYNAMIC_FORM_INDEX: (state, { payload }) => {

            console.log(payload,"92payloadpayloadpayloadpayloadpayloadpayload")
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

export const { SET_DYNAMIC_FORM, SET_DYNAMIC_FORM_INDEX,SET_DYNAMIC_FORM_INDEX_INNER, GET_PROJECT_ALL_LIST, GET_PROJECT_TYPE_SUB, SET_DYNAMIC_RM_INDEX, SET_DYNAMIC_FORM_MOVE, GET_USER_ALLLOCATED_PROJECT, GET_PROJECT_CIRCLE, RESET_STATE,GET_MAPPED_DATA,GET_CIRCLE_WITH_PG_DATA } = projectList.actions
export default projectList.reducer
