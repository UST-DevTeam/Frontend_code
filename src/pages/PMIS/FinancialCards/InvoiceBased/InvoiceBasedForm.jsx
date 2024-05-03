import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import { useParams } from "react-router-dom";
import AdminActions from "../../../../store/actions/admin-actions";
import FinanceActions from "../../../../store/actions/finance-actions";
import projectListActions from "../../../../store/actions/projectList-actions";

const InvoiceBasedForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors },
      } = useForm();
    
  const { customeruniqueId, projectuniqueId } = useParams();

        value: itm?.uniqueId,
      };
    });
  });
  let projectGroupList = useSelector((state) => {
    console.log(state,'statestate')
    return state?.adminData?.getManageProjectGroup.map((itm) => {
      return {
        label: itm.projectGroupId,
        value: itm.uniqueId,
      };
    });
  });

  let projectTypeList = useSelector((state) => {
    return state?.adminData?.getCardProjectType.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.uniqueId,
      };
    });
  });

  let subProjectList = useSelector((state) => {
    return state?.adminData?.getManageProjectType
      .filter((itm) => {
        console.log(itm.projectType == pType, "dasdsadsadas");
        return itm.projectType == pType;
      })
      .map((itm) => {
        return {
          label: itm.subProject,
          value: itm.uniqueId,
        };
      });
  });
  // let circleList = useSelector((state) => {
  //   return state?.projectList?.getprojectcircle.map((itm) => {
  //     return {
  //       label: itm.circle,
  //       value: itm.uniqueId,
  //     };
  //   });
  // });

  // useSelector((state) => {
  //   console.log(circlewq, getValues(), circleList.length, "getValues");

  //   if (circlewq && circleList.length > 0) {
  //     setValue("circle", getValues()["circle"]);
  //   }
  // });

  // let projectGroupList = useSelector((state) => {
  //     return state?.adminData?.getManageProjectGroup
  //       .filter((itm) => {
  //         console.log(itm.circleName == qType, "sadsadasdasdsadsadas");
  //         return itm.circleName == qType;
  //       })
  //       .map((itm) => {
  //         return {
  //           label: itm.projectGroupId,
  //           value: itm.uniqueId,
  //         };
  //       });
  //   });

  let projectIdList = useSelector((state) => {
    return state?.adminData?.getProject.map((itm) => {
      return {
        label: itm?.projectId,
        value: itm?.uniqueId,
      };
    });
  });


  let PONumberList = useSelector((state) => {
    return state?.financeData?.getInvoice.map((itm) => {
      return {
        label: itm?.poNumber,
        value: itm?.uniqueId,
      };
    });
  });

  // let projectIdList = useSelector((state) => {
  //     return state?.adminData?.getProject
  //       .filter((itm) => {
  //         console.log(itm.projectId == rType, "dasdsadsadasdaadsadas");
  //         return itm.projectId == rType;
  //       })
  //       .map((itm) => {
  //         return {
  //           label: itm.projectId,
  //           value: itm.uniqueId,
  //         };
  //       });
  //   });

  let Form = [
    {
      label: "Customer",
      value: "",
      name: "customer",
      type: "select",
      required: true,
      option: customerList,
      classes: "col-span-1",
      props: {
        onChange: (e) => {
          dispatch(AdminActions.getManageProjectGroup(true,`customer=${e.target.value}`))
          // dispatch(AdminActions.getManageProjectType(true,`customer=${e.target.value}`))
        },
      },
    },
    {
      label: "Project Group",
      name: "projectGroup",
      type: "select",
      value: "",
      option: projectGroupList,
      props: {
        onChange: (e) => {
        },
      },
      required: true,
      classes: "col-span-1",
    },
    // {
    //   label: "Circle",
    //   value: "",
    //   name: "circle",
    //   type: "select",
    //   option: circleList,
    //   // required: true,
    //   props: {
    //     onChange: (e) => {
    //     },
    //   },
    //   classes: "col-span-1",
    // },
    {
      label: "Project Type",
      value: "",
      name: "projectType",
      type: "select",
      // required: true,
      option: projectTypeList,
      props: {
        onChange: (e) => {
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
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Project ID",
      value: "",
      name: "project",
      type: "select",
      option: projectIdList,
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "GBPA",
      value: "",
      name: "gbpa",
      type: "text",
      // option: projectIdList,
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "PO Number",
      value: "",
      name: "poNumber",
      type: "text",
      // option: PONumberList,
      required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "PO Start Date",
      value: "",
      name: "poStartDate",
      type: "datetime",
      // option: PONumberList,
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "PO End Date",
      value: "",
      name: "poEndDate",
      type: "datetime",
      // option: PONumberList,
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Item Code",
      value: "",
      name: "itemCode",
      type: "text",
      required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Description",
      value: "",
      name: "description",
      type: "text",
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Unit Rate",
      value: "",
      name: "unitRate",
      type: "text",
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Initial PO Qty",
      value: "",
      name: "initialPoQty",
      type: "text",
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Invoiced Qty",
      value: "",
      name: "invoicedQty",
      type: "text",
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Open Qty(Post Invoice)",
      value: "",
      name: "openqty",
      type: "text",
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Open PO Value(INR)-Invoiced",
      value: "",
      name: "openPoValue",
      type: "text",
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Status",
      value: "",
      name: "status",
      type: "select",
      // required: true,
      option: [
        { label: "Open", value: "Open" },
        { label: "Closed", value: "Closed" },
        { label: "Short Closed", value: "Short Closed" },
      ],
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
    console.log(data, "datadata");
    if (formValue.uniqueId) {
      dispatch(
        FinanceActions.postPOInvoicedBased(
          true,
          data,
          () => {
            console.log("CustomQueryActions.postDBConfig");
            setIsOpen(false);
            dispatch(FinanceActions.getPOInvoicedBased());
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        FinanceActions.postPOInvoicedBased(true, data, () => {
          console.log("CustomQueryActions.postDBConfig");
          setIsOpen(false);
          dispatch(FinanceActions.getPOInvoicedBased());
        })
      );
    }
  };
  useEffect(() => {
    dispatch(AdminActions.getManageCustomer());
    dispatch(AdminActions.getManageCircle());
    // dispatch(AdminActions.getCardProjectType(customeruniqueId));
    // dispatch(AdminActions.getManageProjectGroup());
    dispatch(projectListActions.getProjectTypeAll());
    dispatch(FinanceActions.getInvoice())
    dispatch(AdminActions.getProject());

    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      // console.log(formValue, "Object.keys(formValue)");
      Form.forEach((key) => {
        if (["startDate", "endDate"].indexOf(key.name) != -1) {
          // console.log("date formValuekey", key.name, formValue[key.name]);
          const momentObj = moment(formValue[key.name], "DD/MM/YYYY");
          setValue(key.name, momentObj.toDate());
        } else if (key.type == "select") {
          if (key.name == "projectType") {
            setpType(formValue["projectTypeName"]);
          }

          if (key.name == "projectGroup") {
            dispatch(projectListActions.getProjectCircle(true,`projectGroupId=${formValue["projectGroup"]}`));
            setcircle(true);
          }

          let dtwq = key.option.filter(
            (itq) => itq.label == formValue[key.name]
          );

          console.log(dtwq, key.name, formValue[key.name], "dtwqdtwqdtwq");
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
        size={"sm"}
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

export default InvoiceBasedForm;
