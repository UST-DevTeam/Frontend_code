import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import ManageProjectTypeForm from '../ManageProjectType/ManageProjectTypeForm';
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import ToggleButton from '../../../../components/ToggleButton';
import { getAccessType, labelToValue, objectToQueryString } from '../../../../utils/commonFunnction';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls, backendassetUrl, baseUrl } from '../../../../utils/url';
// import AdminActions from '../../../../store/actions/admin-actions';
import AdminActions from '../../../../store/actions/admin-actions';
import { useNavigate, useParams } from 'react-router-dom';
import CCDash from '../../../../components/CCDash';
import CommonForm from '../../../../components/CommonForm';
import CommonTableForm from '../../../../components/CommonTableForm';
import CommonTableFormParent from '../../../../components/CommonTableFormSiteParent';
import CommonTableFormSiteParent from '../../../../components/CommonTableFormSiteParent';
import { SET_DYNAMIC_FORM } from '../../../../store/reducers/projectList-reducer';
import projectListActions from '../../../../store/actions/projectList-actions';
import { uiStatusColor } from '../../../../utils/queryBuilder';
import CompletitonCreiteriaForm from './CompletitonCreiteriaForm';
import ConditionalButton from '../../../../components/ConditionalButton';




const ManageMilestoneSite = ({ siteCompleteData, uid, mileStone, setGlobalData, projectuniqueId, setmodalFullOpen, setSiteId }) => {


    const { customeruniqueId } = useParams()

    let assignedToCount=mileStone?.assignerResult?.length || 0


    console.log(siteCompleteData, "siteCompleteDatamileStonemileStonemileStone")

    const { register, handleSubmit, watch, setValue, setValues, getValues, reset, formState: { errors } } = useForm()

    const { register: registerForm1, setValue: setValueForm1, getValues: getValuesForm1, handleSubmit: handleSubmitForm1, formState: { errors: errorsForm1 } } = useForm();
    const { register: registerForm2, setValue: setValueForm2, getValues: getValuesForm2, handleSubmit: handleSubmitForm2, formState: { errors: errorsForm2 } } = useForm();
    const { register: registerForm3, setValue: setValueForm3, getValues: getValuesForm3, handleSubmit: handleSubmitForm3, formState: { errors: errorsForm3 } } = useForm();
    const { register: registerForm4, setValue: setValueForm4, getValues: getValuesForm4, handleSubmit: handleSubmitForm4, formState: { errors: errorsForm4 } } = useForm();


    const [modalOpen, setmodalOpen] = useState(false)

    const [type, settype] = useState(true)
    const [modalHead, setmodalHead] = useState(<></>)


    const [modalBody, setmodalBody] = useState((<></>))
    const [uniqueness, setUniqueness] = useState("")

    const [listing, setlisting] = useState([]);


    const dispatch = useDispatch()

    let dataOfOldProject = useSelector((state) => {

        let datew = state.adminData.getOneProjectTypeDyform

        console.log(type, datew, datew, datew, "datewdatewdatew")

        if (type && datew && datew.length > 0) {
            settype(false)

            let dtresult = datew[0]["result"]

            dtresult["t_sengg"] && dtresult["t_sengg"].map((iytm) => {

                setValueForm1(labelToValue(iytm.fieldName), datew[0][labelToValue(iytm.fieldName)])

                console.log(labelToValue(iytm.fieldName), datew[0][labelToValue(iytm.fieldName)], "iytmiytmiytmiytm")
            })
            dtresult["t_tracking"] && dtresult["t_tracking"].map((iytm) => {

                setValueForm2(labelToValue(iytm.fieldName), datew[0][labelToValue(iytm.fieldName)])

                console.log(labelToValue(iytm.fieldName), datew[0][labelToValue(iytm.fieldName)], "iytmiytmiytmiytm")
            })
            dtresult["t_issues"] && dtresult["t_issues"].map((iytm) => {

                setValueForm3(labelToValue(iytm.fieldName), datew[0][labelToValue(iytm.fieldName)])
                console.log(labelToValue(iytm.fieldName), datew[0][labelToValue(iytm.fieldName)], "iytmiytmiytmiytm")
            })
            dtresult["t_sFinancials"] && dtresult["t_sFinancials"].map((iytm) => {

                setValueForm4(labelToValue(iytm.fieldName), datew[0][labelToValue(iytm.fieldName)])

                console.log(labelToValue(iytm.fieldName), datew[0][labelToValue(iytm.fieldName)], "iytmiytmiytmiytm")
            })
            console.log(type, state.adminData.getOneProjectTypeDyform, state.adminData.getOneProjectTypeDyform, "dataOfOldProjectdataOfOldProjectdataOfOldProject")

            return datew[0]
        }


    })
    let dataOfProject = useSelector((state) => {

        let dataOlder = state.adminData.getOneProjectTypeDyform ? state.adminData.getOneProjectTypeDyform.length > 0 ? state.adminData.getOneProjectTypeDyform[0]["result"] : state.adminData.getOneProjectTypeDyform : state.adminData.getOneProjectTypeDyform

        return dataOlder
        if (dataOlder.length > 0 && dataOlder[0]["t_sengg"]) {
            let data = dataOlder[0]["t_sengg"].map((its) => {
                return {
                    label: its.fieldName,
                    required: its.required,
                    value: "",
                    name: its.fieldName,
                    type: its.dataType
                }
            })
            return data
        } else {
            return []
        }

    })


    console.log(dataOfProject, "dataOfProjectdataOfProjectdataOfProject")


    const handleSiteEnggSubmit = (data) => {

        let final_data = {
        }
        dataOfProject["t_sengg"].map((itew) => {
            let fieldNaming = labelToValue(itew.fieldName)

            final_data[fieldNaming] = data[fieldNaming]
        })



        // dispatch(projectListActions.globalProjectTypeDataPatch(Urls.projectList_globalSaver, projectuniqueId, final_data, () => { }))

        let fdata = {
            name: "updateSiteEngg",
            data: final_data,
            from: {
                "uid": uid
            }
        }


        dispatch(projectListActions.globalProjectTypeDataPatch(Urls.projectList_globalSaver, projectuniqueId, fdata, () => { }))



        // setGlobalData(prev => {
        //     return {
        //         ...prev,
        //         "siteEngineer": final_data
        //     }
        // })
        // setmodalFullOpen(false)





        // dispatch(projectListActions.submitProjectTypeData(Urls.projectList_siteEngineer, final_data, () => {


        //     dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
        // }))





        console.log(data, dataOfProject["uniqueId"], "dasugdjsahj")

    }

    // const handleTrackingSubmit = (data) => {


    //     console.log(data, "dasugdjsahj")
    //     setSiteId(data["siteid"] ? data["siteid"] : "Add")

    //     let final_data = {
    //         "SubProjectId": dataOfProject["uniqueId"],
    //         "new_u_id": dataOfProject["new_u_id"],
    //         "projectuniqueId": projectuniqueId

    //     }
    //     dataOfProject["t_tracking"].map((itew) => {
    //         let fieldNaming = labelToValue(itew.fieldName)

    //         final_data[fieldNaming] = data[fieldNaming]
    //     })

    //     dispatch(projectListActions.submitProjectTypeData(Urls.projectList_trackingData, final_data, () => {
    //         setmodalFullOpen(false)
    //         dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
    //     }))

    // }

    // const handleIssuesSubmit = (data) => {


    //     console.log(data, "dasugdjsahj")
    //     setSiteId(data["siteid"] ? data["siteid"] : "Add")

    //     let final_data = {
    //         "SubProjectId": dataOfProject["uniqueId"],
    //         "new_u_id": dataOfProject["new_u_id"],
    //         "projectuniqueId": projectuniqueId

    //     }
    //     dataOfProject["t_issues"].map((itew) => {
    //         let fieldNaming = labelToValue(itew.fieldName)

    //         final_data[fieldNaming] = data[fieldNaming]
    //     })

    //     dispatch(projectListActions.submitProjectTypeData(Urls.projectList_issueData, final_data, () => {
    //         setmodalFullOpen(false)
    //         dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
    //     }))

    // }

    // const handleFinancialsSubmit = (data) => {


    //     console.log(data, "dasugdjsahj")
    //     setSiteId(data["siteid"] ? data["siteid"] : "Add")

    //     let final_data = {
    //         "SubProjectId": dataOfProject["uniqueId"],
    //         "new_u_id": dataOfProject["new_u_id"],
    //         "projectuniqueId": projectuniqueId

    //     }
    //     dataOfProject["t_sFinancials"].map((itew) => {
    //         let fieldNaming = labelToValue(itew.fieldName)

    //         final_data[fieldNaming] = data[fieldNaming]
    //     })

    //     dispatch(projectListActions.submitProjectTypeData(Urls.projectList_financialData, final_data, () => {
    //         setmodalFullOpen(false)
    //         dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
    //     }))

    // }

    const handleTrackingSubmit = (data) => {


        console.log(data, "dasugdjsahj")
        // setSiteId(data["siteid"]?data["siteid"]:"Add")

        // let final_data = {
        //     "SubProjectId": dataOfProject["uniqueId"],
        //     "new_u_id": dataOfProject["new_u_id"],
        //     "projectuniqueId": projectuniqueId

        // }
        // dataOfProject["t_tracking"].map((itew) => {
        //     let fieldNaming = labelToValue(itew.fieldName)

        //     final_data[fieldNaming] = data[fieldNaming]
        // })

        // dispatch(projectListActions.submitProjectTypeData(Urls.projectList_trackingData, final_data, () => {
        //     setmodalFullOpen(false)
        //     dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
        // }))


        let final_data = {
        }
        dataOfProject["t_tracking"].map((itew) => {
            let fieldNaming = labelToValue(itew.fieldName)

            final_data[fieldNaming] = data[fieldNaming]
        })

        let fdata = {
            name: "updateSiteEngg",
            data: final_data,
            from: {
                "uid": uid
            }
        }


        dispatch(projectListActions.globalProjectTypeDataPatch(Urls.projectList_globalSaver, projectuniqueId, fdata, () => { }))

        // let final_data = {
        // }
        // dataOfProject["t_tracking"].map((itew) => {
        //     let fieldNaming = labelToValue(itew.fieldName)

        //     final_data[fieldNaming] = data[fieldNaming]
        // })


        // setGlobalData(prev=>{
        //     return {
        //         ...prev,
        //         "t_tracking":final_data
        //     }
        // })
        // setmodalFullOpen(false)

    }

    const handleIssuesSubmit = (data) => {


        // console.log(data, "dasugdjsahj")
        // setSiteId(data["siteid"]?data["siteid"]:"Add")

        // let final_data = {
        //     "SubProjectId": dataOfProject["uniqueId"],
        //     "new_u_id": dataOfProject["new_u_id"],
        //     "projectuniqueId": projectuniqueId

        // }
        // dataOfProject["t_issues"].map((itew) => {
        //     let fieldNaming = labelToValue(itew.fieldName)

        //     final_data[fieldNaming] = data[fieldNaming]
        // })

        // dispatch(projectListActions.submitProjectTypeData(Urls.projectList_issueData, final_data, () => {
        //     setmodalFullOpen(false)
        //     dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
        // }))



        let final_data = {
        }
        dataOfProject["t_issues"].map((itew) => {
            let fieldNaming = labelToValue(itew.fieldName)

            final_data[fieldNaming] = data[fieldNaming]
        })

        let fdata = {
            name: "updateSiteEngg",
            data: final_data,
            from: {
                "uid": uid
            }
        }


        dispatch(projectListActions.globalProjectTypeDataPatch(Urls.projectList_globalSaver, projectuniqueId, fdata, () => { }))







        // dispatch(projectListActions.globalProjectTypeDataPatch(Urls.projectList_globalSaver, projectuniqueId, final_data, () => { }))



        // let final_data = {
        // }
        // dataOfProject["t_issues"].map((itew) => {
        //     let fieldNaming = labelToValue(itew.fieldName)

        //     final_data[fieldNaming] = data[fieldNaming]
        // })


        // setGlobalData(prev=>{
        //     return {
        //         ...prev,
        //         "t_issues":final_data
        //     }
        // })
        // setmodalFullOpen(false)

    }

    const handleFinancialsSubmit = (data) => {


        // console.log(data, "dasugdjsahj")
        // setSiteId(data["siteid"]?data["siteid"]:"Add")

        // let final_data = {
        //     "SubProjectId": dataOfProject["uniqueId"],
        //     "new_u_id": dataOfProject["new_u_id"],
        //     "projectuniqueId": projectuniqueId

        // }
        // dataOfProject["t_sFinancials"].map((itew) => {
        //     let fieldNaming = labelToValue(itew.fieldName)

        //     final_data[fieldNaming] = data[fieldNaming]
        // })

        // dispatch(projectListActions.submitProjectTypeData(Urls.projectList_financialData, final_data, () => {
        //     setmodalFullOpen(false)
        //     dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
        // }))

        let final_data = {
        }
        dataOfProject["t_sFinancials"].map((itew) => {
            let fieldNaming = labelToValue(itew.fieldName)

            final_data[fieldNaming] = data[fieldNaming]
        })

        let fdata = {
            name: "updateSiteEngg",
            data: final_data,
            from: {
                "uid": uid
            }
        }


        dispatch(projectListActions.globalProjectTypeDataPatch(Urls.projectList_globalSaver, projectuniqueId, fdata, () => { }))



        // let updatedData = {
        //     "": ""
        // }


        // dispatch(projectListActions.globalProjectTypeDataPatch(Urls.projectList_globalSaver, projectuniqueId, final_data, () => { }))


        // let final_data = {
        // }
        // dataOfProject["t_sFinancials"].map((itew) => {
        //     let fieldNaming = labelToValue(itew.fieldName)

        //     final_data[fieldNaming] = data[fieldNaming]
        // })


        // setGlobalData(prev=>{
        //     return {
        //         ...prev,
        //         "t_sFinancials":final_data
        //     }
        // })
        // setmodalFullOpen(false)

    }
    const funcaller = () => {

        reset({})

    }

    const handleAddActivity = (res, targ, itm) => {
        console.log(res, "uniqueness", itm.uniqueId, "uniqueness", "handleAddActivity");

        let newdata = {
            [targ]: res
        }

        dispatch(AdminActions.patchManageProjectType(true, itm.uniqueId, newdata, () => {
            // alert("done")

            dispatch(AdminActions.getManageProjectType(customeruniqueId))
        }))





    };



    useEffect(() => {

        reset({})

        // dispatch(AdminActions.getOneManageProjectType("65dee316811c797c9f26d836/65e59c4488b1db430076f576"))
    }, [])


    let dtype = {
        "Decimal": "number",
        "Text": "text",
        "Dropdown": "select",
        "Number": "number",
        "Date": "datetime",
        "Auto Created": "sdisabled"
    }


    // console.log(dataOfProject ? dataOfProject["t_sengg"] ? dataOfProject["t_sengg"].map((its) => {
    //     return {
    //         label: "abc",
    //         value: "",
    //         name: "",
    //         type: "text"
    //     }
    // }) : [] : [], "dsadasssssssssssssssssssssssssss")

    const filesUploadForm = [
        { label: "file", value: "", name: "file", required: true, type: "file" },
        { label: "Note", value: "", name: "note", required: true, type: "text" },
    ];
    return <>




        <Modal children={modalBody} setIsOpen={setmodalOpen} isOpen={modalOpen} size={"lg"} />
        <div className='p-4'>

            {/* <Button /> */}

            <div className='flex flex-row'>

                <div className='w-full'>
                    <div className='w-auto'>
                        <h1>Milestone Status</h1>
                        {<p className={`w-20 rounded-xl text-center ${uiStatusColor[mileStone?.mileStoneStatus]}`}>{mileStone?.mileStoneStatus}</p>}
                    </div>
                </div>
                <div className='w-full'>
                    <ConditionalButton showType={getAccessType("Task Completion Criteria")} classes='w-auto ' name={"Completion Criteria"} onClick={() => {

                        if(assignedToCount!=0){
                            setmodalBody(<CompletitonCreiteriaForm siteCompleteData={siteCompleteData} customeruniqueId={customeruniqueId} projectuniqueId={projectuniqueId} setmodalFullOpen={setmodalFullOpen} setmodalOpen={setmodalOpen} mileStone={mileStone} />)
                            setmodalOpen(true)
                        }else{
                            let msgdata = {
                                
                                show: true,
                                icon: "error",
                                buttons: [],
                                type: 1,
                                text: "For Closing this task you need to assign first?"
                            }
                            dispatch(ALERTS(msgdata))
                        }
                        // alert("sdfghjkl")
                    }}></ConditionalButton>
                </div>
            </div>

            <CommonTableFormSiteParent funcaller={funcaller} defaultValue={"Site Engg"} tabslist={{
                "Site Engg": <><div className='flex justify-end'><Button
                    classes='w-30'
                    name="Save Site Engg"
                    onClick={handleSubmitForm1(handleSiteEnggSubmit)}
                /></div><CommonForm
                        classes={"grid-cols-4 gap-1"}
                        Form={dataOfProject ? dataOfProject["t_sengg"] ? dataOfProject["t_sengg"].map((its) => {
                            return {
                                label: its.fieldName,
                                value: "",
                                required: its.required == "Yes" ? true : false,
                                option: its.dropdownValue ? its.dropdownValue.split(",").map((itm) => {
                                    return {
                                        value: itm,
                                        label: itm
                                    }
                                }) : [],
                                name: its.fieldName.replace(' ', "").toLowerCase(),
                                type: dtype[its.dataType]
                            }
                        }) : [] : []}
                        // Form={filesUploadForm}
                        errors={errorsForm1}
                        register={registerForm1}
                        setValue={setValueForm1}
                        getValues={getValuesForm1}
                    /></>,
                "Tracking": <><div className='flex justify-end'><Button
                    classes='w-30'
                    name="Save Tracking"
                    onClick={handleSubmitForm2(handleTrackingSubmit)}
                /></div><CommonForm
                        classes={"grid-cols-4 gap-1"}
                        Form={dataOfProject ? dataOfProject["t_tracking"] ? dataOfProject["t_tracking"].map((its) => {
                            return {
                                label: its.fieldName,
                                value: "abc",
                                name: its.fieldName,
                                type: dtype[its.dataType]
                            }
                        }) : [] : []}
                        // Form={filesUploadForm}
                        errors={errorsForm2}
                        register={registerForm2}
                        setValue={setValueForm2}
                        getValues={getValuesForm2}
                    /></>,
                "Issues": <><div className='flex justify-end'><Button
                    classes='w-30'
                    name="Save Issues"
                    onClick={handleSubmitForm3(handleIssuesSubmit)}
                /></div><CommonForm
                        classes={"grid-cols-4 gap-1"}
                        Form={dataOfProject ? dataOfProject["t_issues"] ? dataOfProject["t_issues"].map((its) => {
                            return {
                                label: its.fieldName,
                                value: "abc",
                                name: its.fieldName,
                                type: dtype[its.dataType]
                            }
                        }) : [] : []}
                        // Form={filesUploadForm}
                        errors={errorsForm3}
                        register={registerForm3}
                        setValue={setValueForm3}
                        getValues={getValuesForm3}
                    /></>,
                "Financials": <><div className='flex justify-end'><Button
                    classes='w-30'
                    name="Save Tracking"
                    onClick={handleSubmitForm4(handleFinancialsSubmit)}
                /></div><CommonForm
                        classes={"grid-cols-4 gap-1"}
                        Form={dataOfProject ? dataOfProject["t_sFinancials"] ? dataOfProject["t_sFinancials"].map((its) => {
                            return {
                                label: its.fieldName,
                                value: "abc",
                                name: its.fieldName,
                                type: dtype[its.dataType]
                            }
                        }) : [] : []}
                        // Form={filesUploadForm}
                        errors={errorsForm4}
                        register={registerForm4}
                        setValue={setValueForm4}
                        getValues={getValuesForm4}
                    /></>
            }} />
        </div>
    </>
}


export default ManageMilestoneSite;