
import Button from "../../components/Button"
import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { INVESTORLIST } from "../reducers/investor-reducer"
import CommonActions from "./common-actions"
// import Notify from "./notify-actions"
const InvestorManagementActions = {
    getInvestorList: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.investorList}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            console.log(dataAll,'jsjsjsjjsjsjjsj')
            dispatch(INVESTORLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    
    postInvestorList: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            // if(reset){
            //     dispatch(GENERATED_SQL_QUERY({}))
            // }
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.investorList : Urls.investorList + "/" + uniqueId})
            console.log(res,'jsjjjsjh')
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
            dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    // postRole: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    //     try {
    //         console.log("AuthActions.signin", uniqueId)
    //         let res
    //         if(uniqueId==null){
    //             res = await Api.post({ data: data, url: Urls.admin_roleList })
    //         }else{
    //             res = await Api.put({ data: data, url: Urls.admin_roleList + "/" + uniqueId })
    //         }
    //         if (res?.status !== 201 && res?.status !== 200) return
    //         cb()
    //     } catch (error) {
    //         console.log(error, "amit errorerror 37")
    //     }
    // }
}


export default InvestorManagementActions;