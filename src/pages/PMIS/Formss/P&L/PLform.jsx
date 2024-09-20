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
import FormssActions from "../../../../store/actions/formss-actions";

const PLform = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  year,
  month,
  monthss,
}) => {

  let roleName = useSelector((state) => {
    let role = state?.auth?.user?.roleName;
    return role;
  });

  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getPreviousCurrentAndNextMonth = () => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const currentYear = currentDate.getFullYear();
    const previousMonthYear =
      currentMonthIndex === 0 ? currentYear - 1 : currentYear;
    const nextMonthYear =
      currentMonthIndex === 11 ? currentYear + 1 : currentYear;

    return [
      { month: months[previousMonthIndex], year: previousMonthYear },
      { month: months[currentMonthIndex], year: currentYear },
      { month: months[nextMonthIndex], year: nextMonthYear },
    ];
  };

  const [previousMonthData, currentMonthData, nextMonthData] =
    getPreviousCurrentAndNextMonth();
  const monthsss = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let Form = [
    {
      label: "Projected Revenue",
      value: "",
      name: `projectedCost`,
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => {},
      },
    },
    {
      label: "Actual Revenue",
      value: "",
      name: `actualCost`,
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Projected Cost",
      value: "",
      name: `actualCost`,
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Actual Cost",
      value: "",
      name: `actualCost`,
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
      },
      classes: "col-span-1",
    },
    {
      label: "SGNA Cost",
      value: "",
      name: "SGNA",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
      },
      classes: "col-span-1",
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
  const onSubmit = (data) => {
    console.log(data);
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };
  console.log("afasafsasfasasfasfiajsfon", formValue);
  const onTableViewSubmit = (data) => {
    
    for (let i = 0; i < monthss.length; i++) {
      data[`M-${monthss[i]}_x`] = formValue?.totalInvoice;
    }

    // data['totalInvoice'] = formValue?.totalInvoice;

    data["projectGroup"] = formValue?.projectGroup;
    data["costCenter"] = formValue?.costCenter;
    data["projectGroupUid"] = formValue?.projectGroupUid;
    data["customer"] = formValue?.customer;
    data["roleName"] = roleName;
    data["uniqueId"] = formValue?.uniqueId;
    data["year"] = formValue?.year;
    data["month"] = formValue?.month;
    console.log(data, "datadagsdfsfsdfsta");
    // dasdsadsadasdas

    if (formValue.uniqueId) {
      // alert("data_____")
      dispatch(
        FormssActions.putprofitandloss(
          data,
          () => {
          // alert("top")
          setIsOpen(false)
            dispatch(
              FormssActions.postProfiltLossOnSearch(
                {
                  viewBy: monthss.join(","),
                  year: year,
                  yyear: year,
                  selectional: "Monthly",
                  typeSelectional: "Monthly",
                },
                () => {
                  setIsOpen(false)
                  // alert("bottom")
                }
              )
            );
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        FormssActions.postProfiltLossOnSearch(data, () => {
          console.log("CustomQueryActions.postDBConfig");
          setIsOpen(false);
          dispatch(FormssActions.postProfiltLossOnSearch());
        })
      );
    }
  };
  //     const cb = () => {
  //       setIsOpen(false);
  //       dispatch(FormssActions.postProfiltLossOnSearch());
  //   };

  //   if (formValue.uniqueId) {
  //       dispatch(FormssActions.putprofitandloss(data, cb, formValue.uniqueId));
  //   } else {
  //       dispatch(FormssActions.postProfiltLossOnSearch(data, cb));
  //   }
  // };

  console.log(Form, "Form 11");

  // useEffect(()=> {
  //   dispatch(FormssActions.postProfiltLossOnSearch());
  // }, [])

  useEffect(() => {
    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      console.log(Object.keys(formValue), "Object.keys(formValue)");
      Form.forEach((key) => {
        if (["endAt", "startAt"].indexOf(key.name) != -1) {
          console.log("date formValuekey", key.name, formValue[key.name]);
          const momentObj = moment(formValue[key.name]);
          setValue(key.name, momentObj.toDate());
        } else {
          // console.log("formValuekey",key,key)
          setValue(key.name, formValue[key.name]);
        }
      });
    }
  }, [formValue, resetting]);

  console.log("afafasdfasdfjasdf0adfsa", monthss);
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
      {/* <div onClick={() => setIsOpen(false)} className="h-10 w-10 bg-red-500">
        ___hllo___
      </div> */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        {/* {
        monthss.map((itm)=>
        )
      } */}

        <>
          <CommonForm
            classes={"grid-cols-2 gap-1"}
            Form={roleName === "Admin" ? Form : Form2}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
        </>
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

export default PLform;
