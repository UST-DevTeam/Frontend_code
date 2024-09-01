import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import { GET_CURRENT_USER_CIRCLE_PROJECTID, GET_CURRENT_USER_PG, GET_CURRENT_USER_PID, GET_CURRENT_USER_PT } from "../reducers/currentuser-reducer"


const CurrentuserActions = {

    getcurrentuserPG:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.current_user_PG}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_PG({dataAll,reset}))
        } catch (error) {
        }
    },

    getcurrentuserPT:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.current_user_PT}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_PT({dataAll,reset}))
        } catch (error) {
        }
    },

    getcurrentuserPID:(reset=true,args="",show = 1) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.current_user_PID}${args!=""?"?"+args:""}`, reset,show:show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_PID({dataAll,reset}))
        } catch (error) {
        }
    },
    getcurrentuserCircleWithProjectId:(reset=true,args="",show = 1) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.current_user_circle_projectId}${args!=""?"?"+args:""}`, reset,show:show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_CIRCLE_PROJECTID({dataAll,reset}))
        } catch (error) {
        }
    },

}
export default CurrentuserActions;