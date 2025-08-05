import { RESET_STATE } from "../reducers/auth-reducer";
import {
  LOADERS,
  POP_MENU,
  BREADCRUMB,
  GLOBAL_VALUE,
} from "../reducers/component-reducer";

const ComponentActions = {
  popmenu: (data, tkn) => async (dispatch, _) => {
    try {
      dispatch(POP_MENU({ data, tkn }));
    } catch (error) {
      console.log(error, "amit errorerror 390");
    }
  },
  breadcrumb: (data, link, index, tkn) => async (dispatch, _) => {
   
    try {
      dispatch(BREADCRUMB({ data, link, index, tkn }));
    } catch (error) {
      console.log(error, "amit errorerror 37");
    }
  },

  globalUrlStore: (name, value) => async (dispatch, _) => {
    try {
      dispatch(GLOBAL_VALUE({ name, value }));
    } catch (error) {
      console.log(error, "amit errorerror 37");
    }
  },
  alerts: (data) => async (dispatch, _) => {
    try {
    
    } catch (error) {
      console.log(error, "amit errorerror 37");
 
    }
  },
  loaders: (data) => async (dispatch, _) => {
    try {
      dispatch(LOADERS(data));
    } catch (error) {
      console.log(error, "amit errorerror 37");
      
    }
  },
  resetComponent: () => async (dispatch, _) => {
    dispatch(RESET_STATE({}));
  },
};

export default ComponentActions;
