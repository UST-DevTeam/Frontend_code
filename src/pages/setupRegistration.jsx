import React, { useState } from "react";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import CommonForm from "../components/CommonForm";
import AuthActions from "../store/actions/auth-actions";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SelectDropDown from "../components/FormElements/SelectDropDown";
import { baseUrl } from "../utils/url";
import WithSideImage from "../components/WithSideImage";
import getCountries from "./CountryCode";
const countries = getCountries();

// console.log(countries, 'jsjsjsjsjjs');

export default function SetUpRegistration() {
    const { uid } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showUploadField, setShowUploadField] = useState(false);
    const [showSpecifyBusinessField, setShowSpecifyBusinessField] = useState(false);
    const kyc_doc_type = [
        { label: "OWNER", value: "OWNER" },
        { label: "DEVELOPER", value: "DEVELOPER" },
        { label: "CONSULTANT", value: "CONSULTANT" },
        { label: "OTHER", value: "OTHER" },
    ];
    const businessOptions = [
        { label: "YES", value: "YES" },
        { label: "NO", value: "NO" },
    ];
    let Form = [
        {
            label: "Position",
            value: "",
            name: "position",
            option: kyc_doc_type,
            type: "select",
            required: true,
            props: {
                onChange: (e) => {
                    setShowSpecifyBusinessField(e.target.value === "OTHER");
                },
            },
            classes: "col-span-1",
        },
        {
            label: "Are you mandated to raise capital for the project/business?",
            value: "",
            name: "mandatoryBusiness",
            option: businessOptions,
            type: "select",
            required: true,
            props: {
                onChange: (e) => {
                    setShowUploadField(e.target.value === "YES");
                },
            },
            classes: "col-span-1",
        },
    ];
    if (showSpecifyBusinessField) {
        Form.push({
            label: "Specify Position",
            name: "specifyPosition",
            value: "specifyPosition",
            type: "text",
            props: "",
            required: true,
            placeholder: "",
            classes: "col-span-1",
        });
    }
    if (showUploadField) {
        Form.push({
            label: "Upload the signed mandate letter or resolution",
            name: "mandateLetter",
            value: "",
            type: "file",
            required: true,
            props: {},
            classes: "col-span-1",
        });
    }
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const onTableViewSubmit = (data) => {
        console.log(data, "datadata");
        data["uid"] = uid
        console.log(data,'shhhhshshhsh')
        dispatch(AuthActions.postsetupRegistration(true,data, () => {
            navigate('/businessRegistration/'+uid)
        }));
    };
    return (
        <WithSideImage sideImage={"bg-regsideimage"} formclass={" h-[75vh]"} form={
            <>
                <CommonForm classes={"grid-cols-1 gap-0 font-body"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
                <Button classes={"mt-4 mx-auto bg-neavycolor"} onClick={handleSubmit(onTableViewSubmit)} name="Submit" />
            </>
        } labeling={"Position"} />
    );
}
