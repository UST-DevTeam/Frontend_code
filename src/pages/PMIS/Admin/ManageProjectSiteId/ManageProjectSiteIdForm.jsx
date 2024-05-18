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

const ManageProjectSiteIdForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  projectuniqueId
}) => {

  // console.log(isOpen, setIsOpen, resetting, formValue, "formValueformValue")

  // console.log(isOpen,"isOpen")
  // console.log(setIsOpen,"setIsOpen")
  // console.log(resetting,"resetting")
  // console.log(formValue,"formValue")

  const { register, handleSubmit, watch, reset, setValue, getValues, formState: { errors } } = useForm()
  let dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [modalFullBody, setmodalFullBody] = useState(<></>);

  const [modalBody, setmodalBody] = useState(<></>);
  const [SiteId, setSiteId] = useState("Add");
  const [mile, setMile] = useState("Add");
  const [old, setOld] = useState({});
  const [globalData, setGlobalData] = useState({
    "siteEngineer": {},
    "t_issues": {},
    "t_tracking": {},
    "t_sFinancials": {},
    "mileStone": {},
  });



  const dataGetterOld = useSelector((state) => {
    let oldata = state.projectList.getProjectTypeSub
    if (old["_id"] != oldata["_id"]) {
      setOld(oldata)
      setValue("ptype", oldata["projectType"])

    }
    console.log(oldata, "")
    // return state.projectList.getProjectTypeSuolddataolddataolddatab
    return state.projectList.getProjectTypeSub
  })

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

  console.log(dataGetterOld, "dataGetterOlddataGetterOlddataGetterOld")
  let Form = [

    // {
    //   label: "Project Type",
    //   name: "ptype",
    //   type: "sdisabled",
    //   value: "",
    //   required: true,
    //   classes: "col-span-1",
    // },
    {
      label: "SubProject Type",
      name: "roleName",
      type: "select",
      value: "Select",
      option: dataGetterOld.subprojectresult,
      props: {
        onChange: (e) => {
          dispatch(AdminActions.getProjectTypeDyform(dataGetterOld?.custId + "/" + e.target.value))
          console.log(e.target.value, "e.target.value")
        }
      },
      required: true,
      classes: "col-span-1",
    },

    {
      label: "Site ID",
      name: "siteId",
      type: "jsxcmpt",
      value: "",
      component: <p className="cursor-pointer" onClick={() => {
        setmodalFullOpen(prev => !prev)


        setmodalFullBody(<ManageSite oldgetvalue={getValues} setGlobalData={setGlobalData} setSiteId={setSiteId} setmodalFullOpen={setmodalFullOpen} projectuniqueId={projectuniqueId} />)


        setmodalBody(<CommonForm
          classes={"grid-cols-1 gap-1"}
          Form={Form}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues} />)
      }}><NewLookBadge text={SiteId} notifyType={"info"} /></p>,
      //   option: employeeList,
      props: {
        onChange: (e) => { },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Milestone",
      name: "milestone",
      type: "jsxcmpt",
      value: "",
      component: <p className="cursor-pointer" onClick={() => {
        setmodalFullOpen(true)

        setmodalFullBody(<ManageMilestone setGlobalData={setGlobalData} setSiteId={setMile} setmodalFullOpen={setmodalFullOpen} projectuniqueId={projectuniqueId} />)
        // setmodalHead("Edit Site ID")
        // setmodalBody(<>

        //   <ManageSite />
        //   {/* <ManageProjectForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
        //   {/* <ManageProjectForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
        //   {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
        // </>)
      }}> <NewLookBadge text={"Add"} notifyType={"error"} /></p >,
      //   option: employeeList,
      props: {
        onChange: (e) => { },
      },
      required: true,
      classes: "col-span-1",
    },
  ];
  const onSubmit = (data) => {
    console.log(data);
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };
  const onTableViewSubmit = (data) => {

    console.log(data, "datadatadatadatadat")


    console.log(globalData, "globalDataglobalDataglobalData")

    dispatch(projectListActions.submitProjectTypeData(Urls.projectList_globalSaver, globalData, () => {

      dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
      setIsOpen(false)
    }))
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
        size={"full"}
        children={modalFullBody}
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />



      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">


        <CommonForm
          classes={"grid-cols-1 gap-1"}
          Form={Form}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
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
