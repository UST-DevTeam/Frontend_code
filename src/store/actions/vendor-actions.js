import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { 
    GET_VENDOR_DETAILS,
} from "../reducers/vendor-reducer"


const VendorActions = {


    getManageVendorDetails:(reset=true,uid="",args="") => async (dispatch, _) => {
        try {
            // const res = await Api.get({ url:`${Urls.vendor_details}${uid!=""?"/"+uid:""}${args!=""?"?"+args:""}`, reset })
            const res = await Api.get({ url:`${Urls.vendor_details}${args!=""?"?"+args:""}`, reset })
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
}
export default VendorActions;