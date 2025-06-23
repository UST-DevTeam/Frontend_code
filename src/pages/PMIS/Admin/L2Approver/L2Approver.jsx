import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import Modal from "../../../../components/Modal";
import PTWActions from "../../../../store/actions/ptw-actions";
import AdvancedTable from "../../../../components/AdvancedTable";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import ToggleButton from "../../../../components/ToggleButton";

import CommonActions from "../../../../store/actions/common-actions";
import HrActions from "../../../../store/actions/hr-actions";
import VendorActions from "../../../../store/actions/vendor-actions";
import { json, useNavigate, useParams } from "react-router-dom";
import FileUploader from "../../../../components/FIleUploader";
import { GET_VENDOR_DETAILS } from "../../../../store/reducers/vendor-reducer";
import { Urls } from "../../../../utils/url";
import ConditionalButton from "../../../../components/ConditionalButton";
import {
  getAccessType,
  objectToQueryString,
} from "../../../../utils/commonFunnction";
import L2ApproverForm from "./L2ApproverForm";
const L2Approver = () => {
  const dispatch = useDispatch();

  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [fileOpen, setFileOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const Data = useRef("");

  // Add year state or get it from props/context
  const [year] = useState(new Date().getFullYear());

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const l1ApproverList = useSelector((state) => {
    console.log("Redux state:", state);
    const interdata = state?.ptwData?.getL1ApproverData || [];
    return interdata.map((itm) => ({
      ...itm,
      edit: (
        <CstmButton
          className="p-2"
          child={<EditButton name="" onClick={() => handleEditClick(itm)} />}
        />
      ),

      delete: (
        <CstmButton
          child={
            <DeleteButton
              name={""}
              onClick={() => {
                let msgdata = {
                  show: true,
                  icon: "warning",
                  buttons: [
                    <Button
                      classes="w-15 bg-rose-400"
                      onClick={() => {
                        dispatch(
                          CommonActions.deleteApiCaller(
                            `${Urls.l1ApproverSubmit}/${itm.uniqueId}`,
                            () => {
                              dispatch(
                                PTWActions.getL1ApproverData(
                                  true,
                                  objectToQueryString({
                                    ApproverType: "L2-Approver",
                                  })
                                )
                              );
                              dispatch(ALERTS({ show: false }));
                            }
                          )
                        );
                      }}
                      name={"OK"}
                    />,
                    <Button
                      classes="w-auto"
                      onClick={() => {
                        dispatch(ALERTS({ show: false }));
                      }}
                      name={"Cancel"}
                    />,
                  ],
                  text: "Are you sure you want to Delete?",
                };
                dispatch(ALERTS(msgdata));
              }}
            ></DeleteButton>
          }
        />
      ),
    }));
  });

  const l1ApproverTotalCount = useSelector((state) => {
    const interdata = state?.ptwData?.getL1ApproverData || [];
    return interdata.length > 0 ? interdata[0]["overall_table_count"] : 0;
  });

  const handleEditClick = (item) => {
    console.log("Edit clicked for item:", item);
    setEditingItem(item);
    setmodalHead("Edit Approver");

    setmodalBody(
      <L2ApproverForm
        isOpen={true}
        setIsOpen={setmodalOpen}
        resetting={false}
        formValue={item}
        filtervalue=""
      />
    );

    setmodalOpen(true);
  };

  const table = {
    columns: [
      {
        name: "Emp Name",
        value: "empName",
        style: "text-center min-w-[150px]",
      },
      { name: "Profile", value: "profile", style: "text-center min-w-[150px]" },
      {
        name: "Customer Name",
        value: "customerName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Project Group",
        value: "projectGroupName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Project Type",
        value: "projectTypeName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Milestone",
        value: "Milestone",
        style: "text-center min-w-[150px]",
      },
      { name: "Edit", value: "edit", style: "text-center min-w-[100px]" },
      { name: "Delete", value: "delete", style: "text-center min-w-[100px]" },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
  };

  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    const strVal = objectToQueryString(data);
    dispatch(
      PTWActions.getL1ApproverData(
        true,
        strVal,
        objectToQueryString({ ApproverType: "L2-Approver" })
      )
    );
  };

  const onTableViewSubmit = (data) => {
    data["fileType"] = "L2Approver";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        setFileOpen(false);
        dispatch(
          PTWActions.getL1ApproverData(
            true,
            objectToQueryString({ ApproverType: "L2-Approver" })
          )
        );
      })
    );
  };

  // Handle modal close
  const handleModalClose = () => {
    // If we were editing an item, refresh the data
    if (editingItem) {
      dispatch(
        PTWActions.getL1ApproverData(
          true,
          objectToQueryString({ ApproverType: "L2-Approver" })
        )
      );
    }

    setmodalOpen(false);
    setEditingItem(null);
    setmodalBody(<></>);
    setmodalHead(<></>);
  };
  useEffect(() => {
    dispatch(
      PTWActions.getL1ApproverData(
        true,
        objectToQueryString({ ApproverType: "L2-Approver" })
      )
    );
  }, [dispatch]);

  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex">
            <Button
              onClick={() => {
                setmodalHead("Add Approver");
                setmodalBody(
                  <L2ApproverForm
                    isOpen={true}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                    year={year}
                    monthss={[]}
                    filtervalue=""
                  />
                );
                setmodalOpen(true);
              }}
              name="Add New"
              classes="w-auto mr-1"
            />
            <Button
              name="Upload File"
              classes="w-auto mr-1"
              onClick={() => setFileOpen(true)}
            />
            <Button
              name="Export"
              classes="w-auto mr-1"
              onClick={() => {
                dispatch(
                  CommonActions.commondownloadpost(
                    "/export/L2Approver",
                    "Export_L1Approver.xlsx",
                    "POST",
                    {}
                  )
                );
              }}
            />
          </div>
        }
        table={table}
        filterAfter={onSubmit}
        tableName="L2 Approver Table"
        TableHeight="h-[68vh]"
        handleSubmit={handleSubmit}
        data={l1ApproverList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={l1ApproverTotalCount}
        heading="Total Count :-"
      />
      <Modal
        size="sm"
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={handleModalClose} 
      />
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl=""
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
        tempbtn={true}
        tempbtnlink={["/template/L1Approver.xlsx", "L1Approver.xlsx"]}
      />
    </>
  );
};

export default L2Approver;
