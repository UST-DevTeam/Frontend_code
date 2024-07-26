import React, { useState } from "react";
import AdvancedTable from "./AdvancedTable";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import eventManagementActions from "../store/actions/eventLogs-actions";

const EventLog = ({type,unqeId}) => {
    console.log(unqeId,"unqeId")
    const {
        register,
        reset,
        handleSubmit,
        watch,
        setValue,
        setValues,
        getValues,
        formState: { errors },
      } = useForm();
      useEffect(() => {
        // dispatch(eventManagementActions.getprojecteventList(true,unqeId))
        // dispatch(OperationManagementActions.getRoleList())
      }, []);
      let dispatch=useDispatch()
      const onSubmit = (data) => {
        console.log(data, "datadatadatadatadatadata");
        delete data["reseter"];
        dispatch(
          AdminActions.getProject(
            `${customeruniqueId}${
              projecttypeuniqueId ? "/" + projecttypeuniqueId : ""
            }`,
            "",
            true,
            objectToQueryString(data)
          )
        );
      };
    let dbConfigTotalCount = useSelector((state) => {

        let interdata = []
        if(type=="site"){
            interdata = state?.eventlogsReducer?.siteeventList || [];
        }else if(type=="milestone"){
            interdata = state?.eventlogsReducer?.milestoneeventList || [];
        }else if(type=="project"){
            interdata = state?.eventlogsReducer?.projecteventList || [];
        }
        
         
        
        console.log(interdata,'interdatainterdata')
        return interdata
    })

    let siteIdLogsTable = {
        columns: [
          {
            name: "Site Id",
            value: "SiteId",
            style: "min-w-[50px] max-w-[200px] text-center p-1",
          },
          {
            name: "User Email",
            value: "email",
            style: "min-w-[50px] max-w-[200px] text-center",
          },
          {
            name: "Date & Time",
            value: "UpdatedAt",
            style: "min-w-[50px] max-w-[200px] text-center",
          },
          
          {
            name: "Event",
            value: "updatedData",
            style: "min-w-[50px] max-w-[200px] text-center",
          },
        ],
        properties: {
          rpp: [10, 20, 50, 100],
        },
        filter: [
          
        ],
      };
    
if (type=="milestone"){
    siteIdLogsTable?.columns.push({
    name: "Milestone",
    value: "mileStoneName",
    style: "min-w-[50px] max-w-[200px] text-center",
  })
}

  return (
    <AdvancedTable
      headerButton={<></>}
      exportButton={[`/export/${type}EventLog/${unqeId}`,`Export_${type}_Event_log.xlsx`]}
      table={siteIdLogsTable}
      filterAfter={onSubmit}
      tableName={"Milestone Event Logs"}
    //   handleSubmit={handleSubmit}
      data={dbConfigTotalCount}
      errors={errors}
      register={register}
      setValue={setValue}
      getValues={getValues}
      totalCount={dbConfigTotalCount}
    />
  );
};

export default EventLog;
