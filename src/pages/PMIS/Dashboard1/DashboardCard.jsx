import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
// import ManageCustomerForm from "../../../PMIS/Admin/ManageCustomer/ManageCustomerForm";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
// import ToggleButton from "../../../../components/ToggleButton";
import {
  getAccessType,
  objectToQueryString,
} from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../utils/url";
// import OperationManagementActions from "../../../../store/actions/admin-actions";
import AdminActions from "../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import CCDash from "../../../components/CCDash";
import ConditionalButton from "../../../components/ConditionalButton";

import ComponentActions from "../../../store/actions/component-actions";
const DashboardCard = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  const currentDate = new Date();
  const dt = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  let dbConfigList = useSelector((state) => {
    console.log(state, "state statejjjj");
    let interdata = state?.adminData?.getManageCustomer;
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,


    
      };
      return updateditm;
    });
  });
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.adminData?.getManageCustomer;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(AdminActions.getManageCustomer());
    dispatch(ComponentActions.breadcrumb("Project Management", "/manageCustomer", 0, true));
  }, []);

  return  (
      <CCDash
        approveddata={dbConfigList?.map((itm) => {
          return (
            <>
              <div
                className="bg-gradient-to-r from-indigo-500/50 to-green-500/50 shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  "
                onClick={() => {
                  dispatch(
                    ComponentActions.globalUrlStore(itm["customerName"], `${"/projectManagement"}/${itm["customerName"]}/${itm["uniqueId"]}`)
                  );
                  navigate(`${"/projectManagement"}/${itm["customerName"]}/${itm["uniqueId"]}`);
                }}
              >
                {itm["companyimg"] && itm["companyimg"] != "" && (
                  <>
                    <img
                      className="m-auto w-16"
                      src={backendassetUrl + itm["companyimg"]}
                    />
                  </>
                )}
                <div className="m-auto ">{itm["customerName"]}</div>
              </div>
            </>
          );
        })}
        settype={settype}
        label="Add/Modify Customer"
      />
  );
};

export default DashboardCard;