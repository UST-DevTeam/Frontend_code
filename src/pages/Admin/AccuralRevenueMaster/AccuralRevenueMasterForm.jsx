import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import AlertConfigurationActions from '../../../store/actions/alertConfiguration-actions';
import CustomQueryActions from '../../../store/actions/customQuery-actions';
import Modal from '../../../components/Modal';
import CommonForm from '../../../components/CommonForm';
import Button from '../../../components/Button';
import AdminActions from '../../../store/actions/admin-actions';


const AccuralRevenueMasterForm = ({ isOpen, setIsOpen, resetting, formValue = {}, filtervalue }) => {




    let subProjectTypelist = useSelector((state) => {
        return state?.adminData?.getAccuralRevenueMasterSubProject?.map((itm) => {
          return {
            label: itm?.subProjectName,
            value: itm?.subProject,
            
          };
        });
    });
    
    let ProjectTypelist = useSelector((state) => {
        return state?.adminData?.getAccuralRevenueMasterProjectType?.map((itm) => {
          return {
            label: itm?.projectTypeName,
            value: itm?.projectType,
            
          };
        });
      });

      let Projectlist = useSelector((state) => {
        return state?.adminData?.getAccuralRevenueMasterProjectId?.map((itm) => {
          return {
            label: itm?.projectId,
            value: itm?.project,
            
          };
        });
      });


    const [modalOpen, setmodalOpen] = useState(false)

    let dispatch = useDispatch()

    let Form = [
        
        {
            label: "Project Type",
            value: "",
            name:Object.entries(formValue).length > 0 ? "projectTypeName" : "projectType",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            option: ProjectTypelist,
            props: {
              onChange: (e)=>{
                dispatch(AdminActions.getAccuralRevenueMasterProjectID(true, `projectType=${e.target.value}`));
                dispatch(AdminActions.getAccuralRevenueMasterSubProjectType(true, `projectType=${e.target.value}`))
              },
              
            },
            required: true,
            classes: "col-span-1",
          },
          {
            label: "Project",
            value: "",
            name:Object.entries(formValue).length > 0 ? "projectId" : "project",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            option: Projectlist,
            props: {
              onChange: (e)=>{
                
              },
              
            },
            required: true,
            classes: "col-span-1",
          },
        {
            label: "Sub Project",
            value: "",
            // name: "subProject",
            // type: "select",
            name:Object.entries(formValue).length > 0 ? "subProjectName" : "subProject",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            option: subProjectTypelist,
            props: {
            //   onChange: (e)=>{
            //     handleClaimTypeChange(e.target.value)
            //     handleClaimTypeChange2(e.target.value)
            //   },
              
            },
            required: true,
            classes: "col-span-1",
          },
        {
            label: "Band",
            value: "",
            name: "band",
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
        {
            label: "Activity",
            value: "",
            name: "activity",
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
        {
            label: "Rate",
            value: "",
            name: "rate",
            type: "number",
            required: true,
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
            label: "Item Code-01",
            value: "",
            name: "itemCode01",
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
        {
            label: "Item Code-02",
            value: "",
            name: "itemCode02",
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
        {
            label: "Item Code-03",
            value: "",
            name: "itemCode03",
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
        {
            label: "Item Code-04",
            value: "",
            name: "itemCode04",
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
        {
            label: "Item Code-05",
            value: "",
            name: "itemCode05",
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
        {
            label: "Item Code-06",
            value: "",
            name: "itemCode06",
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
        {
            label: "Item Code-07",
            value: "",
            name: "itemCode07",
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
            dispatch(AdminActions.postAccuralRevenueMasterProject(data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getAccuralRevenueMasterProject(true,filtervalue))
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postAccuralRevenueMasterProject(data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getAccuralRevenueMasterProject())
            }))
        }
    }

    useEffect(() => {
      if (!isOpen) {
        reset({});
        Form.forEach(key => setValue(key.name, formValue[key.name] || ""));
      } else {
        reset({});
      }
    }, [isOpen,formValue,resetting]);


    // useEffect(() => {
    //     if (resetting) {
    //       reset({});
    //       Form.map((fieldName) => {
    //         setValue(fieldName["name"], fieldName["value"]);
    //       });
    //     } else {
    //       reset({});
    //       console.log(Object.keys(formValue), "Object.keys(formValue)");
    //       Object.keys(formValue).forEach((key) => {
    //         if (["endAt", "startAt"].indexOf(key.name) != -1) {
    //           console.log("date formValuekey", key.name, formValue[key.name]);
    //           const momentObj = moment(formValue[key.name]);
    //           setValue(key.name, momentObj.toDate());
    //         } else {
    //           // console.log("formValuekey",key,key)
    //           setValue(key, formValue[key]);
    //         }
    //       });
    //     }
    //   }, [formValue, resetting ]);



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

export default AccuralRevenueMasterForm;