import React from "react";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import CommonForm from "../components/CommonForm";
import AuthActions from "../store/actions/auth-actions";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../utils/url";
import { ALERTS } from "../store/reducers/component-reducer";
import WithSideImage from "../components/WithSideImage";
const field = [{
    logo: baseUrl + "/logo.png",
    firstname: "Name",
    surname: "surname",
    email: "E-mail",
    password: "Password",
    confirmPassword: "confirmPassword",
    phonenumber: "Phone Number",
    aregister: "Already Register",
    regiter: "Register"
}]

export default function SetupPassword() {
    const { uid } = useParams();
    const dispatch = useDispatch()
    let userRole = useSelector((state) => {
        return state?.auth?.userRole
      })

    const navigate = useNavigate()
    let Form = [
        { label: "Current Password", name: "currentpassword", value: "currentpassword", type: "password", props: "", required: true, placeholder:"••••••••••••••" },
        { label: "New Password", name: "newPassword", value: "newPassword", type: "password", props: "", required: true, placeholder:"••••••••••••••"  },
        { label: "Confirm Password", name: "confirmPassword", value: "confirmPassword", type: "password", props: "", required: true, placeholder:"••••••••••••••"  },
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
        
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
         
            if (data.newPassword?.length < 8) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text:"• Password must be at least 8 characters long",
                };
                dispatch(ALERTS(msgdata));
                return             
            }
            if (data.newPassword !== data.confirmPassword) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: "New password and confirm password doesn't match",
                };
                dispatch(ALERTS(msgdata)); 
                return; 
            }
            if (!/(?=.*[a-zA-Z])/.test(data.newPassword)) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text:"• Password contains at least an alphabets (lowercase or uppercase)",
                };
                dispatch(ALERTS(msgdata));
                return            
            }
            if (data.newPassword === data?.currentpassword) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text:"• New password must be different from current password.",
                };
                dispatch(ALERTS(msgdata));
                return           
            }
            if (!/.*[0-9].*/.test(data?.newPassword)) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text:"• Password contains at least a number (0-9)",
                };
                dispatch(ALERTS(msgdata));
                return
            }  
    
        dispatch(AuthActions.setuppassword(data,() => navigate("/login")));};
        
    // const onTableViewSubmit = (data) => {
    //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    //     if (!passwordRegex.test(data.rePassword)) {
    //         let missingCriteria = [];
    //         if (data.rePassword.length < 8) {
    //             missingCriteria.push("at least 8 characters long");
    //         }
    //         if (!/(?=.*[a-z])/.test(data.rePassword)) {
    //             missingCriteria.push("small letter");
    //         }
    //         if (!/(?=.*[A-Z])/.test(data.rePassword)) {
    //             missingCriteria.push("capital letter");
    //         }
    //         if (!/(?=.*\d)/.test(data.rePassword)) {
    //             missingCriteria.push("number");
    //         }
    //         if (!/(?=.*[@$!%*?&])/.test(data.rePassword)) {
    //             missingCriteria.push("special character");
    //         }
    
    //         let msgdata = {
    //             show: true,
    //             icon: "error",
    //             buttons: [],
    //             type: 1,
    //             text: `Password is missing: ${missingCriteria.join(", ")}.`,
    //         };
    //         dispatch(ALERTS(msgdata));
    //         return;
    //     }
    
    //     if (data.rePassword !== data.confirmPassword) {
    //         let msgdata = {
    //             show: true,
    //             icon: "error",
    //             buttons: [],
    //             type: 1,
    //             text: "Password and Confirm Password do not match",
    //         };
    //         dispatch(ALERTS(msgdata));
    //         return;
    //     }
    
    //     dispatch(
    //         AuthActions.setuppassword(
    //             data,
    //             () => navigate("/login")
    //         )
    //     );
    // };
    return <>
        
        <WithSideImage sideImage={"bg-setuppassword"} formclass={" h-auto p-10" } 
        form={<>
            <CommonForm classes={"grid-cols-1 p-2"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <Button
                    classes="flex mx-auto mt-6 w-28 h-10 justify-center rounded-lg leading-6 text-white font-extrabold shadow-sm focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 buttonAnim border-[1.5px] border-[#0e8670] font-poppins transition
                            duration-1000 ease-in-out hover:bg-[#3e454d] hover:text-white bg-[#13b497] hover:border-gray-500 hover:border-[1.5px]"
                    onClick={handleSubmit(onTableViewSubmit)}
                    name="Submit"
                />
        </>} labeling={"Reset Current Password"} />
    </>
}


