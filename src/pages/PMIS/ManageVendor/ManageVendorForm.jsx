import React, { useEffect, useState } from "react";
import "react-querybuilder/dist/query-builder.css"; // Import the library styles
import QueryBuilder from "react-querybuilder";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommonForm from "../../../components/CommonForm";
import Button from "../../../components/Button";
import AdminActions from "../../../store/actions/admin-actions";
import HrActions from "../../../store/actions/hr-actions";
import VendorActions from "../../../store/actions/vendor-actions";
import * as Unicons from "@iconscout/react-unicons";
import UiTopBar from "../../../components/UiTopBar";
import {
  UilFacebookF,
  UilTwitter,
  UilGoogle,
  UilLinkedin,
  UilLinkAlt,
  UilEdit,
  UilSave,
} from "@iconscout/react-unicons";
// import { GET_EMPLOYEE_DETAILS } from "../../../store/reducers/hr-reduces";

const ManageVendorForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { empuid } = useParams();
  console.log(empuid, "formValueformValueformValue");
  const dispatch = useDispatch();
  const [oneLoad, setOneLoad] = useState(false);
  const [UserLyp, seteUserLyp] = useState("");
  const [level, showLevel] = useState(1);
  const [nestfilter, setnestfilter] = useState({});
  const [onestfilter, setonestfilter] = useState({});
  const [gopen, SetgOpen] = useState([]);
  const [dataQuery, SetdataQuery] = useState("Select * from values;");
  const [filtering, setFiltering] = useState("Select * from values;");
  const [managingFilter, setManagingFilter] = useState([]);
  const [upmanagingFilter, setupManagingFilter] = useState([]);
  const [countform, setcountform] = useState([1]);
  const [conditioncountform, setconditioncountform] = useState([]);
  const [countformtwo, setcountformtwo] = useState([]);
  const navigate = useNavigate();
  const [passport, setpassport] = useState([]);
  const [dataValue, setDataValue] = useState([]);
  const [showSocialMediaOther, setshowSocialMediaOther] = useState(false);
  const [showOtherAddressProof, setshowOtherAddressProof] = useState(false);
  const [showBusinessRegistered, setshowBusinessRegistered] = useState(false);
  const [showVendorRegistered, setshowVendorRegistered] = useState(false);
  const [stateName, setStateName] = useState(false);

  const getManageEmpDetails = useSelector((state) => {
    let data = state.hrReducer.getManageEmpDetails;

    console.log(data, "datadatadatadatadatadatadata");
    if (data.length > 0 && oneLoad) {
      setOneLoad(false);

      // dispatch(GET_EMPLOYEE_DETAILS({ dataAll: [], reset: false }));

      // dispatch(HrActions.getManageEmpDetails(false, "dsadsa"));

      Object.entries(data[0]).map((iewq) => {
        // console.log(iewq, "iewqiewqiewqiewqiewqiewq");
        setValue(iewq[0], iewq[1]);
      });
    }
    return state.hrReducer.getManageEmpDetails;
  });

  console.log(getManageEmpDetails, "getManageEmpDetails");

  let roleList = useSelector((state) => {
    return state?.adminData?.getManageProfile.map((itm) => {
      return {
        label: itm?.roleName,
        value: itm?.roleName,
      };
    });
  });

  let circleList = useSelector((state) => {
    return state?.adminData?.getManageCircle.map((itm) => {
        return {
            label: itm.circleName,
            value: itm.uniqueId
        }
    })
})

  // let employeeList = [reportingManager,L2expManager,financeApproverList,reportingHrManager],

  let employeeList = useSelector((state) => {
    return state?.hrReducer?.getManageEmpDetails.map((itm) => {
      return {
        label: itm?.empName + " " + itm.empCode,
        value: itm?.empName + " " + itm.empCode + " " + itm.uniqueId,
      };
    });
  });

  let PersonalInformation = [
    {
      type: "heading",
      label: "Partner On-boarding Requisition Form",
      classes: "col-span-4 font-extrabold text-[#13b497] text-start ",
    },
    {
      label: "Partner Code",
      name: "vendorCode",
      value: "",
      type: "text",
      props: "",
      required: true,
      placeholder: "",
    },
    {
      label: "Partner Name",
      name: "vendorName",
      value: "",
      type: "text",
      props: {},
      required: true,
      placeholder: "",
    },
    {
      label: "UST Partner Code",
      name: "ustCode",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Email Address",
      name: "email",
      value: "",
      type: "text",
      props: "",
      required: true,
      placeholder: "",
    },
    {
      label: "Contact Person ",
      name: "contactPerson",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Registered Partner Addresss ",
      name: "registeredAddress",
      value: "",
      type: "textarea",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Partner's Category",
      name: "vendorCategory",
      type: "text",
      value: "",
      props: "",
      required: false,
    },
    {
      label: "Partner's sub Category",
      name: "vendorSubCategory",
      type: "text",
      value: "",
      props: "",
      required: false,
    },
    {
      label: "Contact Details",
      name: "contactDetails",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Secondary Contact Details",
      name: "SecContactDetails",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Date of Registration",
      name: "dateOfRegistration",
      value: "",
      type: "datetime",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Validity Upto",
      name: "validityUpto",
      value: "",
      type: "datetime",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Company Type",
      name: "companyType",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },   
    {
      label: "Partner Ranking",
      name: "ranking",
      value: "",
      type: "select",
      option: [
        {"label": "L1", "value": "L1"},
        {"label": "L2", "value": "L2"},
        {"label": "L3", "value": "L3"},
      ],
      props: "",
      required: false,
      placeholder: "",
    },   
    {
      label: "PAN",
      name: "pan",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Working Circle's",
      name: "Circle",
      value: "",
      type: "select",
      props: "",
      required: false,
      option: circleList,
      placeholder: "",
    },
    {
      label: "Current Status",
      name: "status",
      value: "",
      type: "select",
      option: [
        {"label": "Active", "value": "Active"},
        {"label": "Inactive", "value": "Inactive"},
      ],
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Password",
      name: "password",
      value: "",
      type: "text",
      props: "",
      required: true,
      placeholder: "",
    },
    {
      label: "Partner's Registered with GST (Y/N)",
      name: "vendorRegistered",
      value: "",
      type: "select",
      props: "",
      required: false,
      placeholder: "",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      props: {
        onChange: (e) => {
          setshowVendorRegistered(e.target.value === "Yes");
        },
      },
    },
  ];
  if (showVendorRegistered) {
    PersonalInformation.push(
      {
        label: "GST No.",
        name: "gstNumber",
        value: "",
        type: "text",
        required: true,
        placeholder: "",
      },
      {
        label: "Upload GST (Attachment)",
        name: "gst",
        value: "",
        type: "file",
        props: "",
        placeholder: "Upload file if GST is mentioned",
      },
  );
  }
  PersonalInformation.push(
    {
      label: "PAN Number",
      name: "panNumber",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Upload Partner PAN",
      name: "pan",
      value: "",
      type: "file",
      props: "",
      placeholder: "",
    },
    {
      label: "TAN Number",
      name: "tanNumber",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Upload Partner TAN",
      name: "tan",
      value: "",
      type: "file",
      props: "",
      placeholder: "",
    },
    {
      label: "ESI Number",
      name: "esiNumber",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Upload Partner ESI",
      name: "esi",
      value: "",
      type: "file",
      props: "",
      placeholder: "",
    },
    {
      label: "EPF Number",
      name: "epfNumber",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Upload Partner EPF",
      name: "epf",
      value: "",
      type: "file",
      props: "",
      placeholder: "",
    },
    {
      label: "STN Number",
      name: "stnNumber",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Upload Partner STN",
      name: "stn",
      value: "",
      type: "file",
      props: "",
      placeholder: "",
    },
    {
      label: "Bank Account No.",
      name: "accounctNumber",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Bank Name",
      name: "bankName",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "IFSC Code",
      name: "ifscCode",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Bank Address",
      name: "bankAddress",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Financial Turnover",
      name: "financialTurnover",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Approval Mail",
      name: "approvalMail",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Contact Copy",
      name: "contactCopy",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Partner Rate Card",
      name: "partnerRateCard",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Mail Communication Attachment",
      name: "approvalMail",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Cheque File (Attachment)",
      name: "cheque",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Other Information",
      name: "otherInfo",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Team Capacity",
      name: "teamCapacity",
      value: "",
      type: "text",
      props: "",
      required: true,
      placeholder: "",
    },
    {
      label: "Tecnology",
      name: "technology",
      value: "",
      type: "text",
      props: "",
      placeholder: "",
    },

    {
      label: "CBTHR Certified (Y/N)",
      name: "cbt",
      value: "",
      type: "select",
      props: "",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      required: false,
      placeholder: "",
    },
    {
      label: "Certificate Attachment",
      name: "cbtCertificate",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Form Toclii",
      name: "formToci",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Certificate Attachment",
      name: "tociCertificate",
      value: "",
      type: "file",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Payment Terms (Days)",
      name: "paymentTerms",
      value: "",
      type: "number",
      props: "",
      placeholder: "",
    },
  );

  let FinancialEvaluation = [
    {
      type: "heading",
      label: "Financial Evaluation",
      classes: "col-span-4 font-extrabold text-black-900 text-start",
    },
    // {
    //   label: "Vendor Registered with GST (Y/N)",
    //   name: "vendorRegistered",
    //   value: "",
    //   type: "select",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    //   option: [
    //     { label: "Yes", value: "Yes" },
    //     { label: "No", value: "No" },
    //   ],
    // },
    // {
    //   label: "GST No.",
    //   name: "gstNumber",
    //   value: "",
    //   type: "text",
    //   required: true,
    //   placeholder: "",
    // },
    // {
    //   label: "Upload GST (Attachment)",
    //   name: "gst",
    //   value: "",
    //   type: "file",
    //   props: "",
    //   placeholder: "Upload file if GST is mentioned",
    // },
    // {
    //   label: "PAN Number",
    //   name: "panNumber",
    //   value: "",
    //   type: "number",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Upload Vendor PAN",
    //   name: "pan",
    //   value: "",
    //   type: "file",
    //   props: "",
    //   placeholder: "",
    // },
    // {
    //   label: "TAN Number",
    //   name: "tanNumber",
    //   value: "",
    //   type: "number",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Upload Vendor TAN",
    //   name: "tan",
    //   value: "",
    //   type: "file",
    //   props: "",
    //   placeholder: "",
    // },
    // {
    //   label: "ESI Number",
    //   name: "esiNumber",
    //   value: "",
    //   type: "number",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Upload Vendor ESI",
    //   name: "esi",
    //   value: "",
    //   type: "file",
    //   props: "",
    //   placeholder: "",
    // },
    // {
    //   label: "EPF Number",
    //   name: "epfNumber",
    //   value: "",
    //   type: "number",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Upload Vendor EPF",
    //   name: "epf",
    //   value: "",
    //   type: "file",
    //   props: "",
    //   placeholder: "",
    // },
    // {
    //   label: "STN Number",
    //   name: "stnNumber",
    //   value: "",
    //   type: "number",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Upload Vendor STN",
    //   name: "stn",
    //   value: "",
    //   type: "file",
    //   props: "",
    //   placeholder: "",
    // },
    // {
    //   label: "Bank Account No.",
    //   name: "accounctNumber",
    //   value: "",
    //   type: "number",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Bank Name",
    //   name: "bankName",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "IFSC Code",
    //   name: "ifscCode",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Bank Address",
    //   name: "bankAddress",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Financial Turnover",
    //   name: "financialTurnover",
    //   value: "",
    //   type: "number",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Cheque File (Attachment)",
    //   name: "cheque",
    //   value: "",
    //   type: "file",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Other Information",
    //   name: "otherInfo",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
  ];

  let TechnicalEvaluation = [
    {
      type: "heading",
      label: "Technical Evaluation",
      classes: "col-span-4 font-extrabold text-black-900 text-start",
    },
    // {
    //   label: "Team Capacity",
    //   name: "teamCapacity",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: true,
    //   placeholder: "",
    // },
    // {
    //   label: "Working Circle's",
    //   name: "workingCircle",
    //   value: "",
    //   type: "select",
    //   placeholder: "",
    // },

    // {
    //   label: "Tecnology",
    //   name: "technology",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   placeholder: "",
    // },

    // {
    //   label: "CBT HR Certified (Y/N)",
    //   name: "cbt",
    //   value: "",
    //   type: "select",
    //   props: "",
    //   option: [
    //     { label: "Yes", value: "Yes" },
    //     { label: "No", value: "No" },
    //   ],
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Certificate Attachment",
    //   name: "cbtCertificate",
    //   value: "",
    //   type: "file",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Form Tociii",
    //   name: "formToci",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Certificate Attachment",
    //   name: "tociCertificate",
    //   value: "",
    //   type: "file",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
  ];

  


  let CommercialEvaluation = [
    {
      type: "heading",
      label: "Commercial Evaluation",
      classes: "col-span-4 font-extrabold text-black-900 text-start",
    },
    // {
    //   label: "Vendor Code",
    //   name: "vendorCode",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: true,
    //   placeholder: "",
    // },
    // {
    //   label: "Date of Registration",
    //   name: "datetime",
    //   value: "",
    //   type: "datetime",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Validity Upto",
    //   name: "datetime",
    //   value: "",
    //   type: "datetime",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Contract Copy",
    //   name: "contractCopy",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Payment Terms (Days)",
    //   name: "paymentTerms",
    //   value: "",
    //   type: "number",
    //   props: "",
    //   placeholder: "",
    // },
  ];

  // let EmployeeProfile = [
  //   {
  //     type: "heading",
  //     label: "Vendor Profile",
  //     classes: "col-span-4 font-extrabold text-black-900 text-start",
  //   },
  //   {
  //     label: "Role",
  //     name: "role",
  //     value: "",
  //     type: "select",
  //     option: roleList,
  //     // required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "PMIS Profile",
  //     name: "userRole",
  //     value: "",
  //     type: "select",
  //     option: roleList,
  //     // required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Reporting Manager",
  //     name: "reportingManager",
  //     value: "",
  //     type: "select",
  //     required: false,
  //     props: {},
  //     option: employeeList,
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "L1 Approver ",
  //     name: "L1Approver",
  //     value: "",
  //     type: "select",
  //     required: false,
  //     props: {},
  //     option: employeeList,
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "L2 Aprrover",
  //     name: "L2Approver",
  //     value: "",
  //     type: "select",
  //     required: false,
  //     option: employeeList,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Finance Approver",
  //     name: "financeApprover",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "HR Manager",
  //     name: "reportingHrManager",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Asset Manager",
  //     name: "assetManager",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "L1 Vendor",
  //     name: "L1Vendor",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "L2 Vendor",
  //     name: "L2Vendor",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Compliance",
  //     name: "compliance",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "L1 Compliance",
  //     name: "L1Compliance",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "L2 Compliance",
  //     name: "L2Compliance",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "HR Manager",
  //     name: "reportingHrManager",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "L1 Commercial",
  //     name: "L1Commercial",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "L1 Sales",
  //     name: "L1Sales",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "L2 Sales",
  //     name: "L2Sales",
  //     value: "",
  //     type: "select",
  //     option: employeeList,
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Status",
  //     name: "status",
  //     value: "",
  //     type: "select",
  //     required: false,
  //     props: {},
  //     option: [
  //       { label: "Active", value: "Active" },
  //       { label: "Inactive", value: "Inactive" },
  //       { label: "Blacklisted", value: "Blacklisted" },
  //     ],
  //     classes: "col-span-1",
  //   },
  //   {
  //     label: "Password",
  //     name: "password",
  //     value: "",
  //     type: "password",
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   },
  // ];

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   reset,
  //   getValues,
  //   formState: { errors },
  // } = useForm();

  const onTableViewGenerateSubmit = (data) => {
    console.log(data, "dsadasdsadsadsadas");
    if (empuid) {
      dispatch(
        VendorActions.postManageVendorDetails(
          false,
          data,
          () => {
            // showLevel((prev) => prev + 1);
            alert("Data submitted successfully!");
            navigate("/vendor/managePartner");
          },
          empuid
        )
      );
    } else {
      dispatch(
        VendorActions.postManageVendorDetails(false, data, () => {
          // showLevel((prev) => prev + 1);
          alert("Data submitted successfully!");
            navigate("/vendor/managePartner");
        })
      );
    }
    reset({});
  };

  // const onSelect = (selectedList, selectedItem) => {
  //   console.log(selectedList, selectedItem, "datadata")
  //   // dispatch(AuthActions.signIn(data, () => {
  //   //     navigate('/authenticate')
  //   // }))
  // }

  // const onRemove = (selectedList, removedItem) => {
  //   console.log(selectedList, removedItem, "datadata")
  //   // dispatch(AuthActions.signIn(data, () => {
  //   //     navigate('/authenticate')
  //   // }))
  // }

  useEffect(() => {
    dispatch(AdminActions.getManageDepartment());
    dispatch(AdminActions.getManageDesignation());
    dispatch(AdminActions.getManageProfile());
    dispatch(AdminActions.getManageCircle());
    dispatch(AdminActions.getState());
    if (empuid) {
      dispatch(GET_EMPLOYEE_DETAILS({ dataAll: [], reset: false }));
      dispatch(HrActions.getManageVendorDetails(false));
      setOneLoad(false);
    } else {
      // alert("dsadsadas")

      // if (setOneLoad) {
      // reset({});
      [
        ...PersonalInformation,
        ...FinancialEvaluation,
        ...TechnicalEvaluation,
        ...CommercialEvaluation,
        // ...EmployeeProfile,
      ].map((itss) => {
        console.log("dsadsadsadsadsadsadsadsadsadsadsadsa", itss);

        setValue(itss.name, itss.value);
      });
      // }
    }

    // dispatch(AdminActions.getCities(setStateName));
  }, [empuid]);

  return (
    <>
      <div className=" w-full h-full">
        <button
          onClick={() => {
            navigate("/vendor/managePartner");
            setOneLoad(false);
          }}
          className="mt-2 w-auto flex ml-auto mr-2 rounded-md px-10 py-1 bg-[#13b497]  hover:text-white hover:border-white hover:border-[1.5px] text-txt-neavy text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
        >
          Back
        </button>
        <div className="">
          {/* <UiTopBar /> */}
          <div className="w-full mt-2 bg-[#3e454d]">
            <div class="grid grid-cols-12 gap-2 m-2 bg-gray-800 border-[1.5px]  rounded-lg">
              <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-1">
                  {level >= 1 ? (
                    <CommonForm
                      classes={
                        "grid-cols-4 gap-4 w-full bg-[#3e454d] p-4 rounded-lg"
                      }
                      errors={errors}
                      Form={PersonalInformation}
                      register={register}
                      setValue={setValue}
                      getValues={getValues}
                    />
                  ) : (
                    <></>
                  )}
                    

                  {/* {level >= 2 ? (
                    <CommonForm
                      classes={
                        "grid-cols-4 gap-4 w-full bg-[#e7ebef] p-4 mt-2 rounded-lg"
                      }
                      errors={errors}
                      Form={FinancialEvaluation}
                      register={register}
                      setValue={setValue}
                      getValues={getValues}
                    />
                  ) : (
                    <></>
                  )} */}
                  {/* <CommonForm classes={"grid-cols-2 gap-4 w-full"} errors={errors} Form={TechnicalEvaluation}
                  register={register} setValue={setValue} getValues={getValues} />  */}
                  
                  
                  
                  {/* {level >= 3 ? (<CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#e7ebef] p-4 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={TechnicalEvaluation}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />) : (
                    <></>
                  )} */}
                  {/* {level >= 4 ? (<CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#e7ebef] p-4 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={CommercialEvaluation}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />) : (
                    <></>
                  )} */}
                  {/* <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#e7ebef] p-4 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={EmployeeProfile}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  /> */}
                  {/* <CommonForm classes={"grid-cols-2 gap-4 w-full mt-2"} errors={errors} Form={conDet}
                  register={register} setValue={setValue} getValues={getValues} /> */}
                </div>
                {/* <div class="grid h-96 grid-cols-1 gap-2 bg-white">
                <div className='col-span-1 h-full  pt-0 overflow-scroll relative border-primaryLine border'>


                  <div className='flex flex-col justify-between p-2'>
                    <div class="overflow-scroll">

                      {conditioncountform.map((val, index) => {
                        return <>
                          <CommonForm classes={"grid-cols-1 md:grid-cols-2 lg:gap-8 w-full"} errors={errors} Form={conditionmultiForm.map((itm) => {
                            return {
                              ...itm,
                              type: itm.name == "formovalue" ? nestfilter["wherecondition" + "_" + val + "_form"] == "joins" ? "muitiSelect" : "text" : itm.type,
                              props: itm.label == "Select Column" || (itm.label == "Value" && nestfilter["wherecondition" + "_" + val + "_form"] == "joins") ? {
                                ...itm.props, onSelect: (a, b) => {
                                  console.log("gamecall", a, b, "column" + "_" + val + "_form")
                                  setValue(itm.label == "Select Column" ? "wherecolumn" + "_" + val + "_form" : "formovalue" + "_" + val + "_form", b.category + "smartGame" + b.name)
                                }
                              } : { ...itm.props },
                              option: itm.label == "Expression" ? all_command_type_wise[nestfilter["wherecondition" + "_" + val + "_form"]] : itm.option,
                              name: itm.name + "_" + val + "_form"
                            }
                          })}
                            register={register} setValue={setValue} getValues={getValues} />
                        </>
                      })}
                    </div>
                  </div>

                  <div className='flex w-full top  relative justify-between bg-primaryLine  p-2 pt-0'>
                    <h1 className='text-white'>
                      <p className="mt-2">
                        Upload Document
                      </p>
                    </h1>
                    <button onClick={() => {
                      let finval = 0
                      setconditioncountform((prev) => {
                        let val = [...prev]
                        let sval = val.pop()
                        if (isNaN(sval)) {
                          finval = 1
                        } else {
                          finval = sval + 1
                        }
                        console.log(finval, "finval", val, prev)
                        return [...prev, finval]
                      })
                      setnestfilter(newprev => ({
                        ...newprev,
                        ["wherecondition" + "_" + finval + "_form"]: "blank"
                      }));
                    }}
                      className='bg-pbutton text-white rounded-full mt-2'>
                      <Unicons.UilPlus size="24" />
                    </button>
                  </div>
                </div>
              </div> */}

                {/* {
                UserLyp != "" && <CommonForm classes={"grid-cols-1 lg:grid-cols-2 lg:gap-8 w-full pt-4"} errors={errors} Form={contype}
                  register={register} setValue={setValue} getValues={getValues} />
              } */}
                <div className="flex gap-10 mb-3 justify-center">
                  <button
                    onClick={() => {
                      navigate("/vendor/managePartner");
                    }}
                   className="mt-6 w-auto justify-center rounded-md px-10 py-1  bg-[#13b497] hover:bg-violet-100 hover:text-[#13b497] hover:font-extrabold hover:border-black hover:border-2 text-white text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit(onTableViewGenerateSubmit)}
                    className="mt-6 w-auto justify-center rounded-md bg-[#13b497] hover:bg-violet-100 hover:text-[#13b497] hover:font-extrabold hover:border-black hover:border-2 px-10 py-1 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageVendorForm;
