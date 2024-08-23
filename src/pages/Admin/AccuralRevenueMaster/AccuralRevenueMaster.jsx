import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../components/EditButton';
import AdvancedTable from '../../../components/AdvancedTable';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import DeleteButton from '../../../components/DeleteButton';
import CstmButton from '../../../components/CstmButton';
import ToggleButton from '../../../components/ToggleButton';
import { objectToQueryString } from '../../../utils/commonFunnction';
import FileUploader from '../../../components/FIleUploader';
import { getAccessType } from '../../../utils/commonFunnction';
import { ALERTS } from '../../../store/reducers/component-reducer';
import CommonActions from '../../../store/actions/common-actions';
import { Urls } from '../../../utils/url';
import OperationManagementActions from '../../../store/actions/OperationManagement-actions';
import AdminActions from '../../../store/actions/admin-actions';
import ManageProfileForm from '../../PMIS/Admin/ManageProfile(userrole)/ManageProfileForm';
import AccuralRevenueMasterForm from './AccuralRevenueMasterForm';
import ConditionalButton from '../../../components/ConditionalButton';
const AccuralRevenueMaster = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    let dispatch = useDispatch()
    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getAccuralRevenueMasterProject
        return interdata?.map((itm) => {
            
            let updateditm = {
                ...itm,
                // "status": <CstmButton child={<ToggleButton onChange={(e) => {
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
                
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    console.log(itm,'ghjkjhghjkl2')
                    setmodalOpen(true)
                    dispatch(AdminActions.getAccuralRevenueMasterProject())
                    setmodalHead("Edit Accural Revenue")
                    setmodalBody(<>
                    
                        <AccuralRevenueMasterForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    console.log('ahshshhs',itm)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_profile}/${itm.uniqueId}`, () => {
                                    dispatch(AdminActions.getAccuralRevenueMasterProject())
                                    dispatch(ALERTS({ show: false }))
                                }))
                            }} name={"OK"} />,
                            <Button classes='w-auto' onClick={() => {
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
        let interdata = state?.adminData?.getAccuralRevenueMasterProject
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })

    const {register,handleSubmit,watch,setValue,setValues,getValues,formState: { errors },} = useForm()

    let table = {
        columns: [
            {
                name: "Project Type",
                value: "projectTypeName",
                style: "min-w-[100px] max-w-[200px] text-center sticky"
            },
            {
                name: "Project ID",
                value: "projectId",
                style: "min-w-[140px] max-w-[200px] text-center sticky"
            },
             
            {
                name: "Sub Project",
                value: "subProjectName",
                style: "min-w-[140px] max-w-[200px] text-center sticky"
            },
            {
                name: "Band",
                value: "band",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Activity",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Rate",
                value: "rate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-01",
                value: "itemCode01",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-02",
                value: "itemCode02",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-03",
                value: "itemCode03",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-04",
                value: "itemCode04",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-05",
                value: "itemCode05",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-06",
                value: "itemCode06",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Item Code-07",
                value: "itemCode07",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
                       
            {
                name: "Edit",
                value: "edit",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
            // {
            //     name: "Delete",
            //     value: "delete",
            //     style: "min-w-[100px] max-w-[200px] text-center"
            // }
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
        let value = data.reseter
        delete data.reseter
        dispatch(AdminActions.getAccuralRevenueMasterProject(value, objectToQueryString(data)))
    }

    
    useEffect(() => {
        dispatch(AdminActions.getAccuralRevenueMasterProject());
    }, []);

    // const onTableViewSubmit = (data) => { 
    //     console.log(data, "datadata")
    //     data["fileType"]="ManageCircle"
    //     data['collection'] = "circle"
    //     dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
    //         dispatch(AdminActions.getManageCircle())
    //         setFileOpen(false)
    //     }))
    // }
    const onTableViewSubmit3 = (data) => {
        data["fileType"] = "UploadAccuralRevenueMaster";
        dispatch(
          CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(AdminActions.getAccuralRevenueMasterProject());
            setFileOpen(false);
            resetting("");
          })
        );
      };
    return <>
        <AdvancedTable
            headerButton={
                <div className='flex gap-1'>
                    <ConditionalButton
                    showType={getAccessType("Upgrade(ManageEmployee)")}
                    name={"Upload File"}
                lasses="w-auto mr-1"
                onClick={(e) => {
                setFileOpen((prev) => !prev);
              }}
            ></ConditionalButton>
                    {/* <Button classes='w-auto' 
                        onClick={(e) => {
                            setmodalOpen(prev => !prev)
                            setmodalHead("New Profile")
                            setmodalBody(
                                // <AccuralRevenueMasterForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />
                            )
                        }}
                        name={"Add Profile"}>
                    </Button> */}

                    {/* <Button name={"Upload File"} classes='w-auto ' 
                        onClick={(e) => {
                            setFileOpen(prev=>!prev)
                        }}>
                    </Button> */}
                </div>
            }
            // exportButton={["/export/manageEmployee","Export_Employee.xlsx"]}
            table={table}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            handleSubmit={handleSubmit}
            data={dbConfigList}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
            heading = {'Total:- '}
            // getaccessExport = {"Export(ManageEmployee)"}
        />
        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit3}
        setIsOpen={setFileOpen}
        tempbtn={true} tempbtnlink = {["/template/AccuralRevenueMaster.xlsx","AccuralRevenueMaster.xlsx"]}
        head = {"Upload File"}
      />
        {/* <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen}  /> */}
    </>

};

export default AccuralRevenueMaster;