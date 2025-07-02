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
import PTWActions from "../../../../store/actions/ptw-actions";
const PtwForm = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const {page} = useParams()
  const dispatch = useDispatch()
  let completionCriteriaList = useSelector((state) => {
    let interdata = state?.adminData?.getManageCompletionCriteria || [];
    return interdata?.map((itm) => {
      const data = {
        name: itm.completion,
        id: itm.completion,
      };
      return data;
    });
  });
  const [type, settype] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  const [modalSize, setmodalSize] = useState("full");
  const [uniqueness, setUniqueness] = useState("");
  const [listing, setlisting] = useState([]);
  const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();


  const getPtwFormData = () => {
    dispatch(
      PTWActions.managePtwApiGet( `/admin/ptw/${page}`, (data) => {
        setData(data?.data[0])
      }  )
    );
  }

  useEffect(() => {
    console.log('called...........................')
      getPtwFormData()
  } , [page])

  

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
          label: "DateTime",
          value: "DateTime",
        },
        {
          label: "Image",
          value: "img",
        },
        {
          label: "AutoFill",
          value: "AutoFill",
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

  const handleAddActivity = (datas, head) => {

    console.log(datas , head , 'data........')
    if(data?._id){
      dispatch(PTWActions.managePtwApiPatch(datas , `/admin/ptw/${page}/${head.toLowerCase()}` , '' , data?._id , () =>{
      getPtwFormData()
    } ))
    }else{
      dispatch(PTWActions.managePtwApiPost(datas , `/admin/ptw/${page}/${head.toLowerCase()}` , '' , cb=> {
        getPtwFormData()
      } ))
    }
    
  };

  

  const form = (head ) => {
    return <CommonTableForm
                setmodalOpen={setmodalOpen}
                tabHead={head.toLowerCase()}
                ptwPage = {page}
                classes={"grid-cols-2 gap-1"}
                Form={conditionmultiForm}
                errors={errors}
                getPtwFormData={getPtwFormData}
                ptwData = {data}
                isPtw = {true}
                register={register}
                setValue={setValue}
                getValues={getValues}
                functioning={(res) =>
                  handleAddActivity(res, head)
                }
                oldList={[]}
                listing={listing}
                setlisting={setlisting}
              />
  }

  const ptwForm = {
    'workatheight' : {
            CheckList: form("CheckList"),
            Photo: form("Photo"),
            RiskAssessment: form("RiskAssessment"),
            PtwPhoto : form("PtwPhoto") ,
            OneAtRisk: form("OneAtRisk"),
          },
    'groundactivity' : {
            CheckList: form("CheckList"),
            Photo: form("Photo"),
            RiskAssessment: form("RiskAssessment"),
            PtwPhoto : form("PtwPhoto") ,
            OneAtRisk: form("OneAtRisk"),
          },
     'drivetestactivity' : {
            CheckList: form("CheckList"),
            Photo: form("Photo"),
            RiskAssessment: form("RiskAssessment"),
            PtwPhoto : form("PtwPhoto") ,
            OneAtRisk: form("OneAtRisk"),
            'fourWheeler': form("fourWheeler"),
            'twoWheeler': form("twoWheeler"),
           
          } ,
      'rtws' : {
            CheckList: form("CheckList"),
            Photo: form("Photo"),
            RiskAssessment: form("RiskAssessment"),
            PtwPhoto : form("PtwPhoto") ,
            OneAtRisk: form("OneAtRisk"),
          },
  }

  return (
    <>
      <div>
        { page === 'rejectionreasoin'?  <CommonTableFormSiteParent
          funcaller={() => {}}
          defaultValue={"CheckList"}
          tabslist={{
            CheckList: form("CheckList"),
          }}
        /> :  <CommonTableFormSiteParent
          funcaller={() => {}}
          defaultValue={"CheckList"}
          tabslist={ptwForm[page]}
        /> }
      </div>
    </>
  );
};

export default PtwForm;
