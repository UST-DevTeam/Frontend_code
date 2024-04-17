import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popmenu: "",
  alerts: {},
  breadcrumb: [],
  loader: false,
  table_pagination: "",
  setfileblob: null,
};

const component = createSlice({
  name: "component",
  initialState,
  reducers: {
    POP_MENU: (state, { payload }) => {
      if (payload.tkn) {
        state.popmenu = state.popmenu != payload.data ? payload.data : "";
      } else {
        state.popmenu = "";
      }
    },
    BREADCRUMB: (state, { payload }) => {
      console.log(0,payload,"dasdassssssssssssssssss")
      if (payload.tkn) {
        state.breadcrumb = [{name:payload.data,index,link:payload.link}];
      } else {
        console.log(0,payload.index,"dasdassssssssssssssssss")
        state.breadcrumb = [...state.breadcrumb.splice(0,payload.index),{name:payload.data,link:payload.link}];
      }
    },
    
    TABLE_PAGINATON: (state, { payload }) => {
      state.table_pagination = payload;
    },
    ALERTS: (state, { payload }) => {
      state.alerts = payload;
    },
    LOADERS: (state, { payload }) => {
      state.loader = payload;
    },
    SET_FILE_BLOB: (state, { payload }) => {
      state.setfileblob = payload;
    },

    RESET_STATE: (state) => {
      state.alerts = {};
      state.powerBiReportConf = {};
    },
  },
});

export const {
  POP_MENU,
  BREADCRUMB,
  ALERTS,
  TABLE_PAGINATON,
  LOADERS,
  SET_FILE_BLOB,
  RESET_STATE,
} = component.actions;
export default component.reducer;
