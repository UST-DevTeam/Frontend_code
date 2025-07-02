import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getPtwCustomers: [],
  getPtwEmployee: [],
  getPtwProjectType: [],
  getPtwProjectGroup: [],
  getPtwCircle: [],
  getL1ApproverData: [],
  getApproverPage: [],
  getApproverPageDataForm: [],
  getPtwLogBackup: [],
  totalCount: 0,
};

const ptwData = createSlice({
  name: "ptwData",
  initialState,
  reducers: {
    GET_PTW_CUSTOMERS: (state, { payload }) => {
      if (payload.reset) {
        state.getPtwCustomers = payload.dataAll;
      } else {
        state.getPtwCustomers = [...state.getPtwCustomers, ...payload.dataAll];
      }
    },
    GET_PTW_EMPLOYEE: (state, { payload }) => {
      if (payload.reset) {
        state.getPtwEmployee = payload.dataAll;
      } else {
        state.getPtwEmployee = [...state.getPtwEmployee, ...payload.dataAll];
      }
    },
    GET_PTW_PROJECTTYPE: (state, { payload }) => {
      if (payload.reset) {
        state.getPtwProjectType = payload.dataAll;
      } else {
        state.getPtwProjectType = [
          ...state.getPtwProjectType,
          ...payload.dataAll,
        ];
      }
    },
    GET_PTW_PROJECTGROUP: (state, { payload }) => {
      if (payload.reset) {
        state.getPtwProjectGroup = payload.dataAll;
      } else {
        state.getPtwProjectGroup = [
          ...state.getPtwProjectGroup,
          ...payload.dataAll,
        ];
      }
    },
    GET_PTW_Circle: (state, { payload }) => {
      if (payload.reset) {
        state.getPtwCircle = payload.dataAll;
      } else {
        state.getPtwCircle = [...state.getPtwCircle, ...payload.dataAll];
      }
    },

    GET_PTW_APPROVER_DATA: (state, { payload }) => {
      if (payload.reset) {
        state.getL1ApproverData = payload.dataAll;
      } else {
        state.getL1ApproverData = [
          ...state.getL1ApproverData,
          ...payload.dataAll,
        ];
      }
      if (
        payload.dataAll &&
        payload.dataAll.length > 0 &&
        payload.dataAll[0].overall_table_count
      ) {
        state.totalCount = payload.dataAll[0].overall_table_count;
      }
    },

    ADD_PTW_APPROVER_DATA: (state, { payload }) => {
      state.getL1ApproverData = [payload, ...state.getL1ApproverData];
      state.totalCount += 1;
    },

    UPDATE_PTW_APPROVER_DATA: (state, { payload }) => {
      const index = state.getL1ApproverData.findIndex(
        (item) => item.uniqueId === payload.uniqueId
      );
      if (index !== -1) {
        state.getL1ApproverData[index] = {
          ...state.getL1ApproverData[index],
          ...payload.data,
        };
      }
    },

    DELETE_PTW_APPROVER_DATA: (state, { payload }) => {
      state.getL1ApproverData = state.getL1ApproverData.filter(
        (item) => item.uniqueId !== payload
      );
      state.totalCount = Math.max(0, state.totalCount - 1);
    },

    // =========PTW LOG Backup=======

    GET_PTW_LOGBACKUP: (state, { payload }) => {
      if (payload.reset) {
        state.getPtwLogBackup = payload.dataAll;
      } else {
        state.getPtwLogBackup = [...state.getPtwLogBackup, ...payload.dataAll];
      }
      if (
        payload.dataAll &&
        payload.dataAll.length > 0 &&
        payload.dataAll[0].overall_table_count
      ) {
        state.totalCount = payload.dataAll[0].overall_table_count;
      }
    },
    GET_APPROVER_PAGE: (state, { payload }) => {
      console.log(payload,"__payload")
      if (payload.reset) {
        state.getApproverPage = payload.dataAll;
      } else {
        state.getApproverPage = [...state.getApproverPage, ...payload.dataAll];
      
        
      }
      if (
        payload.dataAll &&
        payload.dataAll.length > 0 &&
        payload.dataAll[0].overall_table_count
      ) {
        state.totalCount = payload.dataAll[0].overall_table_count;
      }
    },
    GET_APPROVER_PAGE_DATA_FORM: (state, { payload }) => {
      console.log(payload,"__payload")
      if (payload.reset) {
        state.getApproverPageDataForm = payload.dataAll;
      } else {
        state.getApproverPageDataForm = [
          ...state.getApproverPageDataForm,
          ...payload.dataAll,
        ];
      }
      if (
        payload.dataAll &&
        payload.dataAll.length > 0 &&
        payload.dataAll[0].overall_table_count
      ) {
        state.totalCount = payload.dataAll[0].overall_table_count;
      }
    },
  },
});

export const {
  GET_PTW_CUSTOMERS,
  GET_PTW_EMPLOYEE,
  GET_PTW_PROJECTTYPE,
  GET_PTW_PROJECTGROUP,
  GET_PTW_Circle,
  GET_PTW_APPROVER_DATA,
  ADD_PTW_APPROVER_DATA,
  UPDATE_PTW_APPROVER_DATA,
  DELETE_PTW_APPROVER_DATA,
  GET_PTW_LOGBACKUP,
  GET_APPROVER_PAGE,
  GET_APPROVER_PAGE_DATA_FORM,
} = ptwData.actions;

export default ptwData.reducer;
