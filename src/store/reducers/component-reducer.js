import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popmenu: "",
  alerts: {},
  breadcrumb: [],
  globalValue: JSON.parse(localStorage.getItem("GLOBAL_VALUE")) || [],
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
    
    GLOBAL_VALUE: (state, { payload }) => {

      let data = [...state.globalValue,payload]
      localStorage.setItem("GLOBAL_VALUE",JSON.stringify(data))
      state.globalValue = data
    },
    BREADCRUMB: (state, { payload }) => {
      console.log(0,payload,"dasdassssssssssssssssss")
      if (payload.tkn) {
        let lendata=[...state.breadcrumb].length
        state.breadcrumb = [{name:payload.data,index:lendata,link:payload.link}];
      } else {
        console.log(0,payload.index,"dasdassssssssssssssssss")
        if(payload.data!=""){
          let lendata=[...state.breadcrumb].length
          state.breadcrumb = [...state.breadcrumb,{name:payload.data,index:lendata,link:payload.link}];
        }else{
          let lendata=[...state.breadcrumb].length
          state.breadcrumb = [...state.breadcrumb.splice(0,payload.index+1)];
        }
      }
    },

    // splice(0,payload.index)
    
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
  GLOBAL_VALUE,
  RESET_STATE,
} = component.actions;
export default component.reducer;
