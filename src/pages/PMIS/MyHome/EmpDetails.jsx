import { useEffect, useState } from "react";
import "react-querybuilder/dist/query-builder.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommonForm from "../../../components/CommonForm";
import HrActions from "../../../store/actions/hr-actions";
import { GET_EMPLOYEE_DETAILS } from "../../../store/reducers/hr-reduces";
import AdminActions from "../../../store/actions/admin-actions";


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
  const dispatch = useDispatch();
  const [oneLoad, setOneLoad] = useState({});
  const navigate = useNavigate();

  const [showPassportNumber, setshowPassportNumber] = useState(false);

  const getManageEmpDetails = useSelector((state) => {
    let data = state.hrReducer.getManageEmpDetails;

    if (data.length > 0 && oneLoad != data[0]) {
      setOneLoad(data[0]);

      Object.entries(data[0]).map((iewq) => {
        setValue(iewq[0], iewq[1]);
      });
    }
    return state.hrReducer.getManageEmpDetails;
  });


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
      setPermanentAddress({ ...presentAddress });
    } else {
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

  let customerList = useSelector((state) => {
    return state?.adminData?.getManageCustomer?.map((itm) => {
        return {
            label: itm?.customerName,
            value: itm?.uniqueId
        }
    })
  });





  let roleList = useSelector((state) => {
    return state?.adminData?.getManageProfile.map((itm) => {
      return {
        label: itm?.roleName,
        value: itm?.uniqueId,
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


    let dtype = {
    Decimal: "number",
    Text: "text",
    Dropdown: "select",
    Number: "number",
    Date: "datetime2",
    "Auto Created": "sdisabled",
  };




  let dataOfProject = useSelector((state) => {
    let dataOlder = state?.adminData?.getManageResource
    return dataOlder;
  });











  let PersonalInformation = [
    {
      type: "heading",
      label: "Employee Details",
      classes: "col-span-4 font-extrabold text-pcol text-start mb-[-50px]",
    },
    // {
    //   label: "Title",
    //   name: "title",
    //   value: "",
    //   type: "select",
    //   props: {},
    //   required: true,
    //   placeholder: "",
    //   option: [
    //     { label: "Mr.", value: "Mr" },
    //     { label: "Mrs.", value: "Mrs" },
    //     { label: "Ms.", value: "Ms" },
    //   ],
    // },
    // {
    //   label: "empName",
    //   name: "empName",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: true,
    //   placeholder: "",
    // },
    // {
    //   label: "empCode",
    //   name: "empCode",
    //   value: "",
    //   type: empuid ? "sdisabled" : "text",
    //   props: {
    //     disabled: empuid ? true : false, 
    //   },
    //   required: true,
    //   placeholder: "",
    // },    
    // {
    //   label: "UST Emp Code",
    //   name: "ustCode",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "UST Project ID",
    //   name: "ustProjectId",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "UST Job Code",
    //   name: "ustJobCode",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Father's Name",
    //   name: "fatherName",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Mother's Name",
    //   name: "motherName",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Marital Status",
    //   name: "martialStatus",
    //   value: "",
    //   type: "select",
    //   props: "",
    //   required: false,
    //   option: [
    //     { label: "Married", value: "married" },
    //     { label: "Single", value: "single" },
    //   ],
    // },
    // {
    //   label: "Official Email-ID",
    //   name: "email",
    //   value: "",
    //   type: empuid ? "sdisabled" : "text",
    //   props: "",
    //   required: true,
    //   placeholder: "",
    // },
    // {
    //   label: "Personal Email-ID",
    //   name: "personalEmailId",
    //   value: "",
    //   type: "text",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Date Of Birth(as Per doc)",
    //   name: "dob",
    //   type: "datetime2",
    //   value: "",
    //   props: "",
    //   required: false,
    // },
    // {
    //   label: "Contact Number",
    //   name: "mobile",
    //   value: "",
    //   type: "number",
    //   props: "",
    //   required: false,
    //   placeholder: "",
    // },
    // {
    //   label: "Blood Group",
    //   name: "blood",
    //   value: "",
    //   type: "select",
    //   props: {},
    //   required: false,
    //   option: [
    //     { label: "A+", value: "A+" },
    //     { label: "A-", value: "A-" },
    //     { label: "B+", value: "B+" },
    //     { label: "B-", value: "B-" },
    //     { label: "AB+", value: "AB+" },
    //     { label: "AB-", value: "AB-" },
    //     { label: "O+", value: "O+" },
    //     { label: "O-", value: "O-" },
    //   ],
    // },
  ];

  dataOfProject.map((its) => {
    let type = dtype[its.fieldType]
    let option = its.dropdown ? its.dropdown.split(",").map((itm) => {
          return {
            value: itm,
            label: itm,
          };
        })
      : [];

    if (its["fieldName"] === "PMIS Role") {
      option = roleList;
      type = "select";
    }
    if (its["fieldName"] === "L1 Approver") {
      option = allEmployeeList;
      type = "newSingleSelect45";
    }
    if (its["fieldName"] === "L2 Approver") {
      option = allEmployeeList;
      type = "newSingleSelect45";
    }
    PersonalInformation.push (
      {
        label: its.fieldName,
        value: "",
        required: its.mandatory == "Yes" ? true : false,
        option: option,
        name: its.fieldKey,
        type: type,
        // props: {
        //   maxSelectableDate: today,
        // },
      }
    )
  })






 




  const onTableViewGenerateSubmit = (data) => {
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

  useEffect(() => {
    dispatch(AdminActions.getManageProfile());
    dispatch(HrActions.getHRAllEmployee());
    if (empuid) {
      dispatch(GET_EMPLOYEE_DETAILS({ dataAll: [], reset: false }));
      dispatch(HrActions.getManageEmpDetails(false, empuid));
      setOneLoad(false);
    } else {
      [
        ...PersonalInformation,
      ].map((itss) => {

        setValue(itss.name, itss.value);
      });
      ``;
    }
  }, [empuid, ]);

  return (
    <>
      <div className=" w-full h-full">
        <div className="mb-14">
          {/* <UiTopBar /> */}
          <div className="w-full mt-2 bg-[#3e454d] mb-10">
            <div class="grid grid-cols-12 gap-2 m-2 bg-gray-800 border-[1.5px] rounded-lg">
              <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-1 mb-14">
                  <CommonForm
                    classes={"grid-cols-4 gap-4 w-full h-auto bg-[#3e454d] p-4 rounded-lg"}
                    errors={errors}
                    Form={PersonalInformation}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />

                </div>
                

                <div className="flex space-x-2 absolute bottom-0 inset-x-0 mx-auto z-10 justify-center items-center bg-[#24292d]">
                  <button
                    onClick={() => {
                      navigate("/hr/empDetailsTable");
                    }}
                    className="mt-2 w-auto justify-center rounded-md px-10 py-1 mb-2  bg-pcol hover:bg-violet-100 hover:text-pcol hover:font-extrabold text-white text-sm font-extrabold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit(onTableViewGenerateSubmit)}
                    className="mt-2 w-auto justify-center rounded-md bg-pcol mb-2 hover:bg-violet-100 hover:text-pcol hover:font-extrabold px-10 py-1 text-sm font-extrabold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton"
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
