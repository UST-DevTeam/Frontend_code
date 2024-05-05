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
import InvoiceBasedForm from '../InvoiceBased/InvoiceBasedForm';
import FileUploader from "../../../../components/FIleUploader";
import FinanceActions from '../../../../store/actions/finance-actions';
import AdminActions from '../../../../store/actions/admin-actions';

const InvoiceBased = () => {
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const [fileOpen, setFileOpen] = useState(false);
    let dispatch = useDispatch()
    // let roleList = useSelector((state) => {
    //     let interdata = state?.operationManagement?.USERS_LIST
    //     return interdata
    // })
    let dbConfigList = useSelector((state) => {
        let interdata = state?.financeData?.getPOInvoicedBased || []
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(AdminActions.getManageProjectGroup(true,`customer=${itm?.customer}`))
                    dispatch(AdminActions.getPOProjectType(true,`customer=${itm?.customer}`))
                    dispatch(AdminActions.getPOProjectID(true,`projectGroup=${itm?.projectGroup}`))
                    dispatch(FinanceActions.getPOInvoicedBased())
                    setmodalHead("PO Invoice Based")
                    setmodalBody(<>
                        <InvoiceBasedForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        
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
                                dispatch(CommonActions.deleteApiCaller(`${Urls.finance_poinvoice_based}/${itm.uniqueId}`, () => {
                                    dispatch(FinanceActions.getPOInvoicedBased())
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
        let interdata = state?.financeData?.getPOInvoicedBased || []
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
                style: "min-w-[160px] max-w-[160px] text-center sticky left-0 bg-white"
            },          
            {
                name: "Project Group",
                value: "projectGroupId",
                style: "min-w-[140px] max-w-[200px] text-center sticky left-[159px] bg-white"
            },            
            {
                name: "Project Type",
                value: "projectTypeName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Project Sub Type",
                value: "subProjectName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Project ID",
                value: "projectIdName",
                style: "min-w-[170px] max-w-[200px] text-center"
            },                        
            {
                name: "GBPA",
                value: "gbpa",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "PO Number",
                value: "poNumber",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "PO Start Date",
                value: "poStartDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "PO End Date",
                value: "poEndDate",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Validity(Days)",
                value: "povalidity",
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
                style: "min-w-[200px] max-w-[300px] text-center"
            },            
            {
                name: "Unit Rate(INR)",
                value: "unitRate(INR)",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Initial PO Qty",
                value: "initialPoQty",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Invoiced Quantity",
                value: "invoicedQty",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Open Quantity(Post Invoice)",
                value: "openQty",
                style: "min-w-[250px] max-w-[250px] text-center"
            },                    
            {
                name: "Open PO Value(INR)-Invoiced",
                value: "OpenPoValue",
                style: "min-w-[250px] max-w-[250px] text-center"
            },            
            {
                name: "Item Code Status",
                value: "itemCodeStatus",
                style: "min-w-[140px] max-w-[200px] text-center"
            }, 
            {
                name: "PO Status",
                value: "poStatus",
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
            {
                label: "select",
                // type: "select",
                // name: "rolename",
                // option: roleList,
                // props: {
                // }
            }
        ]
    }
    const onSubmit = (data) => {
        console.log("jsjsjsjss", data)
        let value = data.reseter
        delete data.reseter
        dispatch(FinanceActions.getPOInvoicedBased(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(FinanceActions.getPOInvoicedBased())
    }, [])

    const onTableViewSubmit = (data) => {
        data["fileType"] = "PoInvoice";
        dispatch(
          CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(FinanceActions.getPOInvoicedBased());
            setFileOpen(false);
            resetting("");
          })
        );
      };


    return <>
        <AdvancedTable
            headerButton={<><Button classes="w-auto mr-1" onClick={(e) => {
                setmodalOpen(prev => !prev)
                setmodalHead("New PO Invoice Based")
                setmodalBody(<InvoiceBasedForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add"}></Button>
                <Button
              name={"Upload File"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen((prev) => !prev);
              }}
            ></Button>
                
                </>}
            table={table}
            exportButton={["/export/poInvoice/" , "Export_PoInvoice.xlsx",]}
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
        <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
        tempbtn={   true} 
        tempbtnlink = {["/template/PoInvoice.xlsx","PoInvoice.xlsx"]}
      />

        <Modal size={"smsh"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
    </>


};

export default InvoiceBased;