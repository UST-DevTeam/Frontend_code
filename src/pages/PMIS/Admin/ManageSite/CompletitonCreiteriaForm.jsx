import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import projectListActions from "../../../../store/actions/projectList-actions";
import { useDispatch, useSelector } from "react-redux";
import { Urls } from "../../../../utils/url";
import MyHomeActions from "../../../../store/actions/myHome-actions";
import NewLookBadge from "../../../../components/Badge";
import ManageSite from "./ManageSite";
import ManageComplianceTemplateForm from "../ManageCompliance/ManageComplianceTemplateForm";
import Modal from "../../../../components/Modal";
import AdminActions from "../../../../store/actions/admin-actions";
import { GET_COMPLIANCE_DEGROW_TEMPLATE_DATA, GET_ONE_COMPLIANCE_DY_FORM, GET_ONE_COMPLIANCE_L1_LIST } from "../../../../store/reducers/admin-reducer";
import { GET_GLOBAL_COMPLAINCE_TYPE_DATA, GET_PO_LINE_ITEM } from "../../../../store/reducers/projectList-reducer";
import ManageComplianceTemplateApproverForm from "../ManageCompliance/ManageComplinaceTemplateApproverForm";
import ManageComplianceDegrowTemplateForm from "../ManageCompliance/ManageComplianceDegrowTemplateForm";
import ManageComplianceDegrowSRQ_Raise_And_DismantleTemplateForm from "../ManageCompliance/ManageComplianceDegrowSRQ_Raise_And_DismantleTemplateForm";

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

  // const dateString = siteCompleteData["siteStartDate"];
  // const [day, month, year] = dateString?.split("-")?.map(Number);
  // const datestr = new Date(year, month - 1, day);

  // const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [modalFullBody, setmodalFullBody] = useState(<></>);
  const [modalFullOpen1, setmodalFullOpen1] = useState(false);

  const projectTypeName = siteCompleteData['projectType']
  const subProjectName = siteCompleteData['subProject']



  const checkmilestone = mileStone["Completion Criteria"].split(",")
  const checkmilestoneStatus = mileStone['mileStoneStatus']
  const milestoneName = mileStone['Name']

  const marketName = siteCompleteData['Market']


  const poNumberList = useSelector((state) =>{
      return state?.projectList?.getPoNumber.map((itm) => {
      return {
        label: itm?.poNumber,
        value: itm?.poNumber,
      };
    });
  })

  const poLineItemList = useSelector((state) =>{
      return state?.projectList?.getPoLineItem.map((itm) => {
      return {
        label: itm?.itemCode,
        value: itm?.itemCode,
      };
    });
  })









  const {
    register: register,
    handleSubmit: handleSubmit,
    setValue: setValue,
    getValues: getValues,
    formState: { errors: errors },
  } = useForm();

  // let mileStoneprops = {
  //   "Completion Date": {
  //     maxSelectableDate: new Date(),
  //     minSelectableDate: datestr,
  //   },
  // };

  let dataecoder = {
    Date: "datetime",
    Number: "number",
    File: "file",
    Text: "text",
    Dropdown: "select"
  };

  let mileStoneCompletion = useSelector((state) => {

    let mtoneCompletion = state?.adminData?.getManageCompletionCriteria || [];
    return mileStone["Completion Criteria"].split(",").flatMap((dta) => {
      let geeter = mtoneCompletion.filter((itm) => itm.completion == dta);
      if (dta == "Form") {
        let baseFields = [
          {
            label: "Po Numer",
            name: "poNumber",
            type: "select",
            value: "",
            props: {
              onChange: (e) => {
                if (e.target.value){
                  dispatch(projectListActions.getPoLineItem(marketName,milestoneName,`${e.target.value}`,true));
                }
                else{
                  dispatch(GET_PO_LINE_ITEM({ dataAll:[], reset:true }))
                }
               },
            },
            required: true,
            option:poNumberList,
            classes: "col-span-1",
          },
          {
            label: "PO Line Item#",
            name: "itemCode",
            type: "select",
            value: "",
            props: {
              onChange: (e) => { },
            },
            required: true,
            option:poLineItemList,
            classes: "col-span-1",

          },
          {
            label: "Quantity",
            name: "qty",
            type: "number",
            value: "",
            props: {
              valueAsNumber: true,
              min: 1,
              onChange: (e) => { },
            },
            required: true,
            classes: "col-span-1",

          }

        ]
        if (milestoneName === "Signage WCC") {
          baseFields.push({
            label: "Sigange Count",
            name: "Sigange Count",
            type: "number",
            value: "",
            required: true,
            props: {
              valueAsNumber: true,
              min: 1,
              onChange: (e) => { },
            },
            classes: "col-span-1",
          });
        }
        return baseFields;

      }
      else {
        return {
          label: dta,
          value: "",
          name: "CC_" + dta,
          required: true,
          type: geeter.length > 0 ? dataecoder[geeter[0]["type"]] : "",
          formatop:"MM-DD-YYYY",
          option: geeter?.[0]?.type == "Dropdown" ? geeter[0]["dropdown"]?.split(",").map((itm) => {
            return {
              label: itm,
              value: itm,
            };
          }) : [],
          // props: mileStoneprops[dta] || {}, # for Completition Date Condition
        };
      }
    });
  });

  let backgeturl = projectListActions.getProjectTypeAll(projectuniqueId, filterView);
  if (myTaskPage === "Yes") {
    backgeturl = MyHomeActions.getMyTask();
  }


  const onsubmiting = (data) => {
    if (checkmilestone.includes("Form")) {
      data['Form'] = "Yes"
      // data['siteuid'] = siteCompleteData.uniqueId
      data['mName'] = mileStone['Name']
      data['market'] = marketName
      // data['projectTypeName'] = projectTypeName
      // data['subProjectTypeName'] = subProjectName
    }
    dispatch(
      projectListActions.postSubmit(Urls.projectList_closeMilestone + mileStone["uniqueId"], data, () => {
        setmodalOpen(false);
        setmodalFullOpen(false);
        dispatch(backgeturl);
      }
      )
    );
  };

  useEffect(() => {
    dispatch(GET_PO_LINE_ITEM({ dataAll:[], reset:true }))
    if (checkmilestone.includes("Form")) {
      dispatch(projectListActions.getPoNumber(marketName,milestoneName,true));
    }
  }, [milestoneName]);

  return (
    <>
      <Modal
        size={"full"}
        children={modalFullBody}
        isOpen={modalFullOpen1}
        setIsOpen={setmodalFullOpen1}
        modalHead={"Forms & Checklist"}
      />

      <CommonForm
        classes={"grid-cols-2 gap-1"}
        Form={mileStoneCompletion}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
      />

      <div className="flex justify-center">
        {!checkmilestone.includes("Forms & Checklist") && (
          <Button
            onClick={handleSubmit(onsubmiting)}
            name={"Submit"}
            classes="w-auto"
          />
        )}
        {checkmilestone.includes("Forms & Checklist") && ['Open', 'In Process'].includes(checkmilestoneStatus) && (
          <Button
            onClick={handleSubmit(onsubmiting)}
            name={"Submit"}
            classes="w-auto"
          />
        )}
      </div>
    </>
  );
};

export default CompletitonCreiteriaForm;
