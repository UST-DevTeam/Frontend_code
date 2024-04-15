import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import ManageProjectForm from '../../../../pages/PMIS/Admin/ManageProject/ManageProjectForm'
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import ToggleButton from '../../../../components/ToggleButton';
import { getAccessType, objectToQueryString } from '../../../../utils/commonFunnction';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
import { useNavigate, useParams } from 'react-router-dom';
import OperationManagementActions from '../../../../store/actions/admin-actions';
import AdminActions from '../../../../store/actions/admin-actions';
import FileUploader from '../../../../components/FIleUploader';
import ConditionalButton from '../../../../components/ConditionalButton';


const ManageProject = () => {


    const { projecttypeuniqueId, customeruniqueId } = useParams()


    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)


    let dispatch = useDispatch()
    

    let navigate = useNavigate()
    
  

    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getProject
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                // "status": <CstmButton child=
                // {<ToggleButton onChange={(e) => {
                //     console.log(e.target.checked, "e.target.checked")
                //     let data = {
                //         "enabled": e.target.checked ? 1 : 0
                //     }
                //     dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
                //         // alert(e.target.checked)
                //         e.target.checked = e.target.checked
                //     }, itm.id))
                //     // if(itm.enabled==0){ 
                //     //     itm.enabled=1
                //     // }else{
                //     //     itm.enabled=0
                //     // }
                //     // itm.enabled=itm.enabled==0?1:0
                //     console.log(itm.enabled, "itm.enabled")
                // }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,

                projectId: (
                    <button>
                        <p
                        // onClick={() => handleFullName(item)}
                        onClick={() => navigate(`/projectSiteId/${itm.uniqueId}`)}
                        className="text-[#143b64] font-bold hover:underline hover:text-[#00ac25] focus:outline-none hover:font-semibold"
                    >
                        {itm.projectId}
                    </p>
                    </button>
                ),  

                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    // alert(itm.uniqueId)
                    setmodalOpen(true)
                    // dispatch(AdminActions.getProject(`${itm.customeruniqueId}/${itm.uniqueId}`))
                    setmodalHead("Edit Project")
                    setmodalBody(<>
                        <ManageProjectForm isOpen={modalOpen} customeruniqueId={customeruniqueId}  setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                   
                    //setmodalOpen(false)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-green-500' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_project}/${itm.customeruniqueId}/${itm.uniqueId}`, () => {
                                    dispatch(AdminActions.getProject(`${customeruniqueId}`))
                                    dispatch(ALERTS({ show: false }))
                                }))
                            }} name={"OK"} />,
                            <Button classes='w-24' onClick={() => {
                                console.log('snnsnsnsns')
                                dispatch(ALERTS({ show: false }))
                            }} name={"Cancel"} />
                        ],
                        text: "Are you sure you want to Delete?"
                    }
                    dispatch(ALERTS(msgdata))
                }}></DeleteButton>} />
            }
            return updateditm
        });
    })
    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.adminData?.getProject
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })
    // let Form = [
    //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
    //     { label: "Custom Queries", value: "", type: "textarea" }
    // ]
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setValues,
        getValues,
        formState: { errors },
    } = useForm()

    let table = {
        columns: [
            {
                name: "Project ID",
                value: "projectId",
                style: "min-w-[200px] max-w-[200px] text-center"
            },
            {
                name: "Project Group",
                value: "projectGroupId",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Type",
                value: "projectType",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Sub Project",
                value: "subProject",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Manager",
                value: "PMName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Circle",
                value: "circleName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Start Date",
                value: "startDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "End Date",
                value: "endDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            // {
            //     name: "Site Status",
            //     value: "siteStatus",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },
            {
                name: "Status",
                value: "status",
                style: "min-w-[100px] max-w-[200px] text-center"

            },
            {
                name: "Edit",
                value: "edit",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
            {
                name: "Delete",
                value: "delete",
                style: "min-w-[100px] max-w-[200px] text-center"
            }
        ],
        properties: {
            rpp: [10, 20, 50, 100]
        },
        filter: [
            // {
            //     label: "Role",
            //     type: "select",
            //     name: "rolename",
            //     option: roleList,
            //     props: {
            //     }
            // }
        ]
    }
    const onSubmit = (data) => {
        // console.log("jsjsjsjss", data)
        let value = data.reseter
        delete data.reseter
        dispatch(AdminActions.getProject(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(AdminActions.getProject(`${customeruniqueId}${projecttypeuniqueId?"/"+projecttypeuniqueId:""}`))
        // dispatch(OperationManagementActions.getRoleList())
    }, [])

    return <>
        <AdvancedTable
            headerButton={<div className='flex gap-1'><ConditionalButton showType={getAccessType("Add Project")}  classes='mr-1' onClick={(e) => {
                setmodalOpen(prev => !prev)
                // dispatch(AdminActions.getProject())
                setmodalHead("Add Project")
                setmodalBody(<ManageProjectForm isOpen={modalOpen} projecttypeuniqueId={projecttypeuniqueId} customeruniqueId={customeruniqueId} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add Project"}></ConditionalButton>
                {/* <Button name={"Upload File"} classes='w-auto ' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button> */}
                </div>}
            table={table}
            exportButton={["/export/Project/"+(`${customeruniqueId}`)+"/"+(`${projecttypeuniqueId}`),"Export_Project.xlsx"]}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            handleSubmit={handleSubmit}
            data={dbConfigList}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
    </>


};

export default ManageProject;