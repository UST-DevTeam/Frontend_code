import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../../components/AdvancedTable";
import PTWActions from "../../../store/actions/ptw-actions";

const PTWLogBackup = () => {
  const dispatch = useDispatch();
  const dataAll = useSelector(
    (state) => (state?.getPtwLogBackup
    )
  );
  console.log(dataAll,"csddsffffdff");
 
  

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
    const args = `page=${currentPage}&limit=${rowsPerPage}${additionalArgs}`;
    dispatch(PTWActions.getPtwLogBackup(reset, args));
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
        value: "ptwRequestorName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Milestone",
        value: "milestone",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Site Id",
        value: "siteId",
        style: "text-center min-w-[150px]",
      },
      {
        name: "SSID",
        value: "SSID",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Unique ID",
        value: "UniqueID",
        style: "text-center min-w-[150px]",
      },
      {
        name: "SR Number",
        value: "SRNumber",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Project Group",
        value: "ProjectGroup",
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
        value: "Activity",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW Submission Date",
        value: "PtwSubmissionDate",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Approval/Rejection Date",
        value: "approvalAndRejectionDate",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW Form & Checklist Attachment",
        value: "PtwAndChecklistAttachment",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Current Status",
        value: "CurrentStatus",
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
      console.log(
        "Overall table count:",
        dataAll[0]?.overall_table_count
      );
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
        data={dataAll || []}
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
