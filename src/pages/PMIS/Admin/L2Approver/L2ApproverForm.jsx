import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import PTWActions from "../../../../store/actions/ptw-actions";
const L2ApproverForm = () => {
   isOpen,
  setIsOpen,
  resetting,
  formValue = {},

  onSuccess,

  console.log(formValue, "formValueformValueformValue");

  const dispatch = useDispatch();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProjectTypeName, setSelectedProjectTypeName] = useState("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ptwCustomers = useSelector((state) => state.ptwData.getPtwCustomers);
  const ptwEmployee = useSelector((state) => state.ptwData.getPtwEmployee);
  const ptwProjectType = useSelector(
    (state) => state.ptwData.getPtwProjectType
  );
  const ptwProjectGroup = useSelector(
    (state) => state.ptwData.getPtwProjectGroup
  );
  const ptwMilestone = useSelector((state) => state.ptwData.getPtwMilestone);

  const isEditMode = Object.entries(formValue).length > 0 && !resetting;
  
  useEffect(() => {
    dispatch(PTWActions.getPtwCustomers(true, "", ""));
    dispatch(PTWActions.getPtwEmployee(true, "", ""));
  }, [dispatch]);

  const customerList = ptwCustomers?.map((customer) => ({
    label: customer?.customerName,
    value: customer?.customer || customer?.customerName,
  }));

  const employeeList = ptwEmployee?.map((employee) => ({
    label: employee?.empName,
    value: employee?.employeeId || employee?.empName,
  }));

  const projectTypeList = ptwProjectType?.map((projectType) => ({
    label: projectType?.projectTypeName,
    value: projectType?.projectType || projectType?.projectTypeName,
  }));

  const projectGroupList = ptwProjectGroup?.map((projectGroup) => ({
    label: projectGroup?.projectGroupName,
    value: projectGroup?.projectGroup || projectGroup?.projectGroupName,
  }));

  const MilestoneList = ptwMilestone?.map((Milestone) => ({
    label: Milestone?.MileStone,
    value: Milestone?.MileStone,
  }));

  let Form = [
    {
      label: "Customer Name",
      value: "",
      name: "customer",
      type: "select",
      option: customerList,
      required: true,
      props: {
        onChange: (e) => {
          setSelectedCustomer(e?.target?.value);
          console.log("selectedCustomerselectedCustomer", e?.target?.value);
          dispatch(PTWActions.getPtwProjectType(true, e?.target?.value, ""));
          dispatch(PTWActions.getPtwProjectGroup(true, e?.target?.value, ""));
        },
      },
    },
    {
      label: "Emp Name",
      value: "",
      name: "employeeId",
      type: "select",
      option: employeeList,
      required: true,
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
          let selectedIndex = e?.target?.selectedIndex;

          setSelectedProjectTypeName(e?.target?.options[selectedIndex].text);

          dispatch(
            PTWActions.getPtwProjectMilestone(
              true,
              selectedCustomer,
              e?.target?.value,
              "",
              ""
            )
          );
        },
      },
    },
    {
      label: "Project Group",
      value: "",
      name: "projectGroup",
      type: "select",
      option: projectGroupList,
      required: true,
    },
    {
      label: "Milestone",
      value: "",
      name: "Milestone",
      type: "select",
      option: MilestoneList,
      required: true,
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

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const formData = {
        customer: data.customer,
        employee: data.employeeId,
        projectType: data.projectType,
        projectGroup: data.projectGroup,
        ApproverType: "L2-Approver",
        milestone: data.Milestone,
        projectTypeName: selectedProjectTypeName,
      };

      console.log("Form Data to Submit:", formData);

      if (isEditMode) {
        console.log(formValue?.projectTypeName,typeof(formValue?.projectTypeName),formData?.projectTypeName,typeof(formData?.projectTypeName),'djjhydyyueyutegvgh')
        if (formValue?.projectTypeName && formData?.projectTypeName === "") {
          formData.projectTypeName = formValue.projectTypeName;
        }
        await dispatch(
          PTWActions.updateL1ApproverForm(formData, formValue.uniqueId, () => {
            // Success callback
            reset();
            if (setIsOpen) setIsOpen(false);
            if (onSuccess) onSuccess();
          })
          
        );
        await dispatch(PTWActions.getL1ApproverData(true));
      } else {
        await dispatch(
          PTWActions.submitL1ApproverForm(formData, () => {
            reset();
            if (setIsOpen) setIsOpen(false);
            if (onSuccess) onSuccess();
          })
        );
         await dispatch(PTWActions.getL1ApproverData(true));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onTableViewSubmit = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    dispatch(PTWActions.getPtwCustomers(true, "", ""));
  }, [dispatch]);

  useEffect(() => {
    if (resetting) {
      reset({});
      Form.forEach((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else if (isEditMode) {
      reset({});
      console.log(Object.keys(formValue), "Object.keys(formValue)");

      if (formValue?.customer) {
        setSelectedCustomer(formValue.customer);
        dispatch(PTWActions.getPtwProjectType(true, formValue.customer, ""));
        dispatch(PTWActions.getPtwProjectGroup(true, formValue.customer, ""));
      }

      // Set form values
      Form.forEach((field) => {
        if (["endAt", "startAt"].indexOf(field.name) !== -1) {
          console.log("date formValuekey", field.name, formValue[field.name]);
          const momentObj = moment(formValue[field.name]);
          setValue(field.name, momentObj.toDate());
        } else {
          setValue(field.name, formValue[field.name]);
        }
      });

      // Load milestones if project type is selected
      if (formValue.customerName && formValue.projectType) {
        dispatch(
          PTWActions.getPtwProjectMilestone(
            true,
            formValue.customer,
            formValue.projectType,
            "",
            ""
          )
        );
      }
    }
  }, [formValue, resetting, setValue, dispatch]);

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
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        <>
          <CommonForm
            classes={"grid-cols-2 gap-1"}
            Form={Form}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
        </>
        <Button
          classes={"mt-2 w-sm text-center flex mx-auto"}
          onClick={handleSubmit(onTableViewSubmit)}
          name={
            isSubmitting ? "Submitting..." : isEditMode ? "Update" : "Submit"
          }
          disabled={isSubmitting}
        />
      </div>
    </>
  );
};


export default L2ApproverForm
