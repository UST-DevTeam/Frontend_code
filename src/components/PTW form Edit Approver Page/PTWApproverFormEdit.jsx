import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import CommonForm from '../CommonForm';
import Button from '../Button';
import { baseUrl } from '../../utils/url';
import Api from '../../utils/api';

const PTWApproverFormEdit = ({ setmodalHead, setmodalOpen, formData, formType, flowType, itemData }) => {

    const [type, setType] = useState(0)
    const [formConfig, setFormConfig] = useState([]);
    const [index, setIndex] = useState(0)


    const {
        register,
        handleSubmit,
        SubmitTask,
        watch,
        setValue,
        setValues,
        getValues,
        reset,
        formState: { errors },
    } = useForm();


   useEffect(()=>{
    console.log(errors , 'asdfasdfasdfasdfasdfasdfasdfasdf')
    if(Object.keys(errors).length > 0){
        alert(` ${errors[Object.keys(errors)[0]]?.message} :- ${Object.keys(errors)[0]} `)
    }   
   } , [errors])


    const submitFormData = async (data, id) => {
        console.log(data, "___newnNWnenw")


        try {

            const checkImg = formType[type]?.filter((itm) => {

                return itm?.dataType === "img"
            })
           

            let res;
            if (checkImg?.length === 0) {
                const newData = {
                    projectID: itemData?.projectID,
                    siteId: itemData?.siteId,
                    projectuniqueId: itemData?.projectuniqueId,
                    siteUid: itemData?.siteUid,
                    customerName: itemData?.customerName,
                    subProject: itemData?.subProject,
                    circle: itemData?.circle,
                    mileStoneId: itemData?.mileStoneId,
                    Milestone: itemData?.Milestone,
                    [type]: data,
                };

                // Object.keys(data)?.forEach((key) => {
                //   if (data[key]) {
                //     newData[type][key] = data[key];
                //   }
                // });

                const url = `/submit/ptw/${itemData?.formType}/${type}/${itemData?.mileStoneId}`;

                res = await Api.patch({ url, data: newData })

            }
            else {
                const formDataSubmit = new FormData();

                formDataSubmit.append("projectID", itemData?.projectID);
                formDataSubmit.append("siteId", itemData?.siteId);
                formDataSubmit.append("siteUid", itemData?.photo?.siteUid);
                formDataSubmit.append("projectuniqueId", itemData?.photo?.projectuniqueId);
                formDataSubmit.append("customerName", itemData?.customerName);
                formDataSubmit.append("circle", itemData?.circle);
                formDataSubmit.append("mileStoneId", itemData?.mileStoneId);
                formDataSubmit.append("Milestone", itemData?.Milestone);

                // Append each field (file or text)
               Object.keys(data)?.forEach((key) => {
                    if(key==="Selfie")
                    {
                        const value = data[key];
                      
                    if (value) {
                        formDataSubmit.append(
                            key,
                            value instanceof FileList ? value[0] : value
                        );
                    }
                    }
                });
                const url = `/submit/ptw/${itemData?.formType}/${type}/${itemData?.mileStoneId}`;

                res = await Api.patch({
                    url,
                    contentType: "multipart/form-data",
                    data: formDataSubmit,
                });
            }

            if (res?.status === 200 || res?.status === 201) {


                if (index === flowType?.length) {
                    setmodalOpen(false)
                }
                reset();
                setIndex(index + 1)
                setType(flowType[index])
                setmodalHead(flowType[index])
            }



        } catch (e) {
            console.log(e, "___eeeee")
        }


    }


    useEffect(() => {
        if (index === flowType?.length) {
            setIndex(0)
        }
        if (index === flowType?.length) {
            setmodalOpen(false)
        }
        setmodalHead(flowType[index])
        setType(flowType[index])


    }, [index])

    useEffect(() => {

        console.log(formType , type , 'adsfasdfasdfasdfadsf')
        const tempForm = formType[type]?.map((item) => {
            const fieldName = item?.fieldName;
            const fieldValue = formData[type]?.[fieldName];
            if (item?.dataType === 'img' && fieldValue) {
                setValue(fieldName, baseUrl + fieldValue);
            } else {
                setValue(fieldName, fieldValue);
            }

            return {
                ...item,
                label: fieldName,
                name: fieldName,
                type:
                    item?.dataType === 'AutoFill'
                        ? 'sdisabled'
                        : item?.dataType === 'Dropdown'
                            ? 'select'
                            : item?.dataType === 'DateTime'
                                ? 'datetime-local'
                                : item?.dataType?.toLowerCase() === 'date'
                                    ? 'datetime'
                                    : item?.dataType === 'img'
                                        ? 'file'
                                        : item?.dataType?.toLowerCase(),
                ...(item?.dataType === 'Dropdown'
                    ? {
                        option: item?.dropdownValue.split(',').map((option) => ({
                            label: option.trim(),
                            value: option.trim(),
                        })),
                    }
                    : {}),
                required: item?.required === 'Yes',
            };
        });

        console.log(tempForm, "__tempForm")
        setFormConfig(tempForm);

    }, [type, formType, formData, index])



    console.log(formType, type, index, "__type__hasjd")
    return (
        <div>
            <CommonForm
                classes="grid-cols-3  gap-4"
                Form={formConfig}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
            />
            <div className='flex gap-4 justify-between'>

               
                <Button
                    name="Submit"
                    classes="w-fit"
                    onClick={handleSubmit((data) => {
                        console.log(data, "___dat")
                        submitFormData(data, itemData?.mileStoneId);
                    })}
                />

                <div className='flex gap-4' >
                     <Button
                    name="Prev Form"
                    classes={`w-fit ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => {
                        console.log("itsCalling")
                        if(index > 0){
                            setIndex(index-1)
                        }
                        


                    }}
                />
                <Button
                    name="Next Form"
                    classes={`w-fit ${index === flowType.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => {
                        console.log("itsCalling")
                        if(index !== flowType.length - 1 ){
                                setIndex(index + 1)
                        }
                        


                    }}
                />
                </div>

            </div>
        </div>
    )
}

export default PTWApproverFormEdit
