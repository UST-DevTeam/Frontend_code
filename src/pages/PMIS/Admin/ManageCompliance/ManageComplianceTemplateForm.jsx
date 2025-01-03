import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import {getAccessType,labelToValue,objectToQueryString,} from "../../../../utils/commonFunnction";
import { Urls} from "../../../../utils/url";
import CommonForm from "../../../../components/CommonForm";
import CommonTableFormSiteParent from "../../../../components/CommonTableFormSiteParent";
import projectListActions from "../../../../store/actions/projectList-actions";
import ManageSnap from "./ManageSnap"
import moment from "moment";
import { ALERTS } from "../../../../store/reducers/component-reducer";

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
  const {
    register: registerFormSelect,
    setValue: setValueFormSelect,
    getValues: getValuesFormSelect,
    handleSubmit: handleSubmitFormSelect,
    formState: { errors: errorsFormSelect },
  } = useForm();

  const [modalOpen, setmodalOpen] = useState(false);
  const [type, settype] = useState(true);
  const [modalHead, setmodalHead] = useState(<></>);
  const [modalBody, setmodalBody] = useState(<></>);
  const [invoiceData, setinvoiceData] = useState([]);
  const [uniqueness, setUniqueness] = useState("");
  const [listing, setlisting] = useState([]);
  const[L1Approver,setL1Approver] = useState(null);
  const dispatch = useDispatch();

  let L1optionList = useSelector((state) => {
    return state?.adminData?.getOneComplianceL1List.map((itm) => {
      return {
        label: itm?.approverName,
        value: itm?.approverId,
      };
    })
  })



  let dataOfOldProject = useSelector((state) => {
    let datew = state.adminData.getOneProjectTypeDyform;

    if (type && datew && datew.length > 0) {
      settype(false);

      let dtresult = datew[0]["result"];


      dtresult["planDetails"] && dtresult["planDetails"].map((iytm) => {
          setValueForm1(iytm["fieldName"], datew[0][iytm["fieldName"]]);
      });

      dtresult["siteDetails"] && dtresult["siteDetails"].map((iytm) => {
        setValueForm2(iytm["fieldName"], datew[0][iytm["fieldName"]]);
      });

      dtresult["ranChecklist"] && dtresult["ranChecklist"].map((iytm) => {
          setValueForm3(iytm["fieldName"], datew[0][iytm["fieldName"]]);
      });

      dtresult["snap"] && dtresult["snap"].map((iytm) => {
        setValueForm4(iytm["fieldName"], datew[0][iytm["fieldName"]]);
      });

      dtresult["acceptanceLog"] && dtresult["acceptanceLog"].map((iytm) => {
        setValueForm5(iytm["fieldName"], datew[0][iytm["fieldName"]]);
      });
    

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
  });

  const handleTemplateSubmit = (data) => {

    if (!L1Approver){
      let msgdata = {
        show: true,
        icon: "error",
        buttons: [],
        type: 1,
        text: "Please Select Your L1 Approver",
      };
      dispatch(ALERTS(msgdata));
      return
    }

    let final_data = {};
    dataOfProject["Template"].map((itew) => {
        
      let fieldNaming = labelToValue(itew.fieldName);
      final_data[fieldNaming] = data[fieldNaming];
    });

    final_data['siteuid'] = siteCompleteData['uniqueId']
    final_data['milestoneuid'] = mileStone['uniqueId']
    final_data['projectuniqueId'] = projectuniqueId
    final_data['subprojectId'] = siteCompleteData['SubProjectId']
    final_data['approverType'] = "L1Approver"
    final_data['approverId'] = L1Approver
    final_data['TemplateStatus'] = 1



    

    let fdata = {
      name: "TemplateData",
      data: final_data,
      from: {
        siteuid:siteCompleteData['uniqueId'],
        milestoneuid:mileStone['uniqueId'],
        projectuniqueId:projectuniqueId,
        subprojectId:siteCompleteData['SubProjectId'],
        L1Approver:L1Approver
      },
    };

    dispatch(
      projectListActions.globalComplianceTypeDataPatch(Urls.compliance_globalSaver,fdata,() => {})
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
  };


  const funcaller = () => {
    reset({});
  };


  useEffect(() => {
    reset({});
    settype(true);
  }, [uid]);

  let dtype = {
    Decimal: "number",
    Text: "text",
    Dropdown: "select",
    Number: "number",
    Date: "datetime",
    "Auto Created": "sdisabled",
  };

  return (
    <>
      <Modal
        modalHead = "Compliance Form"
        children={modalBody}
        setIsOpen={setmodalOpen}
        isOpen={modalOpen}
        size={"full1"}
      />

      <div className="overflow-scroll h-[94vh] p-4">

      <CommonForm
        classes={"flex mx-auto w-1/4 mb-[-10px]"}
        Form={[
          {
            label: "Select Your L1 Approver",
            value: "",
            name: "selectField",
            type: "select",
            option: L1optionList,
            props:{
              onChange:(e) =>{
                setL1Approver(e.target.value)
              }
            },
            required: true,
          },
        ]}
        errors={errorsFormSelect}
        register={registerFormSelect}
        setValue={setValueFormSelect}
        getValues={getValuesFormSelect}
      />

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