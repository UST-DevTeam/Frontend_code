import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import ManageProjectTypeForm from "../ManageProjectType/ManageProjectTypeForm";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import ToggleButton from "../../../../components/ToggleButton";
import {
  getAccessType,
  labelToValue,
  objectToQueryString,
} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
// import AdminActions from '../../../../store/actions/admin-actions';
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import CCDash from "../../../../components/CCDash";
import CommonForm from "../../../../components/CommonForm";
import CommonTableForm from "../../../../components/CommonTableForm";
import CommonTableFormParent from "../../../../components/CommonTableFormSiteParent";
import CommonTableFormSiteParent from "../../../../components/CommonTableFormSiteParent";
import { SET_DYNAMIC_FORM } from "../../../../store/reducers/projectList-reducer";
import projectListActions from "../../../../store/actions/projectList-actions";
import { uiStatusColor } from "../../../../utils/queryBuilder";
import CompletitonCreiteriaForm from "./CompletitonCreiteriaForm";
import ConditionalButton from "../../../../components/ConditionalButton";
import moment from "moment";

const ManageMilestoneSite = ({
  siteCompleteData,
  uid,
  mileStone,
  setGlobalData,
  projectuniqueId,
  setmodalFullOpen,
  setSiteId,
}) => {
  const { customeruniqueId } = useParams();
  const today = moment().format("YYYY-MM-DD");

  let assignedToCount = mileStone?.assignerResult?.length || 0;

  const {
    register,
    handleSubmit,
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
  const {
    register: registerForm2,
    setValue: setValueForm2,
    getValues: getValuesForm2,
    handleSubmit: handleSubmitForm2,
    formState: { errors: errorsForm2 },
  } = useForm();
  const {
    register: registerForm3,
    setValue: setValueForm3,
    getValues: getValuesForm3,
    handleSubmit: handleSubmitForm3,
    formState: { errors: errorsForm3 },
  } = useForm();
  const {
    register: registerForm4,
    setValue: setValueForm4,
    getValues: getValuesForm4,
    handleSubmit: handleSubmitForm4,
    formState: { errors: errorsForm4 },
  } = useForm();

  const [modalOpen, setmodalOpen] = useState(false);

  const [type, settype] = useState(true);
  const [modalHead, setmodalHead] = useState(<></>);

  const [modalBody, setmodalBody] = useState(<></>);
  const [invoiceData, setinvoiceData] = useState([]);

  const [uniqueness, setUniqueness] = useState("");

  const [listing, setlisting] = useState([]);

  const dispatch = useDispatch();

  let circleWithPGList = useSelector((state) => {
    return state?.projectList?.getCircleWithPGData?.map((itm) => {
      return {
        label: itm.Circle,
        value: itm.Circle,
      };
    });
  });

  let bandList = useSelector((state) => {
    return state?.projectList?.getCircleWithPGData?.flatMap((itm) => {
      
      return Object.keys(itm).includes('BAND') ? itm?.BAND?.split(",").map((its) => {
        return {
          "label": its,
          "value": its
        }
      }) : []
    }) || []
  });

  let dataOfOldProject = useSelector((state) => {
    let datew = state.adminData.getOneProjectTypeDyform;
    
    if (type && datew && datew.length > 0) {
      settype(false);

      let dtresult = datew[0]["result"];

      // setinvoiceData(datew[0]["invoice"] ? datew[0]["invoice"] : []);
      // console.log(setinvoiceData, "setinvoiceData");

      // let dtresult1 = [{ "fieldName": "Circle" },{ "fieldName": "BAND" }, ...dtresult["t_sengg"]]

      dtresult["t_sengg"] &&
        dtresult["t_sengg"].map((iytm) => {
          setValueForm1(iytm["fieldName"], datew[0][iytm["fieldName"]]);

          console.log(
            iytm["fieldName"],
            datew[0][iytm["fieldName"]],
            "iytmiytmiytmiytm"
          );
        });
      // let dtresult1 = [{ "fieldName": "Circle" },{ "fieldName": "BAND" }, ...dtresult["t_sengg"]]

      //   dtresult1.map((iytm) => {
      //     setValueForm1(iytm["fieldName"], datew[0][iytm["fieldName"]]);

      //     console.log(
      //       iytm["fieldName"],
      //       datew[0][iytm["fieldName"]],
      //       "iytmiytmiytmiytm"
      //     );
      //   });
      dtresult["t_tracking"] &&
        dtresult["t_tracking"].map((iytm) => {
          setValueForm2(iytm["fieldName"], datew[0][iytm["fieldName"]]);

          console.log(
            iytm["fieldName"],
            datew[0][iytm["fieldName"]],
            "iytmiytmiytmiytm"
          );
        });
      dtresult["t_issues"] &&
        dtresult["t_issues"].map((iytm) => {
          setValueForm3(iytm["fieldName"], datew[0][iytm["fieldName"]]);
          console.log(
            iytm["fieldName"],
            datew[0][iytm["fieldName"]],
            "iytmiytmiytmiytm"
          );
        });
      // dtresult["t_sFinancials"] &&
      //   dtresult["t_sFinancials"].map((iytm) => {
      //     setValueForm4(iytm["fieldName"], datew[0][iytm["fieldName"]]);

      //     console.log(
      //       iytm["fieldName"],
      //       datew[0][iytm["fieldName"]],
      //       "====================157"
      //     );
      //   });
      console.log(
        type,
        state.adminData.getOneProjectTypeDyform,
        state.adminData.getOneProjectTypeDyform,
        "dataOfOldProjectdataOfOldProjectdataOfOldProject"
      );

      return datew[0];
    }
  });
  let dataOfProject = useSelector((state) => {
    let dataOlder = state.adminData.getOneProjectTypeDyform
      ? state.adminData.getOneProjectTypeDyform.length > 0
        ? state.adminData.getOneProjectTypeDyform[0]["result"]
        : state.adminData.getOneProjectTypeDyform
      : state.adminData.getOneProjectTypeDyform;

    return dataOlder;
    if (dataOlder.length > 0 && dataOlder[0]["t_sengg"]) {
      let data = dataOlder[0]["t_sengg"].map((its) => {
        return {
          label: its.fieldName,
          required: its.required,
          value: "",
          name: its.fieldName,
          type: its.dataType,
        };
      });
      return data;
    } else {
      return [];
    }
  });

  const handleSiteEnggSubmit = (data) => {
    let final_data = {};
    console.log("afasdflasdfghfjioasdfoa",data);
    dataOfProject["t_sengg"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);

      final_data[fieldNaming] = data[fieldNaming];
    });

    // dispatch(projectListActions.globalProjectTypeDataPatch(Urls.projectList_globalSaver, projectuniqueId, final_data, () => { }))

    let fdata = {
      name: "updateSiteEngg",
      data: final_data,
      from: {
        uid: uid,
      },
    };

    dispatch(
      projectListActions.globalProjectTypeDataPatch(
        Urls.projectList_globalSaver,
        projectuniqueId,
        fdata,
        () => {
          dispatch(projectListActions.getProjectTypeAll(projectuniqueId));
        }
      )
    );

    // setGlobalData(prev => {
    //     return {
    //         ...prev,
    //         "siteEngineer": final_data
    //     }
    // })
    // setmodalFullOpen(false)

    // dispatch(projectListActions.submitProjectTypeData(Urls.projectList_siteEngineer, final_data, () => {

    //     dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
    // }))

    console.log(data, dataOfProject["uniqueId"], "dasugdjsahj");
  };

  // const handleTrackingSubmit = (data) => {

  //     console.log(data, "dasugdjsahj")
  //     setSiteId(data["siteid"] ? data["siteid"] : "Add")

  //     let final_data = {
  //         "SubProjectId": dataOfProject["uniqueId"],
  //         "new_u_id": dataOfProject["new_u_id"],
  //         "projectuniqueId": projectuniqueId

  //     }
  //     dataOfProject["t_tracking"].map((itew) => {
  //         let fieldNaming = labelToValue(itew.fieldName)

  //         final_data[fieldNaming] = data[fieldNaming]
  //     })

  //     dispatch(projectListActions.submitProjectTypeData(Urls.projectList_trackingData, final_data, () => {
  //         setmodalFullOpen(false)
  //         dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
  //     }))

  // }

  // const handleIssuesSubmit = (data) => {

  //     console.log(data, "dasugdjsahj")
  //     setSiteId(data["siteid"] ? data["siteid"] : "Add")

  //     let final_data = {
  //         "SubProjectId": dataOfProject["uniqueId"],
  //         "new_u_id": dataOfProject["new_u_id"],
  //         "projectuniqueId": projectuniqueId

  //     }
  //     dataOfProject["t_issues"].map((itew) => {
  //         let fieldNaming = labelToValue(itew.fieldName)

  //         final_data[fieldNaming] = data[fieldNaming]
  //     })

  //     dispatch(projectListActions.submitProjectTypeData(Urls.projectList_issueData, final_data, () => {
  //         setmodalFullOpen(false)
  //         dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
  //     }))

  // }

  // const handleFinancialsSubmit = (data) => {

  //     console.log(data, "dasugdjsahj")
  //     setSiteId(data["siteid"] ? data["siteid"] : "Add")

  //     let final_data = {
  //         "SubProjectId": dataOfProject["uniqueId"],
  //         "new_u_id": dataOfProject["new_u_id"],
  //         "projectuniqueId": projectuniqueId

  //     }
  //     dataOfProject["t_sFinancials"].map((itew) => {
  //         let fieldNaming = labelToValue(itew.fieldName)

  //         final_data[fieldNaming] = data[fieldNaming]
  //     })

  //     dispatch(projectListActions.submitProjectTypeData(Urls.projectList_financialData, final_data, () => {
  //         setmodalFullOpen(false)
  //         dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
  //     }))

  // }

  const handleTrackingSubmit = (data) => {
    console.log(data, "dasugdjsahj");
    // setSiteId(data["siteid"]?data["siteid"]:"Add")

    // let final_data = {
    //     "SubProjectId": dataOfProject["uniqueId"],
    //     "new_u_id": dataOfProject["new_u_id"],
    //     "projectuniqueId": projectuniqueId

    // }
    // dataOfProject["t_tracking"].map((itew) => {
    //     let fieldNaming = labelToValue(itew.fieldName)

    //     final_data[fieldNaming] = data[fieldNaming]
    // })

    // dispatch(projectListActions.submitProjectTypeData(Urls.projectList_trackingData, final_data, () => {
    //     setmodalFullOpen(false)
    //     dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
    // }))

    let final_data = {};
    dataOfProject["t_tracking"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);

      final_data[fieldNaming] = data[fieldNaming];
    });

    let fdata = {
      name: "updateSiteEngg",
      data: final_data,
      from: {
        uid: uid,
      },
    };

    dispatch(
      projectListActions.globalProjectTypeDataPatch(
        Urls.projectList_globalSaver,
        projectuniqueId,
        fdata,
        () => {}
      )
    );

    // let final_data = {
    // }
    // dataOfProject["t_tracking"].map((itew) => {
    //     let fieldNaming = labelToValue(itew.fieldName)

    //     final_data[fieldNaming] = data[fieldNaming]
    // })

    // setGlobalData(prev=>{
    //     return {
    //         ...prev,
    //         "t_tracking":final_data
    //     }
    // })
    // setmodalFullOpen(false)
  };

  const handleIssuesSubmit = (data) => {
    // console.log(data, "dasugdjsahj")
    // setSiteId(data["siteid"]?data["siteid"]:"Add")

    // let final_data = {
    //     "SubProjectId": dataOfProject["uniqueId"],
    //     "new_u_id": dataOfProject["new_u_id"],
    //     "projectuniqueId": projectuniqueId

    // }
    // dataOfProject["t_issues"].map((itew) => {
    //     let fieldNaming = labelToValue(itew.fieldName)

    //     final_data[fieldNaming] = data[fieldNaming]
    // })

    // dispatch(projectListActions.submitProjectTypeData(Urls.projectList_issueData, final_data, () => {
    //     setmodalFullOpen(false)
    //     dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
    // }))

    let final_data = {};
    dataOfProject["t_issues"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);

      final_data[fieldNaming] = data[fieldNaming];
    });

    let fdata = {
      name: "updateSiteEngg",
      data: final_data,
      from: {
        uid: uid,
      },
    };

    dispatch(
      projectListActions.globalProjectTypeDataPatch(
        Urls.projectList_globalSaver,
        projectuniqueId,
        fdata,
        () => {}
      )
    );

    // dispatch(projectListActions.globalProjectTypeDataPatch(Urls.projectList_globalSaver, projectuniqueId, final_data, () => { }))

    // let final_data = {
    // }
    // dataOfProject["t_issues"].map((itew) => {
    //     let fieldNaming = labelToValue(itew.fieldName)

    //     final_data[fieldNaming] = data[fieldNaming]
    // })

    // setGlobalData(prev=>{
    //     return {
    //         ...prev,
    //         "t_issues":final_data
    //     }
    // })
    // setmodalFullOpen(false)
  };

  const handleFinancialsSubmit = (data) => {
    // console.log(data, "dasugdjsahj")
    // setSiteId(data["siteid"]?data["siteid"]:"Add")

    // let final_data = {
    //     "SubProjectId": dataOfProject["uniqueId"],
    //     "new_u_id": dataOfProject["new_u_id"],
    //     "projectuniqueId": projectuniqueId

    // }
    // dataOfProject["t_sFinancials"].map((itew) => {
    //     let fieldNaming = labelToValue(itew.fieldName)

    //     final_data[fieldNaming] = data[fieldNaming]
    // })

    // dispatch(projectListActions.submitProjectTypeData(Urls.projectList_financialData, final_data, () => {
    //     setmodalFullOpen(false)
    //     dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
    // }))

    let final_data = {};
    dataOfProject["t_sFinancials"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);

      final_data[fieldNaming] = data[fieldNaming];
    });

    let fdata = {
      name: "updateSiteEngg",
      data: final_data,
      from: {
        uid: uid,
      },
    };

    dispatch(
      projectListActions.globalProjectTypeDataPatch(
        Urls.projectList_globalSaver,
        projectuniqueId,
        fdata,
        () => {}
      )
    );

    // let updatedData = {
    //     "": ""
    // }

    // dispatch(projectListActions.globalProjectTypeDataPatch(Urls.projectList_globalSaver, projectuniqueId, final_data, () => { }))

    // let final_data = {
    // }
    // dataOfProject["t_sFinancials"].map((itew) => {
    //     let fieldNaming = labelToValue(itew.fieldName)

    //     final_data[fieldNaming] = data[fieldNaming]
    // })

    // setGlobalData(prev=>{
    //     return {
    //         ...prev,
    //         "t_sFinancials":final_data
    //     }
    // })
    // setmodalFullOpen(false)
  };
  const funcaller = () => {
    reset({});
  };

  const bodyData = [];

  const handleAddActivity = (res, targ, itm) => {
    console.log(
      res,
      "uniqueness",
      itm.uniqueId,
      "uniqueness",
      "handleAddActivity"
    );

    let newdata = {
      [targ]: res,
    };

    dispatch(
      AdminActions.patchManageProjectType(true, itm.uniqueId, newdata, () => {
        // alert("done")

        dispatch(AdminActions.getManageProjectType(customeruniqueId));
      })
    );
  };

  useEffect(() => {
    reset({});
    settype(true);
    // dispatch(AdminActions.getOneManageProjectType("65dee316811c797c9f26d836/65e59c4488b1db430076f576"))
  }, [uid]);

  let dtype = {
    Decimal: "number",
    Text: "text",
    Dropdown: "select",
    Number: "number",
    Date: "datetime",
    "Auto Created": "sdisabled",
  };

  // console.log(dataOfProject ? dataOfProject["t_sengg"] ? dataOfProject["t_sengg"].map((its) => {
  //     return {
  //         label: "abc",
  //         value: "",
  //         name: "",
  //         type: "text"
  //     }
  // }) : [] : [], "dsadasssssssssssssssssssssssssss")

  const filesUploadForm = [
    { label: "file", value: "", name: "file", required: true, type: "file" },
    { label: "Note", value: "", name: "note", required: true, type: "text" },
  ];
  return (
    <>
      <Modal
        children={modalBody}
        setIsOpen={setmodalOpen}
        isOpen={modalOpen}
        size={"lg"}
      />
      <div className="p-4">
        {/* <Button /> */}
        {mileStone.assignerResult ? (
          <div className="flex flex-row">
            <div className="w-full">
              <div className="w-auto">
                <h1>Milestone Status</h1>
                {
                  <p
                    className={`w-20 rounded-xl text-center ${
                      uiStatusColor[mileStone?.mileStoneStatus]
                    }`}
                  >
                    {mileStone?.mileStoneStatus}
                  </p>
                }
              </div>
            </div>
            <div className="w-full">
              <ConditionalButton
                showType={getAccessType("Task Completion Criteria")}
                classes="w-auto "
                name={"Completion Criteria"}
                onClick={() => {
                  if (assignedToCount != 0) {
                    setmodalBody(
                      <CompletitonCreiteriaForm
                        siteCompleteData={siteCompleteData}
                        customeruniqueId={customeruniqueId}
                        projectuniqueId={projectuniqueId}
                        setmodalFullOpen={setmodalFullOpen}
                        setmodalOpen={setmodalOpen}
                        mileStone={mileStone}
                      />
                    );
                    setmodalOpen(true);
                  } else {
                    let msgdata = {
                      show: true,
                      icon: "error",
                      buttons: [],
                      type: 1,
                      text: "For Closing this task you need to assign first?",
                    };
                    dispatch(ALERTS(msgdata));
                  }
                }}
              ></ConditionalButton>
            </div>
          </div>
        ) : (
          <></>
        )}

        <CommonTableFormSiteParent
          funcaller={funcaller}
          defaultValue={"Site Engg"}
          tabslist={{
            "Site Engg": (
              <>
                <div className="flex justify-end">
                  <Button
                    classes="w-30"
                    name="Save Site Engg"
                    onClick={handleSubmitForm1(handleSiteEnggSubmit)}
                  />
                </div>
                <CommonForm
                  classes={"grid-cols-4 gap-1"}
                  Form={
                    dataOfProject
                      ? dataOfProject["t_sengg"]
                        ? dataOfProject["t_sengg"].map((its) => {
                          let type = dtype[its.dataType]
                            let option = its.dropdownValue
                                ? its.dropdownValue.split(",").map((itm) => {
                                  return {
                                    value: itm,
                                    label: itm,
                                  };
                                })
                                : []
                            
                            if (its['fieldName'] === "Circle"){
                               option = circleWithPGList;
                               type = "select"
                            }
                            if (its['fieldName'] === "BAND"){
                              option = bandList;
                              type = "select"
                            }

                            return {
                              label: its.fieldName,
                              value: "",
                              required: its.required == "Yes" ? true : false,
                              option: option,
                              name: its.fieldName,
                              type: type,
                              props: {
                              maxSelectableDate: today,
                            },
                            };
                          })
                        : []
                      : []
                  }
                  // Form={filesUploadForm}
                  errors={errorsForm1}
                  register={registerForm1}
                  setValue={setValueForm1}
                  getValues={getValuesForm1}
                />
              </>
            ),
            Tracking: (
              <>
                <div className="flex justify-end">
                  <Button
                    classes="w-30"
                    name="Save Tracking"
                    onClick={handleSubmitForm2(handleTrackingSubmit)}
                  />
                </div>
                <CommonForm
                  classes={"grid-cols-4 gap-1"}
                  Form={
                    dataOfProject
                      ? dataOfProject["t_tracking"]
                        ? dataOfProject["t_tracking"].map((its) => {
                            return {
                              label: its.fieldName,
                              value: "abc",
                              name: its.fieldName,
                              type: dtype[its.dataType],
                              props: {
                              maxSelectableDate: today,
                            },
                            };
                          })
                        : []
                      : []
                  }
                  // Form={filesUploadForm}
                  errors={errorsForm2}
                  register={registerForm2}
                  setValue={setValueForm2}
                  getValues={getValuesForm2}
                />
              </>
            ),
            Issues: (
              <>
                <div className="flex justify-end">
                  <Button
                    classes="w-30"
                    name="Save Issues"
                    onClick={handleSubmitForm3(handleIssuesSubmit)}
                  />
                </div>
                <CommonForm
                  classes={"grid-cols-4 gap-1"}
                  Form={
                    dataOfProject
                      ? dataOfProject["t_issues"]
                        ? dataOfProject["t_issues"].map((its) => {
                            return {
                              label: its.fieldName,
                              value: "abc",
                              name: its.fieldName,
                              type: dtype[its.dataType],
                              props: {
                              maxSelectableDate: today,
                            },
                            };
                          })
                        : []
                      : []
                  }
                  // Form={filesUploadForm}
                  errors={errorsForm3}
                  register={registerForm3}
                  setValue={setValueForm3}
                  getValues={getValuesForm3}
                />
              </>
            ),
            // Financials: (
            //   <>
            //     <div className="flex justify-end">
            //       <Button
            //         classes="w-30"
            //         name="Save Tracking"
            //         onClick={handleSubmitForm4(handleFinancialsSubmit)}
            //       />
            //     </div>
            //     <CommonForm
            //       classes={"grid-cols-4 gap-1"}
            //       Form={
            //         dataOfProject
            //           ? dataOfProject["t_sFinancials"]
            //             ? dataOfProject["t_sFinancials"].map((its) => {
            //                 return {
            //                   label: its.fieldName,
            //                   value: "abc",
            //                   name: its.fieldName,
            //                   type: dtype[its.dataType],
            //                 };
            //               })
            //             : []
            //           : []
            //       }
            //       // Form={filesUploadForm}
            //       errors={errorsForm4}
            //       register={registerForm4}
            //       setValue={setValueForm4}
            //       getValues={getValuesForm4}
            //     />
            //   </>
            // ),
            Financials: (
              <>
                <div className="flex justify-end">
                  <Button
                    classes="w-30"
                    name="Save Financial"
                    onClick={handleSubmitForm4(handleFinancialsSubmit)}
                  />
                </div>

                <div className="overflow-auto h-[80vh]">
                  {dataOfProject &&
                    Array.isArray(dataOfProject["t_sFinancials"]) &&
                    dataOfProject["t_sFinancials"] && (
                      <table className="border-collapse border" border="2">
                        <tr className="border border-black">
                          {dataOfProject["t_sFinancials"].map((its) => {
                            return (
                              <th className="px-2 w-auto whitespace-nowrap border-[1.5px] border-black p-1 bg-[#143b64] text-white ">
                                {its.fieldName}
                              </th>
                            );
                          })}
                        </tr>

                        {(() => {
                          let tamount = 0;

                          // Your map function
                          return (
                            <>
                              {invoiceData.map((itm, index) => {
                                return (
                                  <tr
                                    key={index}
                                    className="text-[11px] h-2 pl-1 border-black text-center border-[1.5px] overflow-hidden text-slate-700"
                                  >
                                    {dataOfProject["t_sFinancials"].map(
                                      (its, columnIndex) => {
                                        const value = itm[its.fieldName];
                                        if (typeof value !== "undefined") {
                                          if (its.fieldName == "Amount") {
                                            tamount = tamount + value;
                                            return (
                                              <td
                                                key={columnIndex}
                                                className=" border-black border-[1.5px]"
                                              >
                                                {value}
                                              </td>
                                            );
                                          } else {
                                            return (
                                              <td
                                                key={columnIndex}
                                                className=" border-[1px] border-black "
                                              >
                                                {value}
                                              </td>
                                            );
                                          }
                                        } else {
                                          console.error(
                                            `Missing data for field "${its.fieldName}"`
                                          );
                                          return <td key={columnIndex}>N/A</td>;
                                        }
                                      }
                                    )}
                                  </tr>
                                );
                              })}
                              <>
                                <tr
                                  className="text-[11px] h-2 pl-1 border-black text-center border-[1.5px] overflow-hidden text-slate-800"
                                  
                                >
                                  <td
                                    colSpan={
                                      dataOfProject["t_sFinancials"].length
                                    }
                                  >
                                    <p className="float-right p-2 rounded-sm bg-yellow-300">Total Amount = {tamount}</p>
                                  </td>
                                </tr>
                              </>
                            </>
                          );
                        })()}

                        {}
                      </table>
                    )}
                </div>
              </>
            ),
          }}
        />
      </div>
    </>
  );
};

export default ManageMilestoneSite;
