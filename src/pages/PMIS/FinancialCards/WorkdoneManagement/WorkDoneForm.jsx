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

  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();

  let Form = [
    {
        label: "Item Code 1",
        value: "",
        name: "Item Code 1",
        type: "select",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Quantity 1",
        value: "",
        name: "Quantity 1",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Amount 1",
        value: "",
        name: "Amount 1",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
    {
        label: "Item Code 2",
        value: "",
        name: "Item Code 2",
        type: "select",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Quantity 2",
        value: "",
        name: "Quantity 2",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Amount 2",
        value: "",
        name: "Amount 2",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
    {
        label: "Item Code 3",
        value: "",
        name: "Item Code 3",
        type: "select",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Quantity 3",
        value: "",
        name: "Quantity 3",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Amount 3",
        value: "",
        name: "Amount 3",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
    {
        label: "Item Code 4",
        value: "",
        name: "Item Code 4",
        type: "select",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Quantity 4",
        value: "",
        name: "Quantity 4",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Amount 4",
        value: "",
        name: "Amount 4",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
    {
        label: "Item Code 5",
        value: "",
        name: "Item Code 5",
        type: "select",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Quantity 5",
        value: "",
        name: "Quantity 5",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Amount 5",
        value: "",
        name: "Amount 5",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
    {
        label: "Item Code 6",
        value: "",
        name: "Item Code 6",
        type: "select",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Quantity 6",
        value: "",
        name: "Quantity 6",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Amount 6",
        value: "",
        name: "Amount 6",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
    {
        label: "Item Code 7",
        value: "",
        name: "Item Code 7",
        type: "select",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Quantity 7",
        value: "",
        name: "Quantity 7",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
        classes: "col-span-1",
      },
      {
        label: "Amount 7",
        value: "",
        name: "Amount 7",
        type: "number",
        // required: true,
        props: {
          onChange: (e) => {},
        },
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

    if (resetting) {
            reset({})
            Form.map((fieldName) => {
                setValue(fieldName["name"], fieldName["value"]);
            });
        } else {
            reset({})
            console.log(Object.keys(formValue), "Object.keys(formValue)")
            Object.keys(formValue).forEach((key) => {


                if (["endAt", "startAt"].indexOf(key.name) != -1) {
                    console.log("date formValuekey", key.name, formValue[key.name])
                    const momentObj = moment(formValue[key.name]);
                    setValue(key.name, momentObj.toDate());


                } else {
                    setValue(key, formValue[key]);
                }
            })
        }
    }, [formValue, resetting]) 
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
          classes={"grid-cols-3 gap-1"}
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

export default WorkDoneForm;
