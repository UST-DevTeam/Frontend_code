import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AdvancedTable from '../../../components/AdvancedTable';
import { Modal } from '@material-ui/core';
import { objectToQueryString } from '../../../utils/commonFunnction';
import AdminActions from '../../../store/actions/admin-actions';


const ComplianceL1ApproverTable = () => {

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)

    let dispatch = useDispatch()

    const currentDate = new Date();
    const dt = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-')
    
    let dbConfigList = useSelector((state) => {
        let interdata = state?.adminData?.getManageCircle || [""]
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
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
        let interdata = state?.adminData?.getManageCircle
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })


    const {register,handleSubmit,watch,setValue,setValues,getValues,formState: { errors }} = useForm()

    let table = {
        columns: [
            {
                name: "Site Id",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Milestone",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "SR Number",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Group",
                value: "customerName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Type",
                value: "circleName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Sub Project",
                value: "circleCode",
                style: "min-w-[140px] max-w-[200px] text-center"
            },          
            {
                name: "Project ID",
                value: "band",
                style: "min-w-[140px] max-w-[200px] text-center"
            },          
            {
                name: "ACTIVITY",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "SSID",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "TOCO ID",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Unique ID",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Final submit Date",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Final Approved Date",
                value: "activity",
                style: "min-w-[160px] max-w-[200px] text-center"
            },
            {
                name: "Submitted to Airtel Date",
                value: "activity",
                style: "min-w-[180px] max-w-[200px] text-center"
            },
            {
                name: "Airtel Action Date",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Delay",
                value: "activity",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
            {
                name: "Form & Checklist Attachment",
                value: "activity",
                style: "min-w-[200px] max-w-[200px] text-center"
            },
            {
                name: "Form & Checklist Attachment Preview",
                value: "activity",
                style: "min-w-[300px] max-w-[300px] text-center"
            },
            {
                name: "Current Status",
                value: "activity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            
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

    useEffect(() => {
        
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


    </>


};

export default ComplianceL1ApproverTable;