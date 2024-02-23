
import Button from "../../components/Button"
import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { DECKLIST } from "../reducers/deckManagement-reducer"
import CommonActions from "./common-actions"
import swal from "sweetalert"
import { ALERTS } from "../reducers/component-reducer"


const DeckManagementActions = {
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
    getDeckList: (reset=true,args="") => async (dispatch, _) => {
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
    // getRoleList: (reset=true,args="") => async (dispatch, _) => {
    //     try {
    //         console.log("AuthActions.signin")
    //         const res = await Api.get({ url: `${Urls.admin_roleList}${args!=""?"?"+args:""}`})
    //         if (res?.status !== 200) return
    //         console.log(res.data, "res.data")
    //         const dataAll = res.data.data
    //         dispatch(ROLE_LIST({dataAll,reset}))
    //     } catch (error) {
    //         console.log(error, "amit errorerror 37")

    //         // dispatch(Notify.error('something went wrong! please try again after a while'))
    //     }
    // },
    // postUser: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    //     try {
    //         console.log("AuthActions.signin", uniqueId)
    //         // if(reset){
    //         //     dispatch(GENERATED_SQL_QUERY({}))
    //         // }
    //         const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_userList : Urls.admin_userList + "/" + uniqueId })
    //         if (res?.status !== 201) return
    //         cb()
    //     } catch (error) {
    //         console.log(error, "amit errorerror 37")

    //         // dispatch(Notify.error('something went wrong! please try again after a while'))
    //     }
    // },
    postPitchDeck: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.pitchdeck : Urls.pitchdeck + "/" + uniqueId,contentType:"multipart/form-data" })

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
            
            // dispatch(Notify.error('something went wrong! please try again after a while'))
            return;
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


export default DeckManagementActions;