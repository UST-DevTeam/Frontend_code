import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth-reducer"
import customQuery from "./reducers/customQuery-reducer"
import component from "./reducers/component-reducer"
import alertConfiguration from "./reducers/alertConfiguration-reducer"
import mtandaoComplaints from "./reducers/mtandaoComplaints-reducer"
import isonForm from "./reducers/isonForm-reducer"
import adminManagement from "./reducers/adminManagement-reducer"
import nokiaPrePost from "./reducers/nokiaPrePost-reducer"
import websocket from "./reducers/websocket-reducer"
import deckManagement from "./reducers/deckManagement-reducer";
import OperationManagementReducer from "./reducers/OperationManagement-reducer";
import adminData from "./reducers/admin-reducer"
import projectList from "./reducers/projectList-reducer"
import myHomeData from "./reducers/myHome-reducer";
import hrReducer from "./reducers/hr-reduces"
import vendorData from "./reducers/vendor-reducer"
import financeData from "./reducers/finance-reducer"
import formssData from "./reducers/formss-reducer"
import expenseAdvanceData from "./reducers/expenseAdvance-reducer"
import eventlogsReducer from "./reducers/eventlogs-reducer";
import filterData from "./reducers/filter-reducer"

const store = configureStore({
    reducer: {
        auth,
        customQuery,
        component,
        alertConfiguration,
        mtandaoComplaints,
        isonForm,
        adminManagement,
        websocket,
        deckManagement,
        OperationManagementReducer,
        adminData,
        projectList,    
        myHomeData,
        hrReducer,
        vendorData,
        financeData,
        formssData,
        expenseAdvanceData,
        eventlogsReducer,
        filterData
    },
    devTools: true
})
export default store