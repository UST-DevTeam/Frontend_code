
import Button from "../../components/Button"
import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { MILESTONEEVENTLIST,PROJECTEVENTLIST,SITEEVENTLIST } from "../reducers/eventlogs-reducer"
import  CommonActions from "./common-actions"
import swal from "sweetalert"
import { ALERTS } from "../reducers/component-reducer"
const eventManagementActions = {
    getmilestoneeventList: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.milestoneEvent}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(MILESTONEEVENTLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    getprojecteventList: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signingdgdg",args)
            const res = await Api.get({ url: `${Urls.projectEvent}${args!=""?"/"+args:""}`})
            console.log(res,'reeeeee')
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(PROJECTEVENTLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    getsiteeventList: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.siteEventLog}${args!=""?"/"+args:""}`})
            
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(SITEEVENTLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
}


export default eventManagementActions;