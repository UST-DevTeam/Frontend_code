import Api from "../../utils/api"
import { SET_AUTHENTICATED, SET_TOKEN, SET_USER } from "../reducers/auth-reducer"
import { ALERTS, SET_FILE_BLOB } from "../reducers/component-reducer"

const CommonActions = {
    postApiCaller: (urls, data, cb) => async (dispatch, _) => {
        try {
            console.log("CommonPostActions.postApiCaller")
            const res = await Api.post({ url: urls, data })
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
        }
    },
    fileSubmit: (url, data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ url: url, data: data , contentType:"multipart/form-data"})
            console.log(res, "res?.statusres?.status")

            const dtaa = res.data

            console.log(res.data,"res.datares.data")
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
    logoutCaller: (cb=()=>{}) => async (dispatch, _) => {
        try {
            // console.log("CommonPostActions.postApiCaller")
            // const res = await Api.post({ url: urls, data })
            // if (res?.status !== 201 && res?.status !== 200) return
            localStorage.setItem("auth", false)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            dispatch(SET_TOKEN(""))
            dispatch(SET_USER(JSON.stringify({})))
            dispatch(SET_AUTHENTICATED(false))
            cb()
            // let msgdata = {
            //     show: true,
            //     icon: 'error',
            //     buttons: [
            //     ],
            //     text: "Your Session is Expired"
            // }
            // dispatch(ALERTS(msgdata))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    getApiCaller: (urls, cb) => async (dispatch, _) => {
        try {
            console.log("CommonPostActions.postApiCaller")
            const res = await Api.get({ url: urls })
            if (res?.status !== 201 && res?.status !== 200) return

            cb()
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    
    deleteApiCaller: (urls,cb) => async (dispatch, _) => {
        try {
            const res = await Api.delete({ url: urls })
            if (res?.status !== 201 && res?.status !== 200){
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
    deleteApiCallerBulk: (urls,data,cb) => async (dispatch, _) => {
        try {
            const res = await Api.delete({ url: urls  , data })
            // if (res?.status !== 201 && res?.status !== 200) return
            if (res?.status !== 201 && res?.status !== 200){
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            }else{
                cb()
            }
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    // commondownload: (urls, filename, method = "GET", data = {}, cb) => async (dispatch, _) => {

    //     const res = await Api.blobFile({ url: urls, method: method, data: data })

    //     dispatch(SET_FILE_BLOB(new Blob([res?.data])))
    //     // filename = urls.split("/").pop()


    //     const url = window.URL.createObjectURL(new Blob([res.data]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', `${filename}`);
    //     document.body.appendChild(link);
    //     link.click();
        
    // },
    commondownload: (urls, filename, method = "GET", data = {}, cb) => async (dispatch, _) => {

        try {
            const res = await Api.blobFile({ url: urls, method: method, data: data })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            } else {
                console.log(res, "resresresrescommondownload")
                dispatch(SET_FILE_BLOB(new Blob([res?.data])))
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${filename}`);
                document.body.appendChild(link);
                link.click();

            }
        

        }
        catch (error) {
            console.log(error, "amit errorerror 37")
        }

        

    },
    
}

export default CommonActions;