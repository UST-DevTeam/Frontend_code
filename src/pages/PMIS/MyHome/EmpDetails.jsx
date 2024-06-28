import React, { useEffect, useState } from "react";
import "react-querybuilder/dist/query-builder.css";
import QueryBuilder from "react-querybuilder";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommonForm from "../../../components/CommonForm";
import Button from "../../../components/Button";
import AdminActions from "../../../store/actions/admin-actions";
import HrActions from "../../../store/actions/hr-actions";
import * as Unicons from "@iconscout/react-unicons";
import UiTopBar from "../../../components/UiTopBar";
import SweetAlerts from "../../../components/SweetAlerts";
import {
  UilFacebookF,
  UilTwitter,
  UilGoogle,
  UilLinkedin,
  UilLinkAlt,
  UilEdit,
  UilSave,
} from "@iconscout/react-unicons";
import { GET_EMPLOYEE_DETAILS } from "../../../store/reducers/hr-reduces";

const EmpDetails = (props) => {
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
  const [oneLoad, setOneLoad] = useState({});
  const [dataQuery, SetdataQuery] = useState("Select * from values;");
  const [filtering, setFiltering] = useState("Select * from values;");
  const navigate = useNavigate();
  const [showPassportNumber, setshowPassportNumber] = useState(false);

  const getManageEmpDetails = useSelector((state) => {
    let data = state.hrReducer.getManageEmpDetails;

    console.log(data, "datadatadatadatadatadatadata");
    if (data.length > 0 && oneLoad != data[0]) {
      setOneLoad(data[0]);

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

  const [isSame, setisSame] = useState(false);
  const [presentAddress, setPresentAddress] = useState({
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });

  const [permanentAddress, setPermanentAddress] = useState({
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });
  const handleCheckboxChange = (e) => {
    setisSame(e.target.checked);
    if (e.target.checked === true) {
      // Autofill permanent address from present address
      setPermanentAddress({ ...presentAddress });
    } else {
      // Clear permanent address fields
      setPermanentAddress({
        country: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
      });
    }
  };
  const handlePresentAddressChange = (e) => {
    const { name, value } = e.target.value;
    setPresentAddress({
      ...presentAddress,
      [name]: value,
    });
  };

  let departmentList = useSelector((state) => {
    return state?.adminData?.getManageDepartment.map((itm) => {
      return {
        label: itm?.department,
        value: itm?.uniqueId,
      };
    });
  });

  let designationList = useSelector((state) => {
    return state?.adminData?.getManageDesignation.map((itm) => {
      return {
        label: itm?.designation,
        value: itm?.uniqueId,
      };
    });
  });
  console.log(designationList,"")

  let roleList = useSelector((state) => {
    return state?.adminData?.getManageProfile.map((itm) => {
      return {
        label: itm?.roleName,
        value: itm?.uniqueId,
      };
    });
  });

  // let employeeList = [reportingManager,L2expManager,financeApproverList,reportingHrManager],

  let employeeList = useSelector((state) => {
    return state?.hrReducer?.getManageEmpDetails.map((itm) => {
      return {
        label: itm?.empName + " " + itm.empCode,
        value: itm.uniqueId,
      };
    });
  });

  let allEmployeeList = useSelector((state) => {
    return state?.hrReducer?.getHRAllEmployee.map((itm) => {
      return {
        label: itm?.empName,
        value: itm.uniqueId,
      };
    });
  });

  let allHrList = useSelector((state) => {
    return state?.hrReducer?.getHRManagerInEmployee.map((itm) => {
      return {
        label: itm?.empName,
        value: itm.uniqueId,
      };
    });
  });

  let circleList = useSelector((state) => {
    return state?.adminData?.getManageCircle.map((itm) => {
      return {
        label: itm?.circleName,
        value: itm.uniqueId,
      };
    });
  });

  let stateList = useSelector((state) => {
    return state?.adminData?.getState.map((itm) => {
      return {
        label: itm?.name,
        value: itm?.state_code,
      };
    });
  });

  let cityList = useSelector((state) => {
    return state?.adminData?.getCities.map((itm) => {
      return {
        label: itm?.name,
        value: itm?.name,
        stateCode: itm?.state_code,
      };
    });
  });

  //   const handleStateChange = (state) => {
  //     const getCities = cityList.filter(city => city.stateCode === state);
  //     setCityOptions(Cities);
  // }

  // let sqlQuerData = useSelector((state) => {
  //   return state?.customQuery?.generatedSqlQuery
  // })

  // let getUserRole = useSelector((state) => {
  //   return state?.auth?.generatedSqlQuery
  // })

  // let userRole = useSelector((state) => {
  //   return state?.auth?.user?.roleName
  // })

  // let Form = [
  //   // {
  //   //   label: "Select Server",
  //   //   value: "",
  //   //   option: databaseList,
  //   //   type: "select",
  //   //   name: "ServerSelection",
  //   //   required: false,
  //   //   props: {
  //   //     onChange: ((e) => {
  //   //       setOneLoad(false)
  //   //       setupManagingFilter([])
  //   //       setManagingFilter([])
  //   //       setValue("dboSelection", "Select")
  //   //       dispatch(TABLES_LIST({}))
  //   //       // dispatch(CustomQueryActions.resetTablesList())
  //   //       dispatch(CustomQueryActions.getdboList(false, e.target.value, () => { }))
  //   //     }),
  //   //   },
  //   //   classes: "col-span-1"
  //   // }, {
  //   //   label: "Select Schema",
  //   //   value: "",
  //   //   option: dboList,
  //   //   type: "select",
  //   //   name: "dboSelection",
  //   //   required: false,
  //   //   props: {
  //   //     onChange: ((e) => {
  //   //       setOneLoad(false)
  //   //       setupManagingFilter([])
  //   //       setManagingFilter([])
  //   //       // dispatch(CustomQueryActions.resetTablesList())
  //   //       dispatch(CustomQueryActions.getTablesList(false, e.target.value, () => { }))
  //   //     }),
  //   //   },
  //   //   classes: "col-span-1"
  //   // }
  // ]

  // let searchForm = [
  //   {
  //     label: "Table Name",
  //     name: "searchTablename",
  //     value: "",
  //     type: "text",
  //     props: {
  //       onChange: ((e) => {
  //         // console.log(managingFilter, "managingFilter dataValuedataValue")
  //         let dtew = managingFilter.filter(itm => itm.name.toLowerCase().includes(e.target.value.toLowerCase()))
  //         setupManagingFilter(dtew)
  //         // console.log(dtew, "dtew dataValuedataValue")
  //         // console.log(dataValue, "dataValuedataValue")
  //       }),
  //     },
  //     classes: " col-span-1"
  //   },
  // ]
  // let ordermultiForm = [
  //   {
  //     label: "Select Column",
  //     value: "",
  //     singleSelect: false,
  //     option: tableList?.d2,
  //     name: "order" + "column",
  //     type: "muitiSelect",
  //     onChanging: ((e) => {
  //     }),
  //     props: {
  //       onSelect: (e, a, b, c) => { console.log({ e, a, b, c }) }
  //     },
  //     classes: "col-span-1  "
  //   },
  //   {
  //     label: "Condition",
  //     value: "",
  //     name: "order" + "condition",
  //     option: all_command_type,
  //     type: "select",
  //     required: false,
  //     props: {
  //       onChange: ((e) => {
  //         // console.log(e.target.name, "e geeter")
  //         let tar = e.target.name
  //         let val = e.target.value
  //         setonestfilter(prev => ({
  //           ...prev,
  //           [tar]: val
  //         }));
  //       }),
  //     },
  //     classes: "col-span-1"
  //   },
  //   {
  //     label: "Expression",
  //     value: "",
  //     option: [],
  //     type: "select",
  //     name: "order" + "expression",
  //     required: false,
  //     onChanging: ((e) => {
  //       // setOneLoad(false)
  //       // dispatch(CustomQueryActions.getTablesList(e.target.value, () => { }))
  //     }),
  //     props: {
  //     },
  //     classes: "col-span-1"
  //   },
  //   {
  //     label: "Value",
  //     value: "",
  //     type: "hidden",
  //     name: "order" + "formovalue",
  //     singleSelect: false,
  //     option: tableList?.d2,
  //     props: {
  //       onSelect: (e, a, b, c) => { console.log({ e, a, b, c }) }
  //     },
  //     classes: "col-span-1"
  //   }
  // ]

  // let contype = [
  //   {
  //     label: UserLyp != "Investor" ? UserLyp + " Name" : " Name",
  //     value: "text",
  //     type: UserLyp != "Investor" ? "text" : "hidden",
  //     name: "cmpName",
  //     required: false,
  //     classes: UserLyp != "Investor" ? "col-span-1" : "",

  //   },
  //   {
  //     label: UserLyp != "Investor" ? UserLyp + " Reg. No." : "Id No.",
  //     value: "text",
  //     type: "text",
  //     name: "RegNo",
  //     required: false,
  //     classes: "col-span-1",

  //   },
  //   {
  //     label: UserLyp != "Investor" ? UserLyp + " Address" : "Address",
  //     value: "text",
  //     type: "textarea",
  //     name: "cAddress",
  //     required: false,
  //     classes: "col-span-1",

  //   },
  // ]

  // let optionsList = {
  //   "Investor": [{
  //     "label": "Company",
  //     "value": "Company"
  //   }, {
  //     "label": "Individual",
  //     "value": "Individual"
  //   }, {
  //     "label": "Government Entity ",
  //     "value": "Government Entity"
  //   }],
  //   "Fund Seeker": [{
  //     "label": "Company",
  //     "value": "Company"
  //   }, {
  //     "label": "Individual",
  //     "value": "Individual"
  //   }],

  //   "Charitable Organisation": [{
  //     "label": "Company",
  //     "value": "Company"
  //   }]
  // }

  // let conDet = [
  //   // {
  //   //   label: "Reg Type",
  //   //   value: "",
  //   //   option: optionsList[userRole] || [],
  //   //   type: "select",
  //   //   name: "regType",
  //   //   required: false,
  //   //   props: {
  //   //     onChange: ((e) => {
  //   //       seteUserLyp(e.target.value)
  //   //     })
  //   //   },
  //   //   classes: "col-span-1"
  //   // }
  // ]

  // let conditionmultiForm = [
  //   // {
  //   // type:'heading',
  //   // label:"Identification Documents",
  //   // classes: "col-span-1 text-black-900 text-center",
  //   //   },
  //   {
  //     label: "File ",
  //     value: "",
  //     name: "file",
  //     type: "file",
  //     onChanging: ((e) => {

  //     }),
  //     props: {
  //       onSelect: (e, a, b, c) => { console.log({ e, a, b, c }) }
  //     },
  //     require: false,
  //     classes: "col-span-1"
  //   },
  //   {
  //     label: "Document Type",
  //     value: "",
  //     name: "document",
  //     //   option: kyc_doc_type,
  //     type: "select",
  //     required: false,
  //     props: {
  //       onChange: ((e) => {
  //         // console.log(e.target.name, "e geeter")
  //         let tar = e.target.name
  //         let val = e.target.value
  //         setnestfilter(prev => ({
  //           ...prev,
  //           [tar]: val
  //         }));
  //         // nestfilter[e.target.name]= e.target.value
  //         // setOneLoad(false)
  //         // dispatch(CustomQueryActions.getTablesList(e.target.value, () => { }))
  //       }),
  //     },
  //     classes: "col-span-1"
  //   },
  //   { label: "Doc. Number", name: "docNumber", value: "", type: "number", props: "", required: false, placeholder: "" },
  //   { label: "Doc. Expire", name: "docExpire", type: "datetime", formattype: "date", format: "yyyy-MM-dd", formatop: "yyyy-MM-DD", required: false, classes: "z-100" },

  // ]

  // const [presentAddress, setPresentAddress] = useState({
  //   country: '',
  //   state: '',
  //   city: '',
  //   pincode: '',
  //   address: ''
  // });

  // const [permanentAddress, setPermanentAddress] = useState({
  //   country: '',
  //   state: '',
  //   city: '',
  //   pincode: '',
  //   address: ''
  // });

  let PersonalInformation = [
    {
      type: "heading",
      label: "Employee Details",
      classes: "col-span-4 font-extrabold text-[#13b497] text-start",
    },
    {
      label: "Title",
      name: "title",
      value: "",
      type: "select",
      props: {},
      required: false,
      placeholder: "",
      option: [
        { label: "Mr.", value: "Mr" },
        { label: "Mrs.", value: "Mrs" },
        { label: "Ms.", value: "Ms" },

        // {"label": "Miss", "value": "Miss"},
        // {"label": "Sir", "value": "Sir"},
        // {"label": "Madam", "value": "Madam"},
      ],
    },
    {
      label: "Employee Name",
      name: "empName",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Employee Code",
      name: "empCode",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },    
    {
      label: "UST Emp Code",
      name: "ustCode",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Father's Name",
      name: "fatherName",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Mother's Name",
      name: "motherName",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Marital Status",
      name: "martialStatus",
      value: "",
      type: "select",
      props: "",
      required: false,
      option: [
        { label: "Married", value: "married" },
        { label: "Single", value: "single" },
      ],
    },
    {
      label: "Official Email-ID",
      name: "email",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Personal Email-ID",
      name: "personalEmailId",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Date Of Birth(as Per doc)",
      name: "dob",
      type: "datetime",
      value: "",
      props: "",
      required: false,
    },
    // { label: "Anniversay Date", name: "anniversaryDate", type: "datetime", required: false },
    {
      label: "Contact Number",
      name: "mobile",
      value: "",
      type: "number",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Blood Group",
      name: "blood",
      value: "",
      type: "select",
      props: {},
      required: false,
      option: [
        { label: "A+", value: "A+" },
        { label: "A-", value: "A-" },
        { label: "B+", value: "B+" },
        { label: "B-", value: "B-" },
        { label: "AB+", value: "AB+" },
        { label: "AB-", value: "AB-" },
        { label: "O+", value: "O+" },
        { label: "O-", value: "O-" },
      ],
    },
  ];

  let ContactInformation = [
    {
      type: "heading",
      label: "Present Address",
      classes: "col-span-4 font-extrabold text-[#13b497] text-start",
    },
    {
      label: "Country",
      name: "country",
      value: presentAddress.country,
      type: "select",
      props: "",
      required: false,
      placeholder: "",
      option: [{ label: "India", value: "India" }],
      onChange: handlePresentAddressChange,
    },
    {
      label: "State",
      name: "state",
      value: presentAddress.state,
      type: "select",
      placeholder: "",
      option: stateList,
      props: {
        onChange: (e) => {
          setValue("state", e.target.value);
          dispatch(
            AdminActions.getCities(false, `stateCode=${e.target.value}`)
          );
        },
      },
    },
    {
      label: "city",
      name: "city",
      value: presentAddress.city,
      type: "select",
      props: "",
      placeholder: "",
      option: cityList,
      onChange: handlePresentAddressChange,
    },
    {
      label: "PinCode",
      name: "pincode",
      value: presentAddress.pincode,
      type: "text",
      props: "",
      required: false,
      placeholder: "",
      onChange: handlePresentAddressChange,
    },
    {
      label: "Address",
      name: "address",
      value: presentAddress.address,
      type: "textarea",
      props: "",
      required: false,
      placeholder: "",
      onChange: handlePresentAddressChange,
    },

    // {
    //   label: "Social Media",
    //   name: "socialMedia",
    //   value: "",
    //   type: "select",
    //   props: {
    //     onChange: (e) => {
    //       setshowSocialMediaOther(e.target.value === "Other");
    //     },
    //   },
    //   required: false,
    //   option: [
    //     { label: "Facebook", value: "Facebook" },
    //     { label: "Instagram", value: "Instagram" },
    //     { label: "Pinterest", value: "Pinterest" },
    //     { label: "X", value: "X" },
    //     { label: "Other", value: "Other" },
    //   ],
    // },
  ];
  // if (showSocialMediaOther) {
  //   ContactInformation.push({
  //     label: "Please Specify Social Media Type",
  //     name: "otherSocialMediaType",
  //     value: "",
  //     type: "text",
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   });
  // }

  let ContactInformation2 = [
    {
      type: "checkbox",
      name: "fillAddress",

      props: {
        onChange: (e) => {
          handleCheckboxChange(e);
        },
      },
      option: [
        {
          type: "checkbox",
          name: "fillAddress",
          label: "Same As Present Address",
          checked: presentAddress === permanentAddress,
          onChange: (e) => {
            handleCheckboxChange(e);
          },
        },
      ],
      classes: "col-span-4 font-bold text-[#13b497] text-start mb-[-25px]",
    },
  ];

  let datew = [
    {
      type: "heading",
      label: "Permanent Address",
      classes: "col-span-4 font-extrabold text-[#13b497] text-start",
    },
    {
      label: "Country",
      name: "pcountry",
      value: permanentAddress.country,
      type: "select",
      props: "",
      required: false,
      placeholder: "",
      option: [{ label: "India", value: "India" }],
    },
    {
      label: "State",
      name: "pstate",
      value: permanentAddress.state,
      type: "select",
      placeholder: "",
      option: stateList,
      props: {
        onChange: (e) => {
          console.log(e.target.value, "e_geeter");

          setValue("state1", e.target.value);

          dispatch(
            AdminActions.getCities(false, `stateCode=${e.target.value}`)
          );
          // setStateName(e.target.value)
        },
      },
    },

    {
      label: "city",
      name: "pcity",
      value: permanentAddress.city,
      type: "select",
      props: "",
      placeholder: "",
      option: cityList,
    },

    {
      label: "PinCode",
      name: "ppincode",
      value: permanentAddress.pincode,
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Address",
      name: "paddress",
      value: permanentAddress.address,
      type: "textarea",
      props: "",
      required: false,
      placeholder: "",
    },

    // {
    //   label: "Social Media", name: "socialMedia", value: "", type: "select", props: {
    //     onChange: (e) => {
    //       setshowSocialMediaOther(e.target.value === "Other");
    //     },
    //   }, required: false, option: [
    //     { "label": "Facebook", "value": "Facebook" },
    //     { "label": "Instagram", "value": "Instagram" },
    //     { "label": "Pinterest", "value": "Pinterest" },
    //     { "label": "X", "value": "X" },
    //     { "label": "Other", "value": "Other" },
    //   ],
    // },
  ];
  // if (showSocialMediaOther) {
  //   ContactInformation.push({
  //     label: "Please Specify Social Media Type",
  //     name: "otherSocialMediaType",
  //     value: "",
  //     type: "text",
  //     required: false,
  //     props: {},
  //     classes: "col-span-1",
  //   });
  // }

  let EmploymentDetails = [
    {
      type: "heading",
      label: "Employment Details",
      classes: "col-span-4 font-extrabold text-[#13b497] text-start",
    },
    {
      label: "PAN Number",
      name: "panNumber",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Aadhar Number",
      name: "adharNumber",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Circle",
      name: "circle",
      value: "",
      type: "select",
      option: circleList,
      props: "",
      placeholder: "",
    },
    {
      label: "Experience",
      name: "experience",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Salary Currency",
      name: "salaryCurrency",
      value: "",
      type: "select",
      props: "",
      required: false,
      placeholder: "",
      option: [
        { label: "INR", value: "INR" },
        { label: "USD", value: "USD" },
      ],
    },
    {
      label: "Monthly Salary",
      name: "monthlySalary",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Gross CTC",
      name: "grossCtc",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    // {label:"Official Email ID", name:"email", value:'', type:'text', props:'',required:false, placeholder:""},
    // {label:"Mobile No.", name:"mobile", value:'', type:'number', props:'',required:false, placeholder:""},
    {
      label: "Joining Date",
      name: "joiningDate",
      value: "",
      type: "datetime",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Last Working Day",
      name: "lastWorkingDay",
      value: "",
      type: "datetime",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Passport",
      name: "passport",
      value: "",
      type: "select",
      required: false,
      placeholder: "",
      option: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      props: {
        onChange: (e) => {
          setshowPassportNumber(e.target.value === "Yes");
        },
      },
    },
  ];

  if (showPassportNumber) {
    EmploymentDetails.push({
      label: "Passport Number",
      name: "passportNumber",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    });
  }
  EmploymentDetails.push(
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
      label: "Bank Account Number",
      name: "accountNumber",
      value: "",
      type: "number",
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
      label: "Benificiary Name",
      name: "benificiaryname",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    }
  );

  let EmployeeProfile = [
    {
      type: "heading",
      label: "Employee Profile",
      classes: "col-span-4 font-extrabold text-[#13b497] text-start",
    },
    {
      label: "Organization Level",
      name: "orgLevel",
      value: "",
      type: "text",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Designation",
      name: "designation",
      value: "",
      type: "select",
      required: false,
      option: designationList,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Role",
      name: "role",
      value: "",
      type: "select",
      option: roleList,
      // required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "PMIS Profile",
      name: "userRole",
      value: "",
      type: "select",
      option: roleList,
      // required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Band",
      name: "band",
      value: "",
      type: "text",
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Department",
      name: "department",
      value: "",
      type: "select",
      required: false,
      props: {},
      option: departmentList,
      // option: [
      //   { "label": "Accounts", "value": "Accounts" },
      //   { "label": "HR", "value": "HR" },
      //   { "label": "operations", "value": "operations" },
      //   { "label": "Management", "value": "Management" },
      // ],
      classes: "col-span-1",
    },
    {
      label: "Reporting Manager",
      name: "reportingManager",
      value: "",
      type: "select",
      required: false,
      props: {},
      option: allEmployeeList,
      classes: "col-span-1",
    },
    {
      label: "L1 Approver ",
      name: "L1Approver",
      value: "",
      type: "select",
      required: false,
      props: {},
      option: allEmployeeList,
      classes: "col-span-1",
    },
    {
      label: "L2 Aprrover",
      name: "L2Approver",
      value: "",
      type: "select",
      required: false,
      option: allEmployeeList,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Finance Approver",
      name: "financeApprover",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "HR Manager",
      name: "reportingHrManager",
      value: "",
      type: "select",
      option: allHrList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Asset Manager",
      name: "assetManager",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Vendor",
      name: "L1Vendor",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L2 Vendor",
      name: "L2Vendor",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Compliance",
      name: "compliance",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Compliance",
      name: "L1Compliance",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L2 Compliance",
      name: "L2Compliance",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Commercial",
      name: "L1Commercial",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L1 Sales",
      name: "L1Sales",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "L2 Sales",
      name: "L2Sales",
      value: "",
      type: "select",
      option: allEmployeeList,
      required: false,
      props: {},
      classes: "col-span-1",
    },
    {
      label: "Status",
      name: "status",
      value: "",
      type: "select",
      required: false,
      props: {},
      option: [
        { label: "Active", value: "Active" },
        { label: "Resign", value: "Resign" },
        { label: "Abscond", value: "Abscond" },
        { label: "Exit", value: "Exit" },
      ],
      classes: "col-span-1",
    },
    {
      label: "Password",
      name: "password",
      value: "",
      type: "text",
      required: false,
      props: {},
      classes: "col-span-1",
    },
  ];

  let SupportingDoc = [
    {
      type: "heading",
      label: "Supporting Document",
      classes: "col-span-4 font-extrabold text-[#13b497] text-start",
    },
    {
      label: "Photo",
      name: "img",
      value: "",
      type: "file",
      required: false,
      props: {
        accept: "image/*",
      },
      classes: "col-span-1",
    },
    {
      label: "CV",
      name: "cv",
      value: "",
      type: "file",
      required: false,
      props: {
        accept: ".pdf,.doc,.docx",
      },
      classes: "col-span-1",
    },
    {
      label: "All Other Documents",
      name: "zip",
      value: "",
      type: "file",
      required: false,
      props: {
        accept: ".zip,.rar,.bin",
      },
      classes: "col-span-1",
    },
  ];

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

    data["samePerAdd"] = isSame;
    if (isSame) {
      data["paddress"] = data["address"];
      data["pstate"] = data["state"];
      data["ppincode"] = data["pincode"];
      data["pcountry"] = data["country"];
      data["pcity"] = data["city"];
    }
    if (empuid) {
      dispatch(
        HrActions.postManageEmpDetails(
          false,
          data,
          () => {
            alert("Data submitted successfully!");
            navigate("/hr/empDetailsTable");
          },
          empuid
        )
      );
    } else {
      dispatch(
        HrActions.postManageEmpDetails(false, data, () => {
          alert("Data submitted successfully!");
          navigate("/hr/empDetailsTable");
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
    dispatch(AdminActions.getCities());
    dispatch(HrActions.getHRAllEmployee());
    dispatch(HrActions.getHRManagerInEmployee());
    if (empuid) {
      dispatch(GET_EMPLOYEE_DETAILS({ dataAll: [], reset: false }));
      dispatch(HrActions.getManageEmpDetails(false, empuid));
      setOneLoad(false);
    } else {
      // alert("dsadsadas")

      // if (setOneLoad) {
      // reset({});
      [
        ...PersonalInformation,
        ...ContactInformation,
        ...ContactInformation2,
        ...EmploymentDetails,
        ...EmployeeProfile,
        ...SupportingDoc,
      ].map((itss) => {
        console.log("dsadsadsadsadsadsadsadsadsadsadsadsa", itss);

        setValue(itss.name, itss.value);
      });
      ``;
      // }
    }
  }, [empuid]);

  return (
    <>
      <div className=" w-full h-full">
        <button
          onClick={() => {
            navigate("/hr/empDetailsTable");
            setOneLoad(false);
          }}
          className="mt-2 w-auto flex ml-auto mr-2 rounded-md px-10 py-1 bg-[#13b497]  hover:text-white hover:border-white hover:border-[1.5px] text-txt-neavy text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
        >
          Back
        </button>
        <div className="">
          {/* <UiTopBar /> */}
          <div className="w-full mt-2 bg-[#3e454d]">
            <div class="grid grid-cols-12 gap-2 m-2 bg-gray-800 border-[1.5px] rounded-lg">
              <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-1">
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

                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] p-4 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={ContactInformation}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  {/* <CommonForm classes={"grid-cols-2 gap-4 w-full"} errors={errors} Form={ContactInformation2}
                  register={register} setValue={setValue} getValues={getValues} /> */}
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] p-2 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={
                      isSame
                        ? ContactInformation2
                        : [...ContactInformation2, ...datew]
                    }
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] p-4 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={EmploymentDetails}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] p-4 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={EmployeeProfile}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full bg-[#3e454d] p-4 mt-2 rounded-lg"
                    }
                    errors={errors}
                    Form={SupportingDoc}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
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
                      navigate("/hr/empDetailsTable");
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
export default EmpDetails;
