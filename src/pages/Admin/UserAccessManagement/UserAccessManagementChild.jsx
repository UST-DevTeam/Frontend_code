import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../../components/AdvancedTable";
// import UserManagementForm from './UserManagementForm';
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import CstmButton from "../../../components/CstmButton";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";
import ToggleButton from "../../../components/ToggleButton";
import AdminManagementActions from "../../../store/actions/adminManagement-actions";
import { objectToQueryString } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import { Urls } from "../../../utils/url";
import CustomQueryActions from "../../../store/actions/customQuery-actions";
import { Sidebar_content } from "../../../utils/sidebar_values";
const UserAccessManagementChild = ({
  showdata,
  setshowData,
  btnName,
  fromCall,
  listValue,
  name,
  child,
}) => {
  const [showView, setShowView] = useState(false);

  const dispatch = useDispatch()
  let roleList = useSelector((state) => {
    console.log(state, "state state");
    let interdata = state?.adminManagement?.roleList;
    return interdata;
  });

  let dataToView={
    "moduleName":btnName,
    "roleId":"",
    "typeVal":fromCall,
    "accessType":fromCall
  }
  return (
    <>
      <Button
        name={btnName}
        classes="my-2 w-auto"
        onClick={() => {
          setShowView((prev) => !prev);
        }}
      />

      {showView ? <>{btnName}</> : <></>}


      {showView &&
        listValue.map((itew) => {
          return (
            <tr>
              <td className="min-w-[300px] max-w-[300px] border-red-200 border-2">
                {itew[name]}
                {showdata}
              </td>
              {roleList.map((itm) => {
                console.log(itm, "itmitmitmitm");
                return (
                  <td className="min-w-[200px] max-w-[200px] border-red-200 border-2 text-center">
                    {child == "checkbox" && (
                      <input
                        onChange={(e) => {
                          dataToView["moduleName"]=itew[name]
                          dataToView["roleId"]=itm.value
                          dataToView["accessType"]=e.target.checked
                          console.log(dataToView,"dataToViewdataToView")
                          // callToApi(dataToView)
                          
                          dispatch(AdminManagementActions.PatchDataAccess(dataToView,()=>{
                            e.target.checked=e.target.checked
                          }));
                          // alert(e.target.checked + itm.roleName + btnName);
                        }}
                        type={"checkbox"}
                      />
                    )}
                    {child == "select" && (
                      <select
                        onChange={(e) => {
                          dataToView["moduleName"]=itew[name]
                          dataToView["roleId"]=itm.value
                          dataToView["accessType"]=e.target.value
                          console.log(dataToView,"dataToViewdataToView")
                          dispatch(AdminManagementActions.PatchDataAccess(dataToView,()=>{
                            e.target.value=e.target.value
                          }));
                          // alert(e.target.value + itm.roleName + btnName);
                        }}
                      >
                        <option value={""}>S</option>
                        <option value={"R"}>R</option>
                        <option value={"W"}>W</option>
                        <option value={"H"}>H</option>
                      </select>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
    </>
  );
};

export default UserAccessManagementChild;
