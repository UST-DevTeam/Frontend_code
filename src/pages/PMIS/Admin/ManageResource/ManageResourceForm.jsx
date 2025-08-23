import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch} from 'react-redux';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import AdminActions from '../../../../store/actions/admin-actions';

const ManageResourceForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {


    const [modalOpen, setmodalOpen] = useState(false)
    const [dropdown, setdropdown] = useState(false)


    let dispatch = useDispatch()

    // let customerList = useSelector((state) => {
    //     return state?.adminData?.getManageCustomer.map((itm) => {
    //         return {
    //             label: itm?.customerName,
    //             value: itm?.uniqueId
    //         }
    //     })
    // })



    let Form = [
        // {
        //     label: "Customer Name",
        //     value: "",
        //     name: "customer",
        //     type: "select",
        //     required: true,
        //     option: customerList,
        //     classes: "col-span-1",
        //     props: {
        //         onChange: (e) => {
        //             if (e.target.value){
        //                 dispatch(AdminActions.getManageCircle(true, `customer=${e.target.value}`));
        //             }
        //             else {
        //                 dispatch(GET_MANAGE_CIRCLE({ dataAll:[], reset:true }));
        //             }
        //         },
        //     },
        // },
        {
            label: "Field Name",
            value: "",
            name: "fieldName",
            type: "text",
            required: true,
            filter: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1",
        },
        {
            label: "Field Key",
            value: "",
            name: "fieldKey",
            type: "text",
            required: true,
            filter: true,
            props: {
                onChange: ((e) => {

                }),
            },
            classes: "col-span-1",
        },
        {
            label: "Field Type",
            value: "",
            name: "fieldType",
            type: "select",
            required: true,
            option: [
                { label: "Text", value: "Text" },
                { label: "File", value: "File" },
                { label: "Date", value: "Date" },
                { label: "Number", value: "Number" },
                { label: "Dropdown", value: "Dropdown" },
            ],
            props: {
                onChange: (e) => {
                  setdropdown(e.target.value === "Dropdown");
                },
            },
            classes: "col-span-1"
        }
    ]
    if (dropdown) {
        Form.push(
          {
            label: "Dropdown",
            name: "dropdown",
            value: "",
            type: "text",
            required: true,
            placeholder: "",
          },
      );
    }
    Form.push(
        {
            label: "Mandatory",
            value: "",
            name: "mandatory",
            type: "select",
            required: true,
            option: [
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
            ],
            classes: "col-span-1"
        },
    )

    useEffect(() => {
        if (isOpen) {
            setdropdown(false); 
            reset(""); 
        }
    }, [isOpen]);

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
        if (formValue.uniqueId) {
            dispatch(AdminActions.postManageResource(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageResource())
            }, formValue.uniqueId))
        } else {
            dispatch(AdminActions.postManageResource(true, data, () => {
                setIsOpen(false)
                dispatch(AdminActions.getManageResource())
            }))
        }
    }

    useEffect(() => {
        if (resetting) {
            reset({})
            setdropdown(false)
            Form.map((fieldName) => {
                setValue(fieldName["name"], fieldName["value"]);
            });
        } else {
            reset({})
            Form.forEach((key) => {
                    setValue(key.name, formValue[key.name]);
            })
            setdropdown(formValue.fieldType === "Dropdown");
            if (formValue.fieldType === "Dropdown" && formValue.dropdown) {
                setValue("dropdown", formValue.dropdown);
            }
        }
    }, [formValue, resetting])
    return <>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">

            <CommonForm classes={"grid-cols-2 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />

            <Button classes={"mt-2 w-sm text-center flex mx-auto"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>
};

export default ManageResourceForm;