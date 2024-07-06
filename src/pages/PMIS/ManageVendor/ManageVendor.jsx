import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
import ManageVendorForm from "../ManageVendor/ManageVendorForm";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
import ToggleButton from "../../../components/ToggleButton";
import { objectToQueryString } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import HrActions from "../../../store/actions/hr-actions";
import VendorActions from "../../../store/actions/vendor-actions";
import { json, useNavigate, useParams } from "react-router-dom";
import FileUploader from "../../../components/FIleUploader";
import { GET_VENDOR_DETAILS } from "../../../store/reducers/vendor-reducer";
import { Urls } from "../../../utils/url";

const ManageVendor = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [fileOpen2, setFileOpen2] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  const [strValFil, setstrVal] = useState(false);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let dbConfigList = useSelector((state) => {
    let interdata = state?.vendorData?.getManageVendorDetails || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  // sessionStorage.setItem('singleData' , JSON.stringify(itm))
                  dispatch(GET_VENDOR_DETAILS({ dataAll: [], reset: true }));
                  navigate(`/vendorForm/${itm.uniqueId}`);
                  // dispatch(VendorActions.getManageVendorDetails())
                  // setmodalHead("Edit Customer Details")

                  setmodalBody(
                    <>
                      <ManageVendorForm resetting={false} formValue={itm} />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></EditButton>
            }
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
                        classes="w-15 bg-green-500"
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.vendor_details}/${itm.uniqueId}`,
                              () => {
                                dispatch(VendorActions.getManageVendorDetails());
                                dispatch(ALERTS({ show: false }));
                              }
                            )
                          );
                        }}
                        name={"OK"}
                      />,
                      <Button
                        classes="w-24"
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

        view: (
          <CstmButton
            className={"p-5"}
            child={
              <Button
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  setmodalHead("Show PDF");
                  setmodalBody(
                    <>
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></Button>
            }
          />
        ),
      };
      return updateditm;
    });
  });
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.vendorData?.getManageVendorDetails;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });
  // let Form = [
  //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
  //     { label: "Custom Queries", value: "", type: "textarea" }
  // ]

  let table = {
    columns: [
      {
        name: "Partner Code",
        value: "vendorCode",
        style: "min-w-[150px] max-w-[450px] text-center font-extrabold sticky left-0 bg-[#3e454d] z-10",
      },
      {
        name: "Partner Name",
        value: "vendorName",
        style: "min-w-[200px] max-w-[200px] text-center sticky left-[149px] bg-[#3e454d] z-10",
      },
      {
        name: "Email ID",
        value: "email",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Contact No.",
        value: "contactDetails",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      {
        name: "Contact Person Name",
        value: "contactPerson",
        style: "min-w-[170px] max-w-[450px] text-center whitespace-nowrap",
      },
      {
        name: "Validity Upto",
        value: "validityUpto",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      // {
      //   name: "PMIS Role",
      //   value: "userRole",
      //   style: "min-w-[120px] max-w-[450px] text-center",
      // },
      {
        name: "Status",
        value: "status",
        style: "min-w-[100px] max-w-[450px] text-center",
      },
      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[100px] text-center",
      },
      {
        name: "Delete",
        value: "delete",
        style: "min-w-[100px] max-w-[100px] text-center",
      },
      // {
      //     name: "View",
      //     value: "view",
      //     style: "min-w-[100px] max-w-[100px] text-center"
      // }
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      // {
      //     label: "Role",
      //     type: "select",
      //     name: "rolename",
      //     option: roleList,
      //     props: {
      //     }
      // }
    ],
  };
  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(VendorActions.getManageVendorDetails(value, objectToQueryString(data)));
  };
  useEffect(() => {
    dispatch(VendorActions.getManageVendorDetails());
  }, []);
  const onTableViewSubmit = (data) => {
    data["fileType"] = "ManageVendor";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(VendorActions.getManageVendorDetails());
        setFileOpen(false);
        resetting("");
      })
    );
  };
  const onTableViewSubmit2 = (data) => {
    data["fileType"] = "UpgradeVendor";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(VendorActions.getManageVendorDetails());
        setFileOpen2(false);
        resetting("");
      })
    );
  };
  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-1">
            {" "}
            <Button
              classes="w-auto"
              onClick={() => {
                dispatch(GET_VENDOR_DETAILS({ dataAll: [], reset: true }));
                navigate(`${"/vendorForm"}`);
              }}
              name={"Add New"}
            ></Button>
            <Button
              name={"Upload File"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen((prev) => !prev);
              }}
            ></Button>
            <Button
              name={"Upgrade Partner"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen2((prev) => !prev);
              }}
            ></Button>
          </div>
        }
        table={table}
        exportButton={["/export/vendor","Vendor.xlsx"]}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
      />

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      {/* <CommonForm/> */}
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
        tempbtn={true} tempbtnlink = {["/template/ManageVendor.xlsx","ManageVendor.xlsx"]}
      />
      <FileUploader
        isOpen={fileOpen2}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit2}
        setIsOpen={setFileOpen2}
        tempbtn={true} tempbtnlink = {["/template/ManageVendor.xlsx","ManageVendor.xlsx"]}
      />
    </>
  );
};

export default ManageVendor;
