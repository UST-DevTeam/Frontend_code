import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import ToggleButton from '../../../../components/ToggleButton';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
import OperationManagementActions from '../../../../store/actions/OperationManagement-actions';
import FinanceActions from '../../../../store/actions/finance-actions';
import POWorkDoneBasedForm from '../POWorkDoneBased/POWorkDoneBasedForm'

const POWorkDoneBased = () => {
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    let dispatch = useDispatch()
    // let roleList = useSelector((state) => {
    //     let interdata = state?.operationManagement?.USERS_LIST
    //     return interdata
    // })
    let dbConfigList = useSelector((state) => {
        let interdata = state?.financeData?.getPOWorkDoneBased || []
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,

                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(FinanceActions.getPOWorkDoneBased())
                    setmodalHead("Edit User")
                    setmodalBody(<>
                        <POWorkDoneBasedForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    console.log('ahshshhs',itm)
                    //setmodalOpen(false)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-green-500' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.finance_poworkdone_based}/${itm.uniqueId}`, () => {
                                    dispatch(FinanceActions.getPOWorkDoneBased())
                                    dispatch(ALERTS({ show: false }))
                                }))
                            }} name={"OK"} />,
                            <Button classes='w-24' onClick={() => {
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
        let interdata = state?.financeData?.getPOWorkDoneBased || []
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
                name: "Customer",
                value: "customerName",
                style: "min-w-[140px] max-w-[200px] text-center"
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
                name: "Project ID",
                value: "projectId",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "GBPA",
                value: "pogbpa",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Item Code",
                value: "itemCode",
                style: "min-w-[140px] max-w-[200px] text-center"
            },                                    
            {
                name: "Description",
                value: "description",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Unit Rate(NR)",
                value: "unitRate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Initial PO Qty ( Sum of all Open PO )",
                value: "initialPOQty",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Invoiced Quantity",
                value: "invoicedQuantity",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Work Done Qty",
                value: "workdoneQty",
                style: "min-w-[140px] max-w-[200px] text-center"
            },                    
            {
                name: "Open Qty",
                value: "OpenQty",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Status",
                value: "status",
                style: "min-w-[140px] max-w-[200px] text-center"
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
        console.log("jsjsjsjss", data)
        let value = data.reseter
        delete data.reseter
        dispatch(FinanceActions.getPOWorkDoneBased(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(FinanceActions.getPOWorkDoneBased())
    }, [])
    return <>
        <AdvancedTable
            headerButton={<><Button onClick={(e) => {
                setmodalOpen(prev => !prev)
                setmodalHead("New PO Life Cycle ")
                setmodalBody(<POWorkDoneBasedForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add New"}></Button></>}
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
        />

        <Modal size={"smsh"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
    </>


};

export default POWorkDoneBased;