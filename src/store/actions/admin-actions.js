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
    GET_MANAGE_DEPARTMENT,
    GET_MANAGE_DESIGNATION,
    GET_MANAGE_PROFILE,
    GET_STATE,
    GET_CITIES,
    GET_PROJECT_ALLLOCATION,
    // Not in use
    GET_MANAGE_SUB_PROJECT,
    // GET_ASSET_REGISTRATION
} from "../reducers/admin-reducer"
import { ALERTS } from "../reducers/component-reducer"


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

    getManageDepartment:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_department}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MANAGE_DEPARTMENT({dataAll,reset}))
        } catch (error) {
        }
    },

    postManageDepartment: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_department : Urls.admin_department + "/" + uniqueId })
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

    getManageDesignation:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_designation}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MANAGE_DESIGNATION({dataAll,reset}))
        } catch (error) {
        }
    },

    postManageDesignation: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_designation : Urls.admin_designation + "/" + uniqueId })
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

    getManageProfile:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_profile}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MANAGE_PROFILE({dataAll,reset}))
        } catch (error) {
        }
    },
    postManageProfile: (data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_profile : Urls.admin_profile + "/" + uniqueId })
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

    getState:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.State}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_STATE({dataAll,reset}))
        } catch (error) {
        }
    },

    getCities:(reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("cities",args)
            const res = await Api.get({ url:`${Urls.Cities}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CITIES({dataAll,reset}))
        } catch (error) {
        }
    },

    getProjectAllocation:(reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("cities",args)
            const res = await Api.get({ url:`${Urls.admin_project_allocation}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_PROJECT_ALLLOCATION({dataAll,reset}))
        } catch (error) {
        }
    },

    postProjectAllocation: (data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_project_allocation : Urls.admin_project_allocation + "/" + uniqueId})
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