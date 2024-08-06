import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import {
    GET_GRAPH_PROJECT_STATUS,
    GET_GRAPH_MILESTONE_STATUS,
    GET_GRAPH_PO_STATUS,
    GET_GRAPH_PO_Tracking_WorkDone,
    GET_GRAPH_ACCRUAL_REVENUE_TREND,
    GET_GRAPH_ActiveEmp_With_CC,
    GET_MONTHLY_JOINING,
    GET_MONTHLY_JOINING_AND_RESIGN_DATE,
    GET_GRAPH_NEW_JOINING_MONTHLY,
    GET_GRAPH_MONTHLY_JOINING_VS_EXIT,
    GET_GRAPH_MONTHLY_ACTIVE_TREND,
    
 } from "../reducers/graph-reducer"


const GraphActions = {

    
    getGraphProjectStatus:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_project_status}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_PROJECT_STATUS({dataAll,reset}))
        } catch (error) {
        }
    },

    postGraphProjectStatus: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_project_status })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            } else {
                let dataAll = res?.data?.data
                dispatch(GET_GRAPH_PROJECT_STATUS({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphMilestoneStatus:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_milestone_status}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_MILESTONE_STATUS({dataAll,reset}))
        } catch (error) {
        }
    },

    getmonthlyJoinning:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_monthly_joining}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MONTHLY_JOINING({dataAll,reset}))
        } catch (error) {
        }
    },
    getmonthJoiningandresign:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_monthly_joining_and_resignDate}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MONTHLY_JOINING_AND_RESIGN_DATE({dataAll,reset}))
        } catch (error) {
        }
    },

    postGraphMilestoneStatus: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_milestone_status })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            } else {
                let dataAll = res?.data?.data
                dispatch(GET_GRAPH_MILESTONE_STATUS({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphPOStatus:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_po_status}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_PO_STATUS({dataAll,reset}))
        } catch (error) {
        }
    },

    postGraphPOStatus: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_po_status })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            } else {
                let dataAll = res?.data?.data
                dispatch(GET_GRAPH_PO_STATUS({ dataAll, reset:true }))

            }
        } catch (error) {
            return;
        }
    },

    getGraphPOTrackingWorkdone:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_po_tracing_workdone}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_PO_Tracking_WorkDone({dataAll,reset}))
        } catch (error) {
        }
    },

    postGraphPOTrackingWorkdone: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_po_tracing_workdone })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            } else {
                let dataAll = res?.data?.data
                dispatch(GET_GRAPH_PO_Tracking_WorkDone({ dataAll, reset:true }))

            }
        } catch (error) {
            return;
        }
    },

    postGraphAccrualRevenueTrend: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_accrual_revenue_trend })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            } else {
                let dataAll = res?.data?.data
                dispatch(GET_GRAPH_ACCRUAL_REVENUE_TREND({ dataAll, reset:true }))

            }
        } catch (error) {
            return;
        }
    },
    getGraphActiveEmpwithCostCenter:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_active_emp_with_CC}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_ActiveEmp_With_CC({dataAll,reset}))
        } catch (error) {
        }
    },
    getGraphNewJoiningMonthly:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_new_joining_monthly}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_NEW_JOINING_MONTHLY({dataAll,reset}))
        } catch (error) {
        }
    },
    getGraphMonthlyJoiningVsExit:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_monthly_joining_vs_exit}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_MONTHLY_JOINING_VS_EXIT({dataAll,reset}))
        } catch (error) {
        }
    },
    getGraphMonthlyActiveTrend:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_monthly_active_trend}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_MONTHLY_ACTIVE_TREND({dataAll,reset}))
        } catch (error) {
        }
    },
}
export default GraphActions;
