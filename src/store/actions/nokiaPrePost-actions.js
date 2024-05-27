
import Button from "../../components/Button"
import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import CommonActions from "./common-actions"
import { MTANDAO_COMPLAINTS_LIST } from "../reducers/mtandaoComplaints-reducer"
import { GET_ISON_FORM } from "../reducers/isonForm-reducer"
import { GET_NETWORK_ANALYTICS_PRO, GET_NETWORK_ANALYTICS_PRO_SORTER, GET_NOKIA_PRE_POST } from "../reducers/nokiaPrePost-reducer"
// import Notify from "./notify-actions"


const nokiaPrePostActions = {
    postSubmit: (url, data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ url: url, data: data , contentType:"multipart/form-data"})
            console.log(res, "res?.statusres?.status")

            const dtaa = res.data
            let msgdata = {
                show: true,
                icon: dtaa.icon,
                buttons: [

                ],
                type:1,
                text: dtaa.msg
            }
            dispatch(ALERTS(msgdata))
            if (res?.status !== 201 && res?.status !== 200){
                return 
            }
            cb()
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    getnokiaprepost: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.nokiaprepost}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            console.log(res.data, "res.data")
            let dataAll=[]
            dataAll = res.data.data
            dispatch(GET_NOKIA_PRE_POST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    getProRules: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.proRules}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            console.log(res.data, "res.data")
            let dataAll=[]
            dataAll = res.data.data
            dispatch(GET_NOKIA_PRE_POST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    postDataProRules: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            let res
            if(uniqueId==null){
                res = await Api.post({ data: data, url: Urls.proRules })
            }else{
                res = await Api.put({ data: data, url: Urls.proRules + "/" + uniqueId })
            }
            if (res?.status !== 201 && res?.status !== 200) return
            cb()
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },

    getnetworkanalyticspro: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.networkAnalyticsPro}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            console.log(res.data, "res.data")
            let dataAll=[]
            dataAll = res.data.data
            let dataSorter=res.data.sorter

            console.log(dataSorter,"dataSorterdataSorter")
            dispatch(GET_NETWORK_ANALYTICS_PRO({dataAll,reset}))
            dispatch(GET_NETWORK_ANALYTICS_PRO_SORTER({dataSorter,reset}))
            
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    postData: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            let res
            if(uniqueId==null){
                res = await Api.post({ data: data, url: Urls.nokiaprepost })
            }else{
                res = await Api.put({ data: data, url: Urls.nokiaprepost + "/" + uniqueId })
            }
            if (res?.status !== 201 && res?.status !== 200) return
            cb()
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    resetTablesList: () => async (dispatch, _) => {
        dispatch(TABLES_LIST({}))
    }
}


export default nokiaPrePostActions;