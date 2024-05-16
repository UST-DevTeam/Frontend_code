import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import TrashButton from "../../../../components/TrashButton";
import ManageProjectForm from "../../../../pages/PMIS/Admin/ManageProject/ManageProjectForm";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import ToggleButton from "../../../../components/ToggleButton";
import { MdMessage } from "react-icons/md";
// import { BsFillChatTextFill } from "react-icons/bs";
import {
  getAccessType,
  objectToQueryString,
} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import ComponentActions from "../../../../store/actions/component-actions";

import { Urls } from "../../../../utils/url";
import { useNavigate, useParams } from "react-router-dom";
import OperationManagementActions from "../../../../store/actions/admin-actions";
import AdminActions from "../../../../store/actions/admin-actions";
import FileUploader from "../../../../components/FIleUploader";
import ConditionalButton from "../../../../components/ConditionalButton";
import ButtonWithTooltip from "../../../../components/ButtonWithTooltip";
import eventManagementActions from "../../../../store/actions/eventLogs-actions";
import EventLog from "../../../../components/EventLogs";
import CommonForm from "../../../../components/CommonForm";
import PopupMenu from "../../../../components/PopupMenu";

const ManageProject = () => {
  const { cname, ptname, projecttypeuniqueId, customeruniqueId } = useParams();

  console.log(
    projecttypeuniqueId,
    "projecttypeuniqueIdprojecttypeuniqueIdprojecttypeuniqueId"
  );

  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [fileOpen, setFileOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [bulkfileOpen, setbulkfileOpen] = useState(false);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  let projectTypeForm = [
    {
      label: "Select Project Type",
      name: "projectType",
      type: "BigmuitiSelect",
      value: "",
      option: [
        { id: "hiii", name: "hello" },
        { id: "hello", name: "hii" },
      ],
      props: {
        onChange: (e) => {
          console.log(e.target.value, "e.target.value");
        },
      },
      required: true,
      classes: "col-span-1",
    },
  ];

  let dbConfigList = useSelector((state) => {
    let interdata = state?.adminData?.getProject;
    return interdata?.map((itm) => {
      console.log(itm, "itmmmmmm");
      let updateditm = {
        ...itm,
        // "status": <CstmButton child=
        // {<ToggleButton onChange={(e) => {
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

        // status:"dsadsadsa",
        projectId: (
          <button>
            <p
              // onClick={() => handleFullName(item)}
              onClick={() => {
                dispatch(
                  ComponentActions.globalUrlStore(
                    itm.projectId,
                    `/projectManagement_2/${cname}/${ptname}/${itm.projectId}/${itm.uniqueId}`
                  )
                );
                dispatch(
                  ComponentActions.breadcrumb(
                    itm.projectId,
                    `/projectManagement_2/${cname}/${ptname}/${itm.projectId}/${itm.uniqueId}`,
                    1,
                    false
                  )
                );
                navigate(
                  `/projectManagement_2/${cname}/${ptname}/${itm.projectId}/${itm.uniqueId}`
                );
              }}
              className="text-[#143b64] font-bold hover:underline hover:text-[#00ac25] focus:outline-none hover:font-semibold"
            >
              {itm.projectId}
            </p>
          </button>
        ),
        eventLogs: <></>,
        edit: (
          <>
            <div className="flex justify-center gap-3">
              <p
                className="items-center cursor-pointer"
                onClick={() => {
                  setmodalFullOpen((prev) => !prev);
                  // dispatch(AdminActions.getProject())
                  setmodalHead("Event Logs");

                  dispatch(
                    eventManagementActions.getprojecteventList(
                      true,
                      itm?.uniqueId
                    )
                  );

                  // dispatch(AdminActions.getOneProjectTypeDyform(iewq.uniqueId));
                  // dispatch()
                  setmodalBody(
                    <EventLog type={"project"} unqeId={itm?.uniqueId} />
                  );
                  // setmodalBody(<ManageProjectSiteIdForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                }}
              >
                <MdMessage size={30} />
              </p>
              <CstmButton
                className={"p-2"}
                child={
                  <EditButton
                    name={""}
                    onClick={() => {
                      // alert(itm.uniqueId)
                      setmodalOpen(true);
                      // dispatch(AdminActions.getProject(`${itm.customeruniqueId}/${itm.uniqueId}`))
                      setmodalHead("Edit Project");
                      setmodalBody(
                        <>
                          <ManageProjectForm
                            isOpen={modalOpen}
                            customeruniqueId={customeruniqueId}
                            setIsOpen={setmodalOpen}
                            resetting={false}
                            formValue={itm}
                          />
                          {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                        </>
                      );

                      //setmodalOpen(false)
                    }}
                  ></EditButton>
                }
              />

              {itm.status == "Trash" ? (
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
                              classes="w-15 bg-green-500"
                              onClick={() => {
                                dispatch(
                                  CommonActions.deleteApiCaller(
                                    `${Urls.admin_project}/${itm.customeruniqueId}/${itm.uniqueId}`,
                                    () => {
                                      dispatch(
                                        AdminActions.getProject(
                                          `${customeruniqueId}`
                                        )
                                      );
                                      dispatch(ALERTS({ show: false }));
                                    }
                                  )
                                );
                              }}
                              name={"OK"}
                            />,
                            <Button
                              classes="w-24"
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
              ) : (
                ""
              )}
            </div>
          </>
        ),

        // trash: (
        //   <CstmButton
        //     className={""}
        //     child={
        //       <TrashButton
        //         name={""}
        //         onClick={() => {
        //           // alert(itm.uniqueId)
        //           setmodalOpen(true);
        //           // dispatch(AdminActions.getProject(`${itm.customeruniqueId}/${itm.uniqueId}`))
        //           setmodalHead("Edit Project");
        //           setmodalBody(
        //             <>
        //               <ManageProjectForm
        //                 isOpen={modalOpen}
        //                 customeruniqueId={customeruniqueId}
        //                 setIsOpen={setmodalOpen}
        //                 resetting={false}
        //                 formValue={itm}
        //               />
        //               {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
        //             </>
        //           );

        //           //setmodalOpen(false)
        //         }}
        //       ></TrashButton>
        //     }
        //   />
        // ),

        // delete: (
        //   <CstmButton
        //     child={
        //       <DeleteButton
        //         name={""}
        //         onClick={() => {
        //           let msgdata = {
        //             show: true,
        //             icon: "warning",
        //             buttons: [
        //               <Button
        //                 classes="w-15 bg-green-500"
        //                 onClick={() => {
        //                   dispatch(
        //                     CommonActions.deleteApiCaller(
        //                       `${Urls.admin_project}/${itm.customeruniqueId}/${itm.uniqueId}`,
        //                       () => {
        //                         dispatch(
        //                           AdminActions.getProject(`${customeruniqueId}`)
        //                         );
        //                         dispatch(ALERTS({ show: false }));
        //                       }
        //                     )
        //                   );
        //                 }}
        //                 name={"OK"}
        //               />,
        //               <Button
        //                 classes="w-24"
        //                 onClick={() => {
        //                   console.log("snnsnsnsns");
        //                   dispatch(ALERTS({ show: false }));
        //                 }}
        //                 name={"Cancel"}
        //               />,
        //             ],
        //             text: "Are you sure you want to Delete?",
        //           };
        //           dispatch(ALERTS(msgdata));
        //         }}
        //       ></DeleteButton>
        //     }
        //   />
        // ),
      };
      return updateditm;
    });
  });
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.adminData?.getProject;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
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
        name: "Project ID",
        value: "projectId",
        style: "min-w-[170px] max-w-[200px] text-center sticky left-0 bg-white",
      },
      {
        name: "Project Group",
        value: "projectGroupId",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project Type",
        value: "projectTypeName",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      // {
      //   name: "Sub Project",
      //   value: "subProjectName",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      {
        name: "Project Manager",
        value: "PMName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Circle",
        value: "circleName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Start Date",
        value: "startDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "End Date",
        value: "endDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Status",
        value: "status",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      // {
      //   name: "Event Logs",
      //   value: "eventLogs",
      //   style: "min-w-[100px] max-w-[200px] text-center",
      // },
      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      // {
      //   name: "Trash",
      //   value: "trash",
      //   style: "min-w-[100px] max-w-[200px] text-center",
      // },

      // {
      //   name: "Delete",
      //   value: "delete",
      //   style: "min-w-[100px] max-w-[200px] text-center",
      // },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Type",
        type: "select",
        name: "statusType",
        option: [
          { label: "Active", value: "Active" },
          { label: "Trash", value: "Trash" },
          { label: "Archive", value: "Archive" },
        ],
        props: {},
      },
      {
        label: "Select Project Type",
        name: "projectType",
        type: "BigmuitiSelect",
        value: "",
        option: [
          { id: "hiii", name: "hello" },
          { id: "hello", name: "hii" },
        ],
        props: {
          onChange: (e) => {
            console.log(e.target.value, "e.target.value");
          },
        },
        required: true,
        classes: "col-span-1",
      },
      
    ],
  };
  const onSubmit = (data) => {
    console.log(data, "datadatadatadatadatadata");

    delete data["reseter"];
    console.log(objectToQueryString(data), "datadatadatadatadatadata");

    dispatch(
      AdminActions.getProject(
        `${customeruniqueId}${
          projecttypeuniqueId ? "/" + projecttypeuniqueId : ""
        }`,
        "",
        true,
        objectToQueryString(data)
      )
    );
  };
  useEffect(() => {
    dispatch(
      AdminActions.getProject(
        `${customeruniqueId}${
          projecttypeuniqueId ? "/" + projecttypeuniqueId : ""
        }`
      )
    );
    dispatch(eventManagementActions.getprojecteventList());
    // dispatch(OperationManagementActions.getRoleList())
  }, []);

  const onTableViewSubmit = (data) => {
    console.log(data, "datadata");
    dispatch(
      CommonActions.fileSubmit(Urls.upload_update_siteId, data, () => {
        dispatch(AdminActions.getProject());
        setFileOpen(false);
        reset("");
      })
    );
  };


  const onBulkUploadSite = (data, cuid, puid) => {
    console.log(data, cuid, puid, "datadata");
    data["fileType"]="ManageSiteBulkUpload"
    let makeUrl = `${Urls.upload_bulk_site}${cuid ? "/" + cuid : ""}${
      puid ? "/" + puid : ""
    }`;
    dispatch(
      CommonActions.fileSubmit(makeUrl, data, () => {
        // dispatch(AdminActions.getProject());
        setFileOpen(false);
        reset("");
      })
    );
  };
  // useEffect(() => {
  //     if (customeruniqueId && projecttypeuniqueId) {
  //         dispatch(AdminActions.getProject(`${customeruniqueId}/${projecttypeuniqueId}`))
  //     } else if (customeruniqueId) {
  //         dispatch(AdminActions.getProject(`${customeruniqueId}`))
  //     }
  // }, [customeruniqueId, projecttypeuniqueId])

  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-1">
            <ConditionalButton
              showType={getAccessType("Add Project")}
              classes=""
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("Add Project");
                setmodalBody(
                  <ManageProjectForm
                    isOpen={modalOpen}
                    projecttypeuniqueId={projecttypeuniqueId}
                    customeruniqueId={customeruniqueId}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                  />
                );
              }}
              name={"Add Project"}
            ></ConditionalButton>

            {/* <ButtonWithTooltip text="hello" tooltipText="hiii" icon={<></>} className="" onClick={}/> */}

            {/* <ButtonWithTooltip
              tooltipText={"Bulk Site"}
              text={"Bulk Site"}
              className="w-24 bg-green-700"
              onClick={(e) => {
                // setFileOpen(prev=>!prev)
              }}
            ></ButtonWithTooltip> */}
            {/* <Button
              name={"Bulk Task"}
              classes="w-auto bg-indigo-600"
              onClick={(e) => {
                // setFileOpen(prev=>!prev)
              }}
            ></Button> */}
            {/* <Button
              name={"Update Site"}
              classes="w-auto bg-yellow-600"
              onClick={(e) => {
                setFileOpen((prev) => !prev);
              }}
            ></Button> */}
            <Button
              name={"Bulk Upload"}
              classes="w-auto bg-yellow-600"
              onClick={(e) => {
                setbulkfileOpen((prev) => !prev);
              }}
            ></Button>
            {/* <Button
              name={"Update Task"}
              classes="w-auto mr-1 bg-cyan-600"
              onClick={(e) => {
                setFileOpen((prev) => !prev);
              }}
            ></Button> */}


            <PopupMenu
              name={"Export"}
              icon={"Export"}
              classes="w-auto"
              child={
                
                <div classes="flex z-40 max-h-96 flex-col p-1">
                     <Button
                      name={"Export Project"}
                      classes="w-auto m-5"
                      onClick={() => {
                        dispatch(
                          CommonActions.commondownload(
                            "/export/Project/" + `${customeruniqueId}` + "/" + `${projecttypeuniqueId}`,
                            "Export_Project.xlsx"
                          )
                        );
                      }}
                      >
                      </Button>
                     <Button
                      name={"Export Site"}
                      classes="w-auto m-5"
                      onClick={() => {
                        dispatch(
                          CommonActions.commondownload(
                            "/export/siteWithOutTask/" +`${customeruniqueId}` +"/" +`${projecttypeuniqueId}`,
                            "Export_Project_with_Site.xlsx"
                          )
                        );
                      }}
                      >
                      </Button>
                     <Button
                      name={"Export Site with Task"}
                      classes="w-auto m-5"
                      onClick={() => {
                        dispatch(
                          CommonActions.commondownload(
                            "/export/siteWithAll/" +`${customeruniqueId}` +"/" +`${projecttypeuniqueId}`,
                            "Export_Project_with_Task.xlsx"
                          )
                        );
                      }}
                      >
                      </Button>
                </div>
                    
                  }
                />
            <PopupMenu
              name={"Upgrade"}
              icon={"Upgrade"}
              classes="w-auto"
              child={
                
                <div classes="flex z-40 max-h-96 flex-col p-1">
                     <Button
                      name={"Upgrade Site"}
                      classes="w-auto m-5"
                      onClick={() => {
                        // dispatch(
                        //   CommonActions.commondownload(
                        //     "/export/Project/" + `${customeruniqueId}` + "/" + `${projecttypeuniqueId}`,
                        //     "Export_Project.xlsx"
                        //   )
                        // );
                      }}
                      >
                      </Button>
                     <Button
                      name={"Upgrade Task"}
                      classes="w-auto m-5"
                      onClick={() => {
                        // dispatch(
                        //   CommonActions.commondownload(
                        //     "/export/siteWithOutTask/" +`${customeruniqueId}` +"/" +`${projecttypeuniqueId}`,
                        //     "Export_Project_with_Site.xlsx"
                        //   )
                        // );
                      }}
                      >
                      </Button>
                     {/* <Button
                      name={"Export Site with Task"}
                      classes="w-auto m-5"
                      onClick={() => {
                        dispatch(
                          CommonActions.commondownload(
                            "/export/siteWithAll/" +`${customeruniqueId}` +"/" +`${projecttypeuniqueId}`,
                            "Export_Project_with_Task.xlsx"
                          )
                        );
                      }}
                      >
                      </Button> */}
                </div>
                    
                  }
            />
            {/* <PopupMenu
              name={"Bulk Upload"}
              icon={"Bulk Upload"}
              classes="w-auto mr-1"
              child={
                
                <div classes="flex z-40 max-h-96 flex-col p-1">
                     <Button
                      name={"Bulk Upload Site"}
                      classes="w-auto m-5"
                      onClick={() => {
                        // dispatch(
                        //   CommonActions.commondownload(
                        //     "/export/Project/" + `${customeruniqueId}` + "/" + `${projecttypeuniqueId}`,
                        //     "Export_Project.xlsx"
                        //   )
                        // );
                      }}
                      >
                      </Button>
                     <Button
                      name={"Bulk Upload Task"}
                      classes="w-auto m-5"
                      onClick={() => {
                        // dispatch(
                        //   CommonActions.commondownload(
                        //     "/export/siteWithOutTask/" +`${customeruniqueId}` +"/" +`${projecttypeuniqueId}`,
                        //     "Export_Project_with_Site.xlsx"
                        //   )
                        // );
                      }}
                      >
                      </Button>
                </div>
                    
                  }
            /> */}


          </div>
        }
        table={table}
        // exportButton={[
        //   "/export/Project/" +
        //     `${customeruniqueId}` +
        //     "/" +
        //     `${projecttypeuniqueId}`,
        //   "Export_Project.xlsx",
        // ]}
        // exportSiteButton={[
        //   "/export/siteWithOutTask/" +
        //     `${customeruniqueId}` +
        //     "/" +
        //     `${projecttypeuniqueId}`,
        //   "Export_Project.xlsx",
        // ]}
        // exportSiteWithTask={[
        //   "/export/siteWithAll/" +
        //     `${customeruniqueId}` +
        //     "/" +
        //     `${projecttypeuniqueId}`,
        //   "Export_Project.xlsx",
        // ]}
        // UploadSites={[]}
        // UploadTask={[]}
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

      <Modal
        size={"lg"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <Modal
        size={"full"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />
      {/* <CommonForm/> */}
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
      />
       <FileUploader
        isOpen={bulkfileOpen}
        fileUploadUrl={""}
        tempbtn={true}
        tempbtnlink={[
          `/ProjectIDBulkUploadTemplate${
            customeruniqueId ? "/" + customeruniqueId : ""
          }${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`,
          "BulkSite.xlsx",
        ]}
        onTableViewSubmit={(data) => {
          onBulkUploadSite(data, customeruniqueId,projecttypeuniqueId );
          setbulkfileOpen(false)
          resetting("")
        }}
        setIsOpen={setbulkfileOpen}
      />
    </>
  );
};

export default ManageProject;
