import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AdvancedTable from '../../../components/AdvancedTable';
import { objectToQueryString } from '../../../utils/commonFunnction';
import AdminActions from '../../../store/actions/admin-actions';
import { useSearchParams } from 'react-router-dom';
import CstmButton from '../../../components/CstmButton';
import DownloadButton from '../../../components/DownloadButton';
import ActionButton from '../../../components/ActionButton';
import RejectionButton from '../../../components/RejectionButton';
import { UilExclamationTriangle}  from "@iconscout/react-unicons";
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import CommonForm from '../../../components/CommonForm';
import ManageComplianceTemplateApproverForm from '../Admin/ManageCompliance/ManageComplinaceTemplateApproverForm';
import { GET_ONE_COMPLIANCE_DY_FORM } from '../../../store/reducers/admin-reducer';
import projectListActions from '../../../store/actions/projectList-actions';
import { GET_GLOBAL_COMPLAINCE_TYPE_APPROVER_DATA } from '../../../store/reducers/projectList-reducer';


const ComplianceL2ApproverTable = () => {
    const [URLSearchParams, setURLSearchParams] = useSearchParams()
    const route = URLSearchParams.get("from")
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [modalFullOpen, setmodalFullOpen] = useState(false);

    const {register,handleSubmit,watch,reset,setValue,setValues,getValues,formState: { errors }} = useForm()

    let dispatch = useDispatch()

    const currentDate = new Date();
    const dt = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-')


   
    
    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getComplianceMilestoneL1Approver || [""]
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,

                siteIdLink: (
                    <p
                      className="text-[#13b497] cursor-pointer font-extrabold"
                      onClick={() => {
                        setmodalFullOpen((prev) => !prev);
                        setmodalHead(itm['siteIdName']);
                        dispatch(GET_ONE_COMPLIANCE_DY_FORM({ dataAll: [], reset: true }))
                        dispatch(GET_GLOBAL_COMPLAINCE_TYPE_APPROVER_DATA({ dataAll:[], reset:true }))
                        dispatch(AdminActions.getOneComplianceDyform(itm.siteuid, itm.milestoneName, true, ""));
                        dispatch(projectListActions.globalComplianceTypeApproverDataGet(itm.uniqueId,"", true));
                        setmodalBody(
                            <ManageComplianceTemplateApproverForm
                                CompleteData = {itm}
                            />
                        );
                      }}
                    >
                    {itm["siteIdName"]}
                    </p>
                ),
                attachmentDownload: (
                    <CstmButton
                      className={"p-2"}
                      child={
                        <DownloadButton
                          name={""}
                          onClick={() => {
                            alert("This function for Dowload Forms & Checklist for particular Site Id and Milestone")
                        //     setmodalOpen(true);
                        //     setmodalHead("Attachment Preview");
                        //     setmodalBody(
                        //       <>
                        //         <div className="flex justify-center items-center">
                        //           <img
                        //             src={backendassetUrl + item?.attachment}
                        //             className="w-full h-full content-center flex object-contain"
                        //           />
                        //         </div>
                        //       </>
                        //     );
                        //     setmodalFullOpen((prev) => !prev);
                          }}
                        ></DownloadButton>
                      }
                    />
                ),
                approverAction: (
                    <CstmButton
                      className={"p-2"}
                      child={
                        <>
                            <div className='flex space-x-2'>
                            <ActionButton
                            name={""}
                            onClick={() => {
                                setmodalOpen(prev => !prev);
                                setmodalHead("Approve Milestone");
                                setmodalBody(
                                <>
                                    <div className="sm:mx-auto sm:w-full sm:max-w-full pb-2">
                                        <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
                                        <Button classes={"mt-4 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
                                    </div>
                                </>
                                );
                            }}
                            >
                            </ActionButton>

                            <RejectionButton
                            name={""}
                            onClick={() => {
                                setShowRejectModal(true)
                            }}
                            >
                            </RejectionButton>
                            </div>
                        </>
                      }
                    />
                ),
                // "status": <CstmButton child={<ToggleButton onChange={(e) => {
                //     let data = {
                //         "enabled": e.target.checked ? 1 : 0
                //     }
                //     dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
                //         alert(e.target.checked)
                //         e.target.checked = e.target.checked
                //     }, itm.id))
                //     // if(itm.enabled==0){ 
                //     //     itm.enabled=1
                //     // }else{
                //     //     itm.enabled=0
                //     // }
                //     // itm.enabled=itm.enabled==0?1:0
                // }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,
                
                // "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                //     setmodalOpen(true)
                //     dispatch(AdminActions.getManageCircle())
                //     setmodalHead("Edit Circle")
                //     setmodalBody(<>
                //         <ManageCircleForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                //     </>)
                // }}></EditButton>} />,
                
                // "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                //     let msgdata = {
                //         show: true,
                //         icon: 'warning',
                //         buttons: [
                //             <Button classes='w-15 bg-rose-400' onClick={() => {
                //                 dispatch(CommonActions.deleteApiCaller(`${Urls.admin_circle}/${itm.uniqueId}`, () => {
                //                     dispatch(AdminActions.getManageCircle())
                //                     dispatch(ALERTS({ show: false }))
                //                 }))
                //             }} name={"OK"} />,
                //             <Button classes='w-auto' onClick={() => {
                //                 dispatch(ALERTS({ show: false }))
                //             }} name={"Cancel"} />
                //         ],
                //         text: "Are you sure you want to Delete?"
                //     }
                //     dispatch(ALERTS(msgdata))
                // }}></DeleteButton>} />
            }
            return updateditm
        });
    })


    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.adminData?.getComplianceMilestoneL1Approver
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })



    let table = {
        columns: [
            {
                name: "Site Id",
                value: "siteIdLink",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Milestone",
                value: "milestoneName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "SR Number",
                value: "srNumber",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Group",
                value: "customerName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Type",
                value: "projectTypeName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Sub Project",
                value: "subTypeName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },          
            {
                name: "Project ID",
                value: "projectIdName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },          
            {
                name: "ACTIVITY",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "SSID",
                value: "systemId",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "TOCO ID",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Unique ID",
                value: "Unique ID",
                style: "min-w-[250px] max-w-[300px] text-center"
            },
            {
                name: "Form submission Date",
                value: "",
                style: "min-w-[200px] max-w-[200px] text-center"
            },
            {
                name: "Approval/Rejection Date",
                value: "",
                style: "min-w-[200px] max-w-[200px] text-center"
            },
            {
                name: "Submitted to Airtel Date",
                value: "",
                style: "min-w-[180px] max-w-[200px] text-center"
            },
            {
                name: "Airtel Action Date",
                value: "",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "L1-Ageing",
                value: "",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "L2-Ageing",
                value: "",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Airtel-Ageing",
                value: "",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            // {
            //     name: "Delay",
            //     value: "",
            //     style: "min-w-[100px] max-w-[200px] text-center"
            // },
            {
                name: "Form & Checklist Attachment",
                value: "attachmentDownload",
                style: "min-w-[200px] max-w-[200px] text-center"
            },
            // {
            //     name: "Form & Checklist Attachment Preview",
            //     value: "",
            //     style: "min-w-[300px] max-w-[300px] text-center"
            // },
            {
                name: "Current Status",
                value: "",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Action",
                value: "approverAction",
                style: "min-w-[140px] max-w-[200px] text-center"
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
        let value = data.reseter
        delete data.reseter
        dispatch(AdminActions.getManageCircle(value, objectToQueryString(data)))
    }

    const handleReject = () => {
        setShowRejectModal(false);
        // dispatch(
        //   CommonActions.deleteApiCallerBulk(
        //      `${delurl}`,
        //     {
        //       ids: selectedRows
        //     },
        //     () => {
        //       setShowRejectModal(false);
        //       setSelectedRows([]);
        //       setSelectAll(false);
        //       setRPP(50)
        //       setcurrentPage(1); 
        //       dispatch(geturl);
        //     }
        //   )
        // );
    };

    useEffect(() => {
        dispatch(AdminActions.getComplianceMilestoneL2Approver(route.split("/")))
    }, [])

    return <>
        <AdvancedTable
            headerButton={
            <div className='flex gap-1'>
                {/* <Button classes='w-auto' onClick={(e) => {
                setmodalOpen(prev => !prev)
                dispatch(AdminActions.getManageCircle())
                setmodalHead("New Circle")
                setmodalBody(<ManageCircleForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                }}
                name={"Add Circle"}></Button>
                <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button>
                <Button name={"Export"} classes='w-auto mr-1' onClick={(e) => {
                    dispatch(CommonActions.commondownload("/export/manageCircle","Export_Circle("+dt+").xlsx"))
                }}></Button> */}
                </div>
            }
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
            heading = {"Total Count :- "}
        />

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
        <Modal size={"full"} modalHead={modalHead} children={modalBody} isOpen={modalFullOpen} setIsOpen={setmodalFullOpen}/>

        {showRejectModal && (
            <div className="fixed inset-0 flex items-center justify-center  bg-opacity-75 z-[10]">
            <div className="bg-white p-4 rounded-lg shadow-xl">
                <UilExclamationTriangle className="text-red-500 flex mx-auto w-14 h-14" />
                <p className="mt-4">{`Are you sure you want to Reject This Milestone?`}</p>
                <div className="mt-6 flex justify-center space-x-4">
                <Button name="Reject" classes="w-auto bg-rose-500" onClick={handleReject} />
                <Button name="Cancel" classes="w-auto" onClick={() => setShowRejectModal(false)} />
                </div>
            </div>
            </div>
        )}

    </>


};

export default ComplianceL2ApproverTable;