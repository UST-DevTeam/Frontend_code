// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import Button from "../../../../components/Button";
// import { useForm } from "react-hook-form";
// import CommonForm from "../../../../components/CommonForm";
// import Api from "../../../../utils/api";
// import { Urls } from "../../../../utils/url";
// import { tableAction } from "../../../../store/actions/table-action";
// import { SET_TABLE } from "../../../../store/reducers/table-reducer";

// const ExchangeForm = ({ isOpen,
//         setIsOpen,
//         resetting,
//         formValue = {},
//         year,
//         month,
//         monthss,
//         // formState: { errors }
//      }) => {
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();
  

//   console.log("formValue___", formValue)

//   let Form = [
//     {
//       label: "Year",
//       value: "",
//       name: "year",
//       type: "number",
//       classes: "col-span-1",
//       required: true,
//       props: {
//         valueAsNumber: true,
//         min: 2000,
//       },
//     },
//     {
//       label: "Rate",
//       value: "",
//       name: "rate",
//       type: "number",
//       classes: "col-span-1",
//       required: true,
//       props: {
//         valueAsNumber: true,
//         min: 0,
//       },
//     },
//   ];
//   // useEffect(()=>{
//   //             dispatch(tableAction.getTable(Urls.exchangeRate, SET_TABLE))
//   //         },[])

//   useEffect(() => {
//     // dispatch(CurrentuserActions.getcurrentuserCostCenter())
//     // dispatch(gpTrackingActions.getGPProjectGroup());
//     dispatch(tableAction?.getTable(Urls?.exchangeRate, SET_TABLE));
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
//   }, []);

//   const onSubmit = async (data) => {
    // if (formValue?.uniqueId) {

    //     const resp = await Api.post({
    //         data,
    //         url: Urls.exchangeRate,
    //         cb: () => dispatch(tableAction.getTable(Urls.exchangeRate+"/"+formValue?.uniqueId, SET_TABLE)),
    //       });
    //       if (resp.status == 201) {
    //         setIsOpen(false);
    //       }

    // } else {
    //   const resp = await Api.post({
    //     data,
    //     url: Urls.exchangeRate,
    //     cb: () => dispatch(tableAction.getTable(Urls.exchangeRate, SET_TABLE)),
    //   });
    //   if (resp.status == 201) {
    //     setIsOpen(false);
    //   }
    // }
//   };

//   return (
//     <>
//       <CommonForm
//         classes={"grid-cols-1 gap-1"}
//         Form={Form}
//         errors={errors}
//         register={register}
//         setValue={setValue}
//         getValues={getValues}
//       />
//       <Button
//         classes={"mt-2 w-sm text-center flex mx-auto"}
//         onClick={handleSubmit(onSubmit)}
//         name="Submit"
//       />
//     </>
//   );
// };
// export default ExchangeForm;




import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import { SET_TABLE } from '../../../../store/reducers/table-reducer'
import { tableAction } from "../../../../store/actions/table-action";
import { Urls } from "../../../../utils/url";

// import gpTrackingActions from "../../../../store/actions/gpTrackingActions";
// import { rule } from "postcss";

const ExchangeForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  year,
  month,
  monthss,
}) => {
    let dispatch = useDispatch();
    const [modalOpen, setmodalOpen] = useState(false);

  let Form = [
    {
      label: "Year",
      value: "",
      name: "year",
      type: "number",
      classes: "col-span-1",
      required: true,
      props: {
        valueAsNumber: true,
        min: 2000,
      },
    },
    {
      label: "Rate",
      value: "",
      name: "rate",
      type: "number",
      classes: "col-span-1",
      required: true,
      props: {
        valueAsNumber: true,
        min: 0,
      },
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
  };

  const onTableViewSubmit = async (data) => {
    

    // data.cost = convertToIntOrNull(data.cost);
    

    if (formValue?.uniqueId) {

        const resp = await Api.post({
            data,
            url: Urls.exchangeRate,
            cb: () => dispatch(tableAction.getTable(Urls.exchangeRate+"/"+formValue?.uniqueId, SET_TABLE)),
          });
          if (resp.status == 201) {
            setIsOpen(false);
          }

    } else {
      const resp = await Api.post({
        data,
        url: Urls.exchangeRate,
        cb: () => dispatch(tableAction.getTable(Urls.exchangeRate, SET_TABLE)),
      });
      if (resp.status == 201) {
        setIsOpen(false);
      }
    }
  };


  //   // useEffect(()=>{
//   //             dispatch(tableAction.getTable(Urls.exchangeRate, SET_TABLE))
//   //         },[])

  useEffect(() => {
    
    dispatch(tableAction.getTable(Urls.exchangeRate, SET_TABLE))
    console.log(SET_TABLE,'djyjdyjudyuyudyuyudyu')
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
          setValue(key.name, formValue[key.name]);
        }
      });
    }
  }, []);
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
          name="Submit"
        />
      </div>
    </>
  );
};

export default ExchangeForm;

