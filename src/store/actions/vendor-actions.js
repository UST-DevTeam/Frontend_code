import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import { 
    GET_VENDOR_DETAILS,
    GET_VENDOR_PROJECT_LIST,
} from "../reducers/vendor-reducer"


const VendorActions = {
    getManageEmpDetails:(reset=true,uid="",args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_empdetails}${uid!=""?"/"+uid:""}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EMPLOYEE_DETAILS({dataAll,reset}))
        } catch (error) {
        }
    },
    postManageEmpDetails: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_empdetails : Urls.admin_empdetails + "/" + uniqueId , contentType:"multipart/form-data", reset })
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

    getManageVendorDetails:(reset=true,uid="",args="") => async (dispatch, _) => {
        try {
            console.log('dhdhdhd',args)
            const res = await Api.get({ url:`${Urls.vendor_details}${uid!=""?"/"+uid:""}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_VENDOR_DETAILS({dataAll,reset}))
        } catch (error) {
        }
    },
    postManageVendorDetails: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.vendor_details : Urls.vendor_details + "/" + uniqueId , contentType:"multipart/form-data", reset })
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

    getVendorProjectList:(reset=true,uid="",args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.vendor_project_list}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_VENDOR_PROJECT_LIST({dataAll,reset}))
        } catch (error) {
        }
    },
}
export default VendorActions;