import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import {
    GET_GRAPH_PROJECT_STATUS,
    GET_GRAPH_MILESTONE_STATUS,
    GET_GRAPH_PO_STATUS,
    GET_GRAPH_MS1_AND_MS2_CIRCLEWISE,
    GET_GRAPH_ORG_LEVEL,
    GET_TOTAL_ACTIVE_CUSTOMER,
    GET_GRAPH_ALL_PROJECT_TYPE,
    GET_GRAPH_PO_Tracking_WorkDone,
    GET_GRAPH_ACCRUAL_REVENUE_TREND,
    GET_GRAPH_ActiveEmp_With_CC,
    GET_AIRTEL_ACTIVE_EMP_VERTICAL_NAME,
    GET_MONTHLY_JOINING,
    GET_MONTHLY_JOINING_AND_RESIGN_DATE,
    GET_GRAPH_NEW_JOINING_MONTHLY,
    GET_GRAPH_MONTHLY_JOINING_VS_EXIT,
    GET_GRAPH_MONTHLY_ACTIVE_TREND,
    GET_GRAPH_WEEKLY_ACTIVE_EMP,
    GET_WEEKLY_HORIZONTAL_NAME,
    GET_GRAPH_VENDOR_ACTIVE_INACTIVE,
    GET_GRAPH_REVENUE_PLAN_VS_ACTUAL,
    GET_GRAPH_REVENUE_PLAN_VS_ACTUAL_Circle,
    GET_GRAPH_TREND_EXPENSE_ADVANCE,
    GET_GRAPH_EXPENSE_APPROVAL_STATUS,
    GET_GRAPH_ADVANCE_APPROVAL_STATUS,
    GET_GRAPH_TREND_PLAN_VS_ACTUAL_WORKDONE,
    GET_GRAPH_Circle_PLAN_VS_ACTUAL_WORKDONE,
    GET_GRAPH_CUMULATIVE_TREND_PLAN_VS_ACTUAL,
    GET_GRAPH_CUMULATIVE_WORKDONE_PLAN_VS_ACTUAL,
    
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

    getGraphMS1AndMS2CircleWise:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_ms1_ms2_circleWise}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_MS1_AND_MS2_CIRCLEWISE({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphMS1AndMS2CircleWise: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_ms1_ms2_circleWise })
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
                dispatch(GET_GRAPH_MS1_AND_MS2_CIRCLEWISE({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphOrganizationLevel:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_organzation_level}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_ORG_LEVEL({dataAll,reset}))
        } catch (error) {
        }
    },

    getGraphAllProjectType:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_all_project_type}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_ALL_PROJECT_TYPE({dataAll,reset}))
        } catch (error) {
        }
    },

    getGraphTotalActiveCustomer:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_active_customer}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_TOTAL_ACTIVE_CUSTOMER({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphTotalActiveCustomer: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_active_customer })
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
                dispatch(GET_TOTAL_ACTIVE_CUSTOMER({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
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
    getAirtelActiveEmpVerticalName:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.airtel_active__Emp_vertical_name}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_AIRTEL_ACTIVE_EMP_VERTICAL_NAME({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphActiveEmpwithCostCenter: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_active_emp_with_CC })
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
                dispatch(GET_GRAPH_ActiveEmp_With_CC({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
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
    postGraphNewJoiningMonthly: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_new_joining_monthly })
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
                dispatch(GET_GRAPH_NEW_JOINING_MONTHLY({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
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
    postGraphMonthlyJoiningVsExit: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_monthly_joining_vs_exit })
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
                dispatch(GET_GRAPH_MONTHLY_JOINING_VS_EXIT({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
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
    postGraphMonthlyActiveTrend: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_monthly_active_trend })
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
                dispatch(GET_GRAPH_MONTHLY_ACTIVE_TREND({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },
    getGraphWeeklyActiveEmp:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_weekly_active_emp}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_WEEKLY_ACTIVE_EMP({dataAll,reset}))
        } catch (error) {
        }
    },
    getWeeklyHorizontalName:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.weekly_horizontal_name}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_WEEKLY_HORIZONTAL_NAME({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphWeeklyActiveEmp: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_weekly_active_emp })
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
                dispatch(GET_GRAPH_WEEKLY_ACTIVE_EMP({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphVendorActiveInactive:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_vendor_active_inactive}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_VENDOR_ACTIVE_INACTIVE({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphVendorActiveInactive: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_vendor_active_inactive  })
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
                dispatch(GET_GRAPH_VENDOR_ACTIVE_INACTIVE({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphRevenuePlanVSActual_Trend:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_revenuePlan_vc_actual}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_REVENUE_PLAN_VS_ACTUAL({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphRevenuePlanVSActual_Trend: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_revenuePlan_vc_actual  })
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
                dispatch(GET_GRAPH_REVENUE_PLAN_VS_ACTUAL({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphRevenuePlanVSActual_Circle:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_revenuePlan_vc_actual_circle}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_REVENUE_PLAN_VS_ACTUAL_Circle({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphRevenuePlanVSActual_Circle: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_revenuePlan_vc_actual_circle })
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
                dispatch(GET_GRAPH_REVENUE_PLAN_VS_ACTUAL_Circle({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphTrendExpenseAdvance:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_trend_expense_advance}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_TREND_EXPENSE_ADVANCE({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphTrendExpenseAdvance: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_trend_expense_advance })
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
                dispatch(GET_GRAPH_TREND_EXPENSE_ADVANCE({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphExpenseApprovalStatus:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_expense_approval_status}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_EXPENSE_APPROVAL_STATUS({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphExpenseApprovalStatus: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_expense_approval_status })
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
                dispatch(GET_GRAPH_EXPENSE_APPROVAL_STATUS({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphAdvanceApprovalStatus:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_advance_approval_status}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_ADVANCE_APPROVAL_STATUS({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphAdvanceApprovalStatus: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_advance_approval_status })
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
                dispatch(GET_GRAPH_ADVANCE_APPROVAL_STATUS({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphTrendPlanVSActualWorkdone:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_trend_plan_vs_actual_workdone}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_TREND_PLAN_VS_ACTUAL_WORKDONE({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphTrendPlanVSActualWorkdone: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_trend_plan_vs_actual_workdone})
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
                dispatch(GET_GRAPH_TREND_PLAN_VS_ACTUAL_WORKDONE({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphCirclePlanVSActualWorkdone:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_Circle_plan_vs_actual_workdone}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_Circle_PLAN_VS_ACTUAL_WORKDONE({dataAll,reset}))
        } catch (error) {
        }
    }, 

    postGraphCirclePlanVSActualWorkdone: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_Circle_plan_vs_actual_workdone})
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
                dispatch(GET_GRAPH_Circle_PLAN_VS_ACTUAL_WORKDONE({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphCumulativeTrendPlanVsActual:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_cumulative_trend_plan_vs_actual}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_CUMULATIVE_TREND_PLAN_VS_ACTUAL({dataAll,reset}))
        } catch (error) {
        }
    },

    getGraphCumulativeWorkdonePlanVsActual:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_cumulative_workdone_plan_vs_actual}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_CUMULATIVE_WORKDONE_PLAN_VS_ACTUAL({dataAll,reset}))
        } catch (error) {
        }
    },
    postGraphCumulativeWorkdonePlanVsActual: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_cumulative_workdone_plan_vs_actual})
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
                dispatch(GET_GRAPH_CUMULATIVE_WORKDONE_PLAN_VS_ACTUAL({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },
}
export default GraphActions;
