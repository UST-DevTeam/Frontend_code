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
import { objectToQueryString } from '../../../../utils/commonFunnction';
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
import TableJson from '../../../../components/TableJson';




const ManageMilestone = ({ setGlobalData,projectuniqueId, setmodalFullOpen, setSiteId }) => {


    const { customeruniqueId } = useParams()

    const { register, handleSubmit, watch, setValue, setValues, getValues, reset, formState: { errors } } = useForm()

    const { register: registerForm1, setValue: setValueForm1, getValues: getValuesForm1, handleSubmit: handleSubmitForm1, formState: { errors: errorsForm1 } } = useForm();
    const { register: registerForm2, setValue: setValueForm2, getValues: getValuesForm2, handleSubmit: handleSubmitForm2, formState: { errors: errorsForm2 } } = useForm();
    const { register: registerForm3, setValue: setValueForm3, getValues: getValuesForm3, handleSubmit: handleSubmitForm3, formState: { errors: errorsForm3 } } = useForm();
    const { register: registerForm4, setValue: setValueForm4, getValues: getValuesForm4, handleSubmit: handleSubmitForm4, formState: { errors: errorsForm4 } } = useForm();


    const [modalOpen, setmodalOpen] = useState(false)

    const [type, settype] = useState(false)
    const [modalHead, setmodalHead] = useState(<></>)
    const [uniqueness, setUniqueness] = useState("")

    const [listing, setlisting] = useState([]);

    const [check, setCheck] = useState([]);


    const dispatch = useDispatch()


    let dataOfProject = useSelector((state) => {

        console.log(state.adminData.getProjectTypeDyform, "state.adminData.getOneManageProject")

        let dataOlder = state.adminData.getProjectTypeDyform[0]

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


    console.log(check, "dataOfProjectdataOfProjectdataOfProject")


    const handleMileStoneSubmit = (data) => {

        // alert(projectuniqueId)
        console.log(check, "checkcheckcheckcheck")

        let lstindex = 0

        let lstindextkn = false

        let dataD = []

        dataOfProject["MileStone"].map((ireq, index) => {
            console.log(ireq.index,"ireq.index")
            if (check.indexOf(ireq.index) != -1) {
                let sqw = {
                    "Name": dataOfProject["MileStone"][index]["fieldName"],
                    "Estimated Time (Days)": dataOfProject["MileStone"][index]["Estimated Time (Days)"],
                    "WCC Sign off": dataOfProject["MileStone"][index]["WCC Sign off"],
                    // "Predecessor":dataOfProject["MileStone"][lstindextkn?lstindex:index]["Predecessor"],
                    "Predecessor": index != 0 ? dataOfProject["MileStone"][lstindex]["fieldName"] : "",
                    "Completion Criteria": dataOfProject["MileStone"][index]["Completion Criteria"]
                }
                dataD.push(sqw)
                console.log(sqw, check, "sqwsqwsqwsqwsqwsqwsqw")
                lstindex = index
            } else {
                // lstindex=index
                // lstindextkn=true
            }


            console.log(check.indexOf(ireq.index.toString()), lstindex, index, "ireqireqireqireqireq")
        })


        console.log(dataD,"dataDdataDdataD")

        let final_data = {
            "SubProjectId": dataOfProject["uniqueId"],
            "projectuniqueId": projectuniqueId,
            "new_u_id": dataOfProject["new_u_id"],
            "data":dataD
        }


        setGlobalData(prev=>{
            return {
                ...prev,
                "mileStone":final_data
            }
        })
        setmodalFullOpen(false)


        // dispatch(projectListActions.submitProjectTypeData(Urls.projectList_milestone, final_data, () => {
        //     setmodalFullOpen(false)

        //     dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
        // }))





        console.log(data, dataOfProject["uniqueId"], "dasugdjsahj")

    }

    const funcaller = () => {

        reset({})

    }









    const [modalBody, setmodalBody] = useState((<>



        {/* <Button name={"sasaass"} onClick={(handleSubmit(handleAddActivity))}></Button> */}
    </>))







    useEffect(() => {

        reset({})

        // dispatch(AdminActions.getOneManageProjectType("65dee316811c797c9f26d836/65e59c4488b1db430076f576"))
    }, [])


    let dtype = {
        "Decimal": "number",
        "Text": "text",
        "Dropdown": "select",
        "Number": "number",
        "Date": "datetime"
    }


    console.log(dataOfProject, "dataOfProjectdataOfProjectdataOfProject")

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
        <div className='p-4'>


            <><div className='flex justify-end'><Button
                classes='w-30'
                name="Save Milestone"
                onClick={handleSubmitForm1(handleMileStoneSubmit)}
            /></div>

                <TableJson check={check} setCheck={setCheck} columns={dataOfProject ? dataOfProject["MileStone"] ? dataOfProject["MileStone"].map((onewq) => {
                    console.log(onewq, "[onewqonewq]")
                    return {
                        "C": <><input type="checkbox" checked={check.indexOf(onewq["index"])!=-1?true:false} onChange={(e) => {

                            console.log("Dasdasdasdas",check,onewq["index"].toString(),e.target.value,check.indexOf(onewq["index"]), e.target.value, e.target.checked)
                            if (e.target.checked) {
                                setCheck(prev => [...prev, +e.target.value])
                            } else {
                                setCheck(prev => {
                                    let lst = prev.indexOf(+e.target.value)
                                    
                                    prev.splice(lst, 1)
                                    return [...prev]
                                })
                            }
                            // setCheck()
                        }} value={onewq["index"]} /></>,
                        "Name": onewq["fieldName"],
                        "WCC Sign off": onewq["WCC Sign off"],
                        "Estimated Time (Days)": onewq["Estimated Time (Days)"],
                        "Completion Criteria": onewq["Completion Criteria"],
                        "Predecessor": onewq["Predecessor"]
                    }
                }) : [] : []} headers={["C", "Name", "WCC Sign off", "Estimated Time (Days)", "Completion Criteria", "Predecessor",]} />

                {/* <CommonForm
                    classes={"grid-cols-1 gap-1"}
                    Form={dataOfProject ? dataOfProject["MileStone"] ? dataOfProject["MileStone"].map((its) => {
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
                            name: its.fieldName,
                            type: dtype[its.dataType]
                        }
                    }) : [] : []}
                    // Form={filesUploadForm}
                    errors={errorsForm1}
                    register={registerForm1}
                    setValue={setValueForm1}
                    getValues={getValuesForm1}
                /> */}
            </>
            {/* <Button /> */}


            {/* <CommonTableFormSiteParent funcaller={funcaller} defaultValue={"Site Engg"} tabslist={{
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
                                name: its.fieldName.replace(' ',"").toLowerCase(),
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
            }} /> */}
        </div>
    </>
}


export default ManageMilestone;