import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CommonForm from "../../../components/CommonForm";
import Api from "../../../utils/api";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { baseUrl, Urls } from "../../../utils/url";

const CommonFormPTW = ({ formName, getApprovalsData, isPtwRaise, fillData, setDriveFormModel, setPtwModalHead, formData }) => {
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

  
  const [allFormType, setAllFormType] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [which, setWhich] = useState('');
  const [isMultiStep, setIsMultiStep] = useState(false);
  const [ptwDriveTest, setPtwDriveTest] = useState(false);
  const [ptwDriveModel, setPtwDriveModel] = useState(false);


  const [vehicleType, setVehicleType] = useState(false);
  const [isSelect, setSelect] = useState(false);
  const FORM_FLOW_SEQUENCE = ['roadSafetyChecklist', "teamdetails", "ptwphoto"];
  const options = [
    { id: "roadSafetyChecklist", name: "Road Safety Checklist" },
    { id: "teamdetails", name: "Team Details" },
    { id: "ptwphoto", name: "PTW Photo" },
  ];
  const {
    register: registerForm1,
    setValue: setValueForm1,
    getValues: getValuesForm1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: errorsForm1 },
  } = useForm();
  useEffect(()=>{
      
      if(Object.keys(errorsForm1).length > 0){
          alert(` ${errorsForm1[Object.keys(errorsForm1)[0]]?.message} :- ${Object.keys(errorsForm1)[0]} `)
      }   
     } , [errorsForm1])
  const {
    register: registerForm3,
    setValue: setValueForm3,
    getValues: getValuesForm3,
    handleSubmit: handleSubmitForm3,
    formState: { errors: errorsForm3 },
  } = useForm();
  useEffect(()=>{
    
    if(Object.keys(errorsForm3).length > 0){
        alert(` ${errorsForm3[Object.keys(errorsForm3)[0]]?.message} :- ${Object.keys(errorsForm3)[0]} `)
    }   
   } , [errorsForm3])
  const {
    register: registerForm2,
    setValue: setValueForm2,
    getValues: getValuesForm2,
    handleSubmit: handleSubmitForm2,
    formState: { errors: errorsForm2 },
  } = useForm();
  useEffect(()=>{
    
    if(Object.keys(errorsForm2).length > 0){
        alert(` ${errorsForm2[Object.keys(errorsForm2)[0]]?.message} :- ${Object.keys(errorsForm2)[0]} `)
    }   
   } , [errorsForm2])
  const subFormRef = useRef({
    checklist: [],
    teamdetails: [],
    photo: [],
    ptwphoto: [],
    riskassessment: [],
    roadsafetychecklist2wheeler: [],
    ptwphoto4wheeler: [],
    ptwphoto2wheeler: [],
    roadsafetychecklist4wheeler: [],
  });

  useEffect(() => {
    setPtwModalHead({
      title: which
    })
    if (isPtwRaise) {
      subFormRef.current[which]?.forEach((item) => {
        console.log(item, '987654323456789876545678765')
        if (['checklist', 'photo'].includes(which)) {
          setValue(item?.fieldName, item?.dataType === 'img' ? baseUrl + fillData[which][item?.fieldName] : fillData[which][item?.fieldName])
        }
      })
    } else {
      subFormRef.current[which]?.forEach((item) => {
        console.log(item, '987654323456789876545678765')
        if (['checklist', 'photo'].includes(which)) {
          setValue(item?.fieldName, formData[item?.fieldName])
        }
      })
    }

  }, [which])

  console.log(isPtwRaise, fillData, formData, 'fasdfasdfasfasdfsgfdsagmvxczasetwyjghnb')

  const getForm = async () => {
    const res = await Api.get({ url: `/show/ptw/${formName}` });
    if (res?.status === 200) {
      if (!res?.data?.data?.length) {
        alert("No Form Found.");
        return;
      }
      setAllFormType(Object.keys(res?.data?.data[0]))
      Object.keys(subFormRef.current)?.forEach((itm) => {
        if (res?.data?.data[0][itm]?.length === 0) {
          alert("Please submit all form first.");
          return;
        }
        subFormRef.current[itm] = res?.data?.data[0][itm]?.map((item) => {
          return {
            ...item,
            label: item?.fieldName,
            defaultValue: item?.dataType === "AutoFill" ? "aman" : "",
            defaultValue: item?.dataType === "AutoFill" ? "aman" : "",
            // disabled :  item?.dataType === 'AutoFill' ? true : false ,
            name: item?.fieldName,
            type:
              item?.dataType === "AutoFill"
                ? "sdisabled"
                : item?.dataType === "Dropdown"
                  ? "select"
                  : item?.dataType === "DateTime"
                    ? "datetime-local"
                    : item?.dataType?.toLowerCase() === "date"
                      ? "datetime"
                      : item?.dataType === "img"
                        ? "file"
                        : item?.dataType?.toLowerCase(),
            ...(item?.dataType === "Dropdown"
              ? {
                option: item?.dropdownValue.split(",")?.map((item) => {
                  return {
                    label: item.trim(),
                    value: item.trim(),
                  };
                }),
              }
              : {}),
            // ...(item?.dataType === 'img' ? {
            //   props: {
            //     onChange: (e) => {
            //       console.log(e.target.files, "e geeter");
            //       setValue(item?.fieldName, e.target.files[0]);
            //     },

            //   },
            // } : {}),
            required: item?.required === "Yes" ? true : false,
          };
        });
      });

      if (Object.keys(res?.data?.data[0]).includes('checklist')) {
        setWhich("checklist");
      } else if (Object.keys(res?.data?.data[0]).includes('photo')) {
        setWhich("photo");
      } else {
        setSelect(true);
        reset();
        setWhich("formSelection");
        return;
      }
    } else {
    }
  }

  useEffect(() => {
    getForm()
  }, [])

  const handleAddActivity = async (data, formType) => {
    let res = null;
    console.log(which, data, 'fasdfasdfsadfasdfasdfasdf')

    try {
      // Handle normal (non-photo/vehicle) forms
      if (!["photo", "ptwphoto", "teamdetails", "vehicle"].includes(which)) {
        const newData = {
          projectID: formData?.projectId,
          siteId: formData?.siteId,
          projectuniqueId: formData?.projectuniqueId,
          siteUid: formData?.siteUid,
          customerName: formData?.customerName,
          subProject: formData?.SubProject,
          circle: formData?.CIRCLE,
          circleId: formData?.circleId,
          mileStoneId: formData?.mileStoneId,
          Milestone: formData?.Milestone,
          [which]: {},
        };

        Object.keys(data)?.forEach((key) => {
          if (data[key]) {
            newData[which][key] = data[key];
          }
        });



        const url = isPtwRaise ? `/regeneratePtw/${formType}/${which}/${sessionStorage.getItem("opid")}` : `/submit/ptw/${formType}/${which}${sessionStorage.getItem("opid") ? `/${sessionStorage.getItem("opid")}` : ""
          }`;

        res = sessionStorage.getItem("opid")
          ? await Api.patch({ url, data: newData })
          : await Api.post({ url, data: newData });
      }

      // Handle special forms (photo, ptwphoto, teamdetails, vehicle)
      else {
        const formDataSubmit = new FormData();

        formDataSubmit.append("projectID", formData?.projectId);
        formDataSubmit.append("siteId", formData?.siteId);
        formDataSubmit.append("siteUid", formData?.siteUid);
        formDataSubmit.append("projectuniqueId", formData?.projectuniqueId);
        formDataSubmit.append("customerName", formData?.customerName);
        formDataSubmit.append("circle", formData?.CIRCLE);
        formDataSubmit.append("circleId", formData?.circleId);
        formDataSubmit.append("mileStoneId", formData?.mileStoneId);
        formDataSubmit.append("Milestone", formData?.Milestone);

        // Append each field (file or text)
        Object.keys(data)?.forEach((key) => {
          const value = data[key];
          if (value) {
            formDataSubmit.append(
              key,
              value instanceof FileList ? value[0] : value
            );
          }
        });

        const url = isPtwRaise ? `/regeneratePtw/${formType}/${which}/${sessionStorage.getItem("opid")}` : `/submit/ptw/${formType}/${which}${sessionStorage.getItem("opid") ? `/${sessionStorage.getItem("opid")}` : ""
          }`;

        res = await Api.patch({
          url,
          contentType: "multipart/form-data",
          data: formDataSubmit,
        });
      }

      // Handle response
      if (res?.status === 200 || res?.status === 201) {
        sessionStorage.setItem("opid",
          sessionStorage.getItem("opid") || formData?.mileStoneId
        );

        // Special redirect after photo
        if (which === "photo") {
          setSelect(true);
          reset();
          setWhich("formSelection");
          return;
        }

        // Multi-step form logic
        if (isMultiStep) {
          const nextIndex = currentStepIndex + 1;

          if (nextIndex < selectedItems.length) {
            setCurrentStepIndex(nextIndex);
            const nextForm = selectedItems[nextIndex];
            setPtwModalHead({ title: nextForm.name, value: nextForm.id });
          } else {
            // Final step (show vehicle form)
            setIsMultiStep(false);
            setPtwModalFullOpen(false);

            if (formType === "drivetestactivity" && vehicleType !== '') {
              setPtwModalHead({ title: "", value: "vehicle" });
              setPtwDriveTest(true);
            } else {
              getApprovalsData(res?.data?.operation_id);
            }
          }

          reset();
          return;
        }
        if ((allFormType).includes(which === "checklist" ? "photo" : which)) {
          setWhich(which === "checklist" ? "photo" : which);
        } else {
          setSelect(true);
          reset();
          setPtwModalHead({ title: "", value: "formSelection" });
          return;
        }

        // Fallback (non-multi-step)

        reset();
      }
    } catch (err) {
      console.error("Error in handleAddActivity:", err);
    }
  };

  const handleContinue = (opId) => {
    if (selectedItems.length === 0) {
      alert("Please select at least one form.");
      return;
    }

    const sortedItems = FORM_FLOW_SEQUENCE.map((id) =>
      selectedItems.find((item) => item.id === id)
    ).filter(Boolean);

    setSelectedItems(sortedItems);
    setIsMultiStep(true);
    setCurrentStepIndex(0);
    setSelect(false);

    const firstForm = sortedItems[0];
    if (firstForm.id === 'roadSafetyChecklist') {
      setPtwDriveTest(true)
      if (allFormType.includes('roadsafetychecklist2wheeler')) {
        if (isPtwRaise) {
          subFormRef.current.roadsafetychecklist2wheeler?.forEach((item) => {

            setValueForm1(item?.fieldName, fillData['roadsafetychecklist2wheeler'][item?.fieldName])

          })
        } else {
          subFormRef.current.roadsafetychecklist4wheeler?.forEach((item) => {
            setValueForm2(item?.fieldName, formData[['roadsafetychecklist4wheeler']][item?.fieldName])
          })
        }
      }
      setVehicleType(allFormType.includes('roadsafetychecklist2wheeler') ? 'roadsafetychecklist2wheeler' : 'roadsafetychecklist4wheeler')
    } else {
      setWhich(firstForm.id);
    }

  };

  console.log(allFormType, 'asfasdfasdfsdfgretwertwer2342')



  const handleCheckboxChange = (optionId, optionName) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((item) => item.id === optionId);

      if (isSelected) {
        // Remove item if already selected
        return prev.filter((item) => item.id !== optionId);
      } else {
        // Add item if not selected
        return [...prev, { id: optionId, name: optionName }];
      }
    });
  };
  useEffect(()=>{
    console.log(errors , 'asdfsdfasdfasdfasdf')
      if(Object.keys(errors).length > 0){
          alert(` ${errors[Object.keys(errors)[0]]?.message} :- ${Object.keys(errors)[0]} `)
      }   
     } , [errors, subFormRef.current[which]])

  const handleVehicle = async (formDataInput, subForm) => {

    const newData = {
      projectID: formData?.projectId,
      projectuniqueId: formData?.projectuniqueId,
      siteUid: formData?.siteUid,
      siteId: formData?.siteId,
      customerName: formData?.customerName,
      subProject: formData?.SubProject,
      circle: formData?.CIRCLE,
      mileStoneId: formData?.mileStoneId,
      Milestone: formData?.Milestone,
      [subForm]: {},
    };

    Object.keys(formDataInput)?.forEach((key) => {
      if (formDataInput[key]) {
        newData[subForm][key] = formDataInput[key];
      }
    });


    const res = await Api.patch({

      url: isPtwRaise ? `/regeneratePtw/drivetestactivity/${subForm}${sessionStorage.getItem("opid") ? `/${sessionStorage.getItem("opid")}` : ""}` : `/submit/ptw/drivetestactivity/${subForm}${sessionStorage.getItem("opid") ? `/${sessionStorage.getItem("opid")}` : ""}`,
      data: newData,
    });

    if (res?.status === 200) {
      reset(); // If you use one useForm
      setPtwDriveTest(false);

      if (selectedItems?.map((item) => item.id).includes('ptwphoto')) {
        setPtwDriveTest(false)
        setPtwDriveModel(true)
        if (allFormType.includes('roadsafetychecklist2wheeler')) {
          if (isPtwRaise) {
            subFormRef.current.ptwphoto2wheeler?.forEach((item) => {

              setValueForm1(item?.fieldName, fillData['ptwphoto2wheeler'][item?.fieldName])

            })
          } else {
            subFormRef.current.ptwphoto4wheeler?.forEach((item) => {
              setValueForm2(item?.fieldName, formData[['ptwphoto4wheeler']][item?.fieldName])
            })
          }
        }
      }
      else {
        console.log(selectedItems, currentStepIndex, 'ásdfasdfasdfasdfasdfasdfasdfasdgsdfgghdgfasdfsd')
        if (isMultiStep) {
          const nextIndex = currentStepIndex + 1;
          setVehicleType('')
          if (nextIndex < selectedItems.length) {
            setCurrentStepIndex(nextIndex);
            const nextForm = selectedItems[nextIndex];
            setWhich(nextForm.id);
            setPtwDriveTest(false)
          } else {
            // Final step (show vehicle form)
            setIsMultiStep(false);
            setPtwDriveTest(false);
            setDriveFormModel(false)
            getApprovalsData(res?.data?.operation_id);
          }

          reset();
          return;
        }
      }


    }
  };


  const handleVehiclePhoto = async (formDataInput, subForm) => {
    const formKeys = (subFormRef.current[subForm] || []).map(f => f.fieldName);

    const formData = new FormData();

    // Shared metadata
    formData.append("projectID", formData?.projectId);
    formData.append("projectuniqueId", formData?.projectuniqueId);
    formData.append("siteUid", formData?.siteUid);
    formData.append("siteId", formData?.siteId);
    formData.append("customerName", formData?.customerName);
    formData.append("circle", formData?.CIRCLE);
    formData.append("mileStoneId", formData?.mileStoneId);
    formData.append("Milestone", formData?.Milestone);

    // Only selected form's fields
    for (let key in formDataInput) {
      if (formKeys.includes(key)) {
        const value = formDataInput[key];
        const finalKey = `${key}`;

        if (value instanceof FileList) {
          formData.append(finalKey, value[0]);
        } else {
          formData.append(finalKey, value);
        }
      }
    }
    const res = await Api.patch({
      url: `/submit/ptw/drivetestactivity/${subForm}${sessionStorage.getItem("opid") ? `/${sessionStorage.getItem("opid")}` : ""}`,
      contentType: "multipart/form-data",
      data: formData,
    });

    if (res?.status === 200) {
      reset(); // If you use one useForm
      // setPtwDriveTest(false);
      if (isMultiStep) {
        const nextIndex = currentStepIndex + 1;
        setVehicleType('')
        if (nextIndex < selectedItems.length) {
          setCurrentStepIndex(nextIndex);
          const nextForm = selectedItems[nextIndex];
          setPtwModalHead({ title: nextForm.name, value: nextForm.id });
          setPtwDriveTest(false)
          setPtwModalFullOpen(true)


        } else {
          // Final step (show vehicle form)
          setIsMultiStep(false);
          setPtwDriveTest(false);
          getApprovalsData(res?.data?.operation_id);
        }

        reset();
        return;
      }
    }
  }



  const checkOptionList = (type = '') => {
    if (type !== 'photo' && (allFormType.includes('roadsafetychecklist4wheeler') || allFormType.includes('roadsafetychecklist2wheeler'))) {
      return ['roadSafetyChecklist']
    }
    else {
      if (allFormType.includes('roadsafetychecklist4wheeler')) {
        if (allFormType.includes('ptwphoto4wheeler')) {
          return ['ptwPhoto']
        }
      }
      else if (allFormType.includes('roadsafetychecklist2wheeler')) {
        if (allFormType.includes('ptwphoto2wheeler')) {
          return ['ptwPhoto']
        }
      }
      else[]
    }
  }

  if (ptwDriveTest) {
    return (
      <div className=" grid place-items-center place-content-center  p-4 min-h-[50vh] max-h-full">

        <div className="flex gap-6 text-white mb-6">
          {allFormType.includes('roadsafetychecklist2wheeler') && <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="vehicleType"
              value="roadsafetychecklist2wheeler"
              checked={vehicleType === "roadsafetychecklist2wheeler"}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-sm"> Two Wheeler</span>
          </label>}
          {allFormType.includes('roadsafetychecklist4wheeler') && <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="vehicleType"
              value="roadsafetychecklist4wheeler"
              checked={vehicleType === "roadsafetychecklist4wheeler"}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-sm">Four Wheeler</span>
          </label>}
        </div>

        <div className="w-full ">
          {vehicleType === "roadsafetychecklist2wheeler" ? (
            <>
              <h1 className="text-white text-xl py-2">Two Wheeler Checklist</h1>
              <CommonForm
                classes="grid-cols-3 min-w-[700px]  gap-4"
                Form={subFormRef.current?.roadsafetychecklist2wheeler}
                errors={errorsForm1}
                register={registerForm1}
                setValue={setValueForm1}
                getValues={getValuesForm1}
              />
            </>
          ) : (
            <>
              <h1 className="text-white text-xl py-2">Four Wheeler Checklist</h1>
              <CommonForm
                classes="grid-cols-3 min-w-[700px]  gap-4"
                Form={subFormRef.current?.roadsafetychecklist4wheeler}
                errors={errorsForm2}
                register={registerForm2}
                setValue={setValueForm2}
                getValues={getValuesForm2}
              />
            </>
          )}
        </div>

        <div className="w-full flex justify-center mt-6">
          {vehicleType === "roadsafetychecklist2wheeler" ? (
            <Button
              name="Submit"
              className="w-fit bg-[#13B497] text-white py-2 px-4 rounded-lg hover:bg-[#0c8b74] transition-colors duration-200 font-medium"
              onClick={handleSubmitForm1((data) =>
                handleVehicle(data, "roadsafetychecklist2wheeler")
              )}
            />
          ) : (
            <Button
              name="Submit"
              className="w-fit bg-[#13B497] text-white py-2 px-4 rounded-lg hover:bg-[#0c8b74] transition-colors duration-200 font-medium"
              onClick={handleSubmitForm2((data) =>
                handleVehicle(data, "roadsafetychecklist4wheeler")
              )}
            />
          )}
        </div>
      </div>
    )
  }
  else {
    return < >

      {isSelect ? (
        <div className="max-w-md mx-auto mt-8  rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Select Your Forms
          </h2>

          <div className="space-y-3 mb-6">

            {options?.filter((item) => [...allFormType, ...checkOptionList('photo'), ...checkOptionList()]?.includes(item.id)).map((option) => (

              <label
                key={option.id}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.some(
                    (item) => item.id === option.id
                  )}
                  onChange={() =>
                    handleCheckboxChange(option.id, option.name)
                  }
                  className="w-4 h-4 text-white bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-white">{option.name}</span>
              </label>
            ))}
          </div>

          <button
            onClick={() => handleContinue(sessionStorage.getItem("opid"))}
            className="w-full bg-[#13B497] text-white py-2 px-4 rounded-lg hover:bg-[#0c8b74] transition-colors duration-200 font-medium"
          >
            Continue
          </button>
        </div>
      ) :
        <div className=" grid place-items-center place-content-center  p-4 min-h-[50vh] max-h-full ">
          <CommonForm
            classes={` ${subFormRef.current[which] &&
              subFormRef.current[which]?.length > 3
              ? "grid-cols-3 "
              : "grid-cols-1 "
              } grid min-w-[300px]  gap-1`}
            Form={subFormRef.current[which]}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
          <Button
            name="Submit"
            classes="w-fit"
            onClick={handleSubmit((data) => {

              handleAddActivity(data, formName);
            })}

          />
        </div>
      }

      <Modal
        size={"xl"}
        modalHead={""}
        children={<div className="w-full flex flex-col items-center p-4 min-h-[50vh] max-h-[80vh] overflow-y-auto">
          {which}
          <div className="w-full ">

            <h1 className="text-white text-xl py-2">{vehicleType === 'roadsafetychecklist4wheeler' ? 'PTW Photo 4-Wheeler' : 'PTW Photo 2-Wheeler'}</h1>
            <CommonForm
              classes="grid-cols-3  gap-4"
              Form={subFormRef.current[vehicleType === 'roadsafetychecklist4wheeler' ? 'ptwphoto4wheeler' : 'ptwphoto2wheeler']}
              errors={errorsForm3}
              register={registerForm3}
              setValue={setValueForm3}
              getValues={getValuesForm3}
            />

          </div>

          <div className="w-full flex justify-center mt-6">

            <Button
              name="Submit"
              className="w-fit bg-[#13B497] text-white py-2 px-4 rounded-lg hover:bg-[#0c8b74] transition-colors duration-200 font-medium"
              onClick={handleSubmitForm3((data) =>
                handleVehiclePhoto(data, vehicleType === 'roadsafetychecklist4Wheeler' ? 'ptwphoto4Wheeler' : 'ptwphoto2Wheeler')
              )}
            />

          </div>
        </div>}
        isOpen={ptwDriveModel}
        setIsOpen={setPtwDriveModel}
      />
    </>;
  }
};

export default CommonFormPTW;
