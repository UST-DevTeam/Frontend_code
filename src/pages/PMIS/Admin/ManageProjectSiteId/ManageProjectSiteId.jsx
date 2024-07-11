import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import ManageProjectGroupForm from "../ManageProjectGroup/ManageProjectGroupForm";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import ToggleButton from "../../../../components/ToggleButton";
import { MdMessage } from "react-icons/md";
import PopupMenu from "../../../../components/PopupMenu";
import {
  getAccessType,
  objectToQueryString,
  parseTwoDigit,
} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls } from "../../../../utils/url";
import OperationManagementActions from "../../../../store/actions/admin-actions";
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import ManageProjectSiteIdForm from "./ManageProjectSiteIdForm";
import projectListActions from "../../../../store/actions/projectList-actions";
import AdvancedTableExpandable from "../../../../components/AdvancedTableExpandable";
import AllocateProjectForm from "./AllocateProjectForm";
import AllocateProjectDateForm from "./AllocateProjectDateForm";
import SearchBarView from "../../../../components/SearchBarView";
import ManageSite from "../ManageSite/ManageSite";
import EditingManageSite from "../ManageSite/EditingManageSite";
import ManageMilestoneSite from "../ManageSite/ManageMilestoneSite";
import ProgressBar from "../../../../components/ProgressBar";
import { onehundcolor } from "../../../../utils/queryBuilder";
import Tooltip from "../../../../components/Tooltip";
import ConditionalButton from "../../../../components/ConditionalButton";
import NewLookBadge from "../../../../components/Badge";
import eventManagementActions from "../../../../store/actions/eventLogs-actions";
import EventLog from "../../../../components/EventLogs";
import { GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM } from "../../../../store/reducers/admin-reducer";
import FilterActions from "../../../../store/actions/filter-actions";

const ManageProjectSiteId = () => {
  let permission = JSON.parse(localStorage.getItem("permission")) || {};
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;
  // console.log(permission?.pmpermission,"permission")
  // console.log(permission?.pmpermission.findIndex(prev=>prev.moduleName=="Add Site")!=-1&&permission?.pmpermission[permission?.pmpermission.findIndex(prev=>prev.moduleName=="Add Site")],"permission")

  // console.log(getAccessType("Add Site"), "getAccessType");
  const { projectuniqueId } = useParams();

  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [modalFullBody, setmodalFullBody] = useState(<></>);
  const [strValFil, setstrVal] = useState(false);

  const [globalData, setGlobalData] = useState({});
  const [SiteId, setSiteId] = useState("Add");
  const [parentsite, setparentsite] = useState([]);
  const [childsite, setchildsite] = useState([]);
  const [modalBody, setmodalBody] = useState(<></>);
  const [getmultiSelect, setmultiSelect] = useState([]);






  const [modalHead, setmodalHead] = useState(<></>);

  const [old, setOld] = useState(<></>);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    SubmitTask,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();
  const dataGetterOld = useSelector((state) => {
    let oldata = state.projectList.getProjectTypeSub;
    if (old["_id"] != oldata["_id"]) {
      setOld(oldata);
      setValue("ptype", oldata["projectType"]);
    }
    console.log(oldata, "olddataolddataolddata");
    return state.projectList.getProjectTypeSub;
  });

  let subProjectList = useSelector((state) => {
    return state?.filterData?.getSiteSubProject.map((itm) => {
      return {
        label: itm.subproject,
        value: itm.subprojectId,
      };
    });
  });

  

  // const onTaskSubmit = (data) => {
  //     // if (siteStatus.uniqueId) {

  //     //     dispatch(projectListActions.postProjectTypeAll(data))
  //     // }
  //     // console.log(data, "datadata")
  //     // dasdsadsadasdas
  //     if (data.uniqueId) {
  //         dispatch(projectListActions.postProjectTypeAll(true, data, () => {
  //             console.log("CustomQueryActions.postDBConfig")
  //             setIsOpen(false)
  //             // dispatch(AdminActions.getManageDepartment())
  //         }, data.uniqueId))
  //     } else {
  //         dispatch(projectListActions.postProjectTypeAll(true, data, () => {
  //             console.log("CustomQueryActions.postDBConfig")
  //             setIsOpen(false)
  //             // dispatch(AdminActions.getManageDepartment())
  //         }))
  //     }
  // }

  let dbConfigL = useSelector((state) => {
    let interdata = state?.projectList?.getprojectalllist || [];
    return interdata;
  });

  let milestoneEventLogsData = useSelector((state) => {
    let interdata = state?.eventlogsReducer?.milestoneeventList || [];
    return interdata;
  });

  let sitelogsEventLogsData = useSelector((state) => {
    let interdata = state?.eventlogsReducer?.siteeventList || [];
    return interdata;
  });

  let dbConfigList = useSelector((state) => {
    let interdata = state?.projectList?.getprojectalllist || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        siteIdLink: (
          <p
            className=""
            onClick={() => {
              setmodalFullOpen((prev) => !prev);
              setmodalHead("Update Site");

              dispatch(
                GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM({
                  dataAll: [],
                  reset: true,
                })
              );
              dispatch(AdminActions.getOneProjectTypeDyform(itm.uniqueId));
              setmodalBody(
                <ManageMilestoneSite
                  siteCompleteData={itm}
                  uid={itm["uniqueId"]}
                  mileStone={{}}
                  setGlobalData={setGlobalData}
                  setSiteId={setSiteId}
                  setmodalFullOpen={setmodalFullOpen}
                  projectuniqueId={projectuniqueId}
                />
              );

              // setmodalBody(<ManageProjectSiteIdForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
          >
            {itm["Site Id"]}
          </p>
        ),

        // CompletionBar: <ProgressBar notifyType={"success"} text={`${100 - ((itm.milestoneArray.length - itm.milestoneArray.filter(iewq => iewq.mileStoneStatus == "Close").length) / itm.milestoneArray.length * 100)}`} />,
        CompletionBar: (
          <ProgressBar
            notifyType={"success"}
            percent={`${
              100 -
              ((itm?.milestoneArray?.length -
                itm?.milestoneArray?.filter(
                  (iewq) => iewq?.mileStoneStatus == "Closed"
                ).length) /
                itm?.milestoneArray?.length) *
                100
            }`}
            text={`${
              itm?.milestoneArray?.filter(
                (iewq) => iewq?.mileStoneStatus == "Closed"
              ).length
            } / ${itm?.milestoneArray?.length}`}
          />
        ),
        checkboxProject: (
          <>
            <input
              type={"checkbox"}
              id={itm.uniqueId}
              checked={parentsite.indexOf(itm.uniqueId) != -1}
              value={itm.uniqueId}
              onChange={(e) => {
                if (e.target.checked) {
                  setparentsite((prev) => [...prev, e.target.value]);
                  let dlisting = itm.milestoneArray.map((iewq) => {
                    return iewq.uniqueId;
                  });
                  setchildsite((prev) => [...prev, ...dlisting]);
                } else {
                  setparentsite((prev) => {
                    let lst = prev.indexOf(e.target.value);
                    prev.splice(lst, 1);
                    return [...prev];
                  });

                  setchildsite((prev) => {
                    itm?.milestoneArray?.map((iewq) => {
                      let lst = prev.indexOf(iewq.uniqueId);
                      prev.splice(lst, 1);
                    });
                    return [...prev];
                  });
                }
              }}
            />
          </>
        ),

        siteage: itm.siteageing ? (
          itm.siteageing >= 0 ? (
            <p className="text-green-600">{itm.siteageing + " Days"}</p>
          ) : (
            <p className="text-red-600">{itm.siteageing + " Days"}</p>
          )
        ) : (
          ""
        ),
        // siteStartDate: <div className='flex content-center w-full justify-center'>
        //     <CstmButton className={"p-2 w-full"} child={<Button name={itm.plannedStartDate ? itm.plannedStartDate : "Assign Date"} onClick={() => {
        //         setmodalOpen(true)

        //         dispatch(projectListActions.getUserAllocatedProject(true, projectuniqueId))
        //         setmodalHead("Add Planned Start Date")
        //         setmodalBody(<>
        //             <AllocateProjectDateForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
        //             {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
        //         </>)
        //         console.log('ahshshhs', itm)
        //         //setmodalOpen(false)
        //     }} classes='w-full'></Button>} />
        // </div>,

        milestoneArray: itm?.milestoneArray?.map((iewq) => {
          // console.log(iewq, "iewqiewqiewqiewq");
          return {
            ...iewq,
            SubProject: "",

            MileDevName: (
              <div className="flex">
                <p
                  className="cursor"
                  onClick={() => {
                    if (iewq.mileStoneStatus != "Closed") {
                      setmodalOpen(true);

                      dispatch(
                        projectListActions.getUserAllocatedProject(
                          true,
                          projectuniqueId
                        )
                      );

                      setmodalHead("Allocate User");
                      setmodalBody(
                        <>
                          <AllocateProjectForm
                            from={"mileStone"}
                            listsite={[]}
                            projectuniqueId={projectuniqueId}
                            isOpen={modalOpen}
                            setIsOpen={setmodalOpen}
                            resetting={false}
                            formValue={iewq}
                          />
                        </>
                      );
                    } else {
                      let msgdata = {
                        show: true,
                        icon: "error",
                        buttons: [],
                        type: 1,
                        text: "This task is already closed so cannot reallocate",
                      };
                      dispatch(ALERTS(msgdata));
                    }

                    console.log("ahshshhs", itm);
                  }}
                >
                  {iewq.assignerResult ? (
                    <>
                      <div class="">
                        <div class="group flex flex-row relative items-center w-full">
                          {iewq.assignerResult
                            .slice(0, 2)
                            .map((itwsw, index) => (
                              <p
                                className={`flex justify-center items-center mx-0.5 rounded-full text-white w-8 h-8 ${onehundcolor[index]}`}
                              >
                                {" "}
                                {itwsw.assignerName.split(" ").length > 1
                                  ? itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1) +
                                    itwsw.assignerName
                                      .split(" ")[1]
                                      .substr(0, 1)
                                  : itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1)}
                              </p>
                            ))}
                          <span class="pointer-events-none w-max absolute -top-8 bg-gray-500 z-[100px] rounded-lg p-2 opacity-0 transition-opacity group-hover:opacity-100">
                            {iewq.assignerResult.map((itws) => {
                              return itws.assignerName + ", ";
                            })}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    "Unassigned"
                  )}
                </p>
              </div>
            ),

            mileStoneStatusUpda:
              iewq.mileStoneStatus == "Closed" && rolename == "Admin" ? (
                <>
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      setmodalOpen(true);
                      setmodalHead("");
                      setmodalBody(
                        <>
                          <div className="flex justify-between">
                            <label htmlFor="" className="font-bold">
                              {" "}
                              Status:
                            </label>
                            <p className="bg-green-400 rounded-lg w-16 text-center">
                              {iewq.mileStoneStatus}
                            </p>
                          </div>
                          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
                          <Button
                              classes={"mt-2 w-sm text-center flex mx-auto"}
                              name="Open Task"
                              onClick={() => {
                                let finaldata = {
                                  mileStoneStatus: "Open",
                                };
                                dispatch(
                                  projectListActions.globalProjectTypeDataPatch(
                                    Urls.projectList_changeTaskStatus,
                                    iewq.uniqueId,
                                    finaldata,
                                    () => {
                                      dispatch(
                                        projectListActions.getProjectTypeAll(
                                          projectuniqueId
                                        )
                                      );
                                      setmodalOpen(false);
                                    }
                                  )
                                );
                              }}
                            />
                          </div>
                        </>
                      );
                    }}
                  >
                    {iewq.mileStoneStatus}
                  </p>
                </>
              ) : (
                <p>{iewq.mileStoneStatus}</p>
              ),

            SiteNaming: (
              <p
                className=""
                onClick={() => {
                  setmodalFullOpen((prev) => !prev);
                  // dispatch(AdminActions.getProject())
                  setmodalHead("Update Milestone");
                  dispatch(
                    GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM({
                      dataAll: [],
                      reset: true,
                    })
                  );
                  dispatch(AdminActions.getOneProjectTypeDyform(itm.uniqueId));
                  setmodalBody(
                    <ManageMilestoneSite
                      siteCompleteData={itm}
                      uid={itm["uniqueId"]}
                      mileStone={iewq}
                      setGlobalData={setGlobalData}
                      setSiteId={setSiteId}
                      setmodalFullOpen={setmodalFullOpen}
                      projectuniqueId={projectuniqueId}
                    />
                  );

                  // setmodalBody(<ManageProjectSiteIdForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                }}
              >
                {iewq.Name}
              </p>
            ),
            eventLogsmilestone: <></>,
            taskmageing:
              iewq.taskageing >= 0 ? (
                <p className="text-green-600">{iewq.taskageing + " Days"}</p>
              ) : (
                <p className="text-red-600">{iewq.taskageing + " Days"}</p>
              ),
            Predecessor: iewq.Predecessor,
            CompletionBar: (
              <ProgressBar
                notifyType={iewq.taskageing >= 0 ? "success" : "alert"}
                percent={iewq.mileStoneStatus == "Open" ? "0" : "100"}
                text={
                  parseTwoDigit(iewq.mileStoneStatus == "Open" ? "0" : "100") +
                  " %"
                }
              />
            ),
            editing:
              iewq.mileStoneStatus == "Closed" && rolename == "Admin" ? (
                <>
                  <p
                    className="cursor-pointer bg-green-500 p-1 rounded-2xl my-auto"
                    onClick={() => {
                      setmodalOpen(true);
                      setmodalHead("");
                      setmodalBody(
                        <>
                          <div className="flex justify-between">
                            <label htmlFor="" className="font-bold">
                              {" "}
                              Status:
                            </label>
                            <p className="bg-green-400 rounded-lg w-16 text-center">
                              {iewq.mileStoneStatus}
                            </p>
                          </div>
                          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
                            <Button
                              classes={"mt-2 w-sm text-center flex mx-auto"}
                              name="Open Task"
                              onClick={() => {
                                let finaldata = {
                                  mileStoneStatus: "Open",
                                };
                                dispatch(
                                  projectListActions.globalProjectTypeDataPatch(
                                    Urls.projectList_changeTaskStatus,
                                    iewq.uniqueId,
                                    finaldata,
                                    () => {
                                      dispatch(
                                        projectListActions.getProjectTypeAll(
                                          projectuniqueId
                                        )
                                      );
                                      setmodalOpen(false);
                                    }
                                  )
                                );
                              }}
                            />
                          </div>
                        </>
                      );
                    }}
                  >
                    {iewq.mileStoneStatus}
                  </p>
                </>
              ) : (
                <p></p>
              ),

            deleteing: (
              <div className="flex items-center w-30">
                <>
                  <p
                    className=""
                    onClick={() => {
                      setmodalFullOpen((prev) => !prev);
                      // dispatch(AdminActions.getProject())

                      setmodalHead("Event Log");
                      dispatch(
                        eventManagementActions.getmilestoneeventList(
                          true,
                          iewq.uniqueId
                        )
                      );

                      setmodalBody(
                        <EventLog type={"milestone"} unqeId={iewq?.uniqueId} />
                      );
                    }}
                  >
                    <MdMessage size={30} />
                  </p>
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
                                      `${Urls.projectList_changeTaskStatus}/${iewq.uniqueId}`,
                                      () => {
                                        dispatch(
                                          projectListActions.getProjectTypeAll(
                                            projectuniqueId
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
                </>
              </div>
            ),
            checkboxProject: (
              <>
                <input
                  type={"checkbox"}
                  checked={childsite.indexOf(iewq.uniqueId) != -1}
                  value={iewq.uniqueId}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setchildsite((prev) => {
                        let finalinzingdata = [...prev, e.target.value];

                        let tkChaeck = true;
                        itm.milestoneArray.map((iefr) => {
                          if (finalinzingdata.indexOf(iefr.uniqueId) == -1) {
                            tkChaeck = false;
                          }
                        });

                        console.log(tkChaeck, "tkChaecktkChaecktkChaeck");

                        if (tkChaeck && itm.totalCount == itm.milestoneCount) {
                          setparentsite((prev) => [...prev, itm.uniqueId]);
                        }

                        return finalinzingdata;
                      });

                      console.log(
                        childsite,
                        "childsitechildsitechildsitechildsite"
                      );
                    } else {
                      setchildsite((prev) => {
                        let lst = prev.indexOf(e.target.value);
                        prev.splice(lst, 1);
                        setparentsite((preving) => {
                          let lst = preving.indexOf(itm.uniqueId);
                          preving.splice(lst, 1);
                          return [...preving];
                        });
                        return [...prev];
                      });
                    }
                  }}
                />
              </>
            ),
            // MileStartDate: <div className='flex content-center w-full justify-center'>
            //     <CstmButton className={"p-2 w-full"} child={<Button name={iewq.plannedStartDate ? iewq.plannedStartDate : "Assign Date"} onClick={() => {
            //         setmodalOpen(true)

            //         dispatch(projectListActions.getUserAllocatedProject(true, projectuniqueId))
            //         setmodalHead("Add Planned Start Date")
            //         setmodalBody(<>
            //             <AllocateProjectDateForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={iewq} />
            //             {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
            //         </>)
            //         console.log('ahshshhs', itm)
            //         //setmodalOpen(false)
            //     }} classes='w-full'></Button>} />
            // </div>
          };
        }),
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

        projectId: (
          <p
            // onClick={() => handleFullName(item)}
            onClick={() => navigate(`/projectSiteId/${itm.customeruniqueId}`)}
            className="text-[#13b497] font-extrabold hover:underline focus:outline-none hover:font-semibold"
          >
            {itm.projectId}
          </p>
        ),

        // "siteStatus": <div className='flex '><CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
        //     setmodalOpen(true)
        //     setmodalHead("")
        //     setmodalBody(<>
        //    <div className='flex justify-between'>
        //    <label htmlFor="" className='font-bold'> Status:</label>
        //       <p className='bg-green-400 rounded-lg w-16 text-center'>{itm.siteStatus}</p>
        //    </div>
        //    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        //         <Button classes={"mt-2 w-sm text-center flex mx-auto"} name="Open Task" />
        //     </div>
        //     </>)
        // }}></EditButton>} /></div>,

        // siteStatus:
        //   itm.siteStatus == "Close" && rolename == "Admin" ? (
        //     <>
        //       <p
        //         className="cursor-pointer"
        //         onClick={() => {
        //           setmodalOpen(true);
        //           setmodalHead("");
        //           setmodalBody(
        //             <>
        //               <div className="flex justify-between">
        //                 <label htmlFor="" className="font-bold">
        //                   {" "}
        //                   Status:
        //                 </label>
        //                 <p className="bg-green-400 rounded-lg w-16 text-center">
        //                   {itm.siteStatus}
        //                 </p>
        //               </div>
        //               <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        //                 <Button
        //                   classes={"mt-2 w-sm text-center flex mx-auto"}
        //                   name="Open Task"
        //                 />
        //               </div>
        //             </>
        //           );
        //         }}
        //       >
        //         {itm.siteStatus}
        //       </p>
        //     </>
        //   ) : (
        //     <p>{itm.siteStatus}</p>
        //   ),

        // edit: (
        //   <div className="flex ">
        //     <CstmButton
        //       className={"p-2"}
        //       child={
        //         <EditButton
        //           name={""}
        //           onClick={() => {
        //             setmodalOpen(true);
        //             dispatch(AdminActions.getProject());
        //             setmodalHead("Edit Site ID");
        //             setmodalBody(
        //               <>
        //                 <ManageProjectSiteIdForm
        //                   isOpen={modalOpen}
        //                   setIsOpen={setmodalOpen}
        //                   resetting={false}
        //                   formValue={itm}
        //                 />
        //                 {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
        //               </>
        //             );
        //             console.log("ahshshhs", itm);
        //             //setmodalOpen(false)
        //           }}
        //         ></EditButton>
        //       }
        //     />
        //   </div>
        // ),

        // edit: <div className="flex "></div>,
        siteeventLogs: <></>,
        delete: (
          <>
            {1 == 1 ? (
              <div className="flex items-center w-30">
                <>
                  <p
                    className=""
                    onClick={() => {
                      setmodalFullOpen((prev) => !prev);
                      setmodalHead("Event Log");
                      dispatch(
                        eventManagementActions.getsiteeventList(
                          true,
                          itm?.uniqueId
                        )
                      );
                      setmodalBody(
                        <EventLog type={"site"} unqeId={itm?.uniqueId} />
                      );
                    }}
                  >
                    <MdMessage size={30} />
                  </p>
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
                                    CommonActions.deleteApiCallerBulk(
                                      `${Urls.projectList_siteEngineer}`,{ids : [itm.uniqueId]},
                                      () => {
                                        dispatch(
                                          projectListActions.getProjectTypeAll(
                                            projectuniqueId
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
                </>
              </div>
            ) : (
              ""
            )}
          </>
        ),
      };
      return updateditm;
    });
  });
  // console.log("safasfasfasfasfasdfasdfasdfabc", dbConfigList[0]?.uniqueId);
  let dbConfigTotalCount =
    useSelector((state) => {
      let interdata = state?.projectList?.getprojectalllist;
      // console.log("afdsdasfasfasfasfadfs", interdata[0]);
      if (interdata.length > 0) {
        console.log(
          "asdfas0fjasofnafsdna",
          interdata[0]["overall_table_count"]
        );
        return interdata[0]["overall_table_count"];
      }
    }) || [];
  console.log("afdasfoja0jdfamssdfghjsdc", dbConfigTotalCount.length);
  // let Form = [
  //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
  //     { label: "Custom Queries", value: "", type: "textarea" }
  // ]

  let milestoneLogsTable = {
    columns: [
      {
        name: "Site Id",
        value: "SiteId",
        style: "min-w-[50px] max-w-[100px] text-center",
      },
      {
        name: "Email",
        value: "email",
        style: "min-w-[50px] max-w-[200px] text-center",
      },
      {
        name: "Time & Date ",
        value: "UpdatedAt",
        style: "min-w-[80px] max-w-[200px] text-center",
      },
      {
        name: "Updated Data",
        value: "updatedData",
        style: "min-w-[50px] max-w-[300px] text-center",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      // {
      //     label: "Role",
      //     type: "text",
      //     name: "rolename",
      //     // option: roleList,
      //     props: {
      //     }
      // }
    ],
  };
  let table = {
    columns: [
      {
        name: (
          <input
            type={"checkbox"}
            checked={
              dbConfigL.length != 0 && parentsite.length == dbConfigL.length
                ? true
                : false
            }
            onClick={(e) => {
              if (e.target.checked) {
                dbConfigL.map((itm) => {
                  if (childsite.indexOf(itm.uniqueId) == -1) {
                    setparentsite((prev) => [...prev, itm.uniqueId]);
                  }
                  itm.milestoneArray.map((iewq) => {
                    if (childsite.indexOf(iewq.uniqueId) == -1) {
                      setchildsite((prev) => [...prev, iewq.uniqueId]);
                    }
                  });
                });
              } else {
                setchildsite((prev) => []);
                setparentsite((prev) => []);
              }
            }}
          />
        ),
        value: "checkboxProject",
        style: "min-w-[40px] max-w-[40px] text-center",
      },
      {
        name: "Site ID",
        value: "siteIdLink",
        style:
          "min-w-[140px] max-w-[200px] text-center sticky left-0 bg-[#3e454d] z-20 cursor-pointer",
      },
      {
        name: "Sub Project",
        value: "subProject",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Owner",
        value: "PMName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Planned Start Date",
        value: "siteStartDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Planned End Date",
        value: "siteEndDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Completition Date",
        value: "Site_Completion Date",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Ageing",
        value: "siteageing",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Completion (%)",
        value: "CompletionBar",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Predecessor",
        value: "Predecessor",
        style: "min-w-[240px] max-w-[240px] text-center",
      },
      {
        name: "Status",
        value: "siteStatus",
        style: "min-w-[140px] max-w-[200px] text-center",
      },

      {
        name: "Billing Status",
        value: "siteBillingStatus",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Event Logs",
      //   value: "siteeventLogs",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      // {
      //   name: "Edit",
      //   value: "edit",
      //   style: "min-w-[100px] max-w-[200px] text-center",
      // },
      {
        name: "Delete",
        value: "delete",
        style: "min-w-[50px] max-w-[100px] text-center",
      },
    ],
    childList: [""],
    childs: {
      milestoneArray: [
        {
          name: "",
          value: "checkboxProject",
          style: "min-w-[40px] max-w-[40px] text-center",
        },
        {
          name: "Site ID",
          value: "SiteNaming",
          style:
            "min-w-[140px] max-w-[200px] sticky left-0 bg-[#3e454d] text-center z-20",
        },
        {
          name: "Sub Project",
          value: "SubProject",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Owner",
          value: "MileDevName",
          style: "min-w-[180px] max-w-[180px] text-center",
        },
        {
          name: "Planned Start Date",
          value: "mileStoneStartDate",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Planned End Date",
          value: "mileStoneEndDate",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Completition Date",
          value: "CC_Completion Date",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Ageing",
          value: "taskmageing",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Completion (%)",
          value: "CompletionBar",
          style: "min-w-[140px] max-w-[200px] text-center",
        },

        {
          name: "Predecessor",
          value: "Predecessor",
          style: "min-w-[240px] max-w-[240px] text-center",
        },
        {
          name: "Status",
          value: "mileStoneStatusUpda",
          style: "min-w-[140px] max-w-[200px] text-center",
        },

        {
          name: "Billing Status",
          value: "",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        // {
        //   name: "Event Logs",
        //   value: "eventLogsmilestone",
        //   style: "min-w-[140px] max-w-[200px] text-center",
        // },
        // {
        //   name: "Edit",
        //   value: "editing",
        //   style: "min-w-[100px] max-w-[200px] text-center",
        // },
        {
          name: "Delete",
          value: "deleteing",
          style: "min-w-[50px] max-w-[100px] text-center",
        },
      ],
    },
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
          label: "Site ID",
          type: "text",
          name: "siteId",
          props: {}
      },
      {
        label: "Sub Project",
        type: "select",
        name: "subProject",
        option:subProjectList,
        props: {}
      },
      {
          label: "Site Status",
          type: "select",
          name: "siteStatus",
          option: [
            { label: "Open", value: "Open" },
            { label: "Closed", value: "Closed" },
            { label: "Drop", value: "Drop" },
          ],
          props: {}
      },
      {
          label: "Billing Status",
          type: "select",
          name: "siteBillingStatus",
          option:[
            {label:'Unbilled', value:'Unbilled'},
            {label:'Billed', value:'Billed'},
          ],
          props: {}
      }
    ],
  };
  const onSubmit = (data) => {
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal=objectToQueryString(data)
    setstrVal(strVal)
    // console.log("called______")
    dispatch(projectListActions.getProjectTypeAll(projectuniqueId, objectToQueryString(data),shouldReset));
  };
  useEffect(() => {
    dispatch(projectListActions.getProjectType(projectuniqueId));
    dispatch(projectListActions.getCircleWithPGData(projectuniqueId));
    dispatch(projectListActions.getProjectTypeAll(projectuniqueId));
    dispatch(projectListActions.getMappedData(projectuniqueId));
    dispatch(FilterActions.getSiteSubProject(projectuniqueId));
  }, []);
  const handleBulkDelte = () => {
   
    dispatch(
      CommonActions.deleteApiCallerBulk(
        `${Urls.projectList_siteEngineer}`,
        {
          ids: parentsite
        },
        () => {
          dispatch(projectListActions.getProjectTypeAll(projectuniqueId));
          setmodalOpen(false)
          setparentsite([])
          setmultiSelect([])
        }
      )
    );   
  };
  return (
    <>
      <AdvancedTableExpandable
      parentsite={parentsite}
      childsite={childsite}
        searchView={
          <>
            <SearchBarView
              onblur={(e) => {
                console.log("SearchBarView onblur", e.target.value);
                dispatch(
                  projectListActions.getProjectTypeAll(
                    projectuniqueId,
                    e.target.value != ""
                      ? "mileStoneName=" + e.target.value
                      : ""
                  )
                );
              }}
              onchange={(e) => {
                dispatch(
                  projectListActions.getProjectTypeAll(
                    projectuniqueId,
                    e.target.value != ""
                      ? "mileStoneName=" + e.target.value
                      : ""
                  )
                );
                console.log("SearchBarView onchange", e.target.value);
              }}
              placeHolder={"S Milestone Name"}
            />

            {/* <ConditionalButton
              showType={getAccessType("Site Allocation")}
              classes="w-auto "
              onClick={(e) => {
                if (parentsite.length > 0) {
                  setmodalOpen((prev) => !prev);
                  // dispatch(AdminActions.getProject())
                  dispatch(
                    projectListActions.getUserAllocatedProject(
                      true,
                      projectuniqueId
                    )
                  );
                  setmodalHead("Allocate Site");
                  setmodalBody(
                    <AllocateProjectForm
                      from={"bulksite"}
                      listsite={parentsite}
                      projectuniqueId={projectuniqueId}
                      isOpen={modalOpen}
                      setIsOpen={setmodalOpen}
                      resetting={false}
                      formValue={{}}
                    />
                  );
                } else {
                  let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: "Please Select at least one site for bulk allocate",
                  };
                  dispatch(ALERTS(msgdata));
                }
              }}
              name={"Site Allocate"}
            ></ConditionalButton> */}

            {/* <PopupMenu
              name={"Export"}
              icon={"Export"}
              classes={"w-auto"}
              bgColor={"bg-[#147b99]"}
              child={
                <div classes="z-40 max-h-96 justify-center">
                  <ConditionalButton
                    showType={getAccessType("Bulk upload-Site")}
                    name={"Export"}
                    classes="w-auto m-5"
                    onClick={(e) => {
                      dispatch(
                        CommonActions.commondownload(
                          "/export/siteId/" + `${projectuniqueId}`,
                          "Export_Sites.xlsx"
                        )
                      );
                    }}
                  ></ConditionalButton>
                  <ConditionalButton
                    showType={getAccessType("Bulk upload-Task")}
                    name={"Export with Task"}
                    classes="w-auto m-5"
                    onClick={(e) => {
                      dispatch(
                        CommonActions.commondownload(
                          "/export/siteIdwithMilestone/" + `${projectuniqueId}`,
                          "Export_Sites_with_Milestone.xlsx"
                        )
                      );
                    }}
                  ></ConditionalButton>
                </div>
              }
            /> */}
          </>
        }
        
        headerButton={
          <div className="flex gap-1">
          {(Array.isArray(parentsite) && parentsite?.length > 0 ) && (
                <Button
                  classes="w-auto"
                  onClick={(e) => {
                    setmodalOpen((prev) => !prev);
                    setmodalHead("Confirm Delete");
                    setmodalBody(
                      <div className="flex justify-center py-6">
                        <button 
                          onClick={handleBulkDelte}
                          className="w-1/4 rounded-full bg-green-600"
                        >
                        OK
                        </button>
                      </div>
                    );
                  }}
                  name={"Delete"}
                ></Button>
            )}
            <ConditionalButton
              showType={getAccessType("Add Site")}
              classes="w-auto "
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                // dispatch(AdminActions.getProject())
                setmodalHead("Add Site ID");
                setmodalBody(
                  <ManageProjectSiteIdForm
                    projectuniqueId={projectuniqueId}
                    isOpen={modalOpen}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                  />
                );
              }}
              name={"Add Site"}
            ></ConditionalButton>
            <ConditionalButton
              showType={getAccessType("Task Allocation")}
              classes="w-auto "
              onClick={(e) => {
                if (childsite.length > 0) {
                  setmodalOpen((prev) => !prev);
                  // dispatch(AdminActions.getProject())

                  dispatch(
                    projectListActions.getUserAllocatedProject(
                      true,
                      projectuniqueId
                    )
                  );
                  setmodalHead("Allocate Task");
                  setmodalBody(
                    <AllocateProjectForm
                      from={"bulktask"}
                      listsite={childsite}
                      projectuniqueId={projectuniqueId}
                      isOpen={modalOpen}
                      setIsOpen={setmodalOpen}
                      resetting={false}
                      formValue={{}}
                    />
                  );
                } else {
                  let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: "Please Select at least one site for bulk allocate",
                  };
                  dispatch(ALERTS(msgdata));
                }
              }}
              name={"Task Allocate"}
            ></ConditionalButton>

            <ConditionalButton
              showType={getAccessType("Site Allocation")}
              classes="w-auto "
              onClick={(e) => {
                if (parentsite.length > 0) {
                  setmodalOpen((prev) => !prev);
                  // dispatch(AdminActions.getProject())
                  dispatch(
                    projectListActions.getUserAllocatedProject(
                      true,
                      projectuniqueId
                    )
                  );
                  setmodalHead("Allocate Site");
                  setmodalBody(
                    <AllocateProjectForm
                      from={"bulksite"}
                      listsite={parentsite}
                      projectuniqueId={projectuniqueId}
                      isOpen={modalOpen}
                      setIsOpen={setmodalOpen}
                      resetting={false}
                      formValue={{}}
                    />
                  );
                } else {
                  let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: "Please Select at least one site for bulk allocate",
                  };
                  dispatch(ALERTS(msgdata));
                }
              }}
              name={"Site Allocate"}
            ></ConditionalButton>
            <PopupMenu
              name={"Export"}
              icon={"Export"}
              classes={"w-auto"}
              bgColor={"bg-[#147b99]"}
              child={
                <div classes="z-40 max-h-96 justify-center">
                  <ConditionalButton
                    showType={getAccessType("Bulk upload-Site")}
                    name={"Export"}
                    classes="w-auto m-5"
                    onClick={(e) => {
                      dispatch(
                        CommonActions.commondownload(
                          "/export/siteId/" + `${projectuniqueId}`+'?'+ `${strValFil}`,
                          "Export_Sites.xlsx"
                        )
                      );
                    }}
                  ></ConditionalButton>
                  <ConditionalButton
                    showType={getAccessType("Bulk upload-Task")}
                    name={"Export with Task"}
                    classes="w-auto m-5"
                    onClick={(e) => {
                      dispatch(
                        CommonActions.commondownload(
                          "/export/siteIdwithMilestone/" + `${projectuniqueId}`+'?'+ `${strValFil}`,
                          "Export_Sites_with_Milestone.xlsx"
                        )
                      );
                    }}
                  ></ConditionalButton>
                </div>
              }
            />
          </div>
        }
        table={table}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList[0]?.uniqueId ? dbConfigList : []}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        multiSelect={false}
        getmultiSelect={getmultiSelect}
        setmultiSelect={setmultiSelect}
        totalCount={dbConfigTotalCount}
        heading = {'Total Sites:-'}
      />

      <Modal
        size={"sm"}
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
    </>
  );
};

export default ManageProjectSiteId;
