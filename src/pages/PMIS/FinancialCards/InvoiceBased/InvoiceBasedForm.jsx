import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import FinanceActions from "../../../../store/actions/finance-actions";
import { GET_MANAGE_MARKET, GET_PROJECT_BY_CUSTOMER, GET_PROJECT_TYPE_COMPLIANCE, GET_SUB_PROJECT_TYPE_COMPLIANCE } from "../../../../store/reducers/admin-reducer";

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

  const complainceRef = useRef({
          cid: "",
          projectType: "",
  });

  const { customerList, projectTypes, subProjectTypes, projectList,marketList} =
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
    });
    const subProjectTypes = state?.adminData?.getSubProjectTypeCompliance.map(
        (itm) => {
        return {
            label: itm?.subProject,
            value: itm?.uniqueId,
        };
        }
    );

    const projectList = state?.adminData?.getProjectByCustomer.map(
        (itm) => {
        return {
            label: itm.projectIdName,
            value: itm.projectIdUid,
        };
        }
    ) || []

    const marketList = state?.adminData?.getManageMarket.map(
        (itm) => {
        return {
            label: itm?.marketName,
            value: itm.marketName,
        };
        }
    ) || []


    return { customerList, projectTypes, subProjectTypes,projectList,marketList};
    });

  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();

  
  // let customerList = useSelector((state) => {
  //   return state?.adminData?.getManageCustomer.map((itm) => {
  //     return {
  //       label: itm?.customerName,
  //       value: itm?.uniqueId,
  //     };
  //   });
  // });



  let Form = [
    {
      label: "Client Name",
      value: "",
      name: Object.entries(formValue).length > 0 ? "customerName" : "customer",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      required: true,
      option: customerList,
      classes: "col-span-1",
      props: {
        onChange: (e) => {
          const cid = e.target.value;
          if (cid){
            complainceRef.current.cid = cid;
            dispatch(AdminActions.getProjectTypeCompiliance(true, `customerId=${cid}`));
            dispatch(AdminActions.getProjectByCustomer(true,e.target.value,""))
            dispatch(AdminActions.getManageMarket(true,`customerId=${cid}`,0))
          }
          else{
            dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
            dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
            dispatch(GET_PROJECT_BY_CUSTOMER({ dataAll:[], reset:true })); 
            dispatch(GET_MANAGE_MARKET({ dataAll:[], reset:true }));
          }
        },
      },
    },
    {
      label: "Project Type",
      name: Object.entries(formValue).length > 0 ? "projectType" : "projectType",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      value: "",
      option: projectTypes,
      props: {
        onChange: (e) => {
          const projectType = e.target.value;
          if (projectType){
            complainceRef.current.projectType = projectType;
            dispatch(AdminActions.getSubProjectTypeCompiliance(true, "", complainceRef.current.cid, projectType));
          }
          else{
              dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
          }
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Sub Project Type",
      name: Object.entries(formValue).length > 0 ? "projectSubTypeName" : "projectSubType",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      value: "",
      option: subProjectTypes,
      props: {
        onChange: (e) => {
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "UST Project ID",
      value: "",
      name: "ustProjectId",
      type: "text",
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "ProjectId",
      name: Object.entries(formValue).length > 0 ? "projectIdName" : "projectId",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      value: "",
      option: projectList,
      props: {
        onChange: (e) => {
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Market",
      name: Object.entries(formValue).length > 0 ? "market" : "market",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      value: "",
      option: marketList,
      props: {
        onChange: (e) => {
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Scope",
      value: "",
      name: "scope",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
      required: true,
      option: [
        { label: "Survey PO", value: "Survey PO" },
        { label: "Signage PO", value: "Signage PO" },
        { label: "Revisit PO", value: "Revisit PO" },
        { label: "Colo PO", value: "Colo PO" },
      ],
    },
    {
      label: "PO#",
      value: "",
      name: "poNumber",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "text",
      required: true,
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Line no#",
      value: "",
      name: "itemCode",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "text",
      required: true,
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "PO Description",
      value: "",
      name: "description",
      type: "text",
      // required: true,
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "PO Received Date",
      value: "",
      name: "poReceivedDate",
      type: "datetime",
      formatop:"MM-DD-YYYY",
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "PO Validity Date",
      value: "",
      name: "poValidityDate",
      type: "datetime",
      formatop:"MM-DD-YYYY",
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Unit Price",
      value: "",
      name: "unitPrice",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "number",
      required: true,
      props: {
        valueAsNumber: true,
        min: 1,
        onChange: (e) => {
        },
        
      },
      classes: "col-span-1",
    },
    {
      label: "Quantity",
      value: "",
      name: "qty",
      type: formValue['poStatus'] === "Closed" || formValue['poStatus'] === "Short Closed" ? "sdisabled" : "number",
      required: true,
      props: {
        valueAsNumber: true,
        min: 1,
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Status",
      value: "",
      name: "poStatus",
      type: "select",
      required: true,
      option: [
        { label: "Open", value: "Open" },
        { label: "Closed", value: "Closed" },
        { label: "Short Closed", value: "Short Closed" },
      ],
      classes: "col-span-1",
    },
  ];

  const onTableViewSubmit = (data) => {
    if (formValue.uniqueId) {
      dispatch(
        FinanceActions.postPOInvoicedBased(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(FinanceActions.getPOInvoicedBased());
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        FinanceActions.postPOInvoicedBased(true, data, () => {
          setIsOpen(false);
          dispatch(FinanceActions.getPOInvoicedBased());
        })
      );
    }
  };


  useEffect(() => {
    dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
    dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
    dispatch(GET_PROJECT_BY_CUSTOMER({ dataAll:[], reset:true })); 
    dispatch(GET_MANAGE_MARKET({ dataAll:[], reset:true }));
    dispatch(AdminActions.getManageCustomer());
    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      Form.forEach((key) => {

        if (["poReceivedDate", "poValidityDate"].indexOf(key.name) != -1 && formValue[key.name]) {
          const momentObj = moment(formValue[key.name], "MM-DD-YYYY");
          console.log(momentObj,key.name)
          setValue(key.name, momentObj.toDate());
        } else if (key.type == "select") {
          let dtwq = key.option.filter(
            (itq) => itq.label == formValue[key.name]
          );
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

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
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

export default InvoiceBasedForm;
