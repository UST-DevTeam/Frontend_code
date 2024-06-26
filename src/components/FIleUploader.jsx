import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import CommonForm from './CommonForm';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { useDispatch } from 'react-redux';
import nokiaPrePostActions from '../store/actions/nokiaPrePost-actions';
import CommonActions from "../store/actions/common-actions";

const FileUploader = ({ isOpen, setIsOpen,fileUploadUrl,onTableViewSubmit,tempbtn=false, tempbtnlink="", label="Template"}) => {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()

    console.log(tempbtnlink[0],"tempbtnlink")

    let Form = [
        {
            label: "Excel file",
            value: "",
            name: "uploadedFile",
            type: "file",
            required: false,
            props: {},
            classes: "col-span-1 sm:col-span-1 flex justify-between items-center"
        },
    ]

    
    return <>
        <Modal size={"sm"} modalHead={"Upload Bulk File"} children={
            <>
                <CommonForm
                    classes={"grid-cols-1 gap-1 p-4"}
                    Form={Form}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                />
                <div className = 'flex'>
                {tempbtn && <Button classes={"mt-1 w-auto mx-auto mb-4 bg-[#13b497] text-black py-1"} name={label} onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        tempbtnlink[0],
                        tempbtnlink[1]
                      )
                    );
                  }} />}
                {<Button classes={"mt-1 w-auto mx-auto mb-4 py-1"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />}
                </div>

                
            </>
        } isOpen={isOpen} setIsOpen={setIsOpen} />

    </>
}


export default FileUploader;