import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import {getAccessType,labelToValue,objectToQueryString,} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import CommonForm from "../../../../components/CommonForm";
import CommonTableFormSiteParent from "../../../../components/CommonTableFormSiteParent";
import { SET_DYNAMIC_FORM } from "../../../../store/reducers/projectList-reducer";
import projectListActions from "../../../../store/actions/projectList-actions";
import { uiStatusColor } from "../../../../utils/queryBuilder";
// import CompletitonCreiteriaForm from "./CompletitonCreiteriaForm";
import ConditionalButton from "../../../../components/ConditionalButton";
import ManageSnap from "./ManageSnap"
import moment from "moment";

const ManageComplianceTemplateForm = ({
  siteCompleteData,
  uid,
  mileStone,
  setGlobalData,
  projectuniqueId,
  setmodalFullOpen,
  setSiteId,
  myTaskPage,
  filterView
}) => {
  const { customeruniqueId } = useParams;
  const today = moment().format("YYYY-MM-DD");
  let assignedToCount = mileStone?.assignerResult?.length || 0;
  let milestoneStatus = mileStone?.mileStoneStatus
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;



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
  } 
  = useForm();
  const {
    register: registerForm5,
    setValue: setValueForm5,
    getValues: getValuesForm5,
    handleSubmit: handleSubmitForm5,
    formState: { errors: errorsForm5 },
  } 
  = useForm();
  const {
    register: registerForm0,
    setValue: setValueForm0,
    getValues: getValuesForm0,
    handleSubmit: handleSubmitForm0,
    formState: { errors: errorsForm0 },
  } = useForm();

  const [modalOpen, setmodalOpen] = useState(false);

  const [type, settype] = useState(true);
  const [modalHead, setmodalHead] = useState(<></>);

  const [modalBody, setmodalBody] = useState(<></>);
  const [invoiceData, setinvoiceData] = useState([]);

  const [uniqueness, setUniqueness] = useState("");

  const [listing, setlisting] = useState([]);

  const dispatch = useDispatch();

  let showType = getAccessType("Financial button under Template");

  let assignfinacial = false;

  if (showType === "visible") {
    assignfinacial = true;
  }


  let dataOfOldProject = useSelector((state) => {
    let datew = state.adminData.getOneProjectTypeDyform;

    if (type && datew && datew.length > 0) {
      settype(false);

      let dtresult = datew[0]["result"];

      setinvoiceData(datew[0]["invoice"] ? datew[0]["invoice"] : []);
      // console.log(setinvoiceData, "setinvoiceData");

      // let dtresult1 = [{ "fieldName": "Circle" },{ "fieldName": "BAND" }, ...dtresult["t_sengg"]]

      dtresult["planDetails"] &&
        dtresult["planDetails"].map((iytm) => {

          if(iytm["fieldName"]=="BAND"){
            let bandlistt=datew[0]["BAND"]

            setValueForm1("BAND", bandlistt?.split("-")?.join(","));
          }
          else if(iytm["fieldName"]=="CELL ID"){
            let cellidlistt=datew[0]["CELL ID"]

            setValueForm1("CELL ID", cellidlistt?.split("-")?.join(","));
          }else{
            setValueForm1(iytm["fieldName"], datew[0][iytm["fieldName"]]);
          }
          console.log(
            iytm["fieldName"],
            datew[0][iytm["fieldName"]],
            "iytmiytmiytmiytm"
          );

        });

      dtresult["siteDetails"] &&
        dtresult["siteDetails"].map((iytm) => {
          setValueForm2(iytm["fieldName"], datew[0][iytm["fieldName"]]);

        });
      dtresult["ranChecklist"] &&
        dtresult["ranChecklist"].map((iytm) => {
          setValueForm3(iytm["fieldName"], datew[0][iytm["fieldName"]]);
        });
      dtresult["snap"] &&
        dtresult["snap"].map((iytm) => {
          setValueForm4(iytm["fieldName"], datew[0][iytm["fieldName"]]);
        });
      dtresult["acceptanceLog"] &&
        dtresult["acceptanceLog"].map((iytm) => {
          setValueForm5(iytm["fieldName"], datew[0][iytm["fieldName"]]);
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
    

      return datew[0];
    }
  });

  let dataOfProject = useSelector((state) => {
    let dataOlder = state.adminData.getOneComplianceDyform
      ? state.adminData.getOneComplianceDyform.length > 0
        ? state.adminData.getOneComplianceDyform[0]["result"]
        : state.adminData.getOneComplianceDyform
      : state.adminData.getOneComplianceDyform;


    return dataOlder;


    if (dataOlder.length > 0 && dataOlder[0]["planDetails"]) {
      let data = dataOlder[0]["planDetails"].map((its) => {
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

  const handleTemplateSubmit = (data) => {

    let final_data = {};
    dataOfProject["template"].map((itew) => {
        
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

  };

  const handlePlanDetailsSubmit = (data) => {
    let final_data = {};
    dataOfProject["planDetails"].map((itew) => {

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

  };

  const handleSiteDetailsSubmit = (data) => {

    let final_data = {};
    dataOfProject["siteDetails"].map((itew) => {

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

  };

  const handleRanCheckListSubmit = (data) => {
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
    dataOfProject["ranChecklist"].map((itew) => {
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

  const handleSnapSubmit = (data) => {

    let final_data = {};
    dataOfProject["snap"].map((itew) => {
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
  const handleAcceptanceLogSubmit = (data) => {

    let final_data = {};
    dataOfProject["acceptanceLog"].map((itew) => {
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
      AdminActions.patchManageProjectType(true, itm.uniqueId, newdata, () => {})
    );
  };

  useEffect(() => {

    // dispatch(projectListActions.getCircleWithPGData(projectuniqueId));
    // dispatch(projectListActions.getMappedData(projectuniqueId))
    
    reset({});
    settype(true);
    
    dispatch(AdminActions.getManageCompletionCriteria());
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
        modalHead = "Compliance Form"
        children={modalBody}
        setIsOpen={setmodalOpen}
        isOpen={modalOpen}
        size={"full1"}
      />


      <div className="overflow-scroll  h-[94vh] p-4">
      <CommonTableFormSiteParent
        funcaller={funcaller}
        defaultValue={"Template"}
        tabslist={{
            "Template": (
              <>
                <div className="flex justify-end">
                  <Button
                    classes="w-30"
                    name="Save Template"
                    onClick={handleSubmitForm0(handleTemplateSubmit)}
                  />
                </div>
                <CommonForm
                  classes={"grid-cols-4 gap-1 mt-1"}
                  Form={
                    dataOfProject
                      ? dataOfProject["Template"]
                        ? dataOfProject["Template"].map((its) => {
                            let type = dtype[its.dataType];
                            let option = its.dropdownValue
                              ? its.dropdownValue.split(",").map((itm) => {
                                  return {
                                    value: itm,
                                    label: itm,
                                  };
                                })
                              : [];

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
                  errors={errorsForm0}
                  register={registerForm0}
                  setValue={setValueForm0}
                  getValues={getValuesForm0}
                />
              </>
            ),
            
        }}
        />
        <CommonTableFormSiteParent
          funcaller={funcaller}
          defaultValue={"Planning Details"}
          tabslist={{
            "Planning Details": (
              <>
                <div className="flex justify-end">
                  <Button
                    classes="w-30"
                    name="Save Plan Details"
                    onClick={handleSubmitForm1(handlePlanDetailsSubmit)}
                  />
                </div>
                <CommonForm
                  classes={"grid-cols-4 gap-1 mt-1"}
                  Form={
                    dataOfProject
                      ? dataOfProject["planDetails"]
                        ? dataOfProject["planDetails"].map((its) => {
                            let type = dtype[its.dataType];
                            let option = its.dropdownValue
                              ? its.dropdownValue.split(",").map((itm) => {
                                  return {
                                    value: itm,
                                    label: itm,
                                  };
                                })
                              : [];

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
            "Site Details": (
              <>
                <div className="flex justify-end">
                  <Button
                    classes="w-30"
                    name="Save Site Details"
                    onClick={handleSubmitForm2(handleSiteDetailsSubmit)}
                  />
                </div>
                <CommonForm
                  classes={"grid-cols-4 gap-1"}
                  Form={
                    dataOfProject
                      ? dataOfProject["siteDetails"]
                        ? dataOfProject["siteDetails"].map((its) => {
                            return {
                              label: its.fieldName,
                              value: "abc",
                              name: its.fieldName,
                              type: dtype[its.dataType],
                              option:its.dropdownValue
                                ? its.dropdownValue.split(",").map((itm) => {
                                    return {
                                      value: itm,
                                      label: itm,
                                    };
                                  })
                                : [],
                              required: its.required == "Yes" ? true : false,
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
            "RAN AT Checklist": (
              <>
                <div className="flex justify-end">
                  <Button
                    classes="w-30"
                    name="Save Ran AT Checklist"
                    onClick={handleSubmitForm3(handleRanCheckListSubmit)}
                  />
                </div>
                <CommonForm
                  classes={"grid-cols-4 gap-1"}
                  Form={
                    dataOfProject
                      ? dataOfProject["ranChecklist"]
                        ? dataOfProject["ranChecklist"].map((its) => {
                            return {
                              label: its.fieldName,
                              value: "abc",
                              name: its.fieldName,
                              type: dtype[its.dataType],
                              option:its.dropdownValue
                                ? its.dropdownValue.split(",").map((itm) => {
                                    return {
                                      value: itm,
                                      label: itm,
                                    };
                                  })
                                : [],
                              required: its.required == "Yes" ? true : false,
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

            Snap: (
                <ManageSnap />
              ),

              "Acceptance Log": (
                <>
                  <div className="flex justify-end">
                    <Button
                      classes="w-30"
                      name="Save Acceptance Log"
                      onClick={handleSubmitForm5(handleAcceptanceLogSubmit)}
                    />
                  </div>
                  <CommonForm
                    classes={"grid-cols-4 gap-1"}
                    Form={
                      dataOfProject
                        ? dataOfProject["acceptanceLog"]
                          ? dataOfProject["acceptanceLog"].map((its) => {
                              return {
                                label: its.fieldName,
                                value: "abc",
                                name: its.fieldName,
                                type: dtype[its.dataType],
                                option:its.dropdownValue
                                  ? its.dropdownValue.split(",").map((itm) => {
                                      return {
                                        value: itm,
                                        label: itm,
                                      };
                                    })
                                  : [],
                                required: its.required == "Yes" ? true : false,
                                props: {
                                  maxSelectableDate: today,
                                },
                              };
                            })
                          : []
                        : []
                    }
                    // Form={filesUploadForm}
                    errors={errorsForm5}
                    register={registerForm5}
                    setValue={setValueForm5}
                    getValues={getValuesForm5}
                  />
                </>
              ),
          }}
        />
      </div>
    </>
  );
};

export default ManageComplianceTemplateForm;
