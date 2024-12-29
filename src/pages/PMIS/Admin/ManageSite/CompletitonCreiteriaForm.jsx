import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import projectListActions from "../../../../store/actions/projectList-actions";
import { useDispatch, useSelector } from "react-redux";
import { Urls } from "../../../../utils/url";
import MyHomeActions from "../../../../store/actions/myHome-actions";

const CompletitonCreiteriaForm = ({
  siteCompleteData,
  mileStone,
  projectuniqueId,
  setmodalFullOpen,
  setmodalOpen,
  customeruniqueId,
  myTaskPage,
  filterView
}) => {

  const dispatch = useDispatch();
  const dateString = siteCompleteData["siteStartDate"];
  const [day, month, year] = dateString?.split("-")?.map(Number);
  const datestr = new Date(year, month - 1, day);


  const {
    register:register,
    handleSubmit:handleSubmit,
    setValue:setValue,
    getValues:getValues,
    formState: { errors:errors },
  } = useForm();

  let mileStoneprops = {
    "Completion Date": {
      maxSelectableDate: new Date(),
      minSelectableDate: datestr,
    },
  };

  let dataecoder = {
    Date: "datetime",
    Number: "number",
    File: "file",
    Text: "text",
    Dropdown: "select"
  };

  let mileStoneCompletion = useSelector((state) => {

    let mtoneCompletion = state?.adminData?.getManageCompletionCriteria || [];
    return mileStone["Completion Criteria"].split(",").map((dta) => {
      let geeter = mtoneCompletion.filter((itm) => itm.completion == dta);
      return {
        label: dta,
        value: "",
        name: "CC_" + dta,
        // required: true,
        required: dta === "Forms & Checklist" ? false : true,
        type: geeter.length > 0 ? dataecoder[geeter[0]["type"]] : "",
        option: geeter[0]["type"]=="Dropdown" ? geeter[0]["dropdown"]?.split(",").map((itm) => {
          return {
            label: itm,
            value: itm,
          };
        }):[],
        props: mileStoneprops[dta] || {},
      };
    });
  });

  let backgeturl = projectListActions.getProjectTypeAll(projectuniqueId,filterView);
  if (myTaskPage === "Yes") {
    backgeturl = MyHomeActions.getMyTask();
  }


  const onsubmiting = (data) => {
    dispatch(
      projectListActions.postSubmit(Urls.projectList_closeMilestone + mileStone["uniqueId"],data,() => {
          setmodalOpen(false);
          setmodalFullOpen(false);
          dispatch(backgeturl);
        }
      )
    );
  };

  useEffect(() => {
  }, []);



  return (
    <>
      <CommonForm
        classes={"grid-cols-1 gap-1"}
        Form={mileStoneCompletion}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
      />

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit(onsubmiting)}
          name={"Submit"}
          classes="w-auto"
        />
      </div>
    </>
  );
};

export default CompletitonCreiteriaForm;
