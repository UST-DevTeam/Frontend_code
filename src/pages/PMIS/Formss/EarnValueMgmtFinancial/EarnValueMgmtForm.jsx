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
 
const EarnValueMgmtForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  year,
  monthss,
}) => {
  // console.log(isOpen, setIsOpen, resetting, formValue, "formValueformValue")

  // console.log(isOpen,"isOpen")
  // console.log(setIsOpen,"setIsOpen")
  // console.log(resetting,"resetting")
  // console.log(formValue,"formValue")
  let roleName = useSelector((state)=>{
    console.log("afafasdfasdfasdfasfasdadfs",state);
    let role = state?.auth?.user?.roleName
    return role
  })
  console.log("adsfasfasdfasdfadfs",monthss);


  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();

  // const projectList = useSelector((state) => {
  //   return state?.adminData?.getProject.map((itm) => {
  //     return {
  //       label: itm?.projectId,
  //       value: itm?.uniqueId,
  //     };
  //   });
  // });

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getPreviousCurrentAndNextMonth = () => {
      const currentDate = new Date();
      const currentMonthIndex = currentDate.getMonth();
      const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
      const nextMonthIndex = (currentMonthIndex + 1) % 12;
      const currentYear = currentDate.getFullYear();
      const previousMonthYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;
      const nextMonthYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;

      return [
          { month: months[previousMonthIndex], year: previousMonthYear },
          { month: months[currentMonthIndex], year: currentYear },
          { month: months[nextMonthIndex], year: nextMonthYear }
      ];
  };

  const [previousMonthData, currentMonthData, nextMonthData] = getPreviousCurrentAndNextMonth();
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
console.log("afasdfasdfasdfasdfadsadf",monthsss[1]);
    console.log("afdasfasfasfasdfafasdfasafds",...monthss);
    
    
    let Form = [
      // {
      //   label: `Plan (${previousMonthData.month} ${previousMonthData.year})`,
      //   value: "",
      //   name: 'plan1',
      //   type: "number",
      //   filter: true,
      //   props: {
      //     valueAsNumber:true,
      //     min: 0,
      //     onChange: (e) => {},
      //   },
      //   classes: "col-span-1",
      // },
      ...monthss.map((itm)=>(
        {
          label: `PV Target (${monthsss[itm]} ${year})`,
          value: "",
          name: `M-${itm}_y`,
          type: "number",
          props: {
            valueAsNumber:true,
            min: 0,
            onChange: (e) => {},
          },
          classes: "col-span-1",
        })),
      ...monthss.map((itm)=>(
        {
          label: `AOP Target (${monthsss[itm]} ${year})`,
          value: "",
          name: `aop_target-${itm}`,
          type: "number",
          props: {
            valueAsNumber:true,
            min: 0,
            onChange: (e) => {},
          },
          classes: "col-span-1",
        })),
      // {
      //   label:  `Plan (${nextMonthData.month} ${nextMonthData.year})`,
      //   value: "",
      //   name: 'plan3',
      //   type: "number",
      //   props: {
      //     valueAsNumber:true,
      //     min: 0,
      //     onChange: (e) => {},
      //   },
      //   classes: "col-span-1",
      // },
      // {
      //   label: "Project ID",
      //   type: "autoSuggestion",
      //   name: "projectId",
      //   option: projectList,
      //   props: {},
      // },
    ];
    let Form2 = [
      // {
      //   label: `Plan (${previousMonthData.month} ${previousMonthData.year})`,
      //   value: "",
      //   name: 'plan1',
      //   type: "number",
      //   filter: true,
      //   props: {
      //     valueAsNumber:true,
      //     min: 0,
      //     onChange: (e) => {},
      //   },
      //   classes: "col-span-1",
      // },        
        {
          label: `PV Target (${currentMonthData.month} ${currentMonthData.year})`,
          value: "",
          name:  `M-${monthss[0]}_y`,
          type: "number",
          props: {
            valueAsNumber:true,
            min: 0,
            onChange: (e) => {},
          },
          classes: "col-span-1",
        },
        {
          label: `AOP Target (${currentMonthData.month} ${currentMonthData.year})`,
          value: "",
          name: `aop_target-${monthss[0]}`,
          type: "number",
          props: {
            valueAsNumber:true,
            min: 0,
            onChange: (e) => {},
          },
          classes: "col-span-1",
        },
      
      // {
      //   label:  `Plan (${nextMonthData.month} ${nextMonthData.year})`,
      //   value: "",
      //   name: 'plan3',
      //   type: "number",
      //   props: {
      //     valueAsNumber:true,
      //     min: 0,
      //     onChange: (e) => {},
      //   },
      //   classes: "col-span-1",
      // },
      // {
      //   label: "Project ID",
      //   type: "autoSuggestion",
      //   name: "projectId",
      //   option: projectList,
      //   props: {},
      // },
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
  console.log("afasafsasfasasfasfiajsfon",formValue);
  const onTableViewSubmit = (data) => {


    console.log(data,"___________data")


    for(let i = 0; i<monthss.length; i++){
      data[`M-${monthss[i]}_x`] = formValue?.totalInvoice;
    }




    // data['totalInvoice'] = formValue?.totalInvoice;




    // data['projectType'] = formValue?.projectType;
    // data['totalInvoice'] = formValue?.totalInvoice;
    data['costCenter'] = formValue?.costCenter;
    data['circle'] = formValue?.circle;
    data['roleName'] = roleName;
    data['uniqueId'] = formValue?.uniqueId;
    data['year'] = year;
    data['projectId'] = formValue?.projectId;
    console.log(data, "datadagsdfsfsdfsta");
    // dasdsadsadasdas
    if (formValue.uniqueId) {
      dispatch(
        FormssActions.putEarnValueMgmtFinancial(
          data,
          () => {
            console.log("CustomQueryActions.postDBConfig_amarafafasdfasfadsfadsf");
            setIsOpen(false);
            dispatch(FormssActions.getEarnValueMgmtFinancial(data['projectId']));
          },
        )
      );
    } else {
      dispatch(
        FormssActions.postEarnValueMgmtFinancial(data, () => {
          console.log("CustomQueryActions.postDBConfig");
          setIsOpen(false);
          dispatch(FormssActions.getEarnValueMgmtFinancial());
        })
      );
    }
  };
  console.log(Form, "Form 11");
  useEffect(() => {
    console.log("formValue in useEffect:", formValue);
    // dispatch(FormssActions.getEarnValueMgmtFinancial());
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


  console.log("afafasdfasdfjasdf0adfsa",monthss);
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
       {/* {
        monthss.map((itm)=>
        )
      } */}
        
      <>
        <CommonForm
          classes={"grid-cols-2 gap-1"}
          Form={(roleName==='Admin')?Form:Form2}
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

export default EarnValueMgmtForm;
