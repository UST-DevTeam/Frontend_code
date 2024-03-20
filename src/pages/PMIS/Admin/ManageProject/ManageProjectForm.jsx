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
import HrActions from "../../../../store/actions/hr-actions";

const ManageProjectForm = ({
  projecttypeuniqueId,
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {
  const { customeruniqueId } = useParams();
  console.log(customeruniqueId, "hbshshhshshbsh");

  let dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = useState(false);


  

  let pmempList = useSelector((state) => {
    return state?.hrReducer?.getManageEmpDetails.map((itm) => {
      return {
        label: itm.empName,
        value: itm.uniqueId,
      };
    });
  });


  let projectGroupList = useSelector((state) => {
    return state?.adminData?.getManageProjectGroup.map((itm) => {
      return {
        label: itm.projectGroupId,
        value: itm.projectGroupId,
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
    return state?.adminData?.getManageProjectType.map((itm) => {

    //   if (projectTypeList === "project[uniqueId]") {
    //     const ProjectTypeValue = "projectType"; 
    //     setValue("projectType", ProjectTypeValue);
    //   }
    //   else
      return {
        label: itm.subProject,
        value: itm.subProject,
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

  // let circleList = useSelector((state) => {
  //   return state?.adminData?.getManageCircle.map((itm) => {
  //     return {
  //       label: itm.circleName,
  //       value: itm.uniqueId,
  //     };
  //   });
  // });

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
          console.log(e.target.value, "e geeter")


          

          setValue("projectType", e.target.value);
        },
      },
      classes: "col-span-1",
    },
    // {
    //   label: "Sub-Project Name",
    //   name: "subProject",
    //   type: "text",
    //   value: "",
    //   // option: SubProjectList,
    //   props: {
    //     onChange: (e) => {},
    //   },
    //   classes: "col-span-1",
    // },
    {
      label: "Circle",
      name: "circle",
      type: "select",
      value: "",
      option: subProjectList,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    // {
    //   label: "Circle",
    //   name: "circle",
    //   type: "select",
    //   value: "",
    //   option: circleList,
    //   props: {
    //     onChange: (e) => {},
    //   },
    //   classes: "col-span-1",
    // },
    {
      label: "Start Date",
      name: "startDate",
      type: "datetime",
      value: "",
      props: {
        onChange: (e) => {},
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
        onChange: (e) => {},
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Project Manager",
      name: "PMName",
      type: "autoSuggestion",
      value: "",
      option:pmempList,
      props: {
        onChange: (e) => {
          let filteredData=pmempList.filter(itm=>itm.label==e.target.value)
          if(filteredData.length > 0){
            setValue("PMId",filteredData[0]["value"])
          }
          console.log(pmempList.filter(itm=>itm.label==e.target.value),e.target.value,"e.target.value")
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
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Archive", value: "archive" },
        { label: "Closed", value: "closed" },
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
    data["endDate"] = data?.endDate.split("T")[0];
    data["startDate"] = data?.startDate.split("T")[0];

    delete data["PMName"]
    if (formValue?.uniqueId) {
      dispatch(
        AdminActions.postProject(
          true,
          customeruniqueId,
          data,
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
    dispatch(HrActions.getManageEmpDetails(true,"",`userRole=${"Project Manager"}`));
    dispatch(AdminActions.getCardProjectType(customeruniqueId));
    
    dispatch(HrActions.getManageEmpDetails(true,"","userRole=Project Manager"));
    // dispatch(AdminActions.getManageSubProjectType(customeruniqueId))
    // dispatch(AdminActions.getProject(customeruniqueId))
    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      console.log(Object.keys(formValue), "Object.keys(formValue)");
      Form.forEach((key) => {
        if (["endAt", "startAt"].indexOf(key.name) != -1) {
          console.log("date formValuekey", key.name, formValue[key.name]);
          const momentObj = moment(formValue[key.name]);
          setValue(key.name, momentObj.toDate());
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
        {/* <button></button> */}

        {/* <button onClick={() => { setmodalOpen(true) }} className='flex bg-primaryLine mt-6 w-42 absolute right-1 top-1 justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Add DB Type <Unicons.UilPlus /></button> */}
        {/* <Table headers={["S.No.", "DB Type", "DB Server", "DB Name", "Created By", "Created Date", "Last Modified By", "Last Modified Date", "Actions"]} columns={[["1", "abcd", "ancd", "abcd", "ancd"], ["2", "adsa", "dasdas", "abcd", "ancd"]]} /> */}
        {/* <button onClick={(handleSubmit(onTableViewSubmit))} className='bg-primaryLine mt-6 w-full justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button> */}
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
