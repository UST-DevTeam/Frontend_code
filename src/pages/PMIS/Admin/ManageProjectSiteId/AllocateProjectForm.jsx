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
import projectListActions from "../../../../store/actions/projectList-actions";
import { useParams } from "react-router-dom";
import ManageMilestone from "../ManageMilestone/ManageMilestone";
import { Urls } from "../../../../utils/url";
import DynamicTabContent from "../../../../components/DynamicTabContent";

const AllocateProjectForm = ({
  from,
  listsite,
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  projectuniqueId,
}) => {
  // console.log(isOpen, setIsOpen, resetting, formValue, "formValueformValue")

  // console.log(isOpen,"isOpen")
  // console.log(setIsOpen,"setIsOpen")
  // console.log(resetting,"resetting")
  // console.log(formValue,"formValue")

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [activeTab, setactiveTab] = useState(3);

  const [modalFullBody, setmodalFullBody] = useState(<></>);

  const [modalBody, setmodalBody] = useState(<></>);
  const [SiteId, setSiteId] = useState("Add");
  const [mile, setMile] = useState("Add");
  const [old, setOld] = useState({});
  const [globalData, setGlobalData] = useState({});

  const dataGetterOld = useSelector((state) => {
    let oldata = state.projectList.getuserallocatedproject[0];
    if (oldata) {
      if (old["empDeatils"]) {
        if (oldata != old) {
          setValue("mileName", formValue["Name"]);
          setValue("ptypeId", oldata["PId"]);
          setOld(oldata);
        }
      } else {
        setValue("mileName", formValue["Name"]);
        setValue("ptypeId", oldata["PId"]);
        setOld(oldata);
      }
    }

    console.log(oldata, "olddataolddataolddata");
    return oldata;
  });

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

  console.log(old, "dataGetterOlddataGetterOlddataGetterOld");
  let Form = [
    // {
    //   label: "Project Id",
    //   name: "ptypeId",
    //   type: "sdisabled",
    //   value: "",
    //   required: true,
    //   classes: "col-span-1",
    // },
    // {
    //   label: "Milestone Name",
    //   name: "mileName",
    //   type: "sdisabled",
    //   value: "",
    //   required: true,
    //   classes: "col-span-1",
    // },
    {
      label: "Assign User",
      name: "userId",
      type: "BigmuitiSelect",
      value: "",
      option: dataGetterOld
        ? dataGetterOld["empDeatils"] && dataGetterOld["empDeatils"][0]?.["name"]
          ? dataGetterOld["empDeatils"]
          : []
        : [],
      props: {
        onChange: (e) => {
          // dispatch(AdminActions.getProjectTypeDyform(dataGetterOld?.custId + "/" + e.target.value))
          console.log(e.target.value, "e.target.value");
        },
      },

      onSelecting: (e) => {
        console.log("onRemovings user", e);
        setValue("vendorId", "");
      },
      onRemoving: (e) => {
        console.log("onRemoving  user", e);
        setValue("vendorId", "");
      },
      required: true,
      classes: "col-span-2",
      width:"400px"
    },
  ];

  let VendorForm = [
    // {
    //   label: "Project Id",
    //   name: "ptypeId",
    //   type: "sdisabled",
    //   value: "",
    //   required: true,
    //   classes: "col-span-1",
    // },
    // {
    //   label: "Milestone Name",
    //   name: "mileName",
    //   type: "sdisabled",
    //   value: "",
    //   required: true,
    //   classes: "col-span-1",
    // },
    {
      label: "Assign Vendor",
      name: "vendorId",
      type: "BigmuitiSelect",
      value: "",
      singleSelect: true,
      option: dataGetterOld
        ? dataGetterOld["vendorDetails"]
          ? dataGetterOld["vendorDetails"]
          : []
        : [],
      props: {
        onChange: (e) => {
          alert("dasdasdas");
          // dispatch(AdminActions.getProjectTypeDyform(dataGetterOld?.custId + "/" + e.target.value))
          console.log(e.target.value, "e.target.value");
        },
      },
      onSelecting: (e) => {
        console.log("onRemovings vendor", e);
        setValue("userId", "");
      },
      onRemoving: (e) => {
        console.log("onRemoving vendor", e);
        setValue("userId", "");
      },
      required: true,
      classes: "col-span-1",
      width:"400px"
    },
  ];
  const onSubmit = (data) => {
    console.log(data);
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };


  console.log(activeTab,"_________activeTabactiveTab")

  console.log(errors, "dsadasdsadasdasdasdasdas");
  const onTableViewSubmit = (data) => {
    console.log(formValue, data, "globalDataglobalDataglobalData");


    

    let dataForApp = [];

    let finaldata = {};

    let assigningTo = ""
    if (activeTab == 0) {
      dataForApp = data["userId"];
      assigningTo = "userRegister"
    } else if (activeTab == 1) {
      dataForApp = data["vendorId"];
      assigningTo = "vendor"
    }
    if (listsite.length == 0) {
      let finaldata = {
        name: from,
        data: {
          assignerId: dataForApp,
          assigningTo: assigningTo
        },
        from: {
          uid: formValue["uniqueId"],
        },
      };

      dispatch(
        projectListActions.globalProjectTypeDataPatch(
          Urls.projectList_globalSaver,
          projectuniqueId,
          finaldata,
          () => {
            dispatch(projectListActions.getProjectTypeAll(projectuniqueId));
            setIsOpen(false);
          }
        )
      );
    } else {
      let finaldata = {
        name: from,
        data: {
          assignerId: dataForApp,
          assigningTo: assigningTo
        },
        from: {
          uid: listsite,
        },
      };

      dispatch(
        projectListActions.globalProjectTypeDataPatch(
          Urls.projectList_globalSaver,
          projectuniqueId,
          finaldata,
          () => {
            dispatch(projectListActions.getProjectTypeAll(projectuniqueId));
            setIsOpen(false);
          }
        )
      );
    }

    // dsadadasdas
    // if (formValue.uniqueId) {
    //   dispatch(
    //     AdminActions.postProjectAllocation(
    //       data,
    //       () => {
    //         console.log("CustomQueryActions.postDBConfig");
    //         setIsOpen(false);
    //         dispatch(AdminActions.getProjectAllocation());
    //       },
    //       formValue.uniqueId
    //     )
    //   );
    // } else {
    //   dispatch(
    //     AdminActions.postProjectAllocation(data, () => {
    //       console.log("CustomQueryActions.postDBConfig");
    //       setIsOpen(false);
    //       dispatch(AdminActions.getProjectAllocation());
    //     })
    //   );
    // }
  };
  console.log(Form, "Form 11");
  useEffect(() => {
    // dispatch(projectListActions.getUserAllocatedProject(projectuniqueId))
  }, [isOpen]);
  return (
    <>
      {/* <Modal
        size={"xl"}
        children={<ManageSite />}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      /> */}

      <Modal
        size={"xl"}
        children={modalFullBody}
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />

      <div className="flex justify-evenly">
        <Button
          name={"Allocate User"}
          onClick={() => {
            setactiveTab(0);
          }}
          classes="w-auto mt-10"
        />
        <Button
          name={"Allocate Vendor"}
          onClick={() => {
            setactiveTab(1);
          }}
          classes="w-auto mt-10"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        <DynamicTabContent
          activeTab={activeTab}
          tabList={[
            <CommonForm
              classes={"grid-cols-1 gap-1 w-full"}
              Form={Form}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />,
            <CommonForm
              classes={"grid-cols-1 gap-1"}
              Form={VendorForm}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />,
          ]}
        />

        {/* <button
          onClick={() => setModalOpen(true)}
          className="bg-transparent border-none p-0 focus:outline-none"
        >
          <input className="col-span-1" label="ADD" type="text" {...register("siteId")} />
        </button> */}

        {/* <button onClick={() => { setmodalOpen(true) }} className='flex bg-primaryLine mt-6 w-42 absolute right-1 top-1 justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Add DB Type <Unicons.UilPlus /></button> */}
        {/* <Table headers={["S.No.", "DB Type", "DB Server", "DB Name", "Created By", "Created Date", "Last Modified By", "Last Modified Date", "Actions"]} columns={[["1", "abcd", "ancd", "abcd", "ancd"], ["2", "adsa", "dasdas", "abcd", "ancd"]]} /> */}
        {/* <button onClick={(handleSubmit(onTableViewSubmit))} className='bg-primaryLine mt-6 w-full justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button> */}
        {activeTab != 3 ? (
          <Button
            classes={"mt-2 w-sm text-center flex mx-auto"}
            onClick={handleSubmit(onTableViewSubmit)}
            name="Submit"
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AllocateProjectForm;
