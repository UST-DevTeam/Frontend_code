import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import CCDash from '../../../components/CCDash';
import { useNavigate } from 'react-router-dom';
// import EditButton from '../../../../components/EditButton';
// import ManageCustomerForm from '../../../PMIS/Admin/ManageCustomer/ManageCustomerForm'
// import AdvancedTable from '../../../../components/AdvancedTable';
// import Modal from '../../../../components/Modal';
// import Button from '../../../../components/Button';
// import DeleteButton from '../../../../components/DeleteButton';
// import CstmButton from '../../../../components/CstmButton';
// import ToggleButton from '../../../../components/ToggleButton';
// import { objectToQueryString } from '../../../../utils/commonFunnction';
// import { ALERTS } from '../../../../store/reducers/component-reducer';
// import CommonActions from '../../../../store/actions/common-actions';
// import { Urls, backendassetUrl, baseUrl } from '../../../../utils/url';
// import OperationManagementActions from '../../../../store/actions/admin-actions';
// import AdminActions from '../../../../store/actions/admin-actions';
// import { useNavigate, useParams } from 'react-router-dom';
// import CCDash from '../../../../components/CCDash';




const SuperAdmin = () => {


    // const [modalOpen, setmodalOpen] = useState(false)
    // const [modalBody, setmodalBody] = useState(<></>)
    const [type, settype] = useState(false)
    // const [modalHead, setmodalHead] = useState(<></>)


    // let dispatch = useDispatch()

    let navigate = useNavigate()







    // let dbConfigList = useSelector((state) => {
    //     console.log(state, "state statejjjj")
    //     let interdata = state?.adminData?.getManageCustomer
    //     return interdata?.map((itm) => {
    //         let updateditm = {
    //             ...itm,

    //             imgshow: <img src={backendassetUrl + itm?.companyimg} />,
    //             // "status": <CstmButton child={<ToggleButton onChange={(e) => {
    //             //     console.log(e.target.checked, "e.target.checked")
    //             //     let data = {
    //             //         "enabled": e.target.checked ? 1 : 0
    //             //     }
    //             //     dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
    //             //         // alert(e.target.checked)
    //             //         e.target.checked = e.target.checked
    //             //     }, itm.id))
    //             //     // if(itm.enabled==0){
    //             //     //     itm.enabled=1
    //             //     // }else{
    //             //     //     itm.enabled=0
    //             //     // }
    //             //     // itm.enabled=itm.enabled==0?1:0
    //             //     console.log(itm.enabled, "itm.enabled")
    //             // }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,
    //             "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
    //                 setmodalOpen(true)
    //                 dispatch(AdminActions.getManageCustomer())
    //                 setmodalHead("Edit Customer Details")
    //                 setmodalBody(<>
    //                     <ManageCustomerForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
    //                     {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
    //                 </>)
    //             }}></EditButton>} />,

    //             "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
    //                 let msgdata = {
    //                     show: true,
    //                     icon: 'warning',
    //                     buttons: [
    //                         <Button classes='w-15 bg-green-500' onClick={() => {
    //                             dispatch(CommonActions.deleteApiCaller(`${Urls.admin_customer}/${itm.uniqueId}`, () => {
    //                                 dispatch(AdminActions.getManageCustomer())
    //                                 dispatch(ALERTS({ show: false }))
    //                             }))
    //                         }} name={"OK"} />,
    //                         <Button classes='w-24' onClick={() => {
    //                             dispatch(ALERTS({ show: false }))
    //                         }} name={"Cancel"} />
    //                     ],
    //                     text: "Are you sure you want to Delete?"
    //                 }
    //                 dispatch(ALERTS(msgdata))
    //             }}></DeleteButton>} />,


    //             "view": <CstmButton className={"p-5"} child={<Button name={""} onClick={() => {
    //                 setmodalOpen(true)
    //                 setmodalHead("Show PDF")
    //                 setmodalBody(<>

    //                     {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
    //                 </>)
    //             }}></Button>} />,




    //         }
    //         return updateditm
    //     });
    // })
    // let dbConfigTotalCount = useSelector((state) => {
    //     let interdata = state?.adminData?.getManageCustomer
    //     if (interdata.length > 0) {
    //         return interdata[0]["overall_table_count"]
    //     } else {
    //         return 0
    //     }
    // })
    // // let Form = [
    // //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
    // //     { label: "Custom Queries", value: "", type: "textarea" }
    // // ]
    // const { register, handleSubmit, watch, setValue, setValues, getValues, formState: { errors } } = useForm()

    // let table = {
    //     columns: [
    //         {
    //             name: "Logo",
    //             value: "imgshow",
    //             style: "min-w-[140px] max-w-[200px] text-center sticky left-0 bg-white"
    //         },
    //         {
    //             name: "Customer Name",
    //             value: "customerName",
    //             style: "min-w-[250px] max-w-[450px] text-center sticky left-0 bg-white"
    //         },
    //         {
    //             name: "Short Name",
    //             value: "shortName",
    //             style: "min-w-[140px] max-w-[200px] text-center"
    //         },
    //         {
    //             name: "Contact Person name",
    //             value: "personName",
    //             style: "min-w-[250px] max-w-[450px] text-center"
    //         },
    //         {
    //             name: "Email ID",
    //             value: "email",
    //             style: "min-w-[250px] max-w-[450px] text-center"
    //         },
    //         {
    //             name: "Mobile No.",
    //             value: "mobile",
    //             style: "min-w-[250px] max-w-[450px] text-center"
    //         },
    //         {
    //             name: "Address",
    //             value: "address",
    //             style: "min-w-[250px] max-w-[450px] text-center"
    //         },
    //         {
    //             name: "Status",
    //             value: "status",
    //             style: "min-w-[250px] max-w-[450px] text-center"
    //         },
    //         {
    //             name: "Edit",
    //             value: "edit",
    //             style: "min-w-[100px] max-w-[100px] text-center"
    //         },
    //         {
    //             name: "Delete",
    //             value: "delete",
    //             style: "min-w-[100px] max-w-[100px] text-center"
    //         },
    //         {
    //             name: "View",
    //             value: "view",
    //             style: "min-w-[100px] max-w-[100px] text-center"
    //         }
    //     ],
    //     properties: {
    //         rpp: [10, 20, 50, 100]
    //     },
    //     filter: [
    //         // {
    //         //     label: "Role",
    //         //     type: "select",
    //         //     name: "rolename",
    //         //     option: roleList,
    //         //     props: {
    //         //     }
    //         // }
    //     ]
    // }
    // const onSubmit = (data) => {
    //     let value = data.reseter
    //     delete data.reseter
    //     dispatch(AdminActions.getManageCustomer(value, objectToQueryString(data)))
    // }
    // useEffect(() => {
    //     dispatch(AdminActions.getManageCustomer())
    // }, [])
    // return type ?
    //     <>

    //         <div className='flex p-2'>
    //             <Button classes='w-auto' onClick={() => {
    //                 settype(false)
    //             }} name={"View"} />
    //         </div>
    //         <AdvancedTable
    //             headerButton={<><Button onClick={(e) => {
    //                 setmodalOpen(prev => !prev)
    //                 // dispatch(OperationManagementActions.getOperationUserList())
    //                 setmodalHead("Add Customer")
    //                 setmodalBody(<ManageCustomerForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
    //             }}
    //                 name={"Add New"}></Button></>}
    //             table={table}
    //             filterAfter={onSubmit}
    //             tableName={"UserListTable"}
    //             handleSubmit={handleSubmit}
    //             data={dbConfigList}
    //             errors={errors}
    //             register={register}
    //             setValue={setValue}
    //             getValues={getValues}
    //             totalCount={dbConfigTotalCount}
    //         />

    //         <Modal size={"lg"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

    //         {/* <CommonForm/> */}
    //     </>
    //     : <>
    //         {/* <CCDash approveddata={
    //             dbConfigList?.map((itm => {
    //                 return <>
    //                     <div
    //                         className='bg-pink-100 shadow-md hover:shadow-rxl w-full flex h-24 cursor-pointer'
    //                         onClick={() => {
    //                             navigate(`${"/projectType"}/${itm["uniqueId"]}`)
    //                         }}>
    //                         {itm["companyimg"] && itm["companyimg"] != "" && <><img className='m-auto w-24' src={backendassetUrl + itm["companyimg"]} /></>}
    //                         <div className='m-auto '>{itm["customerName"]}</div>
    //                     </div>
    //                 </>
    //             }))
    //         } settype={settype} nextNavigate={"/projectType"} name={"customerName"} img={"companyimg"} data={dbConfigList} url="/list/manageCustomer" label='Add / Modify Customer' /> */}


    // <CCDash approveddata={[]}
    //     // dbConfigList?.map((itm => {
    //     //     return <>
    //     //         <div
    //     //             className='bg-pink-100 shadow-md hover:shadow-rxl w-full flex h-24 cursor-pointer'
    //     //             onClick={() => {
    //     //                 navigate(`${"/projectType"}/${itm["uniqueId"]}`)
    //     //             }}>
    //     //             {itm["companyimg"] && itm["companyimg"] != "" && <><img className='m-auto w-24' src={backendassetUrl + itm["companyimg"]} /></>}
    //     //             <div className='m-auto '>{itm["customerName"]}</div>
    //     //         </div>
    //     //     </>
    //     // }))
    //  settype={settype} label='Add / Modify Customer' />
    // </>\
    
    // ["User Permission Management","bg-gradient-to-r from-teal-100 to-sky-400",""],

    return <>
        <CCDash showbtn={false} approveddata={[
                ["Manage Circle","bg-gradient-to-r from-teal-400 to-sky-500","/manageCircle"],
                ["Manage Zone","bg-gradient-to-r from-lime-300 to-teal-400","/manageZone"],
                ["Manage Cost Center","bg-gradient-to-r from-violet-500 to-purple-500","/manageCostCenter"],
                ["Manage Project Group","bg-gradient-to-r from-teal-200 to-sky-800","/projectGroup"],
                ["User Access Management","bg-gradient-to-r from-teal-100 to-sky-400","/uammg"],
                ["User Project Allocation","bg-gradient-to-r from-teal-400 to-yellow-200","/userProjectAllocation"],
                ["Vendor Project Allocation","bg-gradient-to-r from-violet-200 to-blue-600","/vendorProjectAllocation"],
                ["Manage Department","bg-gradient-to-r from-pink-500 to-rose-500","/manageDepartment"],
                ["Manage Designation","bg-gradient-to-r from-emerald-400 to-cyan-400","/manageDesignation"],
                ["Manage Profiles","bg-gradient-to-r from-amber-200 to-yellow-500","/manageProfile"],
                ["Completion Criteria","bg-gradient-to-r from-lime-400 to-rose-400","/completionCriteria"]
            ].map((itm => {
            return <>
                <div className={`${itm[1]} shadow-md hover:shadow-rxl w-full flex h-24 cursor-pointer`} onClick={()=>{navigate(itm[2])}}>
                    {itm["companyimg"] && itm["companyimg"] != "" && <><img className='m-auto w-24' src={backendassetUrl + itm["companyimg"]} /></>}
                    <div className='m-auto bg-gradient-to-r from-stone-800 to-stone-900 bg-clip-text text-transparent text-center'>{itm[0]}</div>
                </div>
            </>
        }))}
            settype={settype} label='Add / Modify Customer' />
    </>
}


export default SuperAdmin;