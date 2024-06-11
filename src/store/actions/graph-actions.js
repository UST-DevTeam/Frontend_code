import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import {
    GET_GRAPH_PROJECT_STATUS,
 } from "../reducers/graph-reducer"


const GraphActions = {

    
    getGraphProjectStatus:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_project_status}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_PROJECT_STATUS({dataAll,reset}))
        } catch (error) {
        }
    },

}
export default GraphActions;
