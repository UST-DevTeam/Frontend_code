import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";

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
import { getAccessType } from "../../../../utils/commonFunnction";
const L2Approver = () => {
    const [strValFil, setstrVal] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [fileOpen2, setFileOpen2] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);

  let showType = getAccessType("Actions(Partner On-Board)");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();
  let shouldIncludeEditColumn = false;

  if (showType === "visible") {
    shouldIncludeEditColumn = true;
  }
  let table = {
    columns: [
      {
        name: "Emp Name",
        value: "empName",
        style:
          "min-w-[150px] max-w-[450px] text-center font-extrabold sticky left-0 bg-[#3e454d] z-10",
      },
      {
        name: "Customer Name",
        value: "customerName",
        style:
          "min-w-[200px] max-w-[200px] text-center sticky left-[149px] bg-[#3e454d] z-10",
      },
      {
        name: "Project Group",
        value: "projectGroup",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      {
        name: "Milestone",
        value: "milestone",
        style: "min-w-[170px] max-w-[450px] text-center whitespace-nowrap",
      },

      ...(shouldIncludeEditColumn
        ? [
            {
              name: "Edit",
              value: "edit",
              style: "min-w-[100px] max-w-[200px] text-center",
            },
            {
              name: "Delete",
              value: "delete",
              style: "min-w-[100px] max-w-[100px] text-center",
            },
          ]
        : []),
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Vendor Name",
        type: "text",
        name: "vendorName",
        props: {},
      },
      {
        label: "Vendor Code",
        type: "text",
        name: "vendorCode",
        props: {},
      },
      {
        label: "Status",
        type: "select",
        name: "status",
        option: [
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
        ],
        props: {},
      },
    ],
  };
  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
     dispatch(VendorActions.getManageVendorDetails(value, "", strVal));
  };
  return (
    <>
    <div>
      <AdvancedTable
        headerButton={
          <div className="flex">
            {" "}
            <ConditionalButton
              showType={getAccessType("Add New(Partner On-Board)")}
              classes="w-auto mr-1"
              onClick={() => {
                dispatch(GET_VENDOR_DETAILS({ dataAll: [], reset: true }));
                navigate(`${"/vendorForm"}`);
              }}
              name={"Add New"}
            ></ConditionalButton>
            <ConditionalButton
              showType={getAccessType("Upload(Partner On-Board)")}
              name={"Upload File"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen((prev) => !prev);
              }}
            ></ConditionalButton>
            {/* <ConditionalButton
              showType={getAccessType("Upgrade(Partner On-Board)")}
              name={"Upgrade Partner"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen2((prev) => !prev);
              }}
            ></ConditionalButton> */}
          </div>
        }
        table={table}
        exportButton={["/export/vendor" + "?" + strValFil, "Vendor.xlsx"]}
        filterAfter={onSubmit}
        tableName={"ManagePartner"}
        handleSubmit={handleSubmit}
        data={""}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={""}
        checkboxshow={shouldIncludeEditColumn}
        delurl={Urls.vendor_details}
        geturl={VendorActions.getManageVendorDetails()}
        getaccessExport={"Export(Partner On-Board)"}
        heading={" "}
      />
    </div>
    </>
  )
}

export default L2Approver
