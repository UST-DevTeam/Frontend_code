import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import HrActions from "../../../../store/actions/hr-actions";
import { circle } from "leaflet";
import { useParams } from "react-router-dom";

const ManageProjectForm = ({
  projecttypeuniqueId,
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {
  const { customeruniqueId } = useParams();
  let dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = useState(false);
  const [pType, setpType] = useState("");

  let pmempList = useSelector((state) => {
    return state?.hrReducer?.getManageEmpDetails.map((itm) => {
      return {
        // label: itm.empName + "(" + itm.email + ")",
        label: itm.empName,
        value: itm.uniqueId,
      };
    });
  });

  let projectGroupList = useSelector((state) => {
    return state?.adminData?.getManageProjectGroup.map((itm) => {
      return {
        label: itm.projectGroupId,
        value: itm.uniqueId,
      };
    });
  });

  let projectTypeList = useSelector((state) => {
    return state?.adminData?.getCardProjectType.map((itm) => {
      //   if (projectTypeList === "project[uniqueId]") {
      //     const ProjectTypeValue = "projectType";
      //     setValue("projectType", ProjectTypeValue);
      //   }
      //   else
      return {
        label: itm.projectType,
        value: itm.uniqueId,
      };
    });
  });

  let subProjectList = useSelector((state) => {
    return state?.adminData?.getManageProjectType.filter((itm) => {
      console.log(itm.projectType==pType,"dasdsadsadas")
      return itm.projectType==pType;
    }).map((itm) => {
      return {
        label: itm.subProject,
        value: itm.uniqueId,
      };
    });
  });

  let PMList = useSelector((state) => {
    return state?.hrReducer?.getManageEmpDetails.map((itm) => {
      //   if (projectTypeList === "project[uniqueId]") {
      //     const ProjectTypeValue = "projectType";
      //     setValue("projectType", ProjectTypeValue);
      //   }
      //   else
      return {
        label: itm.empName,
        value: itm.empName,
      };
    });
  });

  // let SubProjectList = useSelector((state) => {
  //     return state?.adminData?.getManageSubProject.map((itm) => {
  //         return {
  //             label: itm.subProject,
  //             value: itm.subProject
  //         }
  //     })
  // })

  let circleList = useSelector((state) => {
    return state?.adminData?.getManageCircle.map((itm) => {
      return {
        label: itm.circleName,
        value: itm.uniqueId,
      };
    });
  });

  let Form = [
    {
      label: "Project ID",
      name: "projectId",
      type: "text",
      value: "",
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Project Group",
      name: "projectGroup",
      type: "select",
      value: "",
      option: projectGroupList,
      props: {
        onChange: (e) => {},
      },
      required: true,
      classes: "col-span-1",
    },

    {
      label: "Project Type",
      value: "",
      name: "projectType",
      type: "select",
      option: projectTypeList,
      required: true,
      props: {
        onChange: (e) => {
          
          setpType(projectTypeList.filter(iteq=>iteq.value==e.target.value)[0]["label"])
          console.log(e.target.value, "e geeter");
          setValue("projectType", e.target.value);
        },
      },
      classes: "col-span-1",
    },
    {
      label: "Sub-Project Type",
      name: "subProject",
      type: "select",
      value: "",
      option: subProjectList,
      props: {
        onChange: (e) => {
          
        },
      },
      classes: "col-span-1",
    },
    {
      label: "Circle",
      name: "circle",
      type: "select",
      value: "",
      option: circleList,
      props: {
        onChange: (e) => {
          
        },
      },
      classes: "col-span-1",
    },
    {
      label: "Start Date",
      name: "startDate",
      type: "datetime",
      value: "",
      props: {
        onChange: (e) => {
          // console.log(e.target.value);
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "End Date",
      name: "endDate",
      type: "datetime",
      value: "",
      props: {
        onChange: (e) => {
          
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Project Manager",
      name: "PMName",
      type: "autoSuggestion",
      value: "",
      option: pmempList,
      props: {
        onChange: (e) => {
          let filteredData = pmempList.filter(
            (itm) => itm.label == e.target.value
          );
          if (filteredData.length > 0) {
            setValue("PMId", filteredData[0]["value"]);
          }
          console.log(
            pmempList.filter((itm) => itm.label == e.target.value),
            e.target.value,
            "e.target.value"
          );
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      option: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        // { label: "Archive", value: "Archive" },
        // { label: "Trashed", value: "Trashed" },
        { label: "Closed", value: "Closed" },
      ],
      required: true,
      classes: "col-span-1",
    },
  ];
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data, "datadatadatadata");
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };
  const onTableViewSubmit = (data) => {
    console.log(data,"123456789123456789123456789")
    data["endDate"] = data?.endDate.split("T")[0];
    data["startDate"] = data?.startDate.split("T")[0];

    delete data["PMName"];
    if (formValue?.uniqueId) {
      dispatch(AdminActions.postProject(true,customeruniqueId,data,
          () => {
            setIsOpen(false);
            dispatch(AdminActions.getProject(customeruniqueId));
          },
          formValue?.uniqueId
        )
      );
    } else {
      dispatch(
        AdminActions.postProject(true, customeruniqueId, data, () => {
          setIsOpen(false);
          dispatch(AdminActions.getProject(customeruniqueId));
        })
      );
    }
  };
  console.log(Form, "Form 11");
  useEffect(() => {
    dispatch(AdminActions.getManageProjectGroup());
    dispatch(AdminActions.getManageCircle());
    dispatch(AdminActions.getManageProjectType(customeruniqueId));
    dispatch(HrActions.getManageEmpDetails(true, "", `userRole=${"Project Manager"}`));
    dispatch(AdminActions.getCardProjectType(customeruniqueId));

    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      // console.log(formValue, Form, "Object.keys(formValue)");
      Form.forEach((key) => {
        if (["startDate", "endDate"].indexOf(key.name) != -1) {
          console.log("date formValuekey", key.name, formValue[key.name]);
          const momentObj = moment(formValue[key.name], "DD/MM/YYYY");
          setValue(key.name, momentObj.toDate());
        } else if (key.type == "select") {
          let dtwq = key.option.filter(
            (itq) => itq.label == formValue[key.name]
          );

          console.log(dtwq,formValue[key.name],"dtwqdtwqdtwq")
          if (dtwq.length > 0) {
            setValue(key.name, dtwq[0]["value"]);
          } else {
            setValue(key.name, formValue[key.name]);
          }
        } else {
          setValue(key.name, formValue[key.name]);
        }
      });
    }
  }, [formValue, resetting]);
  return (
    <>
      <Modal
        size={"xl"}
        children={
          <>
            <CommonForm
              classes={"grid-cols-1 gap-1"}
              Form={Form}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
          </>
        }
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full">
        <CommonForm
          classes={"grid-cols-2 gap-1"}
          Form={Form}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
        <Button
          classes={"mt-2 w-sm text-center flex mx-auto"}
          onClick={handleSubmit(onTableViewSubmit)}
          name="Submit"
        />
      </div>
    </>
  );
};

export default ManageProjectForm;
