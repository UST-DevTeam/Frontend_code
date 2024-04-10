import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import projectListActions from '../../../../store/actions/projectList-actions';
import { useDispatch } from 'react-redux';
import { Urls } from '../../../../utils/url';
import AdminActions from '../../../../store/actions/admin-actions';


const CompletitonCreiteriaForm = ({ siteCompleteData,mileStone,projectuniqueId,setmodalFullOpen,setmodalOpen,customeruniqueId }) => {

    console.log(siteCompleteData["siteStartDate"],"projectuniqueIdprojectuniqueIdprojectuniqueId")

    const dispatch = useDispatch()
    let mileStoneCompletion = {
        "Completion Date": "datetime",
        "Checklist": "",
        "MO No": "number",
        "Challan copy": "file",
        "Attachment": "file",
        "Reference No": "number",
    }
    const dateString = siteCompleteData["siteStartDate"];
    const [day, month, year] = dateString.split('-').map(Number);
    
    const datestr = new Date(year, month - 1, day);

    console.log(datestr,dateString,"datestr")

    let mileStoneprops = {
        "Completion Date": {
            maxSelectableDate:new Date(),
            minSelectableDate:datestr
        },
        "Checklist": {
            
        },
        "MO No": {
            
        },
        "Challan copy": {
            
        },
        "Attachment": {
            
        },
        "Reference No": {
            
        }
    }


    


    const CompletionForm = [
        {
            label: mileStone["Completion Criteria"],
            value: "",
            name: "CC_" + mileStone["Completion Criteria"],
            required: true,
            type: mileStoneCompletion[mileStone["Completion Criteria"]],
            props:mileStoneprops[mileStone["Completion Criteria"]]
        }
    ]


    console.log(CompletionForm,mileStone, "CompletionFormCompletionForm")



    const onsubmiting = (data) => {
        console.log(data, "onsubmitingonsubmitingonsubmitingssS")
        // dispatch(AuthActions.signIn(data, () => {
        //     navigate('/authenticate')
        // }))
        dispatch(projectListActions.postSubmit(Urls.projectList_closeMilestone+mileStone["uniqueId"], data, () => {
            // alert("done")
            // dispatch(AdminActions.getManageProjectType(customeruniqueId))
            
            dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
            // dispatch(AdminActions.getManageProjectType(customeruniqueId))
            setmodalOpen(false)
            setmodalFullOpen(false)
        }))

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

    console.log(mileStone["Completion Criteria"], "mileStonemileStonemileStonex")

    return <>
        <CommonForm
            classes={"grid-cols-1 gap-1"}
            Form={CompletionForm}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
        />

        <div className='flex justify-center'>

            <Button onClick={handleSubmit(onsubmiting)} name={"Submit"} classes='w-auto' />
        </div>
    </>

}




export default CompletitonCreiteriaForm;