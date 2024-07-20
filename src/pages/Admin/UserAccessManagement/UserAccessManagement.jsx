import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../../components/AdvancedTable";
// import UserManagementForm from './UserManagementForm';
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import CstmButton from "../../../components/CstmButton";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";
import ToggleButton from "../../../components/ToggleButton";
import AdminManagementActions from "../../../store/actions/adminManagement-actions";
import { objectToQueryString } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import { Urls } from "../../../utils/url";
import CustomQueryActions from "../../../store/actions/customQuery-actions";
import { Sidebar_content } from "../../../utils/sidebar_values";
import UserAccessManagementChild from "./UserAccessManagementChild";
import AdminActions from "../../../store/actions/admin-actions";
const UserAccessManagement = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [showData, setshowData] = useState("");
  let dispatch = useDispatch();
  let roleList = useSelector((state) => {
    console.log(state, "state state");
    let interdata = state?.adminManagement?.roleList;
    return interdata;
  });

  let dbConfigList = useSelector((state) => {
    console.log(state, "state statejjjj");
    let interdata = state?.adminManagement?.usersList;
    return interdata.map((itm) => {
      let updateditm = {
        ...itm,
        status: (
          <CstmButton
            child={
              <ToggleButton
                onChange={(e) => {
                  console.log(e.target.checked, "e.target.checked");
                  let data = {
                    enabled: e.target.checked ? 1 : 0,
                  };
                  dispatch(
                    AlertConfigurationActions.patchAlertConfig(
                      true,
                      data,
                      () => {
                        // alert(e.target.checked)
                        e.target.checked = e.target.checked;
                      },
                      itm.id
                    )
                  );
                  // if(itm.enabled==0){
                  //     itm.enabled=1
                  // }else{
                  //     itm.enabled=0
                  // }
                  // itm.enabled=itm.enabled==0?1:0
                  console.log(itm.enabled, "itm.enabled");
                }}
                defaultChecked={itm.enabled == 1 ? true : false}
              ></ToggleButton>
            }
          />
        ),
        edit: (
          <CstmButton
            child={
              <EditButton
                name={""}
                onClick={() => {
                  console.log(itm, "itm,dsadsadadada");
                  setmodalOpen(true);
                  dispatch(AdminManagementActions.getUsersList());
                  setmodalHead("Edit User");
                  setmodalBody(
                    <>
                      <UserManagementForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                      />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></EditButton>
            }
          />
        ),
        // "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
        //     let msgdata = {
        //         show: true,
        //         icon: 'warning',
        //         buttons: [
        //             <Button classes='w-15 bg-rose-400' onClick={() => {
        //                 dispatch(CommonActions.deleteApiCaller(`${Urls.alertConfiguration_configureAlert}/${itm.uniqueId}`, () => {
        //                     dispatch(CustomQueryActions.getDBConfig())
        //                     dispatch(ALERTS({ show: false }))
        //                 }))
        //             }} name={"OK"} />,
        //             <Button  onClick={() => {
        //                 dispatch(ALERTS({ show: false }))
        //             }} name={"Cancel"} />
        //         ],
        //         text: "Are you sure you want to Delete?"
        //     }
        //     dispatch(ALERTS(msgdata))
        // }}></DeleteButton>} />
        delete: (
          <CstmButton
            child={
              <DeleteButton
                name={""}
                onClick={() => {
                  let msgdata = {
                    show: true,
                    icon: "warning",
                    buttons: [
                      <Button
                        classes='w-15 bg-rose-400'
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.admin_userList}/${itm.id}`,
                              () => {
                                dispatch(CustomQueryActions.getUserList());
                                dispatch(ALERTS({ show: false }));
                              }
                            )
                          );
                        }}
                        name={"OK"}
                      />,
                      <Button
                        classes="w-auto"
                        onClick={() => {
                          console.log("snnsnsnsns");
                          dispatch(ALERTS({ show: false }));
                        }}
                        name={"Cancel"}
                      />,
                    ],
                    text: "Are you sure you want to Delete?",
                  };
                  dispatch(ALERTS(msgdata));
                }}
              ></DeleteButton>
            }
          />
        ),
      };
      return updateditm;
    });
  });

  console.log(Sidebar_content["all_routes"], 'Sidebar_content["all_routes"]');
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.adminManagement?.usersList;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  let getComponentAllocation = useSelector((state) => {
    return state?.adminData?.getComponentAllocation;
  });

  

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
  } = useForm();

  let table = {
    columns: [
      {
        name: "First Name",
        value: "firstName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Surname",
        value: "surname",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Email",
        value: "email",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Status",
        value: "profileStatus",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Active/Blocked",
        value: "status",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Role",
        value: "rolename",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      {
        name: "Delete",
        value: "delete",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
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
    ],
  };
  const onSubmit = (data) => {
    console.log("jsjsjsjss", data);
    let value = data.reseter;
    delete data.reseter;
    dispatch(
      AdminManagementActions.getUsersList(value, objectToQueryString(data))
    );
  };

  
  useEffect(() => {
    // dispatch(AdminManagementActions.getUsersList());
    dispatch(AdminManagementActions.getRoleList());
    dispatch(AdminActions.getOldComponentAllocationList());
    dispatch(AdminActions.getComponentAllocationList());
  }, []);
  return (
    <>
      <div className=" w-[68vw] flex mx-1">
        <div className="pt-2 px-2">
          <table className="relative" border={2}>
            <tr className="sticky top-0 z-[10]">
              <th className="min-w-[300px] max-w-[300px] border-black border-[1.5px]  bg-primaryLine text-white  sticky left-0">
                Module Name
                {/* {showData} */}
              </th>
              {roleList.map((itm) => {
                return (
                  <th className="min-w-[200px] max-w-[230px] border-black border-[1.5px] bg-primaryLine text-white whitespace-nowrap">
                    {itm.label}
                  </th>
                );
              })}
            </tr>

            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                name={"name"}
                fromCall={"permission"}
                child={"checkbox"}
                btnName={"Module Access"}
                listValue={Sidebar_content["all_routes"]}
              />
            }

            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                fromCall={"pmpermission"}
                name={"componentType"}
                child={"select"}
                btnName={"Project Management Access"}
                listValue={getComponentAllocation.filter(prev=>prev.parent=="ProjectManagement")}
              />
            }

            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                fromCall={"pmpermission"}
                name={"componentType"}
                child={"select"}
                btnName={"Human Resource"}
                listValue={getComponentAllocation.filter(prev=>prev.parent=="HRView")}
              />
            }

            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                fromCall={"pmpermission"}
                name={"componentType"}
                child={"select"}
                btnName={"Partner Mangment"}
                listValue={getComponentAllocation.filter(prev=>prev.parent=="PartnerView")}
              />
            }
            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                fromCall={"pmpermission"}
                name={"componentType"}
                child={"select"}
                btnName={"Financial"}
                listValue={getComponentAllocation.filter(prev=>prev.parent=="FinancialView")}
              />
            }
            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                fromCall={"pmpermission"}
                name={"componentType"}
                child={"select"}
                btnName={"Forms"}
                listValue={getComponentAllocation.filter(prev=>prev.parent=="FormsView")}
              />
            }
          </table>
        </div>
      </div>
      {/* <AdvancedTable 
            headerButton={<><Button onClick={(e) => {
                setmodalOpen(prev => !prev)
                dispatch(AdminManagementActions.getUsersList())
                setmodalHead("New User")
                setmodalBody(<UserManagementForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
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
         /> */}

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      {/* <CommonForm/> */}
    </>
  );
};

export default UserAccessManagement;
