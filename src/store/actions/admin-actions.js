import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import {
    GET_MANAGE_CUSTOMER, 
    GET_MANAGE_CIRCLE, 
    GET_MANAGE_ZONE,
    GET_MANAGE_COST_CENTER,
    GET_MANAGE_PROJECT_GROUP,
    GET_CARD_PROJECT_TYPE,
    GET_MANAGE_PROJECT_TYPE,
    GET_PROJECT,
    // Not in use
    // GET_MANAGE_SUB_PROJECT,
    // GET_ASSET_REGISTRATION
} from "../reducers/admin-reducer"


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

    getManageCostCenter:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_cost_center}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MANAGE_COST_CENTER({dataAll,reset}))
        } catch (error) {
        }
    },

    postManageCostCenter: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_cost_center : Urls.admin_cost_center + "/" + uniqueId })
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

    getManageProjectGroup:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_project_group}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MANAGE_PROJECT_GROUP({dataAll,reset}))
        } catch (error) {
        }
    },

    postManageProjectGroup: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_project_group : Urls.admin_project_group + "/" + uniqueId })
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

    getCardProjectType:(customeruniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_card_projecttype}/${customeruniqueId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CARD_PROJECT_TYPE({dataAll,reset}))
        } catch (error) {
        }
    },



    getManageProjectType:(customeruniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_projecttype}/${customeruniqueId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MANAGE_PROJECT_TYPE({dataAll,reset}))
        } catch (error) {
        }
    },
    postManageProjectType: (reset,customeruniqueId, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_projecttype+"/"+customeruniqueId : Urls.admin_projecttype+"/"+customeruniqueId + "/" + uniqueId , contentType:"multipart/form-data", reset })
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

    getProject:(customeruniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_project}/${customeruniqueId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            console.log('hshshshsh',res.data)
            dispatch(GET_PROJECT({dataAll,reset}))
        } catch (error) {
        }
    },
    postProject: (reset,customeruniqueId, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_project+"/"+customeruniqueId : Urls.admin_project +"/"+customeruniqueId + "/" + uniqueId , reset })
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





    
    

    

   

    















    getManageSubProjectType:(projecttypeuniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_sub_projecttype}/${projecttypeuniqueId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MANAGE_SUB_PROJECT({dataAll,reset}))
        } catch (error) {
        }
    },

    postManageSubProjectType: (reset,projecttypeuniqueId, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_sub_projecttype+"/"+projecttypeuniqueId : Urls.admin_sub_projecttype+"/"+projecttypeuniqueId+ "/" + customeruniqueId , contentType:"multipart/form-data", reset })
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

    getAssetRegistration:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_assetRegistration}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_ASSET_REGISTRATION({dataAll,reset}))
        } catch (error) {
        }
    },
    postAssetRegistration: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_assetRegistration : Urls.admin_assetRegistration + "/" + uniqueId })
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
}
export default AdminActions;