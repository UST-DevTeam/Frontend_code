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
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import OperationManagementActions from '../../../../store/actions/admin-actions';
import AdminActions from '../../../../store/actions/admin-actions';
import FileUploader from '../../../../components/FIleUploader';
import ExpenseAdvanceActions from '../../../../store/actions/expenseAdvance-actions';
import FillExpenseForm from '../../../../pages/PMIS/MyHome/ClaimAdvExpenseForm/FillExpenseForm'

const FillExpense = () => {

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
        let interdata = state?.expenseAdvanceData?.getFillExpense || [""]
        return interdata?.map((itm) => {
            let categoriesArray = itm.categories ? itm.categories.split(',') : [];
            let updateditm = {
                ...itm,

                categories: categoriesArray.join(','),

                attachment: (
                  <div className="flex justify-center items-center">
                    <img
                      src={backendassetUrl + itm?.attachment}
                      className="w-24 h-14 content-center flex object-contain"
                    />
                  </div>
                ),
                            
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(ExpenseAdvanceActions.getFillExpense())
                    setmodalHead("Edit Claim Type")
                    setmodalBody(<>
                        <FillExpenseForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    //setmodalOpen(false)
                }}></EditButton>} />,

                "addRow": <CstmButton className={"p-2"} child={  <Button classes='w-1/2 h-5 bg-green-500' />} />,

                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-green-500' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.expAdv_fill_expense}/${itm.uniqueId}`, () => {
                                    dispatch(ExpenseAdvanceActions.getFillExpense())
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
        let interdata = state?.expenseAdvanceData?.getFillExpense || []
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
            name: "Expense No.",
            value: "ExpenseNo",
            style: "min-w-[200px] max-w-[200px] text-center sticky left-0 bg-white",
          },
          {
            name: "ClaimType",
            value: "ClaimType",
            style: "min-w-[200px] max-w-[200px] text-center sticky left-0 bg-white",
          },
          {
            name: "Category",
            value: "categories",
            style: "min-w-[150px] max-w-[450px] text-center sticky left-0 bg-white",
          },
          {
            name: "Claim Date",
            value: "Claim_Date",
            style: "min-w-[250px] max-w-[450px] text-center",
          },
          {
            name: "Cost Center",
            value: "costcenter",
            style: "min-w-[250px] max-w-[450px] text-center",
          },
          {
            name: "Project ID",
            value: "projectId",
            style: "min-w-[120px] max-w-[450px] text-center",
          },
          {
            name: "Site Id",
            value: "Site_Id",
            style: "min-w-[250px] max-w-[450px] text-center",
          },
          {
            name: "Task Name",
            value: "Task",
            style: "min-w-[120px] max-w-[450px] text-center",
          },
          {
            name: "Bill Number",
            value: "billNumber",
            style: "min-w-[120px] max-w-[450px] text-center",
          },
          {
            name: "Amount",
            value: "Amount",
            style: "min-w-[120px] max-w-[450px] text-center",
          },
          {
            name: "Start Km",
            value: "startKm",
            style: "min-w-[100px] max-w-[450px] text-center",
          },
          {
            name: "end Km",
            value: "endKm",
            style: "min-w-[100px] max-w-[450px] text-center",
          },
          // {
          //   name: "Mode Of Start Location",
          //   value: "modeOfStartLocation",
          //   style: "min-w-[100px] max-w-[450px] text-center",
          // },
          // {
          //   name: "Mode Of End Location",
          //   value: "modeOfEndLocation",
          //   style: "min-w-[100px] max-w-[450px] text-center",
          // },
          {
            name: "Attachment",
            value: "attachment",
            style: "min-w-[100px] max-w-[450px] text-center",
          },
          {
            name: "Status",
            value: "status",
            style: "min-w-[100px] max-w-[450px] text-center",
          },
          {
            name: "Add Row",
            value: "addRow",
            style: "min-w-[100px] max-w-[100px] text-center"
          },
          {
            name: "Edit",
            value: "edit",
            style: "min-w-[100px] max-w-[100px] text-center",
          },
          {
            name: "Delete",
            value: "delete",
            style: "min-w-[100px] max-w-[100px] text-center",
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
        dispatch(ExpenseAdvanceActions.getFillExpense(value, objectToQueryString(data)))
    }

    useEffect(() => { 
        dispatch(ExpenseAdvanceActions.getFillExpense())
    }, [])

    const onTableViewSubmit = (data) => { 
        data["fileType"]="ManageClaimType"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(ExpenseAdvanceActions.getFillExpense())
            setFileOpen(false)
        }))
    }
    return <>
        <AdvancedTable
            headerButton={<div className='flex gap-1'><Button classes='w-auto' onClick={(e) => {
                setmodalOpen(prev => !prev)
                setmodalHead("Add Expense")
                setmodalBody(<FillExpenseForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add Expense"}></Button>
                {/* <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button> */}
                </div>}
            table={table}
            // templateButton={["/template/Circle.xlsx","Circle.xlsx"]}
            // exportButton={["/export/manageCircle","Export_Circle("+dt+").xlsx"]}
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
        <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/Circle.xlsx","Circle.xlsx"]}/>
    </>


};

export default FillExpense;