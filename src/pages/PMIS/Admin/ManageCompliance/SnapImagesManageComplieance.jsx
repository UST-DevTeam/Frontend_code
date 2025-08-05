import React from 'react'
import { useForm } from 'react-hook-form';
import CommonForm from '../../../../components/CommonForm';
import Button from '../../../../components/Button';
import Api from '../../../../utils/api';
import { objectKeys } from 'react-querybuilder';


const SnapImagesManageComplieance = ({keyId,itemData,setmodalOpen}) => {

    

const {
        register,
        handleSubmit,
        unregister,
        setValue,
        getValues,
        reset,
        formState: { errors },
      } = useForm();

const Form = itemData?.map((itm,index)=>{
      const fieldValue = itm?.image

    
    return{
        label:itm?.fieldName,
        name:`${index+1}`,
        type:"file",
        required:itm?.required === "Yes" ? false: true,
        fieldValue:fieldValue!== undefined ? fieldValue:""
    }
})


  const submitFormData = async (data) => {
    try {
       const formDataSubmit = new FormData();

        Object.entries(data).forEach(([key, fileList]) => {
        if (fileList.length > 0) {
            
            formDataSubmit.append(key, fileList[0]); 
        }
        });
       

                const url = `/admin/snap/${keyId}`;

                const res = await Api.patch({
                    url,
                    contentType: "multipart/form-data",
                    data: formDataSubmit,
                });
                
                if(res?.status==200){
                    setmodalOpen((prev)=>!prev)
                }

    } catch (e) {
      console.log(e, '___submit error');
    }
  };


  return (
   <div>
      <CommonForm
        classes={`${ Form?.length > 4 ? 'grid-cols-4' : 'grid-cols-1' } gap-4`}
        Form={Form}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
      />
      <div className='flex gap-4 justify-between'>
      <Button
          name="Submit"
          classes="w-fit"
          onClick={handleSubmit(submitFormData)}
        />
      </div>
    </div>
  )
}

export default SnapImagesManageComplieance
