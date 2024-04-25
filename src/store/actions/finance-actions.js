import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import {GET_POLIFECYCLE, } from "../reducers/finance-reducer"


const FinanceActions = {

    getPoLifeCycle:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_poLifeCycle}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_POLIFECYCLE({dataAll,reset}))
        } catch (error) {
        }
    },
    postPoLifeCycle: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.finance_poLifeCycle : Urls.finance_poLifeCycle + "/" + uniqueId })
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
export default FinanceActions;