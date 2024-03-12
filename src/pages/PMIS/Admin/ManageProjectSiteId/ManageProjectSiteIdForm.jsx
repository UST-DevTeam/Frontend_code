import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import AlertConfigurationActions from "../../../../store/actions/alertConfiguration-actions";
import CustomQueryActions from "../../../../store/actions/customQuery-actions";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import HrActions from "../../../../store/actions/hr-actions";
import NewLookBadge from "../../../../components/Badge";
import ManageSite from "../ManageSite/ManageSite";

const ManageProjectSiteIdForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {
  // console.log(isOpen, setIsOpen, resetting, formValue, "formValueformValue")

  // console.log(isOpen,"isOpen")
  // console.log(setIsOpen,"setIsOpen")
  // console.log(resetting,"resetting")
  // console.log(formValue,"formValue")

  let dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);

  //   let employeeList = useSelector((state) => {
  //     return state?.hrReducer?.getManageEmpDetails.map((itm) => {
  //         return {
  //           label: itm?.empName + "(" + itm.empCode + ")",
  //           value: itm?.empName + " " + itm.empCode
  //         }
  //     })
  // })

  //   let roleList = useSelector((state) => {
  //     return state?.adminData?.getManageProfile.map((itm) => {
  //         return {
  //             label: itm?.roleName,
  //             value: itm?.roleName
  //         }
  //     })
  // })

  // let projectTypeList = useSelector((state) => {
  //   return state?.adminData?.getCardProjectType.map((itm) => {

  //   //   if (projectTypeList === "project[uniqueId]") {
  //   //     const ProjectTypeValue = "projectType";
  //   //     setValue("projectType", ProjectTypeValue);
  //   //   }
  //   //   else
  //     return {
  //       label: itm.projectType,
  //       value: itm.uniqueId,
  //     };
  //   });
  // });

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
      label: "Site ID",
      name: "siteId",
      type: "jsxcmpt",
      value: "",
      component: <p className="cursor-pointer" onClick={() => {
        setmodalFullOpen(true)
        // setmodalHead("Edit Site ID")
        // setmodalBody(<>

        //   <ManageSite />
        //   {/* <ManageProjectForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
        //   {/* <ManageProjectForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
        //   {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
        // </>)
      }}><NewLookBadge text={"Add"} notifyType={"error"} /></p>,
      //   option: employeeList,
      props: {
        onChange: (e) => { },
      },
      required: true,
      classes: "col-span-1",
    },
    // {
    //   label: "Profile",
    //   name: "roleName",
    //   type: "select",
    //   value: "",
    //   option: roleList,
    //   required: true,
    //   classes: "col-span-1",
    // },
    // {
    //   label: "Employee Name",
    //   value: "",
    //   name: "empName",
    //   type: "select",
    //   option: employeeList,
    //   required: true,
    //   props: {
    //     onChange: (e) => {
    //       console.log(e.target.value, "e geeter")

    //       setValue("projectType", e.target.value);
    //     },
    //   },
    //   classes: "col-span-1",
    // },
    {
      label: "Scope",
      name: "scope",
      type: "select",
      value: "Select",
      //   option: projectList,
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Cofiguration",
      name: "configuration",
      type: "select",
      value: "Select",
      //   option: projectList,
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    // {
    //   label: "MileStone",
    //   name: "mileStone",
    //   type: "select",
    //   value: Select
    // //   option: circleList,
    //   props: {
    //     onChange: (e) => {},
    //   },
    //   classes: "col-span-1",
    // },
    // {
    //   label: "Start Date",
    //   name: "startDate",
    //   type: "datetime",
    //   value: "",
    //   props: {
    //     onChange: (e) => {},
    //   },
    //   required: true,
    //   classes: "col-span-1",
    // },
    // {
    //   label: "End Date",
    //   name: "endDate",
    //   type: "datetime",
    //   value: "",
    //   props: {
    //     onChange: (e) => {},
    //   },
    //   required: true,
    //   classes: "col-span-1",
    // },
    // {
    //   label: "Project Manager",
    //   name: "PM",
    //   type: "text",
    //   value: "",
    //   props: {
    //     onChange: (e) => {},
    //   },
    //   required: true,
    //   classes: "col-span-1",
    // },
    // {
    //   label: "Status",
    //   name: "status",
    //   type: "select",
    //   option: [
    //     { label: "Active", value: "active" },
    //     { label: "Inactive", value: "inactive" },
    //     { label: "Archive", value: "archive" },
    //     { label: "Closed", value: "closed" },
    //   ],
    //   required: true,
    //   classes: "col-span-1",
    // },
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
    console.log(data);
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };
  const onTableViewSubmit = (data) => {
    if (formValue.uniqueId) {
      dispatch(
        AdminActions.postProjectAllocation(
          data,
          () => {
            console.log("CustomQueryActions.postDBConfig");
            setIsOpen(false);
            dispatch(AdminActions.getProjectAllocation());
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        AdminActions.postProjectAllocation(data, () => {
          console.log("CustomQueryActions.postDBConfig");
          setIsOpen(false);
          dispatch(AdminActions.getProjectAllocation());
        })
      );
    }
  };
  console.log(Form, "Form 11");
  useEffect(() => {
    dispatch(HrActions.getManageEmpDetails());
    // dispatch(AdminActions.getProjectAllocation())
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
          // console.log("formValuekey",key,key)
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


      <Modal
        size={"full"}
        children={<ManageSite/>}
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />

      

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full">


        <CommonForm
          classes={"grid-cols-1 gap-1"}
          Form={Form}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
        <button
          onClick={() => setModalOpen(true)}
          className="bg-transparent border-none p-0 focus:outline-none"
        >
          <input className="col-span-1" label="ADD" type="text" {...register("siteId")} />
        </button>

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

export default ManageProjectSiteIdForm;
