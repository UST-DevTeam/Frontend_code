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

const ManageClaimTypeDesignationForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {
    const [modalOpen, setmodalOpen] = useState(false)

    let dispatch = useDispatch()
    let claimTypeHeaders = useSelector((state) => {
        let interdata = state?.adminData?.getManageClaimType || [""]
        return interdata
    })


    let DesignationList = useSelector((state) => {
        return state?.adminData?.getManageDesignation.map((itm) => {
            return {
                label: itm?.designation,
                value: itm?.uniqueId,
            }
        })
    })

    let hh = claimTypeHeaders.map((item) => { 
        const names= item?.claimType + "__" + item?.uniqueId
        return {
            label: item.claimType,
            value: "",
            name:names,
            // required: true,
            type:'text',
            classes: "col-span-1"
        };
    });

    let Form = [
        {
            label: "Desination",
            value: "",
            name: "Designation",
            type: "select",
            option: DesignationList,
            required: true,
            classes: "col-span-1"
        },
        {
            label: "Site ID",
            value: "",
            name: "siteId",
            type: "select",
            option:[
                {"name":"Yes","label":"Yes"},
                {"name":"No","label":"No"},
            ],
            required: true,
            classes: "col-span-1"
        },
        {
            label: "Task Name",
            value: "",
            name: "taskName",
            type: "select",
            option:[
                {"name":"Yes","label":"Yes"},
                {"name":"No","label":"No"},
            ],
            required: true,
            classes: "col-span-1"
        },
        // {
        //     label: "Hotel",
        //     value: "",
        //     name: "Hotel",
        //     type: "text",
        //     // required: true,
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Daily Allowance",
        //     value: "",
        //     name: "Daily Allowance",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Travel Allowance",
        //     value: "",
        //     name: "Traval Allowance",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Local Conveyance",
        //     value: "",
        //     name: "Local Conveyance",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Consumables",
        //     value: "",
        //     name: "Consumables",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Own Accommodation",
        //     value: "",
        //     name: "Own Accomodation",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Own Conveyance",
        //     value: "",
        //     name: "Own Conveyance",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Cab",
        //     value: "",
        //     name: "CAB",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Project Advance",
        //     value: "",
        //     name: "Project Advance",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     labe: "Postage & Courier",
        //     value: "",
        //     name: "Postage & Courrier",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Salary Deduction Against Advance",
        //     value: "",
        //     name: "Salary Deduction against Advance",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Entertainment Expenses",
        //     value: "",
        //     name: "Entertainment Expenses",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Staff Welfare Expenses",
        //     value: "",
        //     name: "Staff Welfare Expenses",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "House Keeping Expenses",
        //     value: "",
        //     name: "House keeping Expenses",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Internet Expenses",
        //     value: "",
        //     name: "Internet Expenses",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Office Maintenance Expenses",
        //     value: "",
        //     name: "Office Maintenance Expenses",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Vehicle Parking Expenses",
        //     value: "",
        //     name: "Vehicle Parking Expenses",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Electriciy & Water Expenses",
        //     value: "",
        //     name: "Electriciy & Water Expenses",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Printer & Stationary",
        //     value: "",
        //     name: "Printer & Stationary",
        //     type: "text",
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Repair and Maintenance and Others",
        //     value: "",
        //     name: "Repair & Maintenance & Other",
        //     type: "text",
        //     classes: "col-span-1"
        // }
    ]

    if (Form !== null){
        Form.push(...hh)
    }

    // if (table?.columns) {
    //     table.columns.push(...hh);
    // }
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
            dispatch(AdminActions.postManageClaimTypeDesignation( data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageClaimTypeDesignation())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postManageClaimTypeDesignation( data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageClaimTypeDesignation())
            }))
        }
    }
    console.log(Form, "Form 11")
    useEffect(() => {
        dispatch(AdminActions.getManageClaimType())
        dispatch(AdminActions.getManageDesignation());
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
                    // console.log("formValuekey",key,key)
                    setValue(key, formValue[key]);
                }
            })
        }
    }, [formValue, resetting])
    return <>


        <Modal size={"xl"} children={<><CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} /></>} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">

            <CommonForm classes={"grid-cols-3 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            {/* <button></button> */}


            {/* <button onClick={() => { setmodalOpen(true) }} className='flex bg-primaryLine mt-6 w-42 absolute right-1 top-1 justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Add DB Type <Unicons.UilPlus /></button> */}
            {/* <Table headers={["S.No.", "DB Type", "DB Server", "DB Name", "Created By", "Created Date", "Last Modified By", "Last Modified Date", "Actions"]} columns={[["1", "abcd", "ancd", "abcd", "ancd"], ["2", "adsa", "dasdas", "abcd", "ancd"]]} /> */}
            {/* <button onClick={(handleSubmit(onTableViewSubmit))} className='bg-primaryLine mt-6 w-full justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button> */}
            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>
};



export default ManageClaimTypeDesignationForm;