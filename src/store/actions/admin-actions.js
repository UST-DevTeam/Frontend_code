import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import {GET_MANAGE_CUSTOMER, GET_MANAGE_CIRCLE, GET_MANAGE_PROJECT,GET_MANAGE_ZONE, GET_ONE_MANAGE_PROJECT} from "../reducers/admin-reducer"


const AdminActions = {


    getManageCustomer:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_customer}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MANAGE_CUSTOMER({dataAll,reset}))
        } catch (error) {
        }
    },
    postManageCustomer: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_customer : Urls.admin_customer + "/" + uniqueId , contentType:"multipart/form-data", reset })
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
            return;
        }
    },


    getManageProjectType:(customeruniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_projecttype}/${customeruniqueId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MANAGE_PROJECT({dataAll,reset}))
        } catch (error) {
        }
    },
    getOneManageProjectType:(customeruniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_projecttype}/${customeruniqueId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_ONE_MANAGE_PROJECT({dataAll,reset}))
        } catch (error) {
        }
    },
    postManageProjectType: (reset,customeruniqueId, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_projecttype+"/"+customeruniqueId : Urls.admin_projecttype+"/"+customeruniqueId + "/" + customeruniqueId , contentType:"multipart/form-data", reset })
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
            return;
        }
    },

    patchManageProjectType: (reset,uniqueId, data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.patch({ data: data, url: Urls.admin_projecttype+"/"+uniqueId , reset })
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
            return;
        }
    },
    

    getManageCircle:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_circle}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MANAGE_CIRCLE({dataAll,reset}))
        } catch (error) {
        }
    },
    postManageCircle: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_circle : Urls.admin_circle + "/" + uniqueId })
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
            return;
        }
    },

    getManageZone:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_zone}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MANAGE_ZONE({dataAll,reset}))
        } catch (error) {
        }
    },

    postManageZone: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_zone : Urls.admin_zone + "/" + uniqueId })
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
            return;
        }
    },


    // getManageProject:(reset=true,args="") => async (dispatch, _) => {
    //     try {
    //         const res = await Api.get({ url:`${Urls.admin_project}${args!=""?"?"+args:""}`})
    //         if (res?.status !== 200) return
    //         let dataAll = res?.data?.data
    //         dispatch(GET_MANAGE_PROJECT({dataAll,reset}))
    //     } catch (error) {
    //     }
    // },
    // postManageProject: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    //     try {
    //         const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_projecttype : Urls.admin_projecttype + "/" + uniqueId, contentType:"multipart/form-data", reset })
    //         if (res?.status !== 201 && res?.status !== 200) {
    //             let msgdata = {
    //                 show: true,
    //                 icon: "error",
    //                 buttons: [],
    //                 type: 1,
    //                 text: res?.data?.msg,
    //             };
    //             dispatch(ALERTS(msgdata));
    //         }else{
    //             cb()

    //         }
            
    //     } catch (error) {
    //         return;
    //     }
    // },





}
export default AdminActions;