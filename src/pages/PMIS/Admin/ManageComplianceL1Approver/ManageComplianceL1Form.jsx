import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import { GET_CURRENT_USER_PG } from "../../../../store/reducers/currentuser-reducer";
import CurrentuserActions from "../../../../store/actions/currentuser-action";
import { GET_ACTIVITY_AND_OEM_COMPLIANCE, GET_PROJECT_TYPE_COMPLIANCE, GET_SUB_PROJECT_TYPE_COMPLIANCE } from "../../../../store/reducers/admin-reducer";
import HrActions from "../../../../store/actions/hr-actions";

const ManageComplianceL1Form = ({
  customeruniqueId,
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {

    
  const complainceRef = useRef({
    cid: "",
    projectType: "",
  });

  let dispatch = useDispatch();

  const [modalOpen, setmodalOpen] = useState(false);
  const [selectType, setSelectType] = useState([]);


  const { customerList, projectTypes, subProjectTypes, activity,milestone } =
    useSelector((state) => {
      const customerList = state?.adminData?.getManageCustomer.map((itm) => {
        return {
          label: itm?.customerName,
          value: itm?.uniqueId,
        };
      });
      const projectTypes = state?.adminData?.getProjectTypeCompliance.map(
        (itm) => {
          return {
            label: itm?.projectType,
            value: itm?.projectType,
          };
        }
      );
      const subProjectTypes = state?.adminData?.getSubProjectTypeCompliance.map(
        (itm) => {
          return {
            label: itm?.subProject,
            value: itm?.uniqueId,
          };
        }
      );
      const activity= state?.adminData?.getActivityAndOemCompliance.find(itm => itm.fieldName === "ACTIVITY")?.dropdownValue.split(",").map(
        (itm) => {
          return {
            label: itm,
            value: itm,
          };
        }
      ) || []

      const milestone= state?.adminData?.getActivityAndOemCompliance[0]?.MileStone?.map(
        (itm) => {
          return {
            label: itm.fieldName,
            value: itm.fieldName,
          };
        }
      ) || []

      return { customerList, projectTypes, subProjectTypes, activity,milestone };
    });

    let projectGroupList = useSelector((state) => {
        return state?.currentuserData?.getcurrentuserPG.map((itm) => {
          return {
            label: itm.projectGroup,
            value: itm.uniqueId,
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


  let Form = [
    {
      label: "Customer Name",
      value: "",
      name: Object.entries(formValue).length > 0 ? "customerName" : "customer",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      required: true,
      option: customerList,
      props: {
        onChange: (e) => {
        dispatch(CurrentuserActions.getcurrentuserPG(true, `customer=${e.target.value}`,1))
          const cid = e.target.value;
          complainceRef.current.cid = cid;
          dispatch(AdminActions.getProjectTypeCompiliance(true, "", cid));
        },
      },
      classes: "col-span-1",
    },
    {
        label: "L1 Approver",
        name: "empApprover",
        type: "newMuitiSelect007",
        value: "",
        option: allEmployeeList,
        props: {
            selectType:selectType
          },
          hasSelectAll:true,
        required: true,
        classes: "col-span-1",
    },
    {
        label: "Project Group",
        name: Object.entries(formValue).length > 0 ? "projectGroupId" : "projectGroup",
        type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
        value: "",
        option: projectGroupList,
        props: {
          onChange: (e) => {
          },
        },
        required: true,
        classes: "col-span-1",
    },
    {
      label: "Project Type",
      name: "projectType",
      type: "select",
      props: {
        onChange: (e) => {
          const projectType = e.target.value;
          complainceRef.current.projectType = projectType;
          dispatch(
            AdminActions.getSubProjectTypeCompiliance(
              true,
              "",
              complainceRef.current.cid,
              projectType
            )
          );
        },
      },
      option: projectTypes,
      required: true,
      value: "",
      classes: "col-span-1",
    },
    {
      label: " Sub Project",
      name: "subProject",
      type: "select",
      value: "",
      props: {
        onChange: (e) => {
          const subProjectType = e.target.value;
          dispatch(
            AdminActions.getActivityAndOemCompiliance(
              true,
              "",
              complainceRef.current.cid,
              subProjectType
            )
          );
        },
      },
      option: subProjectTypes,
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Activity",
      name: "activity",
      type: "select",
      value: "",
      props: {
        onChange: (e) => {},
      },
      option: activity,
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Milestone",
      name: "complianceMilestone",
      type: "select",
      value: "",
      props: {
        onChange: (e) => {},
      },
      required: true,
      classes: "col-span-1",
      option:milestone
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




  const onTableViewSubmit = (data) => {
    data['empApprover'] = data['empApprover']?.split(",")

    data['approverType'] = "L1Approver"
    if (formValue?.uniqueId) {
      dispatch(
        AdminActions.postComplianceApprover(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(AdminActions.getComplianceApprover(true,`approverType=L1Approver`));
          },
          formValue?.uniqueId
        )
      );
    } else {  
      dispatch(
        AdminActions.postComplianceApprover(true, data, () => {
          setIsOpen(false);
          dispatch(AdminActions.getComplianceApprover(true,`approverType=L1Approver`));

        })
      );
    }
  };

  useEffect(() => {
    setSelectType([])
    dispatch(AdminActions.getManageCustomer());
    dispatch(HrActions.getHRAllEmployee());
    dispatch(GET_CURRENT_USER_PG({ dataAll: [], reset: true }))
    dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll:[], reset:true }))
    dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll:[], reset:true }))
    dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll:[], reset:true }))
    
    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
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

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4 pb-5">
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

export default ManageComplianceL1Form;
