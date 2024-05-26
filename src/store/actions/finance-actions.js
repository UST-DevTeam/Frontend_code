import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import {GET_INVOICE, GET_POINVOICED_BASED, GET_POWORKDONE_DASHBOARD, GET_POWORKDONE_BASED, GET_POWORKDONE_ITEMCODE, GET_POACCRUAL_REVENUE } from "../reducers/finance-reducer"


const FinanceActions = {

    getPOInvoicedBased:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_poinvoice_based}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_POINVOICED_BASED({dataAll,reset}))
        } catch (error) {
        }
    },
    postPOInvoicedBased: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.finance_poinvoice_based : Urls.finance_poinvoice_based + "/" + uniqueId })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }else{
                cb()

            }
            
        } catch (error) {
            return;
        }
    },

    getPOWorkDoneDashboard:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_poworkdone_dashboard}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_POWORKDONE_DASHBOARD({dataAll,reset}))
        } catch (error) {
        }
    },
    getPOWorkDoneBased:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_poworkdone_based}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_POWORKDONE_BASED({dataAll,reset}))
        } catch (error) {
        }
    },
    postPOWorkDoneBased: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.finance_poworkdone_based : Urls.finance_poworkdone_based + "/" + uniqueId })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }else{
                cb()

            }
            
        } catch (error) {
            return;
        }
    },

    getInvoice:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_Invoice}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_INVOICE({dataAll,reset}))
        } catch (error) {
        }
    },
    postInvoice: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.finance_Invoice : Urls.finance_Invoice + "/" + uniqueId })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }else{
                cb()

            }
            
        } catch (error) {
            return;
        }
    },

    getPOWorkDoneItemCode:(reset=true,args="",cb=()=>{}) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_poworkdone_itemCode}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_POWORKDONE_ITEMCODE({dataAll,reset}))
            cb()
        } catch (error) {
        }
    },
    getPOAccrualRevenue:(reset=true,args="",cb=()=>{}) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_poaccrual_revenue}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_POACCRUAL_REVENUE({dataAll,reset}))
            cb()
        } catch (error) {
        }
    },

}
export default FinanceActions;