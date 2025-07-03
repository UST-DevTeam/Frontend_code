import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
import ToggleButton from "../../../components/ToggleButton";
import { MdMessage } from "react-icons/md";
import PopupMenu from "../../../components/PopupMenu";
import { LuTicketCheck, LuTicketX } from "react-icons/lu";
import {
  getAccessType,
  objectToQueryString,
  parseTwoDigit,
} from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import { Urls } from "../../../utils/url";
import OperationManagementActions from "../../../store/actions/admin-actions";
import AdminActions from "../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import projectListActions from "../../../store/actions/projectList-actions";
import AdvancedTableExpandable from "../../../components/AdvancedTableExpandable";
import SearchBarView from "../../../components/SearchBarView";

import ProgressBar from "../../../components/ProgressBar";
import { onehundcolor } from "../../../utils/queryBuilder";
import ConditionalButton from "../../../components/ConditionalButton";
import eventManagementActions from "../../../store/actions/eventLogs-actions";
import EventLog from "../../../components/EventLogs";
import { GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM } from "../../../store/reducers/admin-reducer";
import FilterActions from "../../../store/actions/filter-actions";
import ManageProjectSiteIdForm from "../Admin/ManageProjectSiteId/ManageProjectSiteIdForm";
import AllocateProjectForm from "../Admin/ManageProjectSiteId/AllocateProjectForm";
import ManageMilestoneSite from "../Admin/ManageSite/ManageMilestoneSite";
import {
  GET_CIRCLE_WITH_PG_DATA,
  GET_MAPPED_DATA,
} from "../../../store/reducers/projectList-reducer";
import MyHomeActions from "../../../store/actions/myHome-actions";
import { GET_FILTER_MYTASK_SUBPROJECT } from "../../../store/reducers/filter-reducer";
import Api from "../../../utils/api";
import CommonForm from "../../../components/CommonForm";

const MyTask = () => {
  let permission = JSON.parse(localStorage.getItem("permission")) || {};
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;
  const { projectuniqueId } = useParams();

  const [modalOpen, setmodalOpen] = useState(false);
  const [vehicleType, setVehicleType] = useState("twowheeler");
  const [isSelect, setSelect] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMultiStep, setIsMultiStep] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [ptwModalFullApprovalOpen, setPtwModalFullApprovalOpen] =
    useState(false);
  const [ptwOption, setPtwOption] = useState(null);
  const [modalFullBody, setmodalFullBody] = useState(<></>);
  const [strValFil, setstrVal] = useState(false);
  const [ptwModalFullOpen, setPtwModalFullOpen] = useState(false);
  const [ptwDriveTest, setPtwDriveTest] = useState(false);
  const [ptwModalBody, setPtwModalBody] = useState(<></>);
  const [ptwDriveTestBody, setPtwDriveTestBody] = useState(<></>);
  const [ptwApprovalModalBody, setPtwApprovalModalBody] = useState(<></>);
  const [formName, setFormName] = useState("");
  const [ptwModalHead, setPtwModalHead] = useState({
    title: "",
    value: "",
  });

  const options = [
    { id: "riskassessment", name: "Risk Assessment" },
    { id: "oneatrisk", name: "One At Risk" },
    { id: "ptwphoto", name: "PTW Photo" },
  ];
  const FORM_FLOW_SEQUENCE = ["riskassessment", "oneatrisk", "ptwphoto"];

  const [globalData, setGlobalData] = useState({});
  const [SiteId, setSiteId] = useState("Add");
  const [parentsite, setparentsite] = useState([]);
  const [childsite, setchildsite] = useState([]);
  const [modalBody, setmodalBody] = useState(<></>);
  const [getmultiSelect, setmultiSelect] = useState([]);
  const [operationID, setOperationId] = useState("");
  const mileStoneItemRef = useRef(null);
  const operationApprovalID = useRef(null);
  const subFormRef = useRef({
    checklist: [],
    oneatrisk: [],
    photo: [],
    ptwphoto: [],
    riskassessment: [],
    twowheeler: [],
    fourwheeler: [],
  });

  const [modalHead, setmodalHead] = useState(<></>);

  const [old, setOld] = useState(<></>);
  const navigate = useNavigate();

  const handleCheckboxChange = (optionId, optionName) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((item) => item.id === optionId);

      if (isSelected) {
        // Remove item if already selected
        return prev.filter((item) => item.id !== optionId);
      } else {
        // Add item if not selected
        return [...prev, { id: optionId, name: optionName }];
      }
    });
  };

  const {
    register,
    handleSubmit,
    SubmitTask,
    watch,
    setValue,
    setValues,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const {
    register: registerForm1,
    setValue: setValueForm1,
    getValues: getValuesForm1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: errorsForm1 },
  } = useForm();
  let dispatch = useDispatch();
  const dataGetterOld = useSelector((state) => {
    let oldata = state.projectList.getProjectTypeSub;
    if (old["_id"] != oldata["_id"]) {
      setOld(oldata);
      setValue("ptype", oldata["projectType"]);
    }
    return state.projectList.getProjectTypeSub;
  });

  let showTypeforAction = getAccessType("Actions(Site)");

  let shouldIncludeEditColumn = false;

  if (showTypeforAction === "visible") {
    shouldIncludeEditColumn = true;
  }

  let customerList = useSelector((state) => {
    return state?.adminData?.getManageCustomer.map((itm) => {
      return {
        label: itm?.customerName,
        value: itm?.uniqueId,
      };
    });
  });

  const handleApprovalData = async () => {
    const dropdown = document.getElementById("dropdown");
    const res = await Api.patch({
      url: `/getPtwApprover/${sessionStorage.getItem("opid")}`,
      data: {
        empId: dropdown.value,
        ApproverType: "L1-Approver",
      },
    });
    if (res?.status === 200) {
      setPtwModalFullApprovalOpen(false);
      setPtwOption(null);
      sessionStorage.removeItem("opid");
      operationApprovalID.current = null;
      dispatch(MyHomeActions.getMyTask());
    }
  };

  const getApprovalsData = async (operationId) => {
    setIsMultiStep(false); // all done
    setPtwModalFullOpen(false);
    operationApprovalID.current = operationId;
    const res = await Api.get({
      url: `/getPtwApprover/${mileStoneItemRef.current?.projectType}`,
    });
    if (res?.status === 200) {
      setPtwApprovalModalBody(
        <>
          <div className="w-full flex flex-col items-scenter min-h-[50vh] max-h-full ">
            <div className="max-w-md mx-auto p-2  flex flex-col gap-3 rounded-lg shadow-md">
              <div>
                <label
                  htmlFor="dropdown"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Choose an option:
                </label>
                <select
                  id="dropdown"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#13B497] focus:border-[#13B497]"
                >
                  <option value="">Select L1 Approver</option>
                  {res?.data?.data?.length > 0
                    ? res?.data?.data
                        ?.filter((item) => item?.ApproverType === "L1-Approver")
                        ?.map((item) => {
                          return (
                            <option className="" value={item?.empId}>
                              {item?.empName}
                            </option>
                          );
                        })
                    : []}
                </select>
              </div>

              <button
                onClick={(e) => handleApprovalData()}
                className="w-full bg-[#13B497] text-white py-2 px-4 rounded-lg hover:bg-[#0c8b74] transition-colors duration-200 font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      );
      setPtwModalFullApprovalOpen(true);
    }
  };

  const handleVaichel = async (formDataInput, subForm) => {
    const formKeys = (subFormRef.current[subForm] || []).map(
      (f) => f.fieldName
    );

    const formData = new FormData();

    // Shared metadata
    formData.append("projectID", mileStoneItemRef.current?.projectId);
    formData.append("siteId", mileStoneItemRef.current?.siteId);
    formData.append("customerName", mileStoneItemRef.current?.customerName);
    formData.append("circle", mileStoneItemRef.current?.CIRCLE);
    formData.append("mileStoneId", mileStoneItemRef.current?.mileStoneId);
    formData.append("Milestone", mileStoneItemRef.current?.Milestone);

    // Only selected form's fields
    for (let key in formDataInput) {
      if (formKeys.includes(key)) {
        const value = formDataInput[key];
        const finalKey = `${key}`;

        if (value instanceof FileList) {
          formData.append(finalKey, value[0]);
        } else {
          formData.append(finalKey, value);
        }
      }
    }

    const res = await Api.patch({
      url: `/submit/ptw/drivetestactivity/${subForm}${
        sessionStorage.getItem("opid")
          ? `/${sessionStorage.getItem("opid")}`
          : ""
      }`,
      contentType: "multipart/form-data",
      data: formData,
    });

    if (res?.status === 200) {
      reset(); // If you use one useForm
      setPtwDriveTest(false);
      getApprovalsData(res?.data?.operation_id);
    }
  };

  const handleAddActivity = async (data, formType) => {
    let res = null;

    try {
      // Handle normal (non-photo/vehicle) forms
      if (
        !["photo", "ptwphoto", "oneatrisk", "vehicle"].includes(
          ptwModalHead.value
        )
      ) {
        const newData = {
          projectID: mileStoneItemRef.current?.projectId,
          siteId: mileStoneItemRef.current?.siteId,
          customerName: mileStoneItemRef.current?.customerName,
          subProject: mileStoneItemRef.current?.SubProject,
          circle: mileStoneItemRef.current?.CIRCLE,
          mileStoneId: mileStoneItemRef.current?.mileStoneId,
          Milestone: mileStoneItemRef.current?.Milestone,
          [ptwModalHead.value]: {},
        };

        Object.keys(data)?.forEach((key) => {
          if (data[key]) {
            newData[ptwModalHead.value][key] = data[key];
          }
        });

        const url = `/submit/ptw/${formType}/${ptwModalHead.value}${
          sessionStorage.getItem("opid")
            ? `/${sessionStorage.getItem("opid")}`
            : ""
        }`;

        res = sessionStorage.getItem("opid")
          ? await Api.patch({ url, data: newData })
          : await Api.post({ url, data: newData });
      }

      // Handle special forms (photo, ptwphoto, oneatrisk, vehicle)
      else {
        const formData = new FormData();

        formData.append("projectID", mileStoneItemRef.current?.projectId);
        formData.append("siteId", mileStoneItemRef.current?.siteId);
        formData.append("customerName", mileStoneItemRef.current?.customerName);
        formData.append("circle", mileStoneItemRef.current?.CIRCLE);
        formData.append("mileStoneId", mileStoneItemRef.current?.mileStoneId);
        formData.append("Milestone", mileStoneItemRef.current?.Milestone);

        // Append each field (file or text)
        Object.keys(data)?.forEach((key) => {
          const value = data[key];
          if (value) {
            formData.append(key, value instanceof FileList ? value[0] : value);
          }
        });

        const url = `/submit/ptw/${formType}/${ptwModalHead.value}${
          sessionStorage.getItem("opid")
            ? `/${sessionStorage.getItem("opid")}`
            : ""
        }`;

        res = await Api.patch({
          url,
          contentType: "multipart/form-data",
          data: formData,
        });
      }

      // Handle response
      if (res?.status === 200 || res?.status === 201) {
        sessionStorage.setItem(
          "opid",
          sessionStorage.getItem("opid") || res?.data?.operation_id
        );

        // Special redirect after photo
        if (ptwModalHead.value === "photo") {
          setSelect(true);
          reset();
          setPtwModalHead({ title: "", value: "formSelection" });
          return;
        }

        // Multi-step form logic
        if (isMultiStep) {
          const nextIndex = currentStepIndex + 1;

          if (nextIndex < selectedItems.length) {
            setCurrentStepIndex(nextIndex);
            const nextForm = selectedItems[nextIndex];
            setPtwModalHead({ title: nextForm.name, value: nextForm.id });
          } else {
            // Final step (show vehicle form)
            setIsMultiStep(false);
            setPtwModalFullOpen(false);

            if (formType === "drivetestactivity") {
              setPtwModalHead({ title: "", value: "vehicle" });

              setPtwDriveTest(true);
            } else {
              getApprovalsData(res?.data?.operation_id);
            }
          }

          reset();
          return;
        }

        // Fallback (non-multi-step)
        setPtwModalHead({
          title:
            ptwModalHead.value === "checklist" ? "Photo" : ptwModalHead.title,
          value:
            ptwModalHead.value === "checklist" ? "photo" : ptwModalHead.value,
        });
        reset();
      }
    } catch (err) {
      console.error("Error in handleAddActivity:", err);
    }
  };

  const setForm = (form, formName) => {
    setPtwModalBody(
      <>
        <div className="w-full flex flex-col items-center p-4 min-h-[50vh] max-h-full ">
          <CommonForm
            classes={` ${
              subFormRef.current[ptwModalHead.value] &&
              subFormRef.current[ptwModalHead.value]?.length > 3
                ? "grid-cols-3"
                : "grid-cols-1"
            }  gap-1`}
            Form={form}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
          <Button
            name="Submit"
            classes="w-fit"
            onClick={handleSubmit((data) => {
              handleAddActivity(data, formName);
            })}
          />
        </div>
      </>
    );
  };

  useEffect(() => {
    if (ptwModalHead.value && ptwModalHead.value !== "vehicle") {
      setPtwModalFullOpen(true);
      setForm(subFormRef.current[ptwModalHead.value], formName);
    }
  }, [ptwModalHead.value]);

  let subProjectList = useSelector((state) => {
    return state?.filterData?.getMyTaskSubProject.map((itm) => {
      return {
        label: itm.subprojectName,
        value: itm.subProjectId,
      };
    });
  });

  let dbConfigL = useSelector((state) => {
    let interdata = state?.myHomeData?.getmyTask || [];
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

  console.log(subFormRef.current, "asdfasdfasdfsadffgsdfgdghdfghjfhjgfhdf");

  const getPtwSubForm = async (formName) => {
    reset();
    setPtwModalHead({
      title: "",
      value: "",
    });
    const res = await Api.get({ url: `/show/ptw/${formName}` });
    if (res?.status === 200) {
      if (!res?.data?.data?.length) {
        alert("No Form Found.");
        return;
      }
      console.log(
        res?.data?.data[0],
        mileStoneItemRef.current,
        "asdfasdfasdfasdfasdfasdfsdf"
      );
      Object.keys(subFormRef.current)?.forEach((itm) => {
        if (res?.data?.data[0][itm]?.length === 0) {
          alert("Please submit all form first.");
          return;
        }
        subFormRef.current[itm] = res?.data?.data[0][itm]?.map((item) => {
          if (item?.dataType === "AutoFill") {
            setValue(
              item?.fieldName,
              mileStoneItemRef.current[item?.fieldName]
            );
          }
          return {
            ...item,
            label: item?.fieldName,
            defaultValue: item?.dataType === "AutoFill" ? "aman" : "",
            defaultValue: item?.dataType === "AutoFill" ? "aman" : "",
            // disabled :  item?.dataType === 'AutoFill' ? true : false ,
            name: item?.fieldName,
            type:
              item?.dataType === "AutoFill"
                ? "sdisabled"
                : item?.dataType === "Dropdown"
                ? "select"
                : item?.dataType === "DateTime"
                ? "datetime-local"
                : item?.dataType?.toLowerCase() === "date"
                ? "datetime"
                : item?.dataType === "img"
                ? "file"
                : item?.dataType?.toLowerCase(),
            ...(item?.dataType === "Dropdown"
              ? {
                  option: item?.dropdownValue.split(",")?.map((item) => {
                    return {
                      label: item.trim(),
                      value: item.trim(),
                    };
                  }),
                }
              : {}),
            // ...(item?.dataType === 'img' ? {
            //   props: {
            //     onChange: (e) => {
            //       console.log(e.target.files, "e geeter");
            //       setValue(item?.fieldName, e.target.files[0]);
            //     },

            //   },
            // } : {}),
            required: item?.required === "Yes" ? true : false,
          };
        });
      });

      setPtwModalHead({
        title: "Checklist",
        value: "checklist",
      });
      setFormName(formName);

      setPtwOption(null);
    } else {
    }
  };

  useEffect(() => {
    setPtwOption(null);
    if (formName) {
      getPtwSubForm(formName);
    }
  }, [formName]);

  let dbConfigList = useSelector((state) => {
    let interdata = state?.myHomeData?.getmyTask || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        siteIdLink: (
          <p
            className="text-[#13b497] font-extrabold"
            onClick={() => {
              console.log("asdfasdfasdfasdfasdfasdf.......", "called");
              console.log("asdfasdfasdfasdfasdfasdf.......", "called");
              setmodalFullOpen((prev) => !prev);
              setmodalHead("Update Site:-" + itm["Site Id"]);
              dispatch(
                GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM({
                  dataAll: [],
                  reset: true,
                })
              );
              // dispatch(GET_CIRCLE_WITH_PG_DATA({dataAll: [], reset: true}))
              dispatch(GET_MAPPED_DATA({ dataAll: [], reset: true }));
              dispatch(AdminActions.getOneProjectTypeDyform(itm.uniqueId));
              dispatch(
                projectListActions.getCircleWithPGData(itm.projectuniqueId)
              );
              dispatch(projectListActions.getMappedData(itm.projectuniqueId));
              setmodalBody(
                <ManageMilestoneSite
                  siteCompleteData={itm}
                  uid={itm["uniqueId"]}
                  mileStone={{}}
                  setGlobalData={setGlobalData}
                  setSiteId={setSiteId}
                  setmodalFullOpen={setmodalFullOpen}
                  projectuniqueId={itm["projectuniqueId"]}
                  myTaskPage="Yes"
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
                console.log("asdfasdfasdfasdfasdfasdf.......", "called");
                console.log("asdfasdfasdfasdfasdfasdf.......", "called");
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
            <p className="text-[#13b497] font-extrabold">
              {itm.siteageing + " Days"}
            </p>
          ) : (
            <p className="text-rose-400 font-extrabold">
              {itm.siteageing + " Days"}
            </p>
          )
        ) : (
          ""
        ),

        milestoneArray: itm?.milestoneArray?.map((iewq) => {
          return {
            ...iewq,
            SubProject: "",

            MileDevName: (
              <div className="flex">
                <p>
                  {iewq.assignerResult ? (
                    <>
                      <div class="">
                        <div class="group flex flex-row relative items-center w-full">
                          {iewq.assignerResult
                            .slice(0, 2)
                            .map((itwsw, index) => (
                              <p
                                key={index}
                                className={`flex justify-center items-center mx-0.5 rounded-full text-white w-8 h-8 ${onehundcolor[index]}`}
                              >
                                {" "}
                                {itwsw.assignerName &&
                                itwsw.assignerName.trim().split(" ").length > 1
                                  ? `${itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1)}${itwsw.assignerName
                                      .split(" ")[1]
                                      .substr(0, 1)}`
                                  : itwsw.assignerName
                                  ? itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1)
                                  : ""}
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
                      setmodalHead("If you want to OPEN the task again");
                      setmodalBody(
                        <>
                          <div className="flex justify-between">
                            <label
                              htmlFor=""
                              className="w-auto flex text-[#13b497] font-extrabold pl-20 whitespace-nowrap"
                            >
                              {" "}
                              Current Status:
                            </label>
                            <p className="w-20 rounded-xl font-extrabold justify-center text-yellow-500 bg-slate-500 flex text- mr-28 whitespace-nowrap">
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
                                          projectuniqueId,
                                          strValFil
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
              ) : iewq?.mileStoneStatus === "Open" ? (
                <div className="relative">
                  <div className="h-full w-full cursor-default flex items-center gap-2 justify-end">
                    <span>
                      {iewq?.isAutoClose ? "Auto Close" : iewq?.ptwStatus}
                    </span>
                    <span
                      onClick={() => {
                        setFormName("");

                        setSelect(false);
                        setSelectedItems([]);
                        if (iewq?.isPtwRaise) return;

                        if (ptwOption && ptwOption === iewq?._id) {
                          setPtwOption(null);
                        } else {
                          setPtwOption(iewq?._id);
                        }
                      }}
                      title="Raise PTW"
                      className={`p-[1px] px-2 ${
                        !iewq?.isPtwRaise ||
                        ["L1-Rejected", "L2-Rejected"].includes(iewq?.ptwStatus)
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-60"
                      } rounded-md bg-[#13B497]`}
                    >
                      <LuTicketCheck size={20} />
                    </span>

                    <span
                      onClick={() => {
                        if (iewq?.isPtwRaise && iewq?.isL2Approve) {
                          setSelect(false);
                          setSelectedItems([]);
                        }
                      }}
                      title="Close PTW"
                      className={`p-[1px] ${
                        iewq?.isPtwRaise && iewq?.isL2Approve
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-60"
                      } px-2 rounded-md bg-[#F43F5E]`}
                    >
                      <LuTicketX size={20} />
                    </span>
                  </div>
                  {iewq?._id === ptwOption && (
                    <div className="absolute bg-gray-200 grid p-2 w-[150px] rounded-md right-0 gap-1  top-6 z-40  ">
                      <div
                        onClick={() => {
                          mileStoneItemRef.current = {
                            ...itm,
                            Customer: itm?.customerName,
                            siteId: itm["Site Id"],
                            Milestone: iewq?.Name,
                            mileStoneId: iewq?._id,
                            SSID: itm?.systemId,
                            "Project type": itm?.projectType,
                            "PTW Requestor name": user?.benificiaryname,
                            "Partner name": user?.benificiaryname,
                            "SR Number": itm?.srNumber,
                            "User type": itm?.customerName,

                            Activity: itm?.ACTIVITY || "null",
                            "RFAI Date": itm["RFAI Date"],
                          };

                          setFormName("workatheight");
                        }}
                        className="text-left w-full text-[13px] text-gray-800 text-center font-semibold rounded-md hover:scale-105 hover:bg-gray-500 hover:text-white p-2 w-fit  "
                      >
                        Work At Height
                      </div>
                      <div
                        onClick={() => {
                          mileStoneItemRef.current = {
                            ...itm,
                            Customer: itm?.customerName,
                            siteId: itm["Site Id"],
                            Milestone: iewq?.Name,
                            mileStoneId: iewq?._id,
                            SSID: itm?.systemId,
                            "Project type": itm?.projectType,
                            "PTW Requestor name": user?.benificiaryname,
                            "Partner name": user?.benificiaryname,
                            "SR Number": itm?.srNumber,
                            "User type": itm?.customerName,

                            Activity: itm?.ACTIVITY || "null",
                            "RFAI Date": itm["RFAI Date"],
                          };
                          setFormName("rtws");
                        }}
                        className="text-left w-full text-[13px] text-gray-800 text-center font-semibold rounded-md hover:scale-105 hover:bg-gray-500 hover:text-white p-2 w-fit  "
                      >
                        RTWS
                      </div>
                      <div
                        onClick={() => {
                          mileStoneItemRef.current = {
                            ...itm,
                            Customer: itm?.customerName,
                            siteId: itm["Site Id"],
                            Milestone: iewq?.Name,
                            mileStoneId: iewq?._id,
                            SSID: itm?.systemId,
                            "Project type": itm?.projectType,
                            "PTW Requestor name": user?.benificiaryname,
                            "Partner name": user?.benificiaryname,
                            "SR Number": itm?.srNumber,
                            "User type": itm?.customerName,

                            Activity: itm?.ACTIVITY || "null",
                            "RFAI Date": itm["RFAI Date"],
                          };
                          setFormName("groundactivity");
                        }}
                        className="text-left w-full text-[13px] text-gray-800 text-center font-semibold rounded-md hover:scale-105 hover:bg-gray-500 hover:text-white p-2 w-fit  "
                      >
                        Ground Activity
                      </div>
                      <div
                        onClick={() => {
                          console.log(itm, user, "asdfasdfasdfasd");
                          mileStoneItemRef.current = {
                            ...itm,
                            Customer: itm?.customerName,
                            siteId: itm["Site Id"],
                            Milestone: iewq?.Name,
                            mileStoneId: iewq?._id,
                            SSID: itm?.systemId,
                            "Project type": itm?.projectType,
                            "PTW Requestor name": user?.benificiaryname,
                            "Partner name": user?.benificiaryname,
                            "SR Number": itm?.srNumber,
                            "User type": itm?.customerName,

                            Activity: itm["ACTIVITY"] || "null",
                            "RFAI Date": itm["RFAI Date"],
                          };
                          setFormName("drivetestactivity");
                        }}
                        className="text-left w-full text-[13px] text-gray-800 text-center font-semibold rounded-md hover:scale-105 hover:bg-gray-500 hover:text-white  p-2 w-fit  "
                      >
                        Driver Test Activity
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                iewq?.mileStoneStatus
              ),

            SiteNaming: (
              <p
                className="text-yellow-500 font-extrabold"
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
                  // dispatch(GET_CIRCLE_WITH_PG_DATA({dataAll: [], reset: true}))
                  // dispatch(GET_MAPPED_DATA({dataAll: [], reset: true}))
                  dispatch(AdminActions.getOneProjectTypeDyform(itm.uniqueId));

                  setmodalBody(
                    <ManageMilestoneSite
                      siteCompleteData={itm}
                      uid={itm["uniqueId"]}
                      mileStone={iewq}
                      setGlobalData={setGlobalData}
                      setSiteId={setSiteId}
                      setmodalFullOpen={setmodalFullOpen}
                      projectuniqueId={itm.projectuniqueId}
                      myTaskPage="Yes"
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
                <p className="text-[#13b497] font-extrabold">
                  {iewq.taskageing + " Days"}
                </p>
              ) : (
                <p className="text-rose-400 font-extrabold">
                  {iewq.taskageing + " Days"}
                </p>
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
                                          projectuniqueId,
                                          strValFil
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
                                classes="w-15 bg-rose-400"
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
          };
        }),

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
                                classes="w-15 bg-rose-400"
                                onClick={() => {
                                  dispatch(
                                    CommonActions.deleteApiCallerBulk(
                                      `${Urls.projectList_siteEngineer}`,
                                      { ids: [itm.uniqueId] },
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
  console.log("safasfasfasfasfasdfasdfasdfabc4545", dbConfigList[0]);
  let dbConfigTotalCount =
    useSelector((state) => {
      let interdata = state?.myHomeData?.getmyTask || 0;
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
        name: "Site ID",
        value: "siteIdLink",
        style:
          "min-w-[140px] max-w-[200px] text-center font-extrabold hover:text-[#CA8A04] focus:outline-none hover:font-semibold  sticky left-0 bg-[#3e454d] z-20 cursor-pointer",
      },
      {
        name: "Project ID",
        value: "projectId",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Customer",
        value: "customerName",
        style: "min-w-[140px] max-w-[200px] text-center",
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
      // {
      //   name: "Completion (%)",
      //   value: "CompletionBar",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
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
    ],
    childList: [""],
    childs: {
      milestoneArray: [
        // {
        //   name: "",
        //   value: "checkboxProject",
        //   style: "min-w-[40px] max-w-[40px] text-center",
        // },
        {
          name: "Site ID",
          value: "SiteNaming",
          style: " sticky left-0 bg-[#3e454d] text-center  z-20",
          style: " sticky left-0 bg-[#3e454d] text-center  z-20",
        },
        {
          name: "Project ID",
          value: "projectId",
          style: "  left-[140px] bg-[#3e454d] text-center ",
          style: "  left-[140px] bg-[#3e454d] text-center ",
        },
        {
          name: "",
          value: "",
          style: " left-[140px] bg-[#3e454d] text-center ",
          style: " left-[140px] bg-[#3e454d] text-center ",
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
        // {
        //   name: "Completion (%)",
        //   value: "CompletionBar",
        //   style: "min-w-[140px] max-w-[200px] text-center",
        // },

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
        // ...(shouldIncludeEditColumn
        //   ? [
        //       {
        //         name: "Delete",
        //         value: "deleteing",
        //         style: "min-w-[50px] max-w-[100px] text-center",
        //       },
        //     ]
        //   : []),
        // {
        //   name: "Delete",
        //   value: "deleteing",
        //   style: "min-w-[50px] max-w-[100px] text-center",
        // },
      ],
    },
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Customer",
        type: "select",
        name: "customer",
        option: customerList,
        props: {
          onChange: (e) => {
            if (e.target.value) {
              dispatch(
                FilterActions.getMyTaskSubProject(true, "", e.target.value)
              );
            } else {
              dispatch(
                GET_FILTER_MYTASK_SUBPROJECT({ dataAll: [], reset: true })
              );
            }
          },
        },
      },
      {
        label: "Sub Project",
        type: "select",
        name: "subProject",
        option: subProjectList,
        props: {},
      },
      {
        label: "Site Status",
        type: "select",
        name: "siteStatus",
        option: [
          { label: "Open", value: "Open" },
          { label: "Close", value: "Close" },
          { label: "Drop", value: "Drop" },
          { label: "All", value: "all" },
        ],
        props: {},
      },
      {
        label: "MileStone Status",
        type: "select",
        name: "mileStoneStatus",
        option: [
          { label: "Open", value: "Open" },
          { label: "In Process", value: "In Process" },
          { label: "Submit", value: "Submit" },
          { label: "Approve", value: "Approve" },
          { label: "Submit to Airtel", value: "Submit to Airtel" },
          { label: "Reject", value: "Reject" },
          { label: "Closed", value: "Closed" },
          { label: "All", value: "All" },
        ],
        props: {},
      },
    ],
  };

  const onSubmit = (data) => {
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
    setstrVal(strVal);
    dispatch(MyHomeActions.getMyTask(true, strVal));
  };
  useEffect(() => {
    setFormName("");
    dispatch(AdminActions.getManageCustomer());
    dispatch(MyHomeActions.getMyTask());
    dispatch(GET_FILTER_MYTASK_SUBPROJECT({ dataAll: [], reset: true }));
  }, []);

  const handleBulkDelte = () => {};

  const handleContinue = (opId) => {
    if (selectedItems.length === 0) {
      alert("Please select at least one form.");
      return;
    }

    const sortedItems = FORM_FLOW_SEQUENCE.map((id) =>
      selectedItems.find((item) => item.id === id)
    ).filter(Boolean);

    setSelectedItems(sortedItems);
    setIsMultiStep(true);
    setCurrentStepIndex(0);
    setSelect(false);

    const firstForm = sortedItems[0];
    setPtwModalHead({
      title: firstForm.name,
      value: firstForm.id,
    });
  };

  return (
    <>
      <AdvancedTableExpandable
        parentsite={parentsite}
        childsite={childsite}
        searchView={
          <>
            <SearchBarView
              onblur={(e) => {}}
              onchange={(e) => {
                const siteNameQuery =
                  (e.target.value ? "siteName=" + (e.target.value + "&") : "") +
                  strValFil;
                dispatch(MyHomeActions.getMyTask(true, siteNameQuery));
              }}
              placeHolder={"Site Name"}
            />

            <SearchBarView
              onblur={(e) => {}}
              onchange={(e) => {
                dispatch(
                  MyHomeActions.getMyTask(
                    true,
                    (e.target.value
                      ? "mileStoneName=" + (e.target.value + "&")
                      : "") + strValFil
                  )
                );
              }}
              placeHolder={"Milestone Name"}
            />
          </>
        }
        headerButton={
          <div className="flex gap-1">
            {Array.isArray(parentsite) && parentsite?.length > 0 && (
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
              showType={getAccessType("Export(Site)")}
              classes="w-auto "
              onClick={(e) => {
                dispatch(
                  CommonActions.commondownload(
                    "/export/myTask?" + strValFil,
                    "Export_My_Task.xlsx"
                  )
                );
              }}
              name={"Export"}
            ></ConditionalButton>
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
        heading={"Total Sites:-"}
        TableHeight="h-[70vh]"
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
      <Modal
        size={"lg"}
        modalHead={ptwModalHead.title}
        children={
          isSelect ? (
            <div className="max-w-md mx-auto mt-8  rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Select Your Forms
              </h2>

              <div className="space-y-3 mb-6">
                {options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.some(
                        (item) => item.id === option.id
                      )}
                      onChange={() =>
                        handleCheckboxChange(option.id, option.name)
                      }
                      className="w-4 h-4 text-white bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-white">{option.name}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => handleContinue(sessionStorage.getItem("opid"))}
                className="w-full bg-[#13B497] text-white py-2 px-4 rounded-lg hover:bg-[#0c8b74] transition-colors duration-200 font-medium"
              >
                Continue
              </button>
            </div>
          ) : (
            ptwModalBody
          )
        }
        isOpen={ptwModalFullOpen}
        setIsOpen={setPtwModalFullOpen}
      />
      <Modal
        size={"sm"}
        modalHead={"Select PTW L1 Approver"}
        children={ptwApprovalModalBody}
        isOpen={ptwModalFullApprovalOpen}
        setIsOpen={setPtwModalFullApprovalOpen}
      />
      <Modal
        size={"xl"}
        modalHead={""}
        children={
          <div className="w-full flex flex-col items-center p-4 min-h-[50vh] max-h-[80vh] overflow-y-auto">
            <div className="flex gap-6 text-white mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="vehicleType"
                  value="twowheeler"
                  checked={vehicleType === "twowheeler"}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Two Wheeler</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="vehicleType"
                  value="fourwheeler"
                  checked={vehicleType === "fourwheeler"}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Four Wheeler</span>
              </label>
            </div>

            <div className="w-full ">
              {vehicleType === "twowheeler" ? (
                <>
                  <h1 className="text-white text-xl py-2">
                    Two Wheeler Photo Data
                  </h1>
                  <CommonForm
                    classes="grid-cols-3 gap-4"
                    Form={subFormRef.current?.twowheeler}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                </>
              ) : (
                <>
                  <h1 className="text-white text-xl py-2">
                    Four Wheeler Photo Data
                  </h1>
                  <CommonForm
                    classes="grid-cols-3 gap-4"
                    Form={subFormRef.current?.fourwheeler}
                    errors={errorsForm1}
                    register={registerForm1}
                    setValue={setValueForm1}
                    getValues={getValuesForm1}
                  />
                </>
              )}
            </div>

            <div className="w-full flex justify-center mt-6">
              {vehicleType === "twowheeler" ? (
                <Button
                  name="Submit"
                  className="w-fit bg-[#13B497] text-white py-2 px-4 rounded-lg hover:bg-[#0c8b74] transition-colors duration-200 font-medium"
                  onClick={handleSubmit((data) =>
                    handleVaichel(data, "twowheeler")
                  )}
                />
              ) : (
                <Button
                  name="Submit"
                  className="w-fit bg-[#13B497] text-white py-2 px-4 rounded-lg hover:bg-[#0c8b74] transition-colors duration-200 font-medium"
                  onClick={handleSubmitForm1((data) =>
                    handleVaichel(data, "fourwheeler")
                  )}
                />
              )}
            </div>
          </div>
        }
        isOpen={ptwDriveTest}
        setIsOpen={setPtwDriveTest}
      />
    </>
  );
};

export default MyTask;
