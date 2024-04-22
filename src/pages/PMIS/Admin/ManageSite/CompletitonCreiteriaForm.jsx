import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import projectListActions from '../../../../store/actions/projectList-actions';
import { useDispatch, useSelector, } from 'react-redux';
import { Urls } from '../../../../utils/url';
import AdminActions from '../../../../store/actions/admin-actions';


const CompletitonCreiteriaForm = ({ siteCompleteData,mileStone,projectuniqueId,setmodalFullOpen,setmodalOpen,customeruniqueId }) => {

    console.log(siteCompleteData["siteStartDate"],"projectuniqueIdprojectuniqueIdprojectuniqueId")

    const dispatch = useDispatch()
    // let mileStoneCompletion = {
    //     "Completion Date": "datetime",
    //     "Checklist": "",
    //     "MO No": "number",
    //     "Challan copy": "file",
    //     "Attachment": "file",
    //     "Reference No": "number",
    // };
  

    const dateString = siteCompleteData["siteStartDate"];
    const [day, month, year] = dateString.split('-').map(Number);
    
    const datestr = new Date(year, month - 1, day);

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

    let dataecoder={
        "Date":"datetime",
        "Number":"number",
        "File":"file",
        "Text":"text",
        
    }

    let mileStoneCompletion = useSelector((state) => {
        let mtoneCompletion = state?.adminData?.getManageCompletionCriteria || []
        let geeter=mtoneCompletion.filter(itm=>itm.completion==mileStone["Completion Criteria"])
        console.log(geeter.length > 0 ? geeter[0]["type"] : "",'mileStone["Completion Criteria"]')

        return [{
                label: mileStone["Completion Criteria"],
                value: "",
                name: "CC_" + mileStone["Completion Criteria"],
                required: true,
                type: geeter.length > 0 ? dataecoder[geeter[0][dataecoder]] : "",
                props:mileStoneprops[mileStone["Completion Criteria"]]
            }]
        return geeter.length > 0 ? geeter[0]["type"] : ""
        return state?.adminData?.getManageCompletionCriteria || []
        return state?.adminData?.getManageCompletionCriteria.map((itm) => {
            return {
                label: itm?.type,
                value: itm?.uniqueId
            }
        })
    })


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

    useEffect(() => {
        dispatch(AdminActions.getManageCompletionCriteria())
    }, [])

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
            Form={mileStoneCompletion}
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