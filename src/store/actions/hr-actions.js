import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { 
    GET_EMPLOYEE_DETAILS,
} from "../reducers/hr-reduces"


const HrActions = {


    getManageEmpDetails:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_empdetails}${args!=""?"?"+args:""}`, reset })
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
}
export default HrActions;