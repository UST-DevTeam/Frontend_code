import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import projectListActions from "../../../../store/actions/projectList-actions";
import { useDispatch, useSelector } from "react-redux";
import { Urls } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import MyHomeActions from "../../../../store/actions/myHome-actions";

const CompletitonCreiteriaForm = ({
  siteCompleteData,
  mileStone,
  projectuniqueId,
  setmodalFullOpen,
  setmodalOpen,
  customeruniqueId,
  myTaskPage,
}) => {
  const dispatch = useDispatch();
  // let mileStoneCompletion = {
  //     "Completion Date": "datetime",
  //     "Checklist": "",
  //     "MO No": "number",
  //     "Challan copy": "file",
  //     "Attachment": "file",
  //     "Reference No": "number",
  // };

  const dateString = siteCompleteData["siteStartDate"];
  const [day, month, year] = dateString.split("-").map(Number);

  const datestr = new Date(year, month - 1, day);

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
    console.log("opppppp", state?.adminData?.getManageCompletionCriteria);

    let mtoneCompletion = state?.adminData?.getManageCompletionCriteria || [];
    return mileStone["Completion Criteria"].split(",").map((dta) => {
      console.log("opppppp2", mtoneCompletion, dta);
      let geeter = mtoneCompletion.filter((itm) => itm.completion == dta);
      console.log("geetergeeter", geeter);
      return {
        label: dta,
        value: "",
        name: "CC_" + dta,
        required: true,
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

    return [];
    return geeter.length > 0 ? geeter[0]["type"] : "";
    return state?.adminData?.getManageCompletionCriteria || [];
    return state?.adminData?.getManageCompletionCriteria.map((itm) => {
      return {
        label: itm?.type,
        value: itm?.uniqueId,
      };
    });
  });

  let backgeturl = projectListActions.getProjectTypeAll(projectuniqueId);
  if (myTaskPage === "Yes") {
    backgeturl = MyHomeActions.getMyTask();
  }


  const onsubmiting = (data) => {
    dispatch(
      projectListActions.postSubmit(
        Urls.projectList_closeMilestone + mileStone["uniqueId"],
        data,
        () => {
          setmodalOpen(false);
          setmodalFullOpen(false);
          dispatch(backgeturl);
        }
      )
    );
  };

  useEffect(() => {
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

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
