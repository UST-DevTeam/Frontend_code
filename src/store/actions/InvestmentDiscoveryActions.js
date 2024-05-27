
import Button from "../../components/Button"
import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { DECKLIST } from "../reducers/deckManagement-reducer"
import CommonActions from "./common-actions"
import swal from "sweetalert"
import { ALERTS } from "../reducers/component-reducer"
import { COMPANY_LIST, INVESTOR_CRM_LIST } from "../reducers/investmentDiscovery-reducer"

const InvestmentDiscoveryActions = {
    getinvestmentDiscoverylist: (reset = true, args = "") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.companyDiscovery}${args != "" ? "?" + args : ""}` })
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(COMPANY_LIST({ dataAll, reset }))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    getinvestorCrmlist: (reset = true, args = "") => async (dispatch, _) => {
        try {
            console.log("AuthActions.getinvestorCrmlist")
            const res = await Api.get({ url: `${Urls.investorCrm}${args != "" ? "?" + args : ""}` })
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(INVESTOR_CRM_LIST({ dataAll, reset }))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },


    postinvestorCrmlist: (data, reset = true) => async (dispatch, _) => {
        try {
            console.log("AuthActions.getinvestorCrmlist")
            const res = await Api.post({ url: Urls.investorCrm, data: data })
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(INVESTOR_CRM_LIST({ dataAll, reset }))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    postComment: (data, cb) => async (dispatch, _) => {
        try {
            console.log("AuthActions.getinvestorCrmlist")
            const res = await Api.post({ url: Urls.investorCompanyReview, data: data })
            if (res?.status !== 201) return
            const dataAll = res.data.data
            let msgdata = {
                show: true,
                icon: res.data.icon,
                buttons: [
                ],
                type: 1,
                text: res.data.msg
            }
            dispatch(ALERTS(msgdata))
            cb()
            // dispatch(INVESTOR_CRM_LIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    putinvestorCrmlist: (reset = true, args = "") => async (dispatch, _) => {
        try {
            console.log("AuthActions.getinvestorCrmlist")
            const res = await Api.get({ url: `${Urls.investorCrm}${args != "" ? "?" + args : ""}` })
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(INVESTOR_CRM_LIST({ dataAll, reset }))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },


    postinvestmentDiscoverylist: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            const res = await Api.post({
                data: data, url: uniqueId == null ? Urls.companyDiscovery
                    : Urls.companyDiscovery
                    + "/" + uniqueId
            })

            console.log(res, 'jsjjjsjh')
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            } else {
                cb()

            }

        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
            return;
        }
    },

}


export default InvestmentDiscoveryActions;