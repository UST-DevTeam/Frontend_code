// // import { useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { useDispatch, useSelector } from "react-redux";
// // import moment from "moment";
// // import * as Unicons from "@iconscout/react-unicons";
// // import Modal from "../../../../components/Modal";
// // import CommonForm from "../../../../components/CommonForm";
// // import Button from "../../../../components/Button";
// // import PTWActions from "../../../../store/actions/ptw-actions";

// // const L1ApproverForm = ({
// //   isOpen,
// //   setIsOpen,
// //   resetting,
// //   formValue = {},
// //   year,
// //   month,
// //   monthss,
// // }) => {
// //   const dispatch = useDispatch();
// //   const [selectedCustomer, setSelectedCustomer] = useState("");
// //   const [selectedEmployee, setSelectedEmployee] = useState("");
// //   const [modalOpen, setmodalOpen] = useState(false);
// //   const ptwCustomers = useSelector((state) => state.ptwData.getPtwCustomers);
// //   const ptwEmployee = useSelector((state) => state.ptwData.getPtwEmployee);
// //   const ptwProjectType = useSelector(
// //     (state) => state.ptwData.getPtwProjectType
// //   );
// //   const ptwProjectGroup = useSelector(
// //     (state) => state.ptwData.getPtwProjectGroup
// //   );
// //   const ptwMilestone = useSelector((state) => state.ptwData.getPtwMilestone);
// //   useEffect(() => {
// //     dispatch(PTWActions.getPtwCustomers(true, "", ""));

// //     dispatch(PTWActions.getPtwEmployee(true, "", ""));
// //   }, [dispatch]);

// //   const customerList = ptwCustomers?.map((customer) => ({
// //     label: customer?.customerName,
// //     value: customer?.uniqueId || customer?.customerName,
// //   }));

// //   const employeeList = ptwEmployee?.map((employee) => ({
// //     label: employee?.empName,
// //     value: employee?.uniqueId || employee?.empName,
// //   }));
// //   const projectTypeList = ptwProjectType?.map((projectType) => ({
// //     label: projectType?.projectType,
// //     value: projectType?.projectTypeId || projectType?.projectType,
// //   }));
// //   const projectGroupList = ptwProjectGroup?.map((projectGroup) => ({
// //     label: projectGroup?.projectGroupName,
// //     value: projectGroup?.uniqueId || projectGroup?.projectGroupName,
// //   }));
// //   console.log(
// //     ptwMilestone,
// //     "MilestoneListMilestoneListMilestoneListMilestoneList"
// //   );
// //   const MilestoneList = ptwMilestone?.map((Milestone) => ({
// //     label: Milestone?.MileStone,
// //     value: Milestone?.MileStone,
// //   }));

// //   // 

// //   let Form = [
// //     {
// //       label: "Customer Name",
// //       value: "",
// //       name:
// //         Object.entries(formValue).length > 0 ? "customerName" : "customerName",
// //       type: Object.entries(formValue).length > 0 ? "select" : "select",
// //       option: customerList,
// //       required: true,
// //       props: {
// //         onChange: (e) => {
// //           setSelectedCustomer(e?.target?.value);
// //           dispatch(PTWActions.getPtwProjectType(true, e?.target?.value, ""));
// //           dispatch(PTWActions.getPtwProjectGroup(true, e?.target?.value, ""));
         
// //         },
// //       },
// //     },
// //     {
// //       label: "Emp Name",
// //       value: "",
// //       name:
// //         Object.entries(formValue).length > 0 ? "employeeName" : "employeeName",
// //       type: Object.entries(formValue).length > 0 ? "select" : "select",
// //       option: employeeList,
// //       required: true,
     
// //     },

// //     {
// //       label: "Project Type",
// //       value: "",
// //       name:
// //         Object.entries(formValue).length > 0 ? "projectType" : "projectType",
// //       type: Object.entries(formValue).length > 0 ? "select" : "select",
// //       option: projectTypeList,
// //       required: true,
// //       props: {
// //         onChange: (e) => {
// //           dispatch(
// //             PTWActions.getPtwProjectMilestone(
// //               true,
// //               selectedCustomer,
// //               e?.target?.value,
// //               "",
// //               ""
// //             )
// //           );

        
// //         },
// //       },
// //     },
// //     {
// //       label: "Project Group",
// //       value: "",
// //       name:
// //         Object.entries(formValue).length > 0 ? "projectGroup" : "projectGroup",
// //       type: Object.entries(formValue).length > 0 ? "select" : "select",
// //       option: projectGroupList,
// //       required: true,
// //     },
// //     {
// //       label: "Milestone",
// //       value: "",
// //       name: Object.entries(formValue).length > 0 ? "milestone" : "milestone",
// //       type: Object.entries(formValue).length > 0 ? "select" : "select",
// //       option: MilestoneList,
// //       required: true,
// //     },
// //   ];

// //   const {
// //     register,
// //     handleSubmit,
// //     watch,
// //     reset,
// //     setValue,
// //     getValues,
// //     formState: { errors },
// //   } = useForm();

// //   const onSubmit = (data) => {
 
    
// //   };

// //   const onTableViewSubmit = (data) => {
// //     alert("jkszkjsjkjk");
// //     console.log("Table view submitted:", data);

// //     if (setIsOpen) {
// //       setIsOpen(false);
// //     }
// //   };

// //   useEffect(() => {
// //     dispatch(PTWActions.getPtwCustomers(true, "", ""));
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (resetting) {
// //       reset({});
// //       Form.map((fieldName) => {
// //         setValue(fieldName["name"], fieldName["value"]);
// //       });
// //     } else {
// //       reset({});
// //       console.log(Object.keys(formValue), "Object.keys(formValue)");
// //       Form.forEach((key) => {
// //         if (["endAt", "startAt"].indexOf(key.name) != -1) {
// //           console.log("date formValuekey", key.name, formValue[key.name]);
// //           const momentObj = moment(formValue[key.name]);
// //           setValue(key.name, momentObj.toDate());
// //         } else {
// //           setValue(key.name, formValue[key.name]);
// //         }
// //       });
// //     }
// //   }, [formValue, resetting, setValue]);

// //   return (
// //     <>
// //       <Modal
// //         size={"xl"}
// //         children={
// //           <>
// //             <CommonForm
// //               classes={"grid-cols-1 gap-1"}
// //               Form={Form}
// //               errors={errors}
// //               register={register}
// //               setValue={setValue}
// //               getValues={getValues}
// //             />
// //           </>
// //         }
// //         isOpen={modalOpen}
// //         setIsOpen={setmodalOpen}
// //       />
// //       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
// //         <>
// //           <CommonForm
// //             classes={"grid-cols-2 gap-1"}
// //             Form={Form}
// //             errors={errors}
// //             register={register}
// //             setValue={setValue}
// //             getValues={getValues}
// //           />
// //         </>
// //         <Button
// //           classes={"mt-2 w-sm text-center flex mx-auto"}
// //           onClick={handleSubmit(onTableViewSubmit)}
// //           name="Submit"
// //         />
// //       </div>
// //     </>
// //   );
// // };

// // export default L1ApproverForm;



// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import * as Unicons from "@iconscout/react-unicons";
// import Modal from "../../../../components/Modal";
// import CommonForm from "../../../../components/CommonForm";
// import Button from "../../../../components/Button";
// import PTWActions from "../../../../store/actions/ptw-actions";

// const L1ApproverForm = ({
//   isOpen,
//   setIsOpen,
//   resetting,
//   formValue = {},
//   year,
//   month,
//   monthss,
// }) => {
//   const dispatch = useDispatch();
//   const [selectedCustomer, setSelectedCustomer] = useState("");
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [modalOpen, setmodalOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const ptwCustomers = useSelector((state) => state.ptwData.getPtwCustomers);
//   const ptwEmployee = useSelector((state) => state.ptwData.getPtwEmployee);
//   const ptwProjectType = useSelector(
//     (state) => state.ptwData.getPtwProjectType
//   );
//   const ptwProjectGroup = useSelector(
//     (state) => state.ptwData.getPtwProjectGroup
//   );
//   const ptwMilestone = useSelector((state) => state.ptwData.getPtwMilestone);
  
//   useEffect(() => {
//     dispatch(PTWActions.getPtwCustomers(true, "", ""));
//     dispatch(PTWActions.getPtwEmployee(true, "", ""));
//   }, [dispatch]);

//   const customerList = ptwCustomers?.map((customer) => ({
//     label: customer?.customerName,
//     value: customer?.uniqueId || customer?.customerName,
//   }));

//   const employeeList = ptwEmployee?.map((employee) => ({
//     label: employee?.empName,
//     value: employee?.uniqueId || employee?.empName,
//   }));
  
//   const projectTypeList = ptwProjectType?.map((projectType) => ({
//     label: projectType?.projectType,
//     value: projectType?.projectTypeId || projectType?.projectType,
//   }));
  
//   const projectGroupList = ptwProjectGroup?.map((projectGroup) => ({
//     label: projectGroup?.projectGroupName,
//     value: projectGroup?.uniqueId || projectGroup?.projectGroupName,
//   }));
  
//   console.log(
//     ptwMilestone,
//     "MilestoneListMilestoneListMilestoneListMilestoneList"
//   );
  
//   const MilestoneList = ptwMilestone?.map((Milestone) => ({
//     label: Milestone?.MileStone,
//     value: Milestone?.MileStone,
//   }));

//   let Form = [
//     {
//       label: "Customer Name",
//       value: "",
//       name:
//         Object.entries(formValue).length > 0 ? "customerName" : "customerName",
//       type: Object.entries(formValue).length > 0 ? "select" : "select",
//       option: customerList,
//       required: true,
//       props: {
//         onChange: (e) => {
//           setSelectedCustomer(e?.target?.value);
//           dispatch(PTWActions.getPtwProjectType(true, e?.target?.value, ""));
//           dispatch(PTWActions.getPtwProjectGroup(true, e?.target?.value, ""));
//         },
//       },
//     },
//     {
//       label: "Emp Name",
//       value: "",
//       name:
//         Object.entries(formValue).length > 0 ? "employeeName" : "employeeName",
//       type: Object.entries(formValue).length > 0 ? "select" : "select",
//       option: employeeList,
//       required: true,
//     },
//     {
//       label: "Project Type",
//       value: "",
//       name:
//         Object.entries(formValue).length > 0 ? "projectType" : "projectType",
//       type: Object.entries(formValue).length > 0 ? "select" : "select",
//       option: projectTypeList,
//       required: true,
//       props: {
//         onChange: (e) => {
//           dispatch(
//             PTWActions.getPtwProjectMilestone(
//               true,
//               selectedCustomer,
//               e?.target?.value,
//               "",
//               ""
//             )
//           );
//         },
//       },
//     },
//     {
//       label: "Project Group",
//       value: "",
//       name:
//         Object.entries(formValue).length > 0 ? "projectGroup" : "projectGroup",
//       type: Object.entries(formValue).length > 0 ? "select" : "select",
//       option: projectGroupList,
//       required: true,
//     },
//     {
//       label: "Milestone",
//       value: "",
//       name: Object.entries(formValue).length > 0 ? "milestone" : "milestone",
//       type: Object.entries(formValue).length > 0 ? "select" : "select",
//       option: MilestoneList,
//       required: true,
//     },
//   ];

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();


//   const onSubmit = async (data) => {
//     try {
//       setIsSubmitting(true);
      
    
//       const formData = {
//         customerName: data.customerName,
//         employeeName: data.employeeName,
//         projectType: data.projectType,
//         projectGroup: data.projectGroup,
//         milestone: data.milestone,
//         year: year,
//         month: month,
       
//       };

//       console.log("Form Data to Submit:", formData);

    
//       await dispatch(PTWActions.submitL1ApproverForm(formData));
      
//       // Show success message
//       alert("Form submitted successfully!");
      
//       // Reset form after successful submission
//       reset();
      
//       // Close modal if needed
//       if (setIsOpen) {
//         setIsOpen(false);
//       }
      
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Error submitting form. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Keep the table view submit function for backward compatibility
//   const onTableViewSubmit = (data) => {
//     // Call the main submit function
//     onSubmit(data);
//   };

//   useEffect(() => {
//     dispatch(PTWActions.getPtwCustomers(true, "", ""));
//   }, [dispatch]);

//   useEffect(() => {
//     if (resetting) {
//       reset({});
//       Form.map((fieldName) => {
//         setValue(fieldName["name"], fieldName["value"]);
//       });
//     } else {
//       reset({});
//       console.log(Object.keys(formValue), "Object.keys(formValue)");
//       Form.forEach((key) => {
//         if (["endAt", "startAt"].indexOf(key.name) != -1) {
//           console.log("date formValuekey", key.name, formValue[key.name]);
//           const momentObj = moment(formValue[key.name]);
//           setValue(key.name, momentObj.toDate());
//         } else {
//           setValue(key.name, formValue[key.name]);
//         }
//       });
//     }
//   }, [formValue, resetting, setValue]);

//   return (
//     <>
//       <Modal
//         size={"xl"}
//         children={
//           <>
//             <CommonForm
//               classes={"grid-cols-1 gap-1"}
//               Form={Form}
//               errors={errors}
//               register={register}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           </>
//         }
//         isOpen={modalOpen}
//         setIsOpen={setmodalOpen}
//       />
//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
//         <>
//           <CommonForm
//             classes={"grid-cols-2 gap-1"}
//             Form={Form}
//             errors={errors}
//             register={register}
//             setValue={setValue}
//             getValues={getValues}
//           />
//         </>
//         <Button
//           classes={"mt-2 w-sm text-center flex mx-auto"}
//           onClick={handleSubmit(onTableViewSubmit)}
//           name={isSubmitting ? "Submitting..." : "Submit"}
//           disabled={isSubmitting}
//         />
//       </div>
//     </>
//   );
// };

// export default L1ApproverForm;



import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import PTWActions from "../../../../store/actions/ptw-actions";

const L1ApproverForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  year,
  month,
  monthss,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
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

  // Check if this is edit mode
  const isEditMode = Object.entries(formValue).length > 0 && !resetting;

  useEffect(() => {
    dispatch(PTWActions.getPtwCustomers(true, "", ""));
    dispatch(PTWActions.getPtwEmployee(true, "", ""));
  }, [dispatch]);

  const customerList = ptwCustomers?.map((customer) => ({
    label: customer?.customerName,
    value: customer?.uniqueId || customer?.customerName,
  }));

  const employeeList = ptwEmployee?.map((employee) => ({
    label: employee?.empName,
    value: employee?.uniqueId || employee?.empName,
  }));

  const projectTypeList = ptwProjectType?.map((projectType) => ({
    label: projectType?.projectType,
    value: projectType?.projectTypeId || projectType?.projectType,
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
      name: "customerName",
      type: "select",
      option: customerList,
      required: true,
      props: {
        onChange: (e) => {
          setSelectedCustomer(e?.target?.value);
          dispatch(PTWActions.getPtwProjectType(true, e?.target?.value, ""));
          dispatch(PTWActions.getPtwProjectGroup(true, e?.target?.value, ""));
        },
      },
    },
    {
      label: "Emp Name",
      value: "",
      name: "employeeName",
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
      name: "milestone",
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

  // Main form submission function
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Prepare form data for submission
      const formData = {
        customer: data.customerName,
        employee: data.employeeName,
        projectType: data.projectType,
        projectGroup: data.projectGroup,
        ApproverType:"L1-Approver",
        milestone: data.milestone,
        
        
      };

      console.log("Form Data to Submit:", formData);

      if (isEditMode) {
        // Update existing record
        await dispatch(
          PTWActions.updateL1ApproverForm(
            formData, 
            formValue.uniqueId, 
            () => {
              // Success callback
              reset();
              if (setIsOpen) setIsOpen(false);
              if (onSuccess) onSuccess();
            }
          )
        );
      } else {
        // Create new record
        await dispatch(
          PTWActions.submitL1ApproverForm(
            formData, 
            () => {
            
              reset();
              if (setIsOpen) setIsOpen(false);
              if (onSuccess) onSuccess();
            }
          )
        );
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
      
      // Set selected customer for dependent dropdowns
      if (formValue.customerName) {
        setSelectedCustomer(formValue.customerName);
        dispatch(PTWActions.getPtwProjectType(true, formValue.customerName, ""));
        dispatch(PTWActions.getPtwProjectGroup(true, formValue.customerName, ""));
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
            formValue.customerName,
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
          name={isSubmitting ? "Submitting..." : isEditMode ? "Update" : "Submit"}
          disabled={isSubmitting}
        />
      </div>
    </>
  );
};

export default L1ApproverForm;