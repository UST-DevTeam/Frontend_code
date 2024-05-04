import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
// import { useParams } from "react-router-dom";
import AdminActions from "../../../../store/actions/admin-actions";
import FinanceActions from "../../../../store/actions/finance-actions";
import projectListActions from "../../../../store/actions/projectList-actions";
import { GET_CARD_PROJECT_TYPE, GET_MANAGE_PROJECT_GROUP,GET_PO_PROJECTTYPE,GET_PO_PROJECTID,GET_INVOICE_SITEID,GET_INVOICE_SSID } from "../../../../store/reducers/admin-reducer";

const InvoiceForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [modalOpen, setmodalOpen] = useState(false);
  const [pType, setpType] = useState("");
  const [qType, setqType] = useState("");
  const [rType, setrType] = useState("");

  let dispatch = useDispatch();

  let customerList = useSelector((state) => {
    return state?.adminData?.getManageCustomer.map((itm) => {
      return {
        label: itm?.customerName,
        value: itm?.uniqueId,
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
    return state?.adminData?.getPOProjectType.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.uniqueId,
      };
    });
  });

  let projectIdList = useSelector((state) => {
    return state?.adminData?.getPOProjectID.map((itm) => {
      return {
        label: itm?.projectId,
        value: itm?.uniqueId,
      };
    });
  });

  let SiteList = useSelector((state) => {
    return state?.adminData?.getInvoiceSiteId.map((itm) => {
      return {
        label: itm.siteId,
        value: itm?.uniqueId,
      };
    });
  });

  let SSIDList = useSelector((state) => {
    return state?.adminData?.getInvoiceSSID.map((itm) => {
      return {
        label: itm.systemId,
        value: itm?.uniqueId,
      };
    });
  });


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
          dispatch(AdminActions.getPOProjectType(true,`customer=${e.target.value}`))
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
          dispatch(AdminActions.getPOProjectID(true,`projectGroup=${e.target.value}`))
        },
      },
      required: true,
      classes: "col-span-1",
    },
    // {
    //   label: "Sub-Project Type",
    //   name: "subProject",
    //   type: "select",
    //   value: "",
    //   option: subProjectList,
    //   // required: true,
    //   props: {
    //     onChange: (e) => {},
    //   },
    //   classes: "col-span-1",
    // },
    {
      label: "Project Type (Sub Project Type)",
      value: "",
      name: "projectType",
      type: "select",
      // required: true,
      option: projectTypeList,
      props: {
        onChange: (e) => {
          dispatch(AdminActions.getInvoiceSiteId(true,`subProjectId=${e.target.value}`))
        },
      },
      classes: "col-span-1",
    },
    {
      label: "Project ID",
      value: "",
      name: "projectId",
      option: projectIdList,
      type: "select",
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Site Id",
      value: "",
      name: "siteId",
      type: "select",
      option: SiteList,
      // required: true,
      props: {
        onChange: (e) => {
          // dispatch(AdminActions.getInvoiceSSID(true,`siteId=${e.target.value}`))
        },
      },
      classes: "col-span-1",
    },
    // {
    //   label: "SSID",
    //   value: "",
    //   name: "systemId",
    //   type: "select",
    //   // required: true,
    //   option:SSIDList,
    //   props: {
    //     onChange: (e) => {
    //     },
    //   },
    //   classes: "col-span-1",
    // },
    {
      label: "WCC No",
      value: "",
      name: "wccNumber",
      type: "text",
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "WCC SignOff Date",
      value: "",
      name: "wccSignOffdate",
      type: "datetime",
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
      required: true,
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
      label: "Qty",
      value: "",
      name: "qty",
      type: "number",
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Invoice Number",
      value: "",
      name: "invoiceNumber",
      type: "text",
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Invoice Date",
      value: "",
      name: "invoiceDate",
      type: "datetime",
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
      type: "number",
      // required: true,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Amount",
      value: "",
      name: "amount",
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
    console.log(data, "datadatbbbabaa");
    if (formValue.uniqueId) {
      dispatch(
        FinanceActions.postInvoice(
          true,
          data,
          () => {
            console.log("CustomQueryActions.postDBConfig");
            setIsOpen(false);
            dispatch(FinanceActions.getInvoice());
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        FinanceActions.postInvoice(true, data, () => {
          console.log("CustomQueryActions.postDBConfig");
          setIsOpen(false);
          dispatch(FinanceActions.getInvoice());
        })
      );
    }
  };
  useEffect(() => {
    dispatch(GET_MANAGE_PROJECT_GROUP({dataAll:[],reset:true}))
    dispatch(GET_MANAGE_PROJECT_GROUP({dataAll:[],reset:true}))
    dispatch(GET_PO_PROJECTTYPE({dataAll:[],reset:true}))
    dispatch(GET_PO_PROJECTID({dataAll:[],reset:true}))
    dispatch(GET_INVOICE_SITEID({dataAll:[],reset:true}))
    dispatch(GET_INVOICE_SSID({dataAll:[],reset:true}))
   


    dispatch(AdminActions.getManageCustomer());

    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      // console.log(formValue, "Object.keys(formValue)");
      Form.forEach((key) => {
             
        if (["wccSignOffdate", "invoiceDate"].indexOf(key.name) != -1 &&
        formValue[key.name])  {
          const momentObj = moment(formValue[key.name], "DD/MM/YYYY");
          setValue(key.name, momentObj.toDate());
        } else if (key.type == "select") {
          // if (key.name == "projectType") {
          //   setpType(formValue["projectTypeName"]);
          // }

          // if (key.name == "projectGroup") {
          //   dispatch(projectListActions.getProjectCircle(true,`projectGroupId=${formValue["projectGroup"]}`));
          //   setcircle(true);
          // }

          let dtwq = key.option.filter(
            (itq) => itq.label == formValue[key.name]
          );

          console.log(dtwq, key.name, formValue[key.name], "dtwqdtwqdtwq");
          if (dtwq.length > 0) {
            setValue(key.name, dtwq[0]["value"]);
          } else {
            setValue(key.name, formValue[key.name]);
          }
        } 
        else {
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

export default InvoiceForm;
