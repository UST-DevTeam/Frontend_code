import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";
import ProjectChart from "../Dashboard1/ProjectChart";
import ClaimAndAdvanceChart from "../Dashboard1/ClaimAndAdvanceChart";
import VendorActiveInactive from "../VendorGraph/VendorActiveInactive";
import ActivityLogs from "./ActivityLogs/ActivityLogs";
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
// import { Urls, backendassetUrl, baseUrl } from '../../../../utils/url';
// import OperationManagementActions from '../../../../store/actions/admin-actions';
// import AdminActions from '../../../../store/actions/admin-actions';
// import { useNavigate, useParams } from 'react-router-dom';
// import CCDash from '../../../../components/CCDash';

const SuperAdmin = () => {
  // const [modalOpen, setmodalOpen] = useState(false)
  // const [modalBody, setmodalBody] = useState(<></>)
  const [type, settype] = useState(false);
  // const [modalHead, setmodalHead] = useState(<></>)

  let dispatch = useDispatch()

  let navigate = useNavigate();

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
  //                         <Button classes='w-15 bg-rose-400' onClick={() => {
  //                             dispatch(CommonActions.deleteApiCaller(`${Urls.admin_customer}/${itm.uniqueId}`, () => {
  //                                 dispatch(AdminActions.getManageCustomer())
  //                                 dispatch(ALERTS({ show: false }))
  //                             }))
  //                         }} name={"OK"} />,
  //                         <Button classes='w-auto' onClick={() => {
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
  //                         className='bg-pink-100 shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  '
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
  //     //             className='bg-pink-100 shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  '
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

  return (
    <>
    <div className="absolute w-full top-12 mt-12 h-16 sm:h-16 md:h-32 xl:h-48 z-10 bg-[#3e454d] overflow-auto">
      <CCDash
        showbtn={false}
        approveddata={[
          [
            "Manage Circle",
            "bg-pcol",
            "/hr/superAdmin/manageCircle",
            <Unicons.UilCheckCircle size="36" color="" />,
            "border-b-[#fdf0d5]",
          ],
          [
            "Manage Zone",
            "bg-pcol",
            "/hr/superAdmin/manageZone",
            <Unicons.UilMap size="32" color="" />,
            "border-b-[#fdf0d5]",
          ],
          [
            "Manage Cost Center",
            "bg-pcol",
            "/hr/superAdmin/manageCostCenter",
            <Unicons.UilHunting size="32" color="" />,
            "border-b-[#e2eafc]",
          ],
          [
            "Manage Project Group",
            "bg-pcol",
            "/hr/superAdmin/projectGroup",
            <Unicons.UilPlus size="32" color="" />,
            "border-b-[#e2eafc]",
          ],
          [
            "User Access Management",
            "bg-pcol",
            "/hr/superAdmin/UserAccessManagement",
            <Unicons.UilUserCheck size="32" color="" />,
            "border-b-[#d8e2dc]",
          ],
          [
            "User Project Allocation",
            "bg-pcol",
            "/hr/superAdmin/userProjectAllocation",
            <Unicons.UilBookmark size="32" color="" />,
            "border-b-[#d8e2dc]",
          ],
          [
            "Partner Project Allocation",
            "bg-pcol",
            "/hr/superAdmin/partnerProjectAllocation",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          [
            "Manage Department",
            "bg-pcol",
            "/hr/superAdmin/manageDepartment",
            <Unicons.UilPanelAdd size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          [
            "Manage Grade",
            "bg-[#0e8670]",
            "/hr/superAdmin/Grade",
            <Unicons.UilBookReader size="32" color="" />,           
            "border-b-[#bfd7ea]",
          ],
          [
            "Manage Profiles",
            "bg-pcol",
            "/hr/superAdmin/manageProfile",
            <Unicons.UilUserCircle size="32" color="" />,
            "border-b-[#bfd7ea]",
          ],
          [
            "Completion Criteria",
            "bg-pcol",
            "/hr/superAdmin/completionCriteria",
            <Unicons.UilAnalytics size="32" color="" />,
          ],
          [
            "Claim Type",
            "bg-pcol",
            "/hr/superAdmin/claimType",
            <Unicons.UilPuzzlePiece size="32" color="" />,
          ],
          [
            "Master Unit Rate",
            "bg-pcol",
            "/hr/superAdmin/MasterUnitRate",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          [
            "Activity Logs",
            "bg-pcol",
            "/hr/superAdmin/ActivityLogs",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          [
            "Compliance",
            "bg-pcol",
            "/hr/superAdmin/compliance",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          [
            "Compliance L1 Approver",
            "bg-pcol",
            "/hr/superAdmin/complianceL1Approver",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          [
            "Compliance L2 Approver",
            "bg-pcol",
            "/hr/superAdmin/complianceL2Approver",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
        ].map((itm) => {
          return (
            <>
              <div
                  className={`${itm[1]} bg-pcol text-white text-[14px] md:text-[11px] xl:text-[14px] text-center shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                // className={`${itm[1]} shadow-md hover:shadow-2xl w-[96%] h-16 flex cursor-pointer rounded-lg hover:scale-[106%] transition-all duration-500 font-oxygen font-bold hover:text-lg border-[1px] border-b-[7px] ${itm[4]} relative`}
                onClick={() => {
                  dispatch(
                    ComponentActions.globalUrlStore(
                      itm[0],
                      itm[2]
                    )
                  );
                  dispatch(ComponentActions.breadcrumb(itm[0], itm[2], 2, false));
                  navigate(itm[2]);
                }}
              >
                {itm["companyimg"] && itm["companyimg"] != "" && (
                  <>
                    <img
                      className="m-auto w-24"
                      src={backendassetUrl + itm["companyimg"]}
                    />
                  </>
                )}
                  <div className="m-auto">
                    {itm[0]}
                  </div>
                {/* <div className="flex items-center justify-between w-full p-1">
                    <div className="flex flex-col items-start">
                      <div className="text-xl font-bold text-[#dd2d4a]">0</div>
                      <div className="shining-text bg-black text-[12px] whitespace-nowrap font-extrabold bg-clip-text text-transparent ">
                        {itm[0]}
                      </div>
                    </div>
                    <div className="rotating-icon">{itm[3]}</div>
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-stone-800 to-stone-900 opacity-30 pointer-events-none" /> */}
                </div>
            </>
          );
        })}
        settype={settype}
        label="Add / Modify Customer"
      />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 m-2 mt-20 sm:mt-20 md:mt-36 xl:mt-48 gap-2">
{/* 
      <ProjectChart />
      <VendorActiveInactive /> */}

      </div>
    </>
  );
};

export default SuperAdmin;
