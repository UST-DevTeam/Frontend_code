import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import ManageProjectTypeForm from '../../../PMIS/Admin/ManageProjectType/ManageProjectTypeForm';
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




const ManageSite = () => {


    const { customeruniqueId } = useParams()

    const { register, handleSubmit, watch, setValue, setValues, getValues, formState: { errors } } = useForm()


    const [modalOpen, setmodalOpen] = useState(false)

    const [type, settype] = useState(false)
    const [modalHead, setmodalHead] = useState(<></>)
    const [uniqueness, setUniqueness] = useState("")

    const [listing, setlisting] = useState([]);


    const dispatch = useDispatch()


    let dataOfProject = useSelector((state) => {

        let dataOlder = state.adminData.getOneManageProject[0]

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


    const handleTemplateSubmit = (data) => {


        console.log(data, "dasugdjsahj")

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









    const [modalBody, setmodalBody] = useState((<>



        {/* <Button name={"sasaass"} onClick={(handleSubmit(handleAddActivity))}></Button> */}
    </>))







    useEffect(() => {
        dispatch(AdminActions.getOneManageProjectType("65dee316811c797c9f26d836/65e59c4488b1db430076f576"))
    }, [])


    let dtype = {
        "Decimal": "number",
        "text": "text",
        "Dropdown": "select",
        "Number": "number"
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
        <div className='p-4'>

            {/* <Button /> */}

            <CommonTableFormSiteParent defaultValue={"Site Engg"} tabslist={{
                "Site Engg": <><Button
                    classes='w-28'
                    name="Save Site Engg"
                    onClick={handleSubmit(handleTemplateSubmit)}
                /><CommonForm
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
                                name: its.fieldName,
                                type: dtype[its.dataType]
                            }
                        }) : [] : []}
                        // Form={filesUploadForm}
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                    /></>,
                "Tracking": <><Button
                    classes='w-28'
                    name="Save Tracking"
                    onClick={handleSubmit(handleTemplateSubmit)}
                /><CommonForm
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
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                    /></>,
                "Issues": <><Button
                    classes='w-28'
                    name="Save Tracking"
                    onClick={handleSubmit(handleTemplateSubmit)}
                /><CommonForm
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
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                /></>,
                "Financials": <><Button
                    classes='w-28'
                    name="Save Tracking"
                    onClick={handleSubmit(handleTemplateSubmit)}
                /><CommonForm
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
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                /></>
            }} />
        </div>
    </>
}


export default ManageSite;