import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CommonForm from '../CommonForm';
import Button from '../Button';
import { baseUrl } from '../../utils/url';
import Api from '../../utils/api';

const PTWApproverFormEdit = ({ setmodalHead, setmodalOpen, formData, formType, flowType, itemData }) => {
  const [index, setIndex] = useState(0);
  const [type, setType] = useState(flowType[0]);
  const [formConfig, setFormConfig] = useState([]);

  const {
    register,
    handleSubmit,
    unregister,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const submitFormData = async (data) => {
    unregister();
    reset();

    try {
      const checkImg = formType[type]?.filter(itm => itm?.dataType === 'img') || [];

      let res;
      if (checkImg.length === 0) {
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
          [type]: { ...data },
        };

        const url = `/submit/ptw/${itemData?.formType}/${type}/${itemData?.mileStoneId}`;
        res = await Api.patch({ url, data: newData });

      } else {
        const formDataSubmit = new FormData();
        formDataSubmit.append("projectID", itemData?.projectID);
        formDataSubmit.append("siteId", itemData?.siteId);
        formDataSubmit.append("siteUid", itemData?.siteUid);
        formDataSubmit.append("projectuniqueId", itemData?.projectuniqueId);
        formDataSubmit.append("customerName", itemData?.customerName);
        formDataSubmit.append("circle", itemData?.circle);
        formDataSubmit.append("mileStoneId", itemData?.mileStoneId);
        formDataSubmit.append("Milestone", itemData?.Milestone);

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

                const url = `/submit/ptw/${itemData?.formType}/${type}/${itemData?.mileStoneId}`;

                res = await Api.patch({
                    url,
                    contentType: "multipart/form-data",
                    data: formDataSubmit,
                });
            }

      if (res?.status === 200 || res?.status === 201) {
        const nextIndex = index + 1;
        if (nextIndex >= flowType.length) {
          setmodalOpen(false);
          unregister();
          reset();
        } else {
          setIndex(nextIndex);
          setType(flowType[nextIndex]);
          setmodalHead(flowType[nextIndex]);
          unregister();
          reset();
        }
      }

    } catch (e) {
      console.log(e, '___submit error');
    }
  };

  useEffect(() => {
    const tempType = flowType[index];
    setType(tempType);
    setmodalHead(tempType);

    unregister();
    reset();

    const tempForm = formType?.[tempType]?.map((item) => {
      const fieldName = item?.fieldName;
      const fieldValue = formData?.[tempType]?.[fieldName];

      if (item?.dataType === 'img' && fieldValue) {
        setValue(fieldName, `${baseUrl}${fieldValue}`);
      } else {
        setValue(fieldName, fieldValue);
      }

      return {
        ...item,
        label: fieldName,
        name: fieldName,
        type:
          item?.dataType === 'AutoFill' ? 'sdisabled'
            : item?.dataType === 'Dropdown' ? 'select'
              : item?.dataType === 'DateTime' ? 'datetime-local'
                : item?.dataType?.toLowerCase() === 'date' ? 'datetime'
                  : item?.dataType === 'img' ? 'file'
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

    setFormConfig(tempForm || []);
  }, [index, formType, formData]);

  return (
    <div>
      <CommonForm
        classes="grid-cols-3 gap-4"
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
          onClick={handleSubmit(submitFormData)}
        />

        <div className='flex gap-4'>
          <Button
            name="Prev Form"
            classes={`w-fit ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => {
              if (index > 0) {
                setIndex(index - 1);
              }
            }}
          />
          <Button
            name="Next Form"
            classes={`w-fit ${index === flowType.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => {
              if (index < flowType.length - 1) {
                setIndex(index + 1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PTWApproverFormEdit;
