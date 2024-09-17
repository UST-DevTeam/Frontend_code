import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import AlertConfigurationActions from '../../../../store/actions/alertConfiguration-actions';
import CustomQueryActions from '../../../../store/actions/customQuery-actions';
import Modal from '../../../../components/Modal';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';
import ExpenseAdvanceActions from '../../../../store/actions/expenseAdvance-actions';


const SettlementForm = ({ isOpen, setIsOpen, resetting, formValue = {}, filtervalue }) => {
    // let subProjectTypelist = useSelector((state) => {
    //     return state?.adminData?.getAccuralRevenueMasterSubProject?.map((itm) => {
    //       return {
    //         label: itm?.subProjectName,
    //         value: itm?.subProject,
    //       };
    //     });
    // });
    
    let employeesList = useSelector((state) => {
        return state?.hrReducer?.getHRAllEmployee.map((itm) => {
            return {
            label: itm.empName,
            value: itm.uniqueId,
            };
        });
        });
    // let employeesList2 = useSelector((state) => {
    //     return state?.hrReducer?.getHRAllEmployee.map((itm) => {
    //         return {
    //         label: itm.ustCode,
    //         value: itm.uniqueId,
    //         };
    //     });
    //     });

    //   let Projectlist = useSelector((state) => {
    //     return state?.adminData?.getAccuralRevenueMasterProjectId?.map((itm) => {
    //       return {
    //         label: itm?.projectId,
    //         value: itm?.project,
            
    //       };
    //     });
    //   });


    const [modalOpen, setmodalOpen] = useState(false)

    let dispatch = useDispatch()

    let Form = [
        
        
         
        
        // {
        //     label: "Band",
        //     value: "",
        //     name: "band",
        //     type: "text",
        //     // required: true,
        //     filter: true,
        //     props: {
        //         onChange: ((e) => {
        //             // console.log(e.target.value, "e geeter")
        //             // setValue("queries",e.target.name)
        //         }),
        //     },
        //     classes: "col-span-1"
        // },
        {
            label: "Employee",
            type: "select",
            name: "empID",
            option: employeesList
            // props: {
            // }
        },
        // {
        //     label: "UST Code",
        //     type: "select",
        //     name: "ustCode",
        //     option: employeesList2
        //     // props: {
        //     // }
        // },
        // {
        //     label: "Date Of Birth(as Per doc)",
        //     name: "dob",
        //     type: "datetime",
        //     value: "",
        //     props: "",
        //     required: false,
        //   },
        {
            label: "Settlement Requisition Date",
            value: "",
            name: "SettlementRequisitionDate",
            type: "datetime",
            // required: true,
            // filter: true,
            // props: {
            //     onChange: ((e) => {
            //         // console.log(e.target.value, "e geeter")
            //         // setValue("queries",e.target.name)
            //     }),
            // },
            classes: "col-span-1"
        },
        {
            label: "Approval Date",
            value: "",
            name: "approvalDate",
            type: "datetime",
            // required: true,
            // filter: true,
            // props: {
            //     onChange: ((e) => {
            //         // console.log(e.target.value, "e geeter")
            //         // setValue("queries",e.target.name)
            //     }),
            // },
            classes: "col-span-1"
        },
        {
            label: "Amount",
            value: "",
            name: "Amount",
            type: "number",
            // required: true,
            filter: true,
            props: {
                onChange: ((e) => {
                    // console.log(e.target.value, "e geeter")
                    // setValue("queries",e.target.name)
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Remarks",
            value: "",
            name: "remarks",
            type: "text",
            // required: true,
            filter: true,
            props: {
                onChange: ((e) => {
                    // console.log(e.target.value, "e geeter")
                    // setValue("queries",e.target.name)
                }),
            },
            classes: "col-span-1"
        },
        
        
    ]
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        // dispatch(AuthActions.signIn(data, () => {
        //     navigate('/authenticate')
        // }))
    }

    
    const onTableViewSubmit = (data) => {
        if (formValue.uniqueId) {
            dispatch(ExpenseAdvanceActions.postSettlementAmount(data, () => {
                setIsOpen(false)
                dispatch(ExpenseAdvanceActions.getSettlementAmount(true,filtervalue))
            }, formValue.uniqueId))
        } else {
            dispatch(ExpenseAdvanceActions.postSettlementAmount(data, () => {
                setIsOpen(false)
                dispatch(ExpenseAdvanceActions.getSettlementAmount())
            }))
        }
    }

    // useEffect(() => {
    //   if (!isOpen) {
    //     reset({});
    //     Form.forEach(key => setValue(key.name, formValue[key.name] || ""));
    //   } else {
    //     reset({});
    //   }
    // }, [isOpen,formValue,resetting]);


    useEffect(() => {
        dispatch(ExpenseAdvanceActions.getSettlementAmount())
        // dispatch(HrActions.getHRAllEmployee());
    }, []);

    useEffect(() => {
        dispatch(ExpenseAdvanceActions.getSettlementAmount())
        
        if (resetting) {
          reset({});
    
          
          setSelectedLabel('')
          
          Form.map((fieldName) => {
            setValue(fieldName["name"], fieldName["value"]);
          });
        } else {
          reset({});
          
    
    
          // setCategory(claimTypeList.filter((itm)=>itm.label==formValue["types"])[0]["categories"])
          
    
          
    
          
         
          Object.keys(formValue).forEach((key) => {
            console.log(key,"key. name")
    
            if (["approvalDate"].indexOf(key) != -1) {
              const momentObj = moment(formValue[key],"DD-MM-yyyy");
              setValue("approvalDate", momentObj.toDate());
            } else {
              setValue(key, formValue[key]);
            }
          });
    
    
          
        //   setValue("claimType",claimTypeList.filter((itm)=>itm.label==formValue["claimType"])[0]?.["value"]) ||[]
        //   handleClaimTypeChange(claimTypeList.filter((itm)=>itm.label==formValue["claimType"])[0]?.["value"])
        }
    
        // if(dataItm){
          
        //   const momentObj = moment(dataItm["expenseDate"],"YYYY-MM-DD");
        //   setValue("ExpenseDate", momentObj.toDate());
        //   setValue("ExpenseDate", momentObj.format("YYYY-MM-DD"));
        // }
        
      }, [formValue, resetting]);



    return <>
        <Modal size={"xl"} children={<><CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} /></>} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">

            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            {/* <button></button> */}


            {/* <button onClick={() => { setmodalOpen(true) }} className='flex bg-primaryLine mt-6 w-42 absolute right-1 top-1 justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Add DB Type <Unicons.UilPlus /></button> */}
            {/* <Table headers={["S.No.", "DB Type", "DB Server", "DB Name", "Created By", "Created Date", "Last Modified By", "Last Modified Date", "Actions"]} columns={[["1", "abcd", "ancd", "abcd", "ancd"], ["2", "adsa", "dasdas", "abcd", "ancd"]]} /> */}
            {/* <button onClick={(handleSubmit(onTableViewSubmit))} className='bg-primaryLine mt-6 w-full justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button> */}
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>


};

export default SettlementForm;