import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import EditButton from "../../../components/EditButton";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
import FileUploader from "../../../components/FIleUploader";
import L1ApproverForm from "../Admin/L1Approver/L1ApproverForm";
import PTWActions from "../../../store/actions/ptw-actions";
import CommonActions from "../../../store/actions/common-actions";
import { Urls } from "../../../utils/url";
import { objectToQueryString } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
const ApproverPage = () => {
  const dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [fileOpen, setFileOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const Data = useRef("");

  const [year] = useState(new Date().getFullYear());

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const refreshData = () => {
    dispatch(
      PTWActions.getL1ApproverData(
        true,
        objectToQueryString({
          ApproverType: "L1-Approver",
        })
      )
    );
  };

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
                              refreshData(); // Use the refresh function
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
      <L1ApproverForm
        isOpen={true}
        setIsOpen={setmodalOpen}
        resetting={false}
        formValue={item}
        filtervalue=""
        onSuccess={refreshData}
      />
    );

    setmodalOpen(true);
  };

  const table = {
    columns: [
      {
        name: "Company/Partner Name",
        value: "empName",
        style: "text-center min-w-[150px]",
      },
      { name: "Activity Date", value: "profile", style: "text-center min-w-[150px]" },
      {
        name: "Circle",
        value: "customerName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Site Location",
        value: "projectGroupName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Tower Type",
        value: "projectTypeName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "SiteId",
        value: "circleName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Project",
        value: "circleName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Activity",
        value: "circleName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Engineer",
        value: "circleName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "Riggers",
        value: "circleName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW No",
        value: "circleName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW status ( Approved /Rejected)",
        value: "circleName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW Approval/Rejection Time",
        value: "circleName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW Rejection Reason",
        value: "circleName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW Closer Time",
        value: "circleName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "PTW Approver",
        value: "circleName",
        style: "text-center min-w-[150px]",
      },
      {
        name: "OHS Remark",
        value: "circleName",
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
        objectToQueryString({ ApproverType: "L1-Approver" })
      )
    );
  };

  // const onTableViewSubmit = (data) => {
  //   data["fileType"] = "L1Approver";
  //   dispatch(
  //     CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
  //       setFileOpen(false);
  //       refreshData();
  //     })
  //   );
  // };

  const onTableViewSubmit = (data) => {
    data["fileType"] = "L1_Approver_MDB";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        setFileOpen(false);
        dispatch(
          PTWActions.getL1ApproverData(
            true,
            objectToQueryString({
              ApproverType: "L1-Approver",
            })
          )
        );
      })
    );
  };

  const handleModalClose = () => {
    refreshData();

    setmodalOpen(false);
    setEditingItem(null);
    setmodalBody(<></>);
    setmodalHead(<></>);
  };

  useEffect(() => {
    refreshData();
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
                  <L1ApproverForm
                    isOpen={true}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                    year={year}
                    monthss={[]}
                    filtervalue=""
                    onSuccess={refreshData}
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
              name={"Export"}
              classes="w-auto mr-1"
              onClick={(e) => {
                dispatch(
                  CommonActions.commondownloadpost(
                    "/Export/ptwMDB",
                    "Export_L1Approval.xlsx",
                    "POST",
                    { ApproverType: "L1-Approver" }
                  )
                );
              }}
            ></Button>
          </div>
        }
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
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
        tempbtn={true}
        tempbtnlink={["/template/MDB_Approver.xlsx", "MDB_Approver.xlsx"]}
      />
    </>
  );
};

export default ApproverPage;
