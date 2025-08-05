import React, { useEffect, useRef, useState } from 'react'
import AdvancedTable from '../../../../components/AdvancedTable';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { useForm } from 'react-hook-form';
import CommonForm from '../../../../components/CommonForm';
import Api from '../../../../utils/api';
import { baseUrl } from '../../../../utils/url';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import { useDispatch } from 'react-redux';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import pagination from '../../../../components/CommonObjectsAndVariables';

const OhsNitification = () => {
  const {
      register : registerForm1,
      handleSubmit : handleSubmitForm1,
      getValues : getValuesForm1 ,
       setValue: setValueForm1,
      formState: { errors : errorsForm1 }
    } = useForm()
   const {
       register: registerForm2,
       setValue: setValueForm2,
       getValues: getValuesForm2,
       handleSubmit: handleSubmitForm2,
       formState: { errors: errorsForm2 },
     } = useForm()
  const [notification, setNotification] = useState(false)
  const dispatch = useDispatch()
  const imageRef = useRef(null)
  const [image, setImage] = useState(false)
  const [allData, setAllData] = useState([])
  const getAllData = async (defaultPagination) => {
    const res = await Api.get({
      url : `/globalNotify?${defaultPagination}`,
      
    })
    if(res?.status === 200){
      setAllData(res?.data?.data || [])
    }
  }
  useEffect(() => {
    
    const defaultPagination = objectToQueryString(pagination)
    getAllData(defaultPagination)
  }, [])
  const [type, setType] = useState('text')

  const onSubmit = async (data) => {
    console.log(data,"___datat")
    let value = data.reseter;
    delete data.reseter;
    // const strVal = objectToQueryString(data);
    let strVal = objectToQueryString(data);
    // if(strVal?.length>0){
    //   strVal = strVal+"&"+objectToQueryString({ ApproverType: "L2-Approver" })
    // }else{
    //   strVal =objectToQueryString({ ApproverType: "L2-Approver" })
    // }

     const res = await Api.get({
      url : `/globalNotify?${strVal}`
    })
    if(res?.status === 200){
      setAllData(res?.data?.data || [])
    }
    
    // dispatch(
    //   PTWActions.getL1ApproverData(
    //     true,
    //     strVal,
    //     objectToQueryString({ ApproverType: "L2-Approver" })
    //   )
    // );
  };


  const handelNotification = async (data) => {
    let res = null
    const url = `/globalNotify?File=${type==='text'? `false` : `true`}`
    if(type === 'file'){
      const formDataSubmit = new FormData()
      Object.keys(data)?.forEach((key) => {
          const value = data[key];
          if (value) {
            formDataSubmit.append(
              key,
              value instanceof FileList ? value[0] : value
            );
          }
        });
       res = await Api.post({
        url ,   
             contentType: "multipart/form-data",
        data : formDataSubmit
    })
    }
    else{
      res = await Api.post({
        url,
        data 
      })
    }

    if(res?.status === 201){
        let msgdata={
              show: true,
              icon:'',
              text: 'Notification sent successfully.',
          }
          dispatch(ALERTS(msgdata))
          setNotification(false)
      getAllData()
    }
    
  }

  const table = {
    columns: [
      {
        name: "Type",
        value: "type",
        style: "text-center min-w-[100px]",
      },
      {
        name: "Messgae",
        value: "message",
        style: "text-center min-w-[100px]",
      },
      {
        name: "Created At",
        value: "createdAt",
        style: "text-center min-w-[100px]",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
  };
  const form = {
    text : [{
            label: "Message",
            value: "",
            name: "msg",
            type: "text",
            required: true,
            classes: "w-full"
        }],
    file : [{
            label: "Document",
            value: "",
            name: "msg",
            type: "file",
            required: true,
            classes: "w-full"
        }]
  }

  return (
    <div className=''>
      <AdvancedTable
        headerButton={
          <div className="flex gap-2">
            <Button
              name={"Add New"}
              classes="w-auto"
              onClick={() => { setNotification(true) }}
            />
          </div>
        }
        table={table}

        tableName="OHS Notifications"
        TableHeight="h-[68vh]"

        data={allData?.map((item) => {
          return {
            ...item,
            message : item?.message ? (item?.message.split('/').includes('uploads') ?  <p className='underline-offset-1 underline text-blue-500 cursor-pointer' onClick={() => {
              imageRef.current = baseUrl + '/' + item?.message
              setImage(true)
            }} >{item?.message}</p> : item?.message) : ''
           }
        })}

        totalCount={allData[0]?.overall_table_count}
        heading="Total Count :-"
        filterAfter={onSubmit}

      />
      <Modal
        size="sm"
        modalHead={<h1>Add Notification</h1>}
        children={<div>
          <div className="flex gap-6 w-full items-center justify-center pt-4 text-white mb-6">
            {<label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="notification"
                value="text"
                checked={type === 'text'}
                onChange={(e) => setType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">Text</span>
            </label>}
            {<label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="notification"
                value="file"
                checked={type === 'file'}
                onChange={(e) => setType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">File</span>
            </label>}
          </div>

          <div className="w-full ">
          {type === "text" ? (
            <>
              <h1 className="text-white text-xl py-2">Write your message.</h1>
              <CommonForm
                classes="  gap-4"
                Form={form.text}
                errors={errorsForm1}
                register={registerForm1}
                setValue={setValueForm1}
                getValues={getValuesForm1}
              />
            </>
          ) : (
            <>
              <h1 className="text-white text-xl py-2">Upload Your Document</h1>
              <CommonForm
                classes="  gap-4"
                Form={form.file}
                errors={errorsForm2}
                register={registerForm2}
                setValue={setValueForm2}
                getValues={getValuesForm2}
              />
            </>
          )}
        </div>
        <div className="w-full flex justify-center mt-6">
          {type === "text" ? (
            <Button
              name="Submit"
              className="w-fit bg-[#13B497] text-white py-2 px-4 rounded-lg hover:bg-[#0c8b74] transition-colors duration-200 font-medium"
              onClick={handleSubmitForm1((data) =>
                handelNotification(data)
              )}
            />
          ) : (
            <Button
              name="Submit"
              className="w-fit bg-[#13B497] text-white py-2 px-4 rounded-lg hover:bg-[#0c8b74] transition-colors duration-200 font-medium"
              onClick={handleSubmitForm2((data) =>
                handelNotification(data)
              )}
            />
          )}
        </div>
        </div>}
        isOpen={notification}
        setIsOpen={setNotification}
      />
      <Modal
        size="full"
        modalHead={<h1>Image View</h1>}
        children={ <img src={imageRef.current} className='w-full h-[90vh] object-fill  rounded-md' alt="" />}
        isOpen={image}
        setIsOpen={setImage}
      />
    </div>
  )
}

export default OhsNitification
