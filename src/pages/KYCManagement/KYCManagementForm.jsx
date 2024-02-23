import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import CommonForm from '../../components/CommonForm';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import AdminManagementActions from '../../store/actions/adminManagement-actions';
import OperationManagementActions from '../../store/actions/OperationManagement-actions';
const KYCManagementForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {

    console.log(isOpen, setIsOpen, resetting, formValue, "formValueformValue")

    const [modalOpen, setmodalOpen] = useState(false)


    let dispatch = useDispatch()
    let roleList = [
        {
            label: "Pending",
            value: 1
        },
        {
            label: "Approve",
            value: 2
        },
        {
            label: "Not Approve",
            value: 3
        }
    ]
    let databaseList = useSelector((state) => {
        console.log(state, "state")
        let interdata = state?.customQuery?.databaseList

        console.log(interdata, "interdatainterdata")
        return state?.customQuery?.databaseList
    })
    // let Form = [
    //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
    //     { label: "Custom Queries", value: "", type: "textarea" }
    // ]
    let Form = [{
        label: "Status",
        name: "kycStatus",
        value: "Select",
        type: "select",
        option: roleList,
        props: {
            valueAsNumber: true,
        },
        required: true,

        classes: "col-span-1"
    }]

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
        console.log(data, formValue, "datadata")

        // let fdata={
        //     "kycStatus":+data.kycStatus
        // }




        // dasdsadsadasdas
        if (formValue.userid) {
            dispatch(OperationManagementActions.patchKycStatusList(true, data, () => {
                console.log("CustomQueryActions.postDBConfig")
                setIsOpen(false)
                dispatch(OperationManagementActions.getKycStatusList())
            }, formValue.userid))
        } else {
            dispatch(OperationManagementActions.patchKycStatusList(true, data, () => {
                console.log("CustomQueryActions.postDBConfig")
                setIsOpen(false)
                dispatch(OperationManagementActions.getKycStatusList())
            }))
        }


    }





    console.log(Form, "Form 11")



    useEffect(() => {
        dispatch(AdminManagementActions.getRoleList())

        if (resetting) {
            reset({})
            Form.map((fieldName) => {

                console.log(fieldName["name"], fieldName["value"], "fieldName,fieldName")
                setValue(fieldName["name"], fieldName["value"]);
            });
        } else {
            reset({})

            console.log(Object.keys(formValue), "Object.keys(formValue)")
            Form.forEach((itm) => {


                if (["endAt", "startAt"].indexOf(itm.name) != -1) {
                    console.log("date formValuekey", itm.name, formValue[itm.name])
                    const momentObj = moment(formValue[itm.name]);
                    setValue(itm.name, momentObj.toDate());


                } else {
                    console.log("formValuekey", itm.name, itm.name)
                    setValue(itm.name, formValue[itm.name]);
                }
            })
        }
    }, [formValue, resetting])
    return <>


        <Modal size={"xl"} children={<><CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} /></>} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">

            <CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            {/* <button></button> */}


            {/* <button onClick={() => { setmodalOpen(true) }} className='flex bg-primaryLine mt-6 w-42 absolute right-1 top-1 justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Add DB Type <Unicons.UilPlus /></button> */}
            {/* <Table headers={["S.No.", "DB Type", "DB Server", "DB Name", "Created By", "Created Date", "Last Modified By", "Last Modified Date", "Actions"]} columns={[["1", "abcd", "ancd", "abcd", "ancd"], ["2", "adsa", "dasdas", "abcd", "ancd"]]} /> */}
            {/* <button onClick={(handleSubmit(onTableViewSubmit))} className='bg-primaryLine mt-6 w-full justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button> */}
            <Button classes={"mt-2 "} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>


};

export default KYCManagementForm;