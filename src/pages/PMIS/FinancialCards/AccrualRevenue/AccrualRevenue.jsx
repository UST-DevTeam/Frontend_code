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
// import OperationManagementActions from '../../../../store/actions/OperationManagement-actions';
import InvoiceBasedForm from '../InvoiceBased/InvoiceBasedForm';
import FinanceActions from '../../../../store/actions/finance-actions';

const AccrualRevenue = () => {
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    let dispatch = useDispatch()
    // let roleList = useSelector((state) => {
    //     let interdata = state?.operationManagement?.USERS_LIST
    //     return interdata
    // })
    let dbConfigList = useSelector((state) => {
        let interdata = state?.financeData?.getPOAccrualRevenue || []
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                "prevMonthMS1":itm.MS1_p,
                "prevMonthMS2":itm.MS2_p,
                "currMonthMS1":itm.MS1_c,
                "currMonthMS2":itm.MS2_c,
                "prevamount":itm.amount_p,
                "curramount":itm.amount_c,
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(FinanceActions.getPOAccrualRevenue())
                    setmodalHead("Edit User")
                    setmodalBody(<>
                        <InvoiceBased isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
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
                                dispatch(CommonActions.deleteApiCaller(`${Urls.finance_poaccrual_revenue}/${itm.uniqueId}`, () => {
                                    dispatch(FinanceActions.getPOAccrualRevenue())
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
        let interdata = state?.financeData?.getPOAccrualRevenue || []
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


    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const fiscalYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;
    const fiscalYearEnd = fiscalYearStart + 1;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getCurrentAndPreviousMonth = () => {
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
        const currentYear = currentDate.getFullYear();
        const previousMonthYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;

        return [
            { month: months[previousMonthIndex], year: previousMonthYear },
            { month: months[currentMonthIndex], year: currentYear }
        ];
    };

    const [previousMonthData, currentMonthData] = getCurrentAndPreviousMonth();

    let table = {
        columns: [
            {
                name: "Customer",
                value: "customer",
                style: "min-w-[140px] max-w-[200px] text-center"
            },                      
            {
                name: "Project Group",
                value: "projectGroup",
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
            // {
            //     name: "GBPA",
            //     value: "gbpa",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },            
            // {
            //     name: "PO Number",
            //     value: "poNumber",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },            
            {
                name: "Item Code",
                value: "itemCode",
                style: "min-w-[140px] max-w-[200px] text-center"
            },  
            {
                name: `MS1 Quantity (${previousMonthData.month} ${previousMonthData.year})`,
                value: "prevMonthMS1",
                style: "min-w-[200px] max-w-[200px] text-center"
            },
            {
                name: `MS2 Quantity (${previousMonthData.month} ${previousMonthData.year})`,
                value: "prevMonthMS2",
                style: "min-w-[200px] max-w-[200px] text-center"
            },
            {
                name: `Accrual (${previousMonthData.month} ${previousMonthData.year})`,
                value: "prevamount",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: `MS1 Quantity (${currentMonthData.month} ${currentMonthData.year})`,
                value: "currMonthMS1",
                style: "min-w-[200px] max-w-[200px] text-center"
            },
            {
                name: `MS2 Quantity (${currentMonthData.month} ${currentMonthData.year})`,
                value: "currMonthMS2",
                style: "min-w-[200px] max-w-[200px] text-center"
            },
            {
                name: `Accrual ${currentMonthData.month} ${currentMonthData.year}`,
                value: "curramount",
                style: "min-w-[140px] max-w-[200px] text-center"
            }               
                                          
            // {
            //     name: "Edit",
            //     value: "edit",
            //     style: "min-w-[100px] max-w-[200px] text-center"
            // },
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
            {
                label: "Accrual Year",
                // type: "select",
                // name: "currentYear",
                // option:YearList(2010),
                // props: {},
            }
            
          ],
    }
    const onSubmit = (data) => {
        console.log("jsjsjsjss", data)
        let value = data.reseter
        delete data.reseter
        dispatch(FinanceActions.getPOAccrualRevenue(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(FinanceActions.getPOAccrualRevenue())
    }, [])
    return <>
        <AdvancedTable
            // headerButton={<><Button onClick={(e) => {
            //     setmodalOpen(prev => !prev)
            //     setmodalHead("New PO Life Cycle ")
            //     setmodalBody(<POLifeCycleForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            // }}
            //     name={"Add New"}></Button></>}
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

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
    </>


};

export default AccrualRevenue;