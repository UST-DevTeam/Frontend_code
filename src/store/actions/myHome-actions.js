import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import {GET_MY_HOME} from "../reducers/myHome-reducer"


const MyHomeActions = {


    getMyHome:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.MyHome}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MY_HOME({dataAll,reset}))
        } catch (error) {
        }
    },
    postMyHome: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.MyHome : Urls.MyHome + "/" + uniqueId })
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
export default MyHomeActions;