
import React from "react";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import CommonForm from "../components/CommonForm";
import AuthActions from "../store/actions/auth-actions";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SelectDropDown from "../components/FormElements/SelectDropDown";
import { baseUrl } from "../utils/url";
import WithSideImage from "../components/WithSideImage";
import getCountries from "./CountryCode";
import getCountriesName from "./Countries";
import getIndustryInterest from "./IndustryInterest";
const field = [{
    logo: baseUrl + "/logo.png",
    funderType: "funderType",
    companyName: "CompanyName",
    telephone: "telephone",
    email: "email",
    countryCode: "countryCode",
    mobile: "mobile",
    website: "website",
    address: "address",
    industryInterest: "industryInterest",
    projectType: "projectType",
    fundingStage: "fundingStage",
    countryInterest: "countryInterest"
    // phonenumber: "Phone Number",
    // aregister: "Already Register",
    // regiter: "Register",
    // roleName: "roleName"
}]
const countries = getCountries();
const countriesName = getCountriesName();
const industryInterest = getIndustryInterest();
const fundingStage = [
    { "label": "Pre-seed", "value": "pre_seed" },
    { "label": "Seed", "value": "seed" }
]
const projectOption=[
    { "label": "Greenfield", "value": "Greenfield" },
    { "label": "Brownfield", "value": "Brownfield" }
]
export default function Business_Registration() {
    const dispatch = useDispatch()
    const { uid } = useParams()
    let roleList = useSelector((state) => {
        let interdata = state?.auth?.userRole
        return interdata
    })
    console.log(roleList,'roleListroleListroleList')
    const navigate = useNavigate()
    let Form = [
        {
            label: "Type of Funder", name: "funderType", value: "", type: "muitiSelect", props: {}, required: true,
            option: [
                { name: "Equity Investor", id: "equity_investor" },
                { name: "Lender", id: "lender" },
                { name: "Grant Funder", id: "grant_funder" }
            ]
        },
        { label: "Company Name", name: "CompanyName", value: "CompanyName", type: "text", props: "", required: false, placeholder: "" },
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
                option: countries,
                value: "currency"
            }]
        },
        // { label: "Telephone", name: "telephone", value: "telephone", type: "text", props: "", required: false, placeholder: "" },
        // { label: "Last Name", name: "lastName", value: "lastName", type: "text", props: "", required: true, placeholder: "" },
        { label: "E-mail", name: "email", value: "email", type: "text", props: "", required: false, placeholder: "" },
        
        { label: "Contact Person", name: "mobile", value: "mobile", type: "text", props: "", required: true, placeholder: "" },
        { label: "Website", name: "website", value: "website", type: "text", props: "", required: true, placeholder: "" },
        { label: "Address", name: "address", value: "address", type: "text", props: "", required: true, placeholder: "" },
        {
            label: "Industry of Interest",
            value: "",
            name: "industryInterest",
            option: industryInterest,
            type: "select",
            required: true
        },
        {
            label: "Type of Project", name: "projectType", value: "", type: "radio", props: {}, required: true, option: [
                { "label": "Greenfield", "value": "greenfield" },
                { "label": "Brownfield", "value": "brownfield" }]
        },
        {
            label: "Funding Stage of Interest",
            value: "",
            name: "fundingStage",
            option: fundingStage,
            type: "select",
            required: true
        },
        {
            label: "Country of Interest",
            value: "",
            name: "countryInterest",
            option: countriesName,
            type: "select",
            required: true,
            props: {
                //   onChange: ((e) => {
                //   }),
            },
        },
    ]
    let Form2 = [
        // {
        //     label: "Type of Funder", name: "funderType", value: "", type: "muitiSelect", props: {}, required: true,
        //     option: [
        //         { name: "Equity Investor", id: "equity_investor" },
        //         { name: "Lender", id: "lender" },
        //         { name: "Grant Funder", id: "grant_funder" }
        //     ]
        // },
        { label: "Business/Project Name", name: "businessName", value: "businessName", type: "text", props: "", required: true, placeholder: "" },
        { label: "Telephone", name: "telephone", value: "telephone", type: "text", props: "", required: true, placeholder: "" },
        { label: "E-mail", name: "email", value: "email", type: "text", props: "", required: true, placeholder: "" },
        {
            label: "Country Code",
            value: "",
            name: "countryCode",
            option: countries,
            type: "select",
            required: true,
            props: {
                //   onChange: ((e) => {
                //   }),
            },
        },
        { label: "Contact Person", name: "contactPerson", value: "contactPerson", type: "text", props: "", required: true, placeholder: "" },
        {
            label: "Industry of Interest",
            value: "",
            name: "industryInterest",
            option: industryInterest,
            type: "select",
            required: true
        },
        {
            label: "Type of Project", name: "projectType", value: "", type: "radio", props: {}, required: true, option: [
                { "label": "Greenfield", "value": "greenfield" },
                { "label": "Brownfield", "value": "brownfield" }]
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
        console.log(data, "sdfsdsffsdsf")
        data["uid"] = uid
        dispatch(AuthActions.businessRegister(data, () => {
            navigate("/kycregister/" + uid)
            //navigate("/kycregister")
        }))
    }
    return <>
        <WithSideImage sideImage={"bg-businesssideimage"} formclass={" h-[75vh]"} form={<>
            <CommonForm classes={"grid-cols-1 gap-0 font-body"} Form={roleList === "Investor" ? Form : Form2} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button classes={"mt-4 mx-auto bg-neavycolor"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
        </>} labeling={"Business Registration"} />
    </>
}
