import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import {GET_EARNVALUE_MGMT_FINANCIAL, } from "../reducers/formss-reducer"


const FormssActions = {

    getEarnValueMgmtFinancial:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.formss_earnValue_mgmt_financial}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EARNVALUE_MGMT_FINANCIAL({dataAll,reset}))
        } catch (error) {
        }
    },
    postEarnValueMgmtFinancial: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.formss_earnValue_mgmt_financial : Urls.formss_earnValue_mgmt_financial + "/" + uniqueId })
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

}
export default FormssActions;