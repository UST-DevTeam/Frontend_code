import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import ManageProjectTypeForm from "../../../PMIS/Admin/ManageProjectType/ManageProjectTypeForm";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import {
  getAccessType,
  objectToQueryString,
} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import CCDash from "../../../../components/CCDash";
import CommonTableForm from "../../../../components/CommonTableForm";
import CommonTableFormSiteParent from "../../../../components/CommonTableFormSiteParent";
import { SET_DYNAMIC_FORM } from "../../../../store/reducers/projectList-reducer";
import ConditionalButton from "../../../../components/ConditionalButton";
import ComponentActions from "../../../../store/actions/component-actions";
import FilterActions from "../../../../store/actions/filter-actions";
import CurrentuserActions from "../../../../store/actions/currentuser-action";
const WorkAtHeight = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const { page } = useParams();
  const dispatch = useDispatch();
  let completionCriteriaList = useSelector((state) => {
    let interdata = state?.adminData?.getManageCompletionCriteria || [];
    return interdata?.map((itm) => {
      const data = {
        name: itm.completion,
        id: itm.completion,
      };
      console.log(data, "datadatadatadata");

      return data;
    });
  });
  const [type, settype] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  const [modalSize, setmodalSize] = useState("full");
  const [uniqueness, setUniqueness] = useState("");
  const [listing, setlisting] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let conditionmultiForm = [
    {
      label: "Field Name",
      name: "fieldName",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Mandatory(Y/N)",
      name: "required",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Yes",
          value: "Yes",
        },
        {
          label: "No",
          value: "No",
        },
      ],
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Input Type",
      name: "dataType",
      value: "Select",
      innerSmart: true,
      type: "select",
      option: [
        {
          label: "Text",
          value: "Text",
        },
        {
          label: "Number",
          value: "Number",
        },
        {
          label: "Decimal",
          value: "Decimal",
        },
        {
          label: "Date",
          value: "Date",
        },
        {
          label: "Dropdown",
          value: "Dropdown",
          extended: {
            typer: "add",
            type: "text",
            option: [],
          },
        },
        {
          label: "Auto Created",
          value: "Auto Created",
          extended: {
            typer: "add",
            type: "text",
            option: [],
          },
        },
      ],
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Status",
      name: "Status",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "Inactive",
        },
      ],
      props: "",
      required: false,
      placeholder: "",
    },
  ];

  const handleAddActivity = (res, head) => {
    dispatch(
      AdminActions.managePtwApi(
        res,
        `/admin/ptw/${page}/${head.toLowerCase()}`,
        "post",
        "json",
        () => {
          console.log("Activity Added");
        }
      )
    );
  };

  const form = (head) => {
    return (
      <CommonTableForm
        setmodalOpen={setmodalOpen}
        tabHead={head}
        classes={"grid-cols-2 gap-1"}
        Form={conditionmultiForm}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        functioning={(res) => handleAddActivity(res, head)}
        oldList={[]}
        listing={listing}
        setlisting={setlisting}
      />
    );
  };

  return (
    <>
      <div>
        <CommonTableFormSiteParent
          funcaller={() => {}}
          defaultValue={"CheckList"}
          tabslist={{
            CheckList: form("CheckList"),
            Photo: form("Photo"),
            RiskAssessment: form("RiskAssessment"),
            PtwPhoto: form("PtwPhoto"),
            OneAtRisk: form("OneAtRisk"),
          }}
        />
      </div>
    </>
  );
};

export default WorkAtHeight;
