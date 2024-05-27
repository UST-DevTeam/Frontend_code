import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import AlertConfigurationActions from '../../store/actions/alertConfiguration-actions';
import CustomQueryActions from '../../store/actions/customQuery-actions';
import Modal from '../../components/Modal';
import CommonForm from '../../components/CommonForm';
import Button from '../../components/Button';
import AdminManagementActions from '../../store/actions/adminManagement-actions';
import AuthActions from '../../store/actions/auth-actions';
import DeckManagementActions from '../../store/actions/deckManagement-actions';
const PitchDeckForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {
    console.log(isOpen, setIsOpen, resetting, formValue, "formValueformValue")
    const [modalOpen, setmodalOpen] = useState(false)
    let dispatch = useDispatch()
    const fileRef = useRef(null)


    let countryCurrency =
        [
            { "currency_code": "USD", "currency_symbol": "$" },
            { "currency_code": "EUR", "currency_symbol": "€" },
            { "currency_code": "JPY", "currency_symbol": "¥" },
            { "currency_code": "CNY", "currency_symbol": "¥" },
            { "currency_code": "GBP", "currency_symbol": "£" },
            { "currency_code": "INR", "currency_symbol": "₹" },
            { "currency_code": "BRL", "currency_symbol": "R$" },
            { "currency_code": "KRW", "currency_symbol": "₩" },
            { "currency_code": "CHF", "currency_symbol": "CHF" },
            { "currency_code": "AUD", "currency_symbol": "A$" },
            { "currency_code": "CAD", "currency_symbol": "C$" },
            { "currency_code": "NZD", "currency_symbol": "NZ$" },
            { "currency_code": "SGD", "currency_symbol": "S$" },
            { "currency_code": "HKD", "currency_symbol": "HK$" },
            { "currency_code": "SEK", "currency_symbol": "kr" },
            { "currency_code": "NOK", "currency_symbol": "kr" },
            { "currency_code": "DKK", "currency_symbol": "kr" },
            { "currency_code": "MXN", "currency_symbol": "Mex$" },
            { "currency_code": "TRY", "currency_symbol": "₺" },
            { "currency_code": "PKR", "currency_symbol": "₨" },
            { "currency_code": "LKR", "currency_symbol": "රු" },
            { "currency_code": "BDT", "currency_symbol": "৳" },
            { "currency_code": "NPR", "currency_symbol": "₨" },
            { "currency_code": "AFN", "currency_symbol": "؋" }
        ]

    let currencyOptions = countryCurrency.map(currency => {
        return {
            "label": `${currency.currency_code} - ${currency.currency_symbol}`,
            "value": currency.currency_symbol
        };
    });
    let Form = [
        {
            label: "Pitch Deck Name",
            value: "",
            name: "pitchDeckName",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {
                    // console.log(e.target.value, "e geeter")
                    setValue("queries", e.target.name)
                }),
            },
            classes: "col-span-1"
        },
        {
            label: "The Ask",
            value: "",
            name: "amountRaised",
            type: "text",
            required: true,
            props: {
                onChange: ((e) => {
                    // console.log(e.target.value, "e geeter")
                    setValue("queries", e.target.name)
                }),
            },
            classes: "col-span-1",
            amp: [{
                type: "select",
                name: "currency",
                option: currencyOptions,
                value: "currency"
            }]
        },
        // {
        //     label: "The Ask", name: "ask", value: "", type: "select",
        //     // props: {
        //     //   onChange: (e) => {
        //     //     setshowSocialMediaOther(e.target.value === "Other");
        //     //   },
        //     // }, 
        //     props: {},
        //     required: false, option: [
        //         { "label": "10000 – 100000", "value": "10000 – 100000" },
        //         { "label": "100000 - 500000", "value": "100000 - 500000" },
        //         { "label": "501000 – 1000000", "value": "501000 – 1000000" },
        //         { "label": "1001000 – 100000000", "value": "1001000 – 100000000" },
        //         { "label": "Over 100000000", "value": "Over 100000000" }
        //       ]
        // },
        {
            label: "Project Current Stage", name: "projectCurrentStage", value: "", type: "select",
            // props: {
            //   onChange: (e) => {
            //     setshowSocialMediaOther(e.target.value === "Other");
            //   },
            // }, 
            props: {},
            required: false, option: [

                { "label": "Pre-seed", "value": "Pre-seed" },
                { "label": "Seed", "value": "Seed" },
                { "label": "Series A", "value": "Series A" },
                { "label": "Series B", "value": "Series B" },
                { "label": "Series C", "value": "Series C" },
                { "label": "Series D", "value": "Series D" },
                { "label": "Series E", "value": "Series E" },
                { "label": "Other", "value": "Other" }


            ],
        },

        {
            label: "File",
            name: "files",
            value: "files",
            type: "file",
            props: {
                onChange: ((e) => {
                    console.log(e.target.files, "gfdhhh")
                    fileRef.current = Array.from(e.target.files)
                    // setValue("queries", e.target.name)
                }),
            },
            required: false,
            placeholder: "",
            multiple: false,
            naming: false
        },
        // {
        //     label: "Username",
        //     value: "",
        //     name: "username",
        //     type: "text",
        //     required: true,
        //     props: {
        //         onChange: ((e) => {


        //             setValue("queries", e.target.name)

        //         }),
        //     },
        //     classes: "col-span-1"
        // },
        // {
        //     label: "Password",
        //     value: "",
        //     name: "password",
        //     type: "password",
        //     required: true,
        //     props: {
        //         onChange: ((e) => {
        //             console.log(e.target.value, "e geeter")

        //             setValue("queries", e.target.name)

        //         }),
        //     },
        //     classes: "col-span-1"
        // }, {
        //     label: "Role",
        //     name: "roleId",
        //     value: "Select",
        //     type: "select",
        //     option: roleList,
        //     props: "",
        //     required: true,
        //     classes: "col-span-1"
        // },
        // { label: "User", value: "", option: ["User Name"], type: "select" }
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
        //     navigate('/pitch-deck')
        // }))
        dispatch(DeckManagementActions.getDeckList(data, () => {
            navigate('/pitch-deck')
        }))
    }
    const onTableViewSubmit = (data) => {
        console.log(data, 'xjxjjj')
        const formData = new FormData()
        console.log('kksksks', formData)
        delete data["files"]
        Object.keys(data).forEach(key => {
            console.log('smmm', key, 'mjsjssjs', data[key])
            formData.append(key, data[key])
            console.log('kksksks', formData)
        })
        fileRef.current.forEach(file => {
            console.log(file, 'nnjhhdh')
            formData.append('files', file)
            console.log(formData, 'kskkssjsjjhh')
        })
        console.log(data, "datadata")
        if (data.uniqueId) {
            dispatch(DeckManagementActions.postPitchDeck(true, formData, () => {
                setIsOpen(false)
                dispatch(DeckManagementActions.getDeckList())
            }, data.uniqueId))
        } else {
            dispatch(DeckManagementActions.postPitchDeck(true, formData, () => {
                console.log("CustomQueryActions.postDBConfig")
                setIsOpen(false)
                dispatch(DeckManagementActions.getDeckList())
            }))
        }
    }
    useEffect(() => {
        // dispatch(AdminManagementActions.getRoleList())
        // let Investors=state
        // console.log(Investors,'hhdhdhdhdh')
        dispatch(DeckManagementActions.getDeckList())

        if (resetting) {
            reset({})
            Form.map((fieldName) => {
                setValue(fieldName["name"], fieldName["value"]);
            });
        } else {
            reset({})

            console.log(Object.keys(formValue), "Object.keys(formValue)")
            Object.keys(formValue).forEach((key) => {
                if (["endAt", "startAt"].indexOf(key) != -1) {
                    console.log("date formValuekey", key, formValue[key])
                    const momentObj = moment(formValue[key]);
                    setValue(key, momentObj.toDate());


                } else {
                    // console.log("formValuekey",key,key)
                    setValue(key, formValue[key]);
                }
            })
        }
    }, [formValue, resetting])
    return <>


        <Modal size={"sm"} children={<><CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} /></>} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <CommonForm classes={"grid-cols-1 gap-1"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            {/* <button></button> */}
            {/* <button onClick={() => { setmodalOpen(true) }} className='flex bg-primaryLine mt-6 w-42 absolute right-1 top-1 justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Add DB Type <Unicons.UilPlus /></button> */}
            {/* <Table headers={["S.No.", "DB Type", "DB Server", "DB Name", "Created By", "Created Date", "Last Modified By", "Last Modified Date", "Actions"]} columns={[["1", "abcd", "ancd", "abcd", "ancd"], ["2", "adsa", "dasdas", "abcd", "ancd"]]} /> */}
            {/* <button onClick={(handleSubmit(onTableViewSubmit))} className='bg-primaryLine mt-6 w-full justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button> */}
            <Button className="mt-0" onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </div>
    </>
};
export default PitchDeckForm;