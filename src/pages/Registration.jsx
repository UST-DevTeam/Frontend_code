
import React from "react";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import CommonForm from "../components/CommonForm";
import AuthActions from "../store/actions/auth-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectDropDown from "../components/FormElements/SelectDropDown";
import { baseUrl } from "../utils/url";
import WithSideImage from "../components/WithSideImage";
import getCountries from "./CountryCode";
const field = [{
    logo: baseUrl + "/logo.png",
    firstname: "Name",
    surname: "Surname",
    email: "E-mail",
    password: "Password",
    phonenumber: "Phone Number",
    aregister: "Already Register",
    regiter: "Register",
    roleName: "roleName"
}]
const countries = getCountries();
console.log(countries, 'jsjsjsjsjjs');
export default function Registration() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let Form = [
        { label: "Name", name: "firstName", value: "firstName", type: "text", props: "", required: true, placeholder: "" },
        { label: "Surname", name: "surname", value: "surname", type: "text", props: "", required: true, placeholder: "" },
        { label: "E-mail", name: "email", value: "email", type: "text", props: "", required: true, placeholder: "" },
        // {
        //     label: "Country Code",
        //     value: "",
        //     name: "countryCode",
        //     option: countries,
        //     type: "select",
        //     required: true,
        //     props: {
        //         //   onChange: ((e) => {
        //         //   }),
        //     },

        // },
        {
            label: "Phone Number", name: "mobile", value: "mobile", type: "text", props: "",
            required: true,
            placeholder: "",
            amp: [{
                type: "select",
                name: "currency",
                styling: "w-20",
                option: countries,
                value: "currency"
            }]
        },

        {
            label: "Role", name: "roleName", value: "", type: "radio", props: {}, required: true, option: [
                { "label": "INVESTOR", "value": "Investor" },
                { "label": "FUND SEEKER", "value": "Fund Seeker" },
                { "label": "CHARITABLE ORGANISATION", "value": "Charitable Organisation" }
            ]
        }
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
        console.log(data, "datadata")
        dispatch(AuthActions.register(data, () => {
            navigate("/register")
        }))
    }
    return <>
        <WithSideImage sideImage={"bg-regsideimage"} formclass={" h-[80vh]"} form={<>
            <CommonForm classes={"grid-cols-1 gap-0 font-body"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-4 mx-auto bg-neavycolor "} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
            <div className="p-0 m-2 flex justify-center items-center">
                <div>
                    <p className="text-neavy text-sm">Already have an account? </p>
                </div>
                <div onClick={() => {
                    navigate('/login')
                }} >
                    <button className="btn text-neavy text-sm ml-2 ">Login</button>
                </div>
            </div>
        </>} labeling={""} />
    </>
}
