import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../../components/AdvancedTable";
import PTWActions from "../../../store/actions/ptw-actions";

const PTWLogBackup = () => {
  const dispatch = useDispatch();
  
 
  const { l1ApproverList, loading, l1ApproverTotalCount } = useSelector((state) => ({
    l1ApproverList: state.ptwLogBackup?.data || [],
    loading: state.ptwLogBackup?.loading || false,
    l1ApproverTotalCount: state.ptwLogBackup?.totalCount || 0,
  }));

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
        value: "ptw",
        style: "text-center min-w-[150px]",
      },
      { 
        name: "Profile", 
        value: "profile", 
        style: "text-center min-w-[150px]" 
      },
      {
        name: "PTW Requester",
        value: "ptwRequester",
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
        value: "ssid", 
        style: "text-center min-w-[150px]",
      },
      {
        name: "Unique ID",
        value: "uniqueId",
        style: "text-center min-w-[150px]",
      },
      {
        name: "SR Number",
        value: "srNumber", 
        style: "text-center min-w-[150px]",
      },
      {
        name: "Project Group",
        value: "projectGroup", 
        style: "text-center min-w-[150px]",
      },
      {
        name: "Project ID",
        value: "projectId", 
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
        value: "approvalRejectionDate",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW Form & Checklist Attachment",
        value: "ptwFormChecklistAttachment", 
        style: "text-center min-w-[150px]",
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
    Object.keys(data).forEach(key => {
      if (data[key] && data[key] !== '') {
        queryParams.append(key, data[key]);
      }
    });
    
    const filterArgs = queryParams.toString();
    const args = `page=1&limit=${rowsPerPage}${filterArgs ? '&' + filterArgs : ''}`;
    
    setCurrentPage(1);
    dispatch(getPtwLogBackup(true, args));
  };

  return (
    <>
      <AdvancedTable
        table={table}
        filterAfter={onSubmit}
        tableName="L1 Approver Table"
        TableHeight="h-[68vh]"
        handleSubmit={handleSubmit}
        data={l1ApproverList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={l1ApproverTotalCount}
        heading="Total Count :-"
        loading={loading}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

export default PTWLogBackup;