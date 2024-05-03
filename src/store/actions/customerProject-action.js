
import Button from "../../components/Button"
import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import CommonActions from "./common-actions"
import swal from "sweetalert"
import { ALERTS } from "../reducers/component-reducer"


const customerProjectManagementActions = {
    // getUsersList: (reset=true,args="") => async (dispatch, _) => {
    //     try {
    //         console.log("AuthActions.signin")
    //         const res = await Api.get({ url: `${Urls.admin_userList}${args!=""?"?"+args:""}`})
    //         if (res?.status !== 200) return
    //         const dataAll = res.data.data
    //         dispatch(USERS_LIST({dataAll,reset}))
    //     } catch (error) {
    //         console.log(error, "amit errorerror 37")
    //     }
    // },
    getProjectGroupList: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.pitchdeck}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(DECKLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")
            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    getProjectTypeList: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.pitchdeck}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(DECKLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    getProjectSubTypeList: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.pitchdeck}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(DECKLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    getProjectIdList: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.pitchdeck}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(DECKLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
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


export default customerProjectManagementActions;