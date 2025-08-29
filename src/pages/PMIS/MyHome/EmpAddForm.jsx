import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Button from "../../../components/Button";
import CommonTableFormSiteParent from "../../../components/CommonTableFormSiteParent";
import CommonForm from "../../../components/CommonForm";
import { ALERTS } from "../../../store/reducers/component-reducer";
import { labelToValue } from "../../../utils/commonFunnction";
import HrActions from "../../../store/actions/hr-actions";
import { useNavigate } from "react-router-dom";

const EmpAddForm = ({
  setmodalFullOpen,
}) => {

  const today = moment().format("MM-DD-YYYY");
  const navigate = useNavigate();

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



  const dispatch = useDispatch();




  // let circleWithPGList = useSelector((state) => {
  //   return state?.projectList?.getCircleWithPGData?.map((itm) => {
  //     return {
  //       label: itm.Circle,
  //       value: itm.Circle,
  //     };
  //   });
  // });



  let dataOfProject = useSelector((state) => {
    let dataOlder = state?.adminData?.getManageResource;
    return dataOlder;
  });



  const handleBasicDetailsSubmit = (data) => {

    let filData = [];

    filData = dataOfProject.filter((itew) => itew["mandatory"] == "Yes");
    let filDataCount = 0;
    let datamsg = "";
    filData.map((itew) => {
      if ( data[itew["fieldKey"]] == undefined || data[itew["fieldKey"]] == "") {
        filDataCount += 1;
        datamsg += itew["fieldName"] + ", ";
      }
      console.log(itew["fieldName"], "nathnathamarnath");
    });

    if (filDataCount != 0) {
      let msgdata = {
        show: true,
        icon: "error",
        buttons: [],
        type: 1,
        text: datamsg + " is required field.",
      };
      dispatch(ALERTS(msgdata));

      return;
    }

    let final_data = {};

    let dat = dataOfProject;
    dat.map((itew) => {
      let fieldNaming = labelToValue(itew["fieldKey"]);

      if(fieldNaming=="BAND"){
        final_data["BAND"] = data["BAND"]?.split(",")?.join("-");
      }

    //   else if(fieldNaming=="CELL ID"){
    //     final_data["CELL ID"] = data["CELL ID"]?.split(",")?.join("-");
    //   }

    //   else if(fieldNaming=="SECTOR"){
    //     final_data["SECTOR"] = data["SECTOR"]?.split(",")?.join("-");
    //   }
      else{
        final_data[fieldNaming] = data[fieldNaming];
      }
    });

    dispatch(
        HrActions.postManageEmpDetails(false, final_data, () => {
          alert("Data submitted successfully!");
          setmodalFullOpen(prev => !prev);
          window.location.reload(true);
        })
      );

  };


  const funcaller = () => {
    reset({});
  };

//   useEffect(() => {
//     if (dataOfProject) {
//       setValueForm1("clientName", dataOfProject.clientName);
//     }
//     reset({});
//   }, [dataOfProject, reset]);


    let marketList = useSelector((state) => {
    return state?.adminData?.getManageMarket.map((itm) => {
      return {
        label: itm?.marketName,
        value: itm.marketName,
      };
    });
  });

    let roleList = useSelector((state) => {
    return state?.adminData?.getManageProfile.map((itm) => {
      return {
        label: itm?.roleName,
        value: itm?.uniqueId,
      };
    });
  });

  let allEmployeeList = useSelector((state) => {
    return state?.hrReducer?.getHRAllEmployee.map((itm) => {
      return {
        label: itm?.empName,
        value: itm.uniqueId,
      };
    });
  });

  useEffect(() =>{
    reset({})
  },[reset])





  let dtype = {
    Decimal: "number",
    Text: "text",
    Dropdown: "select",
    Number: "number",
    Date: "datetime",
    "Auto Created": "sdisabled",
  };


  const filesUploadForm = [
    { label: "file", value: "", name: "file", required: true, type: "file" },
    { label: "Note", value: "", name: "note", required: true, type: "text" },
  ];


  return (
    <>
      <div className="p-4">
        <CommonTableFormSiteParent
          setmodalFullOpen={setmodalFullOpen}
          funcaller={funcaller}
          defaultValue={"Basic Details"}
          tabslist={{
            "Basic Details": (
              <>
                <CommonForm
                  classes={"grid-cols-4 gap-1 mt-1"}
                  Form={
                    dataOfProject
                        ? [
                            ...dataOfProject.map((its) => {
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
                              return {
                                label: its.fieldName,
                                value: "Select",
                                required: its.mandatory == "Yes" ? true : false,
                                option: option,
                                name: its.fieldKey,
                                type: type,
                                formatop:"MM-DD-YYYY",
                                props: {
                                  maxSelectableDate: today,
                                },
                              };
                            }),
                          ]
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

export default EmpAddForm;
