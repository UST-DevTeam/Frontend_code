
import Button from "../../components/Button"
import Api from "../../utils/api"
import { Urls } from "../../utils/url"
//import { USERS_LIST,RESET_STATE, KYC_STATUS } from "../reducers/OperationManagement-reducer"
import CommonActions from "./common-actions"
import { INVESTMENT_LIST } from "../reducers/investmentDetails-reducer"
//import Notify from "./notify-actions"
const InvestmentDetailsActions = {
    getInvestmentDetailsList: (reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.investmentDetails}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            console.log(res,'sjjjeej')
            const dataAll = res.data.data
            console.log(dataAll,'jdjdjjd')
            dispatch(INVESTMENT_LIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37") 
        }
    },
    postInvestmentDetailsList: (reset, data, cb,uniqueId) => async (dispatch, _) => {
        console.log(uniqueId,data,'djdhhhhhhfhf')
        try {
            console.log("AuthActions.signin", uniqueId)
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.investmentDetails : Urls.investmentDetails + "/" + uniqueId })
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
            console.log(error, "amit errorerror 37")
        }
    },
}
export default InvestmentDetailsActions;