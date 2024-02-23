
import Button from "../../components/Button"
import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { USERS_LIST,RESET_STATE, KYC_STATUS } from "../reducers/FundSeekerDetails-reducer"
import CommonActions from "./common-actions"
// import Notify from "./notify-actions"

const FundSeekerDetailsActions = {
    getOperationUserList: (reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.operationUser}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            console.log(dataAll,'jdjdjjd')
            dispatch(USERS_LIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37") 
        }
    },

    getKycStatusList: (reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.kycStatus}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            console.log(dataAll,'jdjdjjd')
            dispatch(KYC_STATUS({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37") 
        }
    },

    patchKycStatusList: (reset=true,data,cb,uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.patch({ data: data, url: Urls.kycStatus + "/" + uniqueId })
            if (res?.status !== 200) return
            cb()
        } catch (error) {
            console.log(error, "amit errorerror 37") 
        }
    },
    postOperationUserList: (reset, data, cb,uniqueId) => async (dispatch, _) => {
        console.log(uniqueId,data,'djdhhhhhhfhf')
        try {
            console.log("AuthActions.signin", uniqueId)
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.operationUser : Urls.operationUser + "/" + uniqueId })
            if (res?.status !== 201 && res?.status !== 200) return
            cb()
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    // postPitchDeck: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    //     try {
    //         console.log("AuthActions.signin", uniqueId)
           
    //         const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_userList : Urls.admin_userList + "/" + uniqueId })
    //         if (res?.status !== 201) return
    //         cb()
    //     } catch (error) {
    //         console.log(error, "amit errorerror 37")

    //     }
    // },

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


export default FundSeekerDetailsActions;