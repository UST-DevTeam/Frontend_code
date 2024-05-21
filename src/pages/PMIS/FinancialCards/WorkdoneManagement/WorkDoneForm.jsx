import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
 
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
// import { useParams } from "react-router-dom";
import FinanceActions from "../../../../store/actions/finance-actions";
import { GET_POWORKDONE_ITEMCODE } from "../../../../store/reducers/finance-reducer";

const WorkDoneForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  

  const [finalForm, setFinalForm] = useState({});


  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();

  let ItemCodeList = useSelector((state) => {
    return state?.financeData?.getPOWorkDoneItemCode?.map((itm) => {
      return {
        label: itm?.ItemCode,
        value: itm?.ItemCode,
      };
    });
  });

  // let ItemCodeList = useSelector((state) => {
  //   return state?.financeData?.getPOWorkDoneBased
  //     ?.map((itm) => {
  //       return itm?.commercialResult?.Commercial?.map((item) => ({
  //         label: item?.ItemCode,
  //         value: item?.ItemCode,
  //       }));

  //     })
  // });

  //   let ItemCodeList = useSelector((state) => {
  //     return state?.financeData?.getPOWorkDoneBased
  //       ?.flatMap((itm) => {
  //         return itm?.commercialResult?.Commercial?.map((item) => {
  //           console.log(item, "==================================");
  //           return {
  //             label: item?.ItemCode,
  //             value: item?.ItemCode,
  //           };
  //         }) || [];
  //       }) || [];

  // }).filter((item, index, self) =>
  //     index === self.findIndex((t) => (
  //         t.value === item.value
  //     ))
  // );




  // let Form = [
  //   {
  //     label: "Item Code 1",
  //     value: "",
  //     name: "Item Code 1",
  //     type: "select",
  //     option: ItemCodeList,
  //     props: {
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Quantity 1",
  //     value: "",
  //     name: "Quantity 1",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Amount 1",
  //     value: "",
  //     name: "Amount 1",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Item Code 2",
  //     value: "",
  //     name: "Item Code 2",
  //     type: "select",
  //     option: ItemCodeList,
  //     props: {
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Quantity 2",
  //     value: "",
  //     name: "Quantity 2",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Amount 2",
  //     value: "",
  //     name: "Amount 2",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Item Code 3",
  //     value: "",
  //     name: "Item Code 3",
  //     type: "select",
  //     option: ItemCodeList,
  //     props: {
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Quantity 3",
  //     value: "",
  //     name: "Quantity 3",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Amount 3",
  //     value: "",
  //     name: "Amount 3",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Item Code 4",
  //     value: "",
  //     name: "Item Code 4",
  //     type: "select",
  //     option: ItemCodeList,
  //     props: {
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Quantity 4",
  //     value: "",
  //     name: "Quantity 4",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Amount 4",
  //     value: "",
  //     name: "Amount 4",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Item Code 5",
  //     value: "",
  //     name: "Item Code 5",
  //     type: "select",
  //     option: ItemCodeList,
  //     props: {
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Quantity 5",
  //     value: "",
  //     name: "Quantity 5",
  //     type: "number",
  //     option: ItemCodeList,
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Amount 5",
  //     value: "",
  //     name: "Amount 5",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Item Code 6",
  //     value: "",
  //     name: "Item Code 6",
  //     type: "select",
  //     option: ItemCodeList,
  //     props: {
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Quantity 6",
  //     value: "",
  //     name: "Quantity 6",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Amount 6",
  //     value: "",
  //     name: "Amount 6",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Item Code 7",
  //     value: "",
  //     name: "Item Code 7",
  //     type: "select",
  //     option: ItemCodeList,
  //     props: {
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Quantity 7",
  //     value: "",
  //     name: "Quantity 7",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Amount 7",
  //     value: "",
  //     name: "Amount 7",
  //     type: "number",
  //     props: {
  //       valueAsNumber: true,
  //       onChange: (e) => {},
  //     },
  //     classes: "col-span-1",
  //   },
  // ];




  let inwoForm = [
    {
      label: "Item Code",
      value: "",
      name: "itemCode",
      type: "select",
      option: ItemCodeList,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Quantity",
      value: "",
      name: "quantity",
      type: "number",
      props: {
        valueAsNumber: true,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    }
  ];
  let sForm = [
    {
      label: "Item Code",
      value: "",
      name: "itemCode",
      type: "select",
      option: ItemCodeList,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Quantity",
      value: "",
      name: "quantity",
      type: "number",
      props: {
        valueAsNumber: true,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    }
  ];

  let cForm=[]

  console.log(["","","","","","",""].map((itwq,index)=>{
    return sForm.map((iets)=>{
      cForm.push({
        ...iets,
        label:iets.label+" "+(+index+1),
        name:iets.name+""+(+index+1),
        props:{
          ...iets.props,
          onChange: (e) => {
            console.log("sadsadsadas",iets.name+(+index+1),e.target.value)
          },
        }
      })
    })
  }),"dfghj")
  const onSubmit = (data) => {
    console.log(data);
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };

  const onTableViewSubmit = (data) => {
    if (formValue.uniqueId) {
      dispatch(
        FinanceActions.postPOWorkDoneBased(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(FinanceActions.getPOWorkDoneBased());
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        FinanceActions.postPOWorkDoneBased(true, data, () => {
          setIsOpen(false);
          dispatch(FinanceActions.getPOWorkDoneBased());
        })
      );
    }
  };
  useEffect(() => {
    dispatch(GET_POWORKDONE_ITEMCODE({ dataAll: [], reset: true }));

    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      console.log(Object.keys(formValue), "Object.keys(formValue)");
      Object.keys(formValue).forEach((key) => {
        if (["endAt", "startAt"].indexOf(key.name) != -1) {
          console.log("date formValuekey", key.name, formValue[key.name]);
          const momentObj = moment(formValue[key.name]);
          setValue(key.name, momentObj.toDate());
        } else {
          setValue(key, formValue[key]);
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
              Form={inwoForm}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
            <CommonForm
              classes={"grid-cols-1 gap-1"}
              Form={["", "", "", ""].map((itw) => {
                return cForm.map((itq) => {
                  return itq;
                });
              })}
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

      {console.log([""].map((itw) => {return cForm}, "cFormcFormcForm"))}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        <CommonForm
          classes={"grid-cols-2 gap-1"}
          Form={cForm}
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

export default WorkDoneForm;
