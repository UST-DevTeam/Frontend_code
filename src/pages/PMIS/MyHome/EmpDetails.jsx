import React, { useEffect, useState } from 'react';
import 'react-querybuilder/dist/query-builder.css'; // Import the library styles
import QueryBuilder from 'react-querybuilder';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CommonForm from '../../../components/CommonForm';
import Button from '../../../components/Button';
import AuthActions from '../../../store/actions/auth-actions';
import * as Unicons from '@iconscout/react-unicons';
import UiTopBar from '../../../components/UiTopBar';
import {UilFacebookF,UilTwitter,UilGoogle,UilLinkedin,UilLinkAlt,UilEdit,UilSave,} from "@iconscout/react-unicons";

const EmpDetails = () => {


  const dispatch = useDispatch()
  const { uid } = useParams();
  const [oneLoad, setOneLoad] = useState(false)
  const [UserLyp, seteUserLyp] = useState("")
  const [nestfilter, setnestfilter] = useState({})
  const [onestfilter, setonestfilter] = useState({})
  const [gopen, SetgOpen] = useState([])
  const [dataQuery, SetdataQuery] = useState("Select * from values;")
  const [filtering, setFiltering] = useState("Select * from values;")
  const [managingFilter, setManagingFilter] = useState([])
  const [upmanagingFilter, setupManagingFilter] = useState([])
  const [countform, setcountform] = useState([1])
  const [conditioncountform, setconditioncountform] = useState([])
  const [countformtwo, setcountformtwo] = useState([])
  const navigate = useNavigate()
  const [dataValue, setDataValue] = useState([])
  const [showSocialMediaOther, setshowSocialMediaOther] = useState(false);
  const [showOtherAddressProof, setshowOtherAddressProof] = useState(false);
  const [showBusinessRegistered, setshowBusinessRegistered] = useState(false);

  useSelector((state) => {
    console.log(state, "state")
  })


  // let sqlQuerData = useSelector((state) => {
  //   return state?.customQuery?.generatedSqlQuery
  // })

  // let getUserRole = useSelector((state) => {
  //   return state?.auth?.generatedSqlQuery
  // })

  // let userRole = useSelector((state) => {
  //   return state?.auth?.user?.roleName
  // })

  let Form = [
    // {
    //   label: "Select Server",
    //   value: "Select",
    //   option: databaseList,
    //   type: "select",
    //   name: "ServerSelection",
    //   required: false,
    //   props: {
    //     onChange: ((e) => {
    //       setOneLoad(true)
    //       setupManagingFilter([])
    //       setManagingFilter([])
    //       setValue("dboSelection", "Select")
    //       dispatch(TABLES_LIST({}))
    //       // dispatch(CustomQueryActions.resetTablesList())
    //       dispatch(CustomQueryActions.getdboList(true, e.target.value, () => { }))
    //     }),
    //   },
    //   classes: "col-span-1"
    // }, {
    //   label: "Select Schema",
    //   value: "Select",
    //   option: dboList,
    //   type: "select",
    //   name: "dboSelection",
    //   required: false,
    //   props: {
    //     onChange: ((e) => {
    //       setOneLoad(true)
    //       setupManagingFilter([])
    //       setManagingFilter([])
    //       // dispatch(CustomQueryActions.resetTablesList())
    //       dispatch(CustomQueryActions.getTablesList(true, e.target.value, () => { }))
    //     }),
    //   },
    //   classes: "col-span-1"
    // }
  ]
  let searchForm = [
    {
      label: "Table Name",
      name: "searchTablename",
      value: "",
      type: "text",
      props: {
        onChange: ((e) => {
          // console.log(managingFilter, "managingFilter dataValuedataValue")
          let dtew = managingFilter.filter(itm => itm.name.toLowerCase().includes(e.target.value.toLowerCase()))
          setupManagingFilter(dtew)
          // console.log(dtew, "dtew dataValuedataValue")
          // console.log(dataValue, "dataValuedataValue")
        }),
      },
      classes: " col-span-1"
    },
  ]
  // let ordermultiForm = [
  //   {
  //     label: "Select Column",
  //     value: "",
  //     singleSelect: true,
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
  //       // setOneLoad(true)
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
  //     singleSelect: true,
  //     option: tableList?.d2,
  //     props: {
  //       onSelect: (e, a, b, c) => { console.log({ e, a, b, c }) }
  //     },
  //     classes: "col-span-1"
  //   }
  // ]
  let contype = [
    {
      label: UserLyp != "Investor" ? UserLyp + " Name" : " Name",
      value: "text",
      type: UserLyp != "Investor" ? "text" : "hidden",
      name: "cmpName",
      required: false,
      classes: UserLyp != "Investor" ? "col-span-1" : "",

    },
    {
      label: UserLyp != "Investor" ? UserLyp + " Reg. No." : "Id No.",
      value: "text",
      type: "text",
      name: "RegNo",
      required: false,
      classes: "col-span-1",

    },
    {
      label: UserLyp != "Investor" ? UserLyp + " Address" : "Address",
      value: "text",
      type: "textarea",
      name: "cAddress",
      required: false,
      classes: "col-span-1",

    },
  ]
  let optionsList = {
    "Investor": [{
      "label": "Company",
      "value": "Company"
    }, {
      "label": "Individual",
      "value": "Individual"
    }, {
      "label": "Government Entity ",
      "value": "Government Entity"
    }],
    "Fund Seeker": [{
      "label": "Company",
      "value": "Company"
    }, {
      "label": "Individual",
      "value": "Individual"
    }],

    "Charitable Organisation": [{
      "label": "Company",
      "value": "Company"
    }]
  }
  let conDet = [
    // {
    //   label: "Reg Type",
    //   value: "Select",
    //   option: optionsList[userRole] || [],
    //   type: "select",
    //   name: "regType",
    //   required: false,
    //   props: {
    //     onChange: ((e) => {
    //       seteUserLyp(e.target.value)
    //     })
    //   },
    //   classes: "col-span-1"
    // }
  ]
  let conditionmultiForm = [
    // {
    // type:'heading',
    // label:"Identification Documents",
    // classes: "col-span-1 text-black-900 text-center",
    //   },
    {
      label: "File ",
      value: "",
      name: "file",
      type: "file",
      onChanging: ((e) => {

      }),
      props: {
        onSelect: (e, a, b, c) => { console.log({ e, a, b, c }) }
      },
      require: true,
      classes: "col-span-1"
    },
    {
      label: "Document Type",
      value: "",
      name: "document",
      //   option: kyc_doc_type,
      type: "select",
      required: false,
      props: {
        onChange: ((e) => {
          // console.log(e.target.name, "e geeter")
          let tar = e.target.name
          let val = e.target.value
          setnestfilter(prev => ({
            ...prev,
            [tar]: val
          }));
          // nestfilter[e.target.name]= e.target.value
          // setOneLoad(true)
          // dispatch(CustomQueryActions.getTablesList(e.target.value, () => { }))
        }),
      },
      classes: "col-span-1"
    },
    { label: "Doc. Number", name: "docNumber", value: "", type: "number", props: "", required: false, placeholder: "" },
    { label: "Doc. Expire", name: "docExpire", type: "datetime", formattype: "date", format: "yyyy-MM-dd", formatop: "yyyy-MM-DD", required: false, classes: "z-100" },

  ]


  let PersonalInformation = [{
    type: 'heading',
    label: "Employee Details",
    classes: "col-span-4 font-extrabold text-black-900 text-start"
  },
  {
    label: "Title", name: "title", value: "", type: "select", props: {}, required: true, placeholder: '', option: [
        {"label": "Mr.", "value": "Mr"},
        {"label": "Ms.", "value": "Ms"},
        {"label": "Mrs.", "value": "Mrs"},
        {"label": "Miss", "value": "Miss"},
        {"label": "Sir", "value": "Sir"},
        {"label": "Madam", "value": "Madam"},
        {"label": "Master", "value": "Master"},
    ]
  },
  { label: "Employee Name", name: "empName", value: "", type: "text", props: "", required: true, placeholder: "" },
  { label: "Father's Name", name: "fatherName", value: "", type: "text", props: "", required: false, placeholder: "" },
  { label: "mother's Name", name: "motherName", value: "", type: "text", props: "", required: false, placeholder: "" },
  {
    label: "Marital Status", name: "martialStatus", value: "", type: "select", props: "", required: false, option: [
      { "label": "Married", "value": "married" },
      { "label": "Single", "value": "single" },
    ],
  },
  { label: "Email-ID", name: "emailId", value: "", type: "text", props: "", required: false, placeholder: "" },
  { label: "Date Of Birth(as Per doc)", name: "dob", type: "datetime", formattype: "date", format: "dd-MM-yyyy", formatop: "dd-MM-yyyy", required: true, },
  { label: "Anniversay Date", name: "anniversaryDate", type: "datetime", formattype: "date", format: "dd-MM-yyyy", formatop: "dd-MM-yyyy", required: true },
  { label: "Contact Number", name: "mobile", value: "", type: "number", props: "", required: true, placeholder: "" },
  {
    label: "Blood Group", name: "blood", value: "", type: "select", props: {}, required: false, option: [
      { "label": "A+", "value": "A+" },
      { "label": "A-", "value": "A-" },
      { "label": "B+", "value": "B+" },
      { "label": "B-", "value": "B-" },
      { "label": "AB+", "value": "AB+" },
      { "label": "AB-", "value": "AB-" },
      { "label": "O+", "value": "O+" },
      { "label": "O-", "value": "O-" },

    ],
  },
    //   {label: "Martial Status", name: "martialStatus", value: "", type: "radio", props: {}, required: false, option: [
    //     { "label": "Male", "value": "Male" },
    //     { "label": "Female", "value": "Female" }]
    // },
    // {
    //   label: "Upload Residential Address",
    //   value: "",
    //   name: "file",
    //   type: "file",
    //   required: false,
    //   props: {},
    //   classes: "",
    //   multiple: false,
    // }
  ]


  let ContactInformation = [{
    type: 'heading',
    label: "Present Address",
    classes: "col-span-4 font-extrabold text-black-900 text-start",
  },
  {
    label: "Country", name: "country", value: "", type: "select", props: "", required: true, placeholder: "", option: [
      { "label": "India", "value": "india" }
    ]
  },
  {
    label: "State", name: "state", value: "", type: "select", props: "", required: true, placeholder: "", option: [{

    }]
  },
  { label: "city", name: "city", value: "", type: "select", props: "", required: true, placeholder: "" },

  {label:"PinCode", name:"pincode", value:'', type:'text', props:'',required:true, placeholder:""},
  {label:"Address", name:"address", value:'', type:'textarea',  props:'',required:true, placeholder:"",},
  
  {
    label: "Social Media", name: "socialMedia", value: "", type: "select", props: {
      onChange: (e) => {
        setshowSocialMediaOther(e.target.value === "Other");
      },
    }, required: false, option: [
      { "label": "Facebook", "value": "Facebook" },
      { "label": "Instagram", "value": "Instagram" },
      { "label": "Pinterest", "value": "Pinterest" },
      { "label": "X", "value": "X" },
      { "label": "Other", "value": "Other" },
    ],
  },
  ]
  if (showSocialMediaOther) {
    ContactInformation.push({
      label: "Please Specify Social Media Type",
      name: "otherSocialMediaType",
      value: "",
      type: "text",
      required: false,
      props: {},
      classes: "col-span-1",
    });
  }


  let ContactInformation2 = [{
    type: 'heading',
    label: "Permanent Address",
    classes: "col-span-4 font-extrabold text-black-900 text-start",
  },
  {
    label: "Country", name: "country", value: "", type: "select", props: "", required: true, placeholder: "", option: [
      { "label": "India", "value": "india" }
    ]
  },
  {
    label: "State", name: "state", value: "", type: "select", props: "", required: true, placeholder: "", option: [{

    }]
  },
  { label: "city", name: "city", value: "", type: "select", props: "", required: true, placeholder: "" },

  {label:"PinCode", name:"pincode", value:'', type:'text', props:'',required:true, placeholder:""},
  {label:"Address", name:"address", value:'', type:'textarea', props:'',required:true, placeholder:""},
  
  {
    label: "Social Media", name: "socialMedia", value: "", type: "select", props: {
      onChange: (e) => {
        setshowSocialMediaOther(e.target.value === "Other");
      },
    }, required: false, option: [
      { "label": "Facebook", "value": "Facebook" },
      { "label": "Instagram", "value": "Instagram" },
      { "label": "Pinterest", "value": "Pinterest" },
      { "label": "X", "value": "X" },
      { "label": "Other", "value": "Other" },
    ],
  },
  ]
  if (showSocialMediaOther) {
    ContactInformation.push({
      label: "Please Specify Social Media Type",
      name: "otherSocialMediaType",
      value: "",
      type: "text",
      required: false,
      props: {},
      classes: "col-span-1",
    });
  }


  let EmploymentDetails = [{
    type: 'heading',
    label: "Employment Details",
    classes: "col-span-4 font-extrabold text-black-900 text-start",
  },
  {
    label: "Employee Code", name: "empCode", value: "", type: "text", props: "", required: true, placeholder: "",
  },
  {
    label: "PAN Number", name: "panNumber", value: "", type: "text", props: "", required: false, placeholder: "",
  },
  { label: "Aadhar Number", name: "adharNumber", value: "", type: "text", props: "", required: false, placeholder: "" },
  { label: "Circle", name: "circle", value: "", type: "select", props: "", required: true, placeholder: "", },
  { label: "Experience", name: "experience", value: "", type: "text", props: "", required: true, placeholder: "", },
  { label: "Salary Currency", name: "salaryCurrency", value: "", type: "select", props: "", required: true, placeholder: "", option:[
    { "label": "INR", "value": "INR" },
    { "label": "USD", "value": "USD" },
  ] },
  {label:"Monthly Salary", name:"monthlySalary", value:'', type:'text', props:'',required:true, placeholder:""},
  {label:"Gross CTC", name:"grossCtc", value:'', type:'text', props:'',required:false, placeholder:""},
  {label:"Official Email ID", name:"email", value:'', type:'text', props:'',required:true, placeholder:""},
  {label:"Mobile No.", name:"mobile", value:'', type:'number', props:'',required:true, placeholder:""},
  {label:"Joining Date", name:"datetime", value:'', type:'datetime', props:'',required:false, placeholder:""},
  {label:"Last Working Day", name:"datetime", value:'', type:'datetime', props:'',required:false, placeholder:""},
  {label:"Passport", name:"passport", value:'', type:'select', props:'',required:true, placeholder:"", option:[
    { "label": "No", "value": "No" },
    { "label": "Yes", "value": "Yes" },
  ]},
  {label:"Bank Name", name:"bankName", value:'', type:'text', props:'',required:false, placeholder:""},
  {label:"Bank Account Number", name:"accountNumber", value:'', type:'number', props:'',required:false, placeholder:""},
  {label:"IFSC Code", name:"ifscCode", value:'', type:'text', props:'',required:false, placeholder:""},
  {label:"Benificiary Name", name:"benificiaryname", value:'', type:'text', props:'',required:false, placeholder:""},
 
]
  

  let EmployeeProfile = [{
    type: 'heading',
    label: "Employee Profile",
    classes: "col-span-4 font-extrabold text-black-900 text-start",
  }, {
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
    type: "text",
    required: false,
    props: {},
    classes: "col-span-1",
  },
  {
    label: "Role",
    name: "role",
    value: "",
    type: "select",
    required: true,
    props: {},
    classes: "col-span-1",
  },
  {
    label: "PMIS Role",
    name: "pmisRole",
    value: "",
    type: "select",
    required: true,
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
    option: [
      { "label": "Accounts", "value": "Accounts" },
      { "label": "HR", "value": "HR" },
      { "label": "operations", "value": "operations" },
      { "label": "Management", "value": "Management" },
    ],
    classes: "col-span-1",
  },
  {
    label: "Reporting Manager",
    name: "reportingManager",
    value: "",
    type: "select",
    required: false,
    props: {},
    option: [
    ],
    classes: "col-span-1",
  },
  {
    label: "L2 Expense manager",
    name: "L2expManager",
    value: "",
    type: "select",
    required: false,
    props: {},
    option: [
    ],
    classes: "col-span-1",
  },
  {
    label: "Finance Approver",
    name: "financeApprover",
    value: "",
    type: "select",
    required: false,
    props: {},
    option: [
    ],
    classes: "col-span-1",
  },
  {
    label: "Reporting HR Manager",
    name: "reportingHrManager",
    value: "",
    type: "select",
    required: false,
    props: {},
    option: [
    ],
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
      { "label": "Active", "value": "Active" },
      { "label": "Resign", "value": "Resign" },
      { "label": "Abscond", "value": "Abscond" },
      { "label": "Exit", "value": "Exit" },
    ],
    classes: "col-span-1",
  },
  {
    label: "Password",
    name: "password",
    value: "",
    type: "password",
    required: false,
    props: {},
    classes: "col-span-1",
  },
]

let SupportingDoc = [{
  type: 'heading',
  label: "Supporting Document",
  classes: "col-span-4 font-extrabold text-black-900 text-start",
},
  {
    label: "Photo",
    name: "img",
    value: "",
    type: "file",
    required: false,
    props: {
      accept: "image/*" 
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
      accept: ".pdf,.doc,.docx" 
    },
    classes: "col-span-1",
  },
  {
    label: "All Other Documents",
    name: "cv",
    value: "",
    type: "file",
    required: false,
    props: {
      accept: ".zip,.rar,.bin" 
    },
    classes: "col-span-1",
  },

]



  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const onTableViewGenerateSubmit = (data) => {
    console.log(data, "dsadasdsadsadsadas")
    data["uid"] = uid
    dispatch(nokiaPrePostActions.postSubmit(Urls.KycRegister, data, () => {
      navigate("/agreement/" + uid)
    }))
  }
  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedList, selectedItem, "datadata")
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  }

  const onRemove = (selectedList, removedItem) => {
    console.log(selectedList, removedItem, "datadata")
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  }

  useEffect(() => {
    dispatch(AuthActions.getcountries())
  }, [])
  return <>
    <div className=' w-full h-full'>
      <div className=''>
        {/* <UiTopBar /> */}
        <div className='w-full mt-3 bg-white'>
          <div class="grid grid-cols-12 gap-2 m-2 bg-white border-2 rounded-lg">
            <div className='col-span-12'>
              <div className='grid grid-cols-1 md:grid-cols-1'>

                <CommonForm classes={"grid-cols-4 gap-4 w-full bg-[#e7ebef] p-4 rounded-lg"} errors={errors} Form={PersonalInformation}
                  register={register} setValue={setValue} getValues={getValues} />

                <CommonForm classes={"grid-cols-4 gap-4 w-full bg-[#e7ebef] p-4 mt-2 rounded-lg"} errors={errors} Form={ContactInformation}
                  register={register} setValue={setValue} getValues={getValues} />
                {/* <CommonForm classes={"grid-cols-2 gap-4 w-full"} errors={errors} Form={ContactInformation2}
                  register={register} setValue={setValue} getValues={getValues} /> */}
                <CommonForm classes={"grid-cols-4 gap-4 w-full bg-[#e7ebef] p-4 mt-2 rounded-lg"} errors={errors} Form={userRole != "Fund Seeker" ? ContactInformation2 : []}
                  register={register} setValue={setValue} getValues={getValues} />
                <CommonForm classes={"grid-cols-4 gap-4 w-full bg-[#e7ebef] p-4 mt-2 rounded-lg"} errors={errors} Form={userRole != "Fund Seeker" ? EmploymentDetails : []}
                  register={register} setValue={setValue} getValues={getValues} />
                <CommonForm classes={"grid-cols-4 gap-4 w-full bg-[#e7ebef] p-4 mt-2 rounded-lg"} errors={errors} Form={userRole != "Fund Seeker" ? EmployeeProfile : []}
                  register={register} setValue={setValue} getValues={getValues} />
                <CommonForm classes={"grid-cols-4 gap-4 w-full bg-[#e7ebef] p-4 mt-2 rounded-lg"} errors={errors} Form={userRole != "Fund Seeker" ? SupportingDoc : []}
                  register={register} setValue={setValue} getValues={getValues} />
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

              {
                UserLyp != "" && <CommonForm classes={"grid-cols-1 lg:grid-cols-2 lg:gap-8 w-full pt-4"} errors={errors} Form={contype}
                  register={register} setValue={setValue} getValues={getValues} />
              }
              <div className='flex gap-10 mb-3 justify-center'>
                <button onClick={() => { navigate("/empDetailsTable") }} className='mt-6 w-auto justify-center rounded-md border-black border-2 px-3 py-1  text-txt-neavy text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Back</button>
                <button onClick={(handleSubmit(onTableViewGenerateSubmit))} className='mt-6 w-auto justify-center rounded-md bg-neavycolor px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
};
export default EmpDetails;
