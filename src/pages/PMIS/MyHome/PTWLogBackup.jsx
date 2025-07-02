import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../../components/AdvancedTable";
import PTWActions from "../../../store/actions/ptw-actions";
import CommonActions from "../../../store/actions/common-actions";

const PTWLogBackup = () => {
  const dispatch = useDispatch();
  const dataAll = useSelector((state) => state?.ptwData?.getPtwLogBackup || []);
  console.log(dataAll, "csddsffffdff");

  const ptwBackupData = useSelector(
    (state) => state?.ptwData?.getPtwLogBackup || []
    
  );
  const extractRowData = (rowData) => {
    const extractedData = {};

    Object.keys(tableData).forEach((key) => {
      if (rowData.hasOwnProperty(key)) {
        extractedData[key] = rowData[key];
      }
    });

    extractedData.downloadTimestamp = new Date().toISOString();
    extractedData.downloadType = "";

    return extractedData;
  };

   const handleExcelDownload = (rowData) => {
    console.log("Downloading Excel for:", rowData);

    const extractedData = extractRowData(rowData);
    const exportType = "EXCEL";

    const queryParams = new URLSearchParams();

    queryParams.append("exportType", exportType);
    queryParams.append("uniqueId", rowData?._id);
    queryParams.append("ptwNumber", rowData?.ptwNumber);
    queryParams.append("l1Approver", "l1Approver");

    // Object.keys(tableData).forEach((key) => {
    //   const value = extractedData[key] || rowData[key] || "";
    //   if (value !== "") {
    //     queryParams.append(key, value);
    //   }
    // });

    const endpoint = `/ptw_export?${queryParams.toString()}`;

    console.log("Excel Download endpoint:", endpoint);
    console.log("Row data being sent:", extractedData);

    dispatch(
      CommonActions.commondownloadpost(
        endpoint,
        `PTW_${
          extractedData.ptwNumber || rowData.ptwNumber || Date.now()
        }.xlsx`,
        "POST",
        {
          rowData,
          columns: table["columns"]
        }
      )
    );
  };

   const handlePdfDownload = (rowData) => {
    console.log("Downloading PDF for:", rowData);

    const extractedData = extractRowData(rowData);
    const exportType = "PDF";

    const queryParams = new URLSearchParams();
    queryParams.append("exportType", exportType);
    queryParams.append("uniqueId", rowData?._id);
    queryParams.append("ptwNumber", rowData?.ptwNumber);
    queryParams.append("l1Approver", "l1Approver");

    // Object.keys(tableData).forEach(key => {
    //   const value = extractedData[key] || rowData[key] || "";
    //   if (value !== "") {
    //     queryParams.append(key, value);
    //   }
    // });

    const endpoint = `/ptw_export?${queryParams.toString()}`;

    console.log("PDF Download endpoint:", endpoint);
    console.log("Row data being sent:", extractedData);

    dispatch(
      CommonActions.commondownloadpost(
        endpoint,
        `PTW_${extractedData.ptwNumber || rowData.ptwNumber || Date.now()}.pdf`,
        "POST",
        { rowData , columns: table["columns"]}
      )
    );
  };


  const tableData = ptwBackupData?.map((itm)=>{
    return {
      ...itm,
      ptwFormStatus:(
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handlePdfDownload(itm)}
            className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition flex items-center gap-1"
            title="Download PDF"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            PDF
          </button>
          <button
            onClick={() => handleExcelDownload(itm)}
            className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition flex items-center gap-1"
            title="Download Excel"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M12.5,13L9.5,17H11.5L13.25,15L15,17H17L14,13L17,9H15L13.25,11L11.5,9H9.5L12.5,13Z" />
            </svg>
            Excel
          </button>
        </div>
      ),
    }
  })

  console.log(ptwBackupData, "___ptwBackupData");




  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchPTWLogBackupData();
  }, []);

  const fetchPTWLogBackupData = (reset = true, additionalArgs = "") => {
    dispatch(PTWActions.getPtwLogBackup(reset));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const args = `page=${newPage}&limit=${rowsPerPage}`;
    dispatch(PTWActions.getPtwLogBackup(false, args));
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    const args = `page=1&limit=${newRowsPerPage}`;
    dispatch(PTWActions.getPtwLogBackup(true, args));
  };

  const table = {
    columns: [
      {
        name: "PTW",
        value: "ptwNumber",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW Requester",
        value: "ptwRequester",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Milestone",
        value: "milestoneName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Site Id",
        value: "siteId",
        style: "text-center min-w-[150px]",
      },
      {
        name: "SSID",
        value: "ssid",
        style: "text-center min-w-[150px]",
      },
      // {
      //   name: "Unique ID",
      //   value: "uniqueId",
      //   style: "text-center min-w-[150px]",
      // },
      {
        name: "SR Number",
        value: "SRNumber",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Project Group",
        value: "projectGroupName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Project ID",
        value: "projectID",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Project Type",
        value: "projectType",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Sub Project",
        value: "subProject",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Activity",
        value: "activity",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW Submission Date",
        value: "ptwSubmissionDate",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Approval/Rejection Date",
        value: "approvedOrRejectionDate",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW Form & Checklist Attachment",
        value: "ptwFormStatus",
        style: "text-center min-w-[180px]",
        render: (value, rowData) => {
          console.log("Rendering buttons for row:", rowData);
          return (
            <div className="flex justify-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePdfDownload(rowData);
                }}
                className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition flex items-center gap-1"
                title="Download PDF"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                PDF
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleExcelDownload(rowData);
                }}
                className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition flex items-center gap-1"
                title="Download Excel"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M12.5,13L9.5,17H11.5L13.25,15L15,17H17L14,13L17,9H15L13.25,11L11.5,9H9.5L12.5,13Z" />
                </svg>
                Excel
              </button>
            </div>
          );
        },
      },
      {
        name: "Current Status",
        value: "currentStatus",
        style: "text-center min-w-[150px]",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },

    filter: [],
  };

  const onSubmit = (data) => {
    console.log("Filter form submitted:", data);

    const queryParams = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      if (data[key] && data[key] !== "") {
        queryParams.append(key, data[key]);
      }
    });

    const filterArgs = queryParams.toString();
    const args = `page=1&limit=${rowsPerPage}${
      filterArgs ? "&" + filterArgs : ""
    }`;

    setCurrentPage(1);
    dispatch(PTWActions.getPtwLogBackup(true, args));
  };

  useEffect(() => {
    if (dataAll && dataAll.length > 0) {
      console.log("PTW Data received:", dataAll);
      console.log("Total items:", dataAll.length);
      console.log("First item structure:", dataAll[0]);
      console.log("Overall table count:", dataAll[0]?.overall_table_count);
    }
  }, [dataAll]);

  return (
    <>
      <AdvancedTable
        table={table}
        filterAfter={onSubmit}
        tableName="PTW Log Backup Table"
        TableHeight="h-[68vh]"
        handleSubmit={handleSubmit}
        data={tableData || []}
        errors={errors || {}}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount=""
        heading="Total Count :-"
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

export default PTWLogBackup;
