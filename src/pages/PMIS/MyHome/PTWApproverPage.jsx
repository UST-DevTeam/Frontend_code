import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import CommonTableForm from "../../../components/CommonTableForm";
import CommonTableFormSiteParent from "../../../components/CommonTableFormSiteParent";
import PTWActions from "../../../store/actions/ptw-actions";
import CommonActions from "../../../store/actions/common-actions";
import { baseUrl, Urls } from "../../../utils/url";

import AdvancedTable from "../../../components/AdvancedTable";
import Button from "../../../components/Button";

import FileUploader from "../../../components/FIleUploader";
import Modal from "../../../components/Modal";
import CommonImage from "../../../components/Common Image/CommonImage";

const PTWApproverPage = () => {
  const { page } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [fileOpen, setFileOpen] = useState(false);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("checklist"); // Default to checklist tab
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHead, setModalHead] = useState("");
  const [modalBody, setModalBody] = useState(null);
  const imageRefValue = useRef(null)
  const [image, setImage] = useState(false)

  const ptwNumber = location?.state?.ptwData;

  console.log(data , 'asdfasdfasdfasdfasdf')

  const approverPageData = useSelector(
    (state) => state?.ptwData?.getApproverPageDataForm || []
  );

  console.log(approverPageData, "__approvePageData");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!approverPageData?.length) return;
    setData(
      Object.keys(approverPageData[0][activeTab])?.map((item) => {
        return {
          type: `${item}`,
          value: approverPageData[0][activeTab][item],
        };
      })
    );
  }, [approverPageData.length, activeTab]);

  // Find the checklist data based on PTW number

  // All available tabs
  const tabFields = [
    "checklist",
    "photo",
    "riskassessment",
    "ptwphoto",
    "oneatrisk",
  ];

  const tabLabels = {
    checklist: "CheckList",
    photo: "Photo",
    riskassessment: "RiskAssessment",
    ptwphoto: "PtwPhoto",
    oneatrisk: "OneAtRisk",
  };

  // Table configuration for AdvancedTable
  const table = {
    columns: [
      {
        name: "Type",
        value: "type",
        style: "text-center min-w-[120px]",
      },
      {
        name: "Value",
        value: "value",
        style: "text-center min-w-[120px]",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
  };

  // Function to convert object data to table format matching the image
  const convertObjectToTableData = (obj, fieldName) => {
    if (!obj || typeof obj !== "object") return [];

    return Object.entries(obj).map(([key, value], index) => {
      // Handle nested objects (like "No": {"of team member": "3"})
      if (typeof value === "object" && value !== null) {
        // If it's a simple nested object, flatten it
        if (Object.keys(value).length === 1) {
          const nestedKey = Object.keys(value)[0];
          const nestedValue = value[nestedKey];
          return {
            id: `${fieldName}_${index}`, // Add unique ID for table
            fieldName: `${key} ${nestedKey}`,
            mandatory: determineMandatory(key),
            inputType: determineInputType(key, nestedValue),
            status: "Active",
          };
        } else {
          return {
            id: `${fieldName}_${index}`, // Add unique ID for table
            fieldName: key,
            mandatory: determineMandatory(key),
            inputType: "AutoFill",
            status: "Active",
          };
        }
      }

      return {
        id: `${fieldName}_${index}`, // Add unique ID for table
        fieldName: key,
        mandatory: determineMandatory(key),
        inputType: determineInputType(key, value),
        status: "Active",
      };
    });
  };

  // Function to determine if field is mandatory based on field name
  const determineMandatory = (fieldName) => {
    const mandatoryFields = [
      "Customer",
      "Milestone",
      "CIRCLE",
      "Site Id",
      "SSID",
      "Unique ID",
      "Project type",
      "SCOPE",
      "Activity",
      "RFAI Date",
      "Tower Type",
      "PTW Requestor name",
      "Type of work",
      "No of team member",
      "User type",
    ];

    return mandatoryFields.some((field) =>
      fieldName.toLowerCase().includes(field.toLowerCase())
    )
      ? "Yes"
      : "No";
  };

  // Function to determine input type based on field name and value
  const determineInputType = (fieldName, value) => {
    const fieldLower = fieldName.toLowerCase();

    if (fieldLower.includes("tower type")) {
      return "Dropdown ( Ground,Building )";
    }
    if (fieldLower.includes("type of work")) {
      return "Dropdown ( Electrical,Civil,Repair )";
    }
    if (
      fieldLower.includes("no of team member") ||
      fieldLower.includes("of team member")
    ) {
      return "Dropdown ( 1,2,3,4,5,6,7,8,9 )";
    }
    if (fieldLower.includes("user type")) {
      return "Dropdown ( In House , Partner )";
    }
    if (fieldLower.includes("date")) {
      return "AutoFill";
    }
    if (
      fieldLower.includes("ptw") &&
      (fieldLower.includes("issue") || fieldLower.includes("valid"))
    ) {
      return "AutoFill";
    }

    return "AutoFill";
  };

  const tableColumns = [
    {
      name: "Type",
      value: "type",
      style: "text-center min-w-[120px]",
    },
    {
      name: "Value",
      value: "value",
      style: "text-center min-w-[100px]",
    },
  ];

  // Get current tab data
  const getCurrentTabData = () => {
    // if (!checklistData || !activeTab) return [];
    // const tabData = checklistData[activeTab];
    // if (!tabData) return [];
    // return convertObjectToTableData(tabData, activeTab);
  };

  // Load data when component mounts or PTW number changes
  useEffect(() => {
    if (sessionStorage.getItem("ptwNo")) {
      const args = `ptwNumber=${sessionStorage.getItem("ptwNo")}`;
      dispatch(PTWActions.getApproverPageDataForm(true, args));
    }
  }, [sessionStorage.getItem("ptwNo")]);

  // File upload handler
  const onTableViewSubmit = (data) => {
    data["fileType"] = "Approver_MDB";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        setFileOpen(false);
        dispatch(PTWActions.getApproverPage(true, ""));
      })
    );
  };

  // Filter handler for AdvancedTable
  const onSubmit = (filters) => {
    console.log("Filters applied:", filters);
    // Handle filtering logic here
  };

  // Modal handlers
  const handleModalClose = () => {
    setModalOpen(false);
    setModalHead("");
    setModalBody(null);
  };

  // const currentTabData = getCurrentTabData();
  // const totalCount = currentTabData.length;
  // console.log(currentTabData,"___currentTabData")

  const renderTabContent = () => {
    if (currentTabData.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-800 rounded border border-gray-600">
          <div className="text-gray-400 text-lg mb-2">📋</div>
          <div className="text-gray-300 font-medium">
            No data available for {tabLabels[activeTab]}
          </div>
          <div className="text-gray-400 text-sm mt-1">
            Data will appear here when available
          </div>
        </div>
      );
    }
  };

  return (
   <>
    <div className=" ">
      <div className="">
        <div className="flex w-full space-x-1">
          {approverPageData?.length > 0 &&
            Object.keys(approverPageData[0])?.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 text-sm font-medium transition-colors mx-1 w-auto text-center ${
                    isActive
                      ? "mb-1 border-b-[3px] border-pcol text-[#f4d3a8] bg-primaryLine"
                      : "bg-purple-200 hover:bg-rose-400 hover:text-white text-black"
                  }`}
                  style={{
                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                  }}
                >
                  {tab}
                </button>
              );
            })}
        </div>
      </div>
      <div>
        <AdvancedTable
          headerButton={
            <div className="flex gap-2">
             
              {/* <Button
                name={"Export"}
                classes="w-auto bg-teal-500 hover:bg-teal-600"
                onClick={(e) => {
                  dispatch(
                    CommonActions.commondownloadpost(
                      "/Export/ptwMDB",
                      `Export_${tabLabels[activeTab]}.xlsx`,
                      "POST",
                      { tabData: activeTab, ptwNumber }
                    )
                  );
                }}
              /> */}
            </div>
          }
          table={table}
          filterAfter={onSubmit}
          tableName={`PTW ${tabLabels[activeTab]} Dashboard`}
          TableHeight="h-[68vh]"
          handleSubmit={handleSubmit}
          data={data?.map((item) => {
            
            return {
              ...item,
              value : item?.value?.split('/').includes('uploads') ? <img onClick={() => {
                
                imageRefValue.current = baseUrl +'/' + item?.value
                setImage(true)
              }} src={baseUrl+'/' +item?.value} className="h-20 object-cover flex mx-auto cursor-pointer rounded-full w-20" alt="" /> : item?.value
            }
          })}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
          totalCount={
            approverPageData?.length > 0 &&
            Object.keys(approverPageData[0][activeTab])?.length
          }
          heading="Total Count :-"
          selectable={true}
          onSelectionChange={(selectedItems) => {
            console.log("Selected items:", selectedItems);
          }}
        />
        <Modal
        size="full"
        modalHead={<h1>Image View</h1>}
        children={
          // <img src={imageRefValue.current}  alt="" />
          <CommonImage imageSrc={imageRefValue.current}/>
      }
        isOpen={image}
        setIsOpen={setImage}
      />

        
        
       

        {/* <FileUploader
          isOpen={fileOpen}
          fileUploadUrl={Urls.common_file_uploadr}
          onTableViewSubmit={onTableViewSubmit}
          setIsOpen={setFileOpen}
          tempbtn={true}
          tempbtnlink={["/template/MDB_Approver.xlsx", "MDB_Approver.xlsx"]}
        /> */}
      </div>
      
    </div>
     
   </>
  );
};

export default PTWApproverPage;
