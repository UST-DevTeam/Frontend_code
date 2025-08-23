import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';
import { GET_PROJECT_BY_CUSTOMER } from '../../../../store/reducers/admin-reducer';

const ManageMarketForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {

    console.log(isOpen,"isOpen")
    console.log(setIsOpen,"setIsOpen")
    console.log(resetting,"resetting")
    console.log(formValue,"formValue")

    const [modalOpen, setmodalOpen] = useState(false)


    let dispatch = useDispatch()

    let customerList = useSelector((state) => {
        return state?.adminData?.getManageCustomer.map((itm) => {
            return {
                label: itm?.customerName,
                value: itm?.uniqueId
            }
        })
    })

    // let projectList = useSelector((state) => {
    //     return state?.adminData?.getProjectByCustomer.map((itm) => {
    //         return {
    //             label: itm?.projectIdName,
    //             value: itm?.projectIdUid
    //         }
    //     })
    // })

    let Form = [
        {
            label: "Customer",
            value: "",
            name: Object.entries(formValue).length > 0  ? "customerName" : "customer",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
            required: true,
            option: customerList,
            // props: {
            //     onChange: ((e) => {
            //         if(e.target.value){
            //             dispatch(AdminActions.getProjectByCustomer(true,e.target.value,""))
            //         }
            //         else{
            //           dispatch(GET_PROJECT_BY_CUSTOMER({ dataAll:[], reset:true }));  
            //         }
            //     }),
            // },
            classes: "col-span-1"
        },
        // {
        //     label: "Project",
        //     value: "",
        //     name: Object.entries(formValue).length > 0  ? "projectName" : "project",
        //     type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
        //     required: true,
        //     option: projectList,
        //     classes: "col-span-1"
        // },
        {
            label: "Market Name",
            value: "",
            name: "marketName",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {
                    // console.log(e.target.value, "e geeter")
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "Market ID",
            value: "",
            type: Object.entries(formValue).length > 0 ? "sdisabled" : "text",
            name: "marketCode",
            required: true,
            props: {
                onChange: ((e) => {

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


    const onTableViewSubmit = (data) => {
        
        Object.keys(data).forEach(key => {
            if (typeof data[key] === "string") {
                data[key] = data[key].trim()
            }
        })

        if (formValue.uniqueId) {
            dispatch(AdminActions.postManageMarket(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageMarket())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postManageMarket(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageMarket())
            }))
        }
    }

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

    return <>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>
};



export default ManageMarketForm;