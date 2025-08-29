import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Modal from "../../../components/Modal";
import { Button } from "@material-ui/core";
import { labelToValue } from "../../../utils/commonFunnction";
import CommonForm from "../../../components/CommonForm";
import { Urls } from "../../../utils/url";
import CommonTableFormSiteParent from "../../../components/CommonTableFormSiteParent";
import projectListActions from "../../../store/actions/projectList-actions";


const EmpEditForm = ({
  siteCompleteData,
  uid,
  mileStone,
  setGlobalData,
  projectuniqueId,
  setmodalFullOpen,

}) => {

  const today = moment().format("MM-DD-YYYY");


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




  const [modalOpen, setmodalOpen] = useState(false);
  const [type, settype] = useState(true);
  const [modalHead, setmodalHead] = useState(<></>);
  const [modalBody, setmodalBody] = useState(<></>);
  const dispatch = useDispatch();






//   let dataOfOldProject = useSelector((state) => {

//     let datew = state.adminData.getOneProjectTypeDyform;
//     if (type && datew && datew.length > 0) {
//       settype(false);
//       let dtresult = datew[0]["result"];

//       dtresult["t_sengg"] && dtresult["t_sengg"].map((iytm) => {
//           if(iytm["fieldName"]=="BAND"){
//             let bandlistt=datew[0]["BAND"]
//             setValueForm1("BAND", bandlistt?.split("-")?.join(","));
//           }
//           else if(iytm["fieldName"]=="CELL ID"){
//             let cellidlistt=datew[0]["CELL ID"]
//             setValueForm1("CELL ID", cellidlistt?.split("-")?.join(","));
//           }else{
//             setValueForm1(iytm["fieldName"], datew[0][iytm["fieldName"]]);
//           }

//         });
//       return datew[0];
//     }
//   });

  let dataOfProject = useSelector((state) => {
    let dataOlder = state.adminData.getOneProjectTypeDyform
      ? state.adminData.getOneProjectTypeDyform.length > 0
        ? state.adminData.getOneProjectTypeDyform[0]["result"]
        : state.adminData.getOneProjectTypeDyform
      : state.adminData.getOneProjectTypeDyform;

    return dataOlder;
  });

  const handleBasicDetailsSubmit = (data) => {
    let final_data = {};

    dataOfProject["t_sengg"].map((itew) => {

      let fieldNaming = labelToValue(itew.fieldName);
      
      if(fieldNaming=="BAND"){
          final_data["BAND"] = data["BAND"]?.split(",")?.join("-");
      }

      else if(fieldNaming=="CELL ID"){
        final_data["CELL ID"] = data["CELL ID"]?.split(",")?.join("-");
      }

      else{
        final_data[fieldNaming] = data[fieldNaming];
      }
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
        () => {
          dispatch(projectListActions.getProjectTypeAll(projectuniqueId));
        }
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
        children={modalBody}
        setIsOpen={setmodalOpen}
        isOpen={modalOpen}
        size={"smsh"}
        modalHead="Completion Criteria"
      />

      <div className="p-4">
        <CommonTableFormSiteParent
          funcaller={funcaller}
          defaultValue={"Basic Details"}
          tabslist={{
            "Basic Details": (
              <>
                <CommonForm
                  classes={"grid-cols-4 gap-1 mt-1"}
                  Form={
                    dataOfProject
                        ? dataOfProject.map((its) => {
                            let type = dtype[its.fieldType];
                            let option = its.dropdown ? its.dropdown.split(",").map((itm) => {
                                    return {
                                        value: itm,
                                        label: itm,
                                    };
                                    })
                                : [];

                            if (its["fieldName"] === "Market" || its["fieldName"] === "MARKET" ) {
                                option = marketList;
                                type = "select";
                            }
                            if (its["fieldName"] === "PMIS Role") {
                                option = roleList;
                                type = "select";
                            }
                            if (its["fieldName"] === "L1 Approver") {
                                option = allEmployeeList;
                                type = "select";
                            }
                            if (its["fieldName"] === "L2 Approver") {
                                option = allEmployeeList;
                                type = "select";
                            }
                            if (its["fieldName"] === "Employee Code") {
                                type = "sdisabled";
                            }
                            if (its["fieldName"] === "Official Email-ID") {
                                type = "sdisabled";
                            }

                            return {
                              label: its.fieldName,
                              value: "Select",
                              required: its.mandatory == "Yes" ? true : false,
                              option: option,
                              name: its.fieldName,
                              type: type,
                              formatop:"MM-DD-YYYY",
                              props: {
                                maxSelectableDate: today,
                              },
                            };
                          })
                        : []
                  }
                  errors={errorsForm1}
                  register={registerForm1}
                  setValue={setValueForm1}
                  getValues={getValuesForm1}
                />
                <div className="flex justify-center space-x-4">
                  <Button
                    classes="w-auto h-12 bg-orange-400 text-[18px] border-[0.5px] border-orange-500 custom-classs"
                    name="Submit"
                    onClick={handleSubmitForm1(handleBasicDetailsSubmit)}
                  />
                  <Button
                    classes="w-auto h-12 bg-orange-400 text-[18px] border-[0.5px] border-orange-500 custom-classs"
                    name="Back"
                    onClick={setmodalFullOpen(prev => !prev)}
                  />
                </div>
              </>
            ),
          }}
        />
      </div>
    </>
  );
};

export default EmpEditForm;
