import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { SET_AUTHENTICATED, SET_PERMISSION, SET_TOKEN, SET_USER, USERS_PROFILE, SET_USER_ROLE,SET_USER_BUSINESS,ALL_COUNTRIES, AGREEMENT } from "../reducers/auth-reducer"
import { ALERTS } from "../reducers/component-reducer"
// import Notify from "./notify-actions"
const AuthActions = {
    signIn: (data, cb) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.post({ url: Urls.login, data })
            console.log(res?.status, "res?.statusres?.status")
            if (res?.status == 400) {
                console.log(res?.data, "401401401")
                let msgdata = {
                    show: true,
                    icon: 'error',
                    text: res?.data?.msg,
                    type: 1
                }
                dispatch(ALERTS(msgdata))
                return
            }
            if (res?.status == 200) {
                console.log(res.data, "res.data")
                const user = res.data.data
                console.log(user, user, "res.data")
                console.log(res.data, "res.data")
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', user.idToken)
                localStorage.setItem('permission', user.permission)
                localStorage.setItem('auth', true)
                dispatch(SET_TOKEN(user.idToken))
                dispatch(SET_PERMISSION(JSON.stringify(user.permission)))
                dispatch(SET_USER(JSON.stringify(user)))
                dispatch(SET_AUTHENTICATED(true))
                cb()
            }
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    register: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.register })
            let dtaa = res?.data
            let msgdata = {
                show: true,
                icon: dtaa.icon,
                buttons: [
                ],
                type: 1,
                text: dtaa.msg
            }
            dispatch(ALERTS(msgdata))
            if (res?.status !== 201 && res?.status !== 200) return
            cb()
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    businessRegister: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.businessRegister })
            let dtaa = res?.data
            let msgdata = {
                show: true,
                icon: dtaa.icon,
                buttons: [
                ],
                type: 1,
                text: dtaa.msg
            }
            dispatch(ALERTS(msgdata))
            if (res?.status !== 201 && res?.status !== 200) return
            cb()
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    postsetupRegistration: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", data)
            //const res = await Api.post({ data: data, url: uniqueId == null ? Urls.setupRegistration : Urls.setupRegistration + "/" + uniqueId,contentType:"multipart/form-data" })
            const res = await Api.post({ data: data, url: Urls.setupRegistration,contentType:"multipart/form-data" })
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
                console.log(res.data,'jdjhhjjdjd')
                dispatch(SET_USER_ROLE(res?.data.role))
                dispatch(SET_USER_BUSINESS(data))
                cb()
            }
            
        } catch (error) {
            console.log(error, "amit errorerror 37")
            
            // dispatch(Notify.error('something went wrong! please try again after a while'))
            return;
        }
    },

    setuppassword: (data, cb, failcb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.setuppassword_stepOne })
            let dtaa = res?.data
            let msgdata = {
                show: true,
                icon: 'success',
                buttons: [
                ],
                type: 1,
                text: dtaa.msg
            }
            dispatch(ALERTS(msgdata))
            if (res?.status !== 200) {
                failcb()
            } else {
                console.log(dtaa, 'hdhdhhdhhdhhd')
                dispatch(SET_USER_ROLE(dtaa?.role))
                cb()
            }
        } catch (error) {
            console.log(error, "amit errorerror 37")
            //dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    kycregiter: (data, cb, failcb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.KycRegister })
            let dtaa = res?.data
            let msgdata = {
                show: true,
                icon: dtaa.icon,
                buttons: [

                ],
                type: 1,
                text: dtaa.msg
            }
            dispatch(ALERTS(msgdata))


            if (res?.status !== 200) {
                failcb()
            } else {
                dispatch(SET_USER_ROLE(dtaa?.role))
                cb()
            }
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    profile: () => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: Urls.profile })
            if (res?.status !== 200) return
            const dataAll = res?.data?.data[0]
            dispatch(USERS_PROFILE({ dataAll }))
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    sendMail: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.sendMail })
            let dtaa = res?.data
            let msgdata = {
                show: true,
                icon: dtaa.icon,
                buttons: [

                ],
                type: 1,
                text: dtaa.msg
            }
            dispatch(ALERTS(msgdata))


            if (res?.status !== 200) {
                failcb()
            } else {
                cb()
            }
        } catch (error) {
            console.log(error, "amit errorerror 37")
            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    postProfile: (data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            // if(reset){
            //     dispatch(GENERATED_SQL_QUERY({}))
            // }
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.profile : Urls.profile })
            console.log(res, 'jsjjjsjh')
            dtaa=res?.data
            if (res?.status !== 201 && res?.status !== 200) return
            dispatch(SET_USER_ROLE(dtaa?.role))
            cb()
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    postProfileDocuments: (data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            // if(reset){
            //     dispatch(GENERATED_SQL_QUERY({}))
            // }
            const res = await Api.put({ data: data, url: uniqueId == null ? Urls.profile : Urls.profile, contentType: "multipart/form-data" })
            console.log(res, 'jsjjjsjh')
            if (res?.status !== 201 && res?.status !== 200) return
            cb()
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    getcountries: () => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: Urls.getCountries })
            console.log(res,'sjjdjdjhdhdh')
            if (res?.status !== 200) return
            const dataAll = res?.data?.data[0]
            dispatch(ALL_COUNTRIES({ dataAll }))
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },

    
    getAgreement: (roleName) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: Urls.agreement_byrole+roleName })
            console.log(res,'sjjdjdjhdhdh')
            if (res?.status !== 200) return
            const dataAll = res?.data?.data[0]
            dispatch(AGREEMENT({ dataAll }))
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },

}


export default AuthActions; 