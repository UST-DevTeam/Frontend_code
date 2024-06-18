import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import {
    GET_GRAPH_PROJECT_STATUS,
    GET_GRAPH_PO_STATUS
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

    postGraphProjectStatus: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_project_status })
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
                let dataAll = res?.data?.data
                dispatch(GET_GRAPH_PROJECT_STATUS({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },

    getGraphPOStatus:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.graph_po_status}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GRAPH_PO_STATUS({dataAll,reset}))
        } catch (error) {
        }
    },

    postGraphPOStatus: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.graph_po_status })
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
                let dataAll = res?.data?.data
                dispatch(GET_GRAPH_PO_STATUS({ dataAll, reset:true }))

            }
        } catch (error) {
            return;
        }
    },
}
export default GraphActions;
