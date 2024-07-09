import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import { 
    GET_EARNVALUE_MGMT_FINANCIAL,
    GET_EVM_DELIVERY,
    GET_PROFIT_LOSS,
    GET_ACCRUAL_REVENUE_TREND,
    } 
    from "../reducers/formss-reducer"


const FormssActions = {

    getEarnValueMgmtFinancial: (projectId,reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.formss_earnValue_mgmt_financial +'/'+projectId}${args != "" ? "?" + args : ""} `, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EARNVALUE_MGMT_FINANCIAL({ dataAll, reset }))
        } catch (error) {
        }
    },
    postEarnValueMgmtFinancial: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.formss_earnValue_mgmt_financial })
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
                dispatch(GET_EARNVALUE_MGMT_FINANCIAL({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },
    putEarnValueMgmtFinancial: (data, cb) => async (dispatch, _) => {
        try {
            console.log("adfasfasfasasfadfsa",data);
            const res = await Api.put({ data: data, url: Urls.formss_earnValue_mgmt_financial })
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
                dispatch(GET_EARNVALUE_MGMT_FINANCIAL({ dataAll, reset:true }))
                let msgdata = {
                    show: true,
                    icon: "success",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            }

        } catch (error) {
            return;
        }
    },

    putprofitandloss: (data, cb) => async (dispatch, _) => {
        try {
            console.log("adfasfasfasasfadfsa",data);
            const res = await Api.put({ data: data, url: Urls.forms_profit_loss })
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
            }
             else {
                let dataAll = res?.data?.data
                dispatch(forms_profit_loss({ dataAll, reset:true }))
                let msgdata = {
                    show: true,
                    icon: "success",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            }

        } catch (error) {
            return;
        }
    },

    getEVMDelivery: (projectId,reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.formss_EVM_delivery +'/'+projectId}${args != "" ? "?" + args : ""} `, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EVM_DELIVERY({ dataAll, reset }))
        } catch (error) {
        }
    },
    postEVMDelivery: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.formss_EVM_delivery })
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
                dispatch(GET_EVM_DELIVERY({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },
    putEVMDelivery: (data, cb) => async (dispatch, _) => {
        try {
            console.log("adfasfasfasasfadfsa",data);
            const res = await Api.put({ data: data, url: Urls.formss_EVM_delivery })
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
                dispatch(GET_EVM_DELIVERY({ dataAll, reset:true }))
                let msgdata = {
                    show: true,
                    icon: "success",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            }

        } catch (error) {
            return;
        }
    },

    getAccrualRevenueTrend: (reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.formss_accrualrevenue_trend}${args != "" ? "?" + args : ""} `, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_ACCRUAL_REVENUE_TREND({ dataAll, reset }))
        } catch (error) {
        }
    },

    postAccrualRevenueTrend: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.formss_accrualrevenue_trend})
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
                dispatch(GET_ACCRUAL_REVENUE_TREND({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    putAccrualRevenueTrend: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.put({ data: data, url: Urls.formss_accrualrevenue_trend})
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
                dispatch(GET_ACCRUAL_REVENUE_TREND({ dataAll, reset:true }))
                let msgdata = {
                    show: true,
                    icon: "success",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            }

        } catch (error) {
            return;
        }
    },


    getProfiltLoss: (reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.forms_profit_loss}${args != "" ? "?" + args : ""} `, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_PROFIT_LOSS({ dataAll, reset }))
        } catch (error) {
        }
    },
    postProfiltLossOnSearch: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.forms_profit_loss })
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
                dispatch(GET_PROFIT_LOSS({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

}
export default FormssActions;