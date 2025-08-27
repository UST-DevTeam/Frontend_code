import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';
import { GET_ACTIVITY_AND_OEM_COMPLIANCE, GET_PROJECT_TYPE_COMPLIANCE, GET_SUB_PROJECT_TYPE_COMPLIANCE } from '../../../../store/reducers/admin-reducer';

const ManageMappedMilestoneForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {



    const complainceRef = useRef({
        cid: "",
        projectType: "",
      });


    let dispatch = useDispatch()

    // let customerList = useSelector((state) => {
    //     return state?.adminData?.getManageCustomer.map((itm) => {
    //         return {
    //             label: itm?.customerName,
    //             value: itm?.uniqueId
    //         }
    //     })
    // })

    const { customerList, projectTypes, subProjectTypes, milestone,tracking } =
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
        }
      );
      const subProjectTypes = state?.adminData?.getSubProjectTypeCompliance.map(
        (itm) => {
          return {
            label: itm?.subProject,
            value: itm?.uniqueId,
          };
        }
      );

    //   const activity = state?.adminData?.getActivityAndOemCompliance.find(itm => itm.fieldName === "ACTIVITY")?.dropdownValue.split(",").map(
    //     (itm) => {
    //       return {
    //         label: itm,
    //         value: itm,
    //       };
    //     }
    //   ) || []

    //   const OEM = state?.adminData?.getActivityAndOemCompliance.find(itm => itm.fieldName === "OEM NAME")?.dropdownValue.split(",").map(
    //     (itm) => {
    //       return {
    //         label: itm,
    //         value: itm,
    //       };
    //     }
    //   ) || []

      const milestone = state?.adminData?.getActivityAndOemCompliance[0]?.MileStone?.map(
        (itm) => {
          return {
            label: itm.fieldName,
            value: itm.fieldName,
          };
        }
      ) || []
      const tracking = state?.adminData?.getActivityAndOemCompliance[0]?.t_tracking?.map(
        (itm) => {
          return {
            label: itm.fieldName,
            value: itm.fieldName,
          };
        }
      ) || []

      return { customerList, projectTypes, subProjectTypes,milestone,tracking};
    });

    let Form = [
        {
            label: "Customer",
            value: "",
            name: "customer",
            type: "select",
            required: true,
            option: customerList,
            props: {
                onChange: (e) => {
                    const cid = e.target.value;
                    if (cid){
                        complainceRef.current.cid = cid;
                        dispatch(AdminActions.getProjectTypeCompiliance(true, `customerId=${cid}`));

                    }
                    else {
                        dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
                        dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
                        dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll: [], reset: true }))
                    }
                    
                },
            },
            classes: "col-span-1"
        },
        {
            label: "Scope",
            value: "",
            name: "projectType",
            type: "select",
            required: true,
            props: {
                onChange: (e) => {
                    const projectType = e.target.value;
                    if (projectType){
                        complainceRef.current.projectType = projectType;
                        dispatch(AdminActions.getSubProjectTypeCompiliance(true, "", complainceRef.current.cid, projectType));

                    }
                    else{
                        dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true })) 
                        dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll: [], reset: true }))
                    }
                    
                },
            },
            option: projectTypes,
            classes: "col-span-1"
        },
        {
            label: "Sub Scope",
            value: "",
            type: "select",
            name: "subProject",
            required: true,
            props: {
                onChange: (e) => {
                const subProjectType = e.target.value;
                if (subProjectType){
                    dispatch(AdminActions.getActivityAndOemCompiliance(true, `subProjectType=${subProjectType}&milestoneArgs=${"YES"}`));
                }
                else{
                    dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll: [], reset: true })) 
                }
                
                },
            },
            option: subProjectTypes,
            classes: "col-span-1"
        },
        {
            label: "Milestone",
            value: "",
            type: "select",
            name: "milestoneName",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            option:milestone,
            classes: "col-span-1"
        },
        {
            label: "Tracking Field",
            value: "",
            type: "select",
            name: "trackingField",
            required: true,
            props: {
                onChange: ((e) => {

                }),
            },
            option:tracking,
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


    const onTableViewSubmit = (data) => {
        
        Object.keys(data).forEach(key => {
            if (typeof data[key] === "string") {
                data[key] = data[key].trim()
            }
        })

        if (formValue.uniqueId) {
            dispatch(AdminActions.postManageMappedMilestone(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageMappedMilestone())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postManageMappedMilestone(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageMappedMilestone())
            }))
        }
    }

    useEffect(() => {
        dispatch(AdminActions.getManageCustomer());
        dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
        dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
        dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll: [], reset: true }))
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

    return <>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>
};



export default ManageMappedMilestoneForm;