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
const UserAccessManagementChild = ({showdata,setshowData,btnName,listValue,name,child}) => {

  const [showView,setShowView] = useState(false)
  let roleList = useSelector((state) => {
    console.log(state, "state state");
    let interdata = state?.adminManagement?.roleList;
    return interdata;
  });
  return (
    <>
      <Button name={"showdata"} classes="my-2 w-auto" onClick={()=>{
        setshowData(prev=>{
          return btnName
        })
      }}/>

      {
        showdata==btnName ? <>{showdata}saa{btnName}</> : <>{showdata}saa{btnName}</>
      }

      
      {showdata==btnName && listValue.map((itew) => {
        return (
          <tr>
            <td className="min-w-[300px] max-w-[300px] border-red-200 border-2">
              {itew[name]}{showdata}
            </td>
            {roleList.map((itm) => {
              return (
                <td className="min-w-[200px] max-w-[200px] border-red-200 border-2 text-center">
                  {
                    child == "checkbox" && <input type={"checkbox"} />
                  }
                  {
                    child == "select" && <select>
                      <option>S</option>
                      <option>R</option>
                      <option>W</option>
                      <option>H</option>
                    </select>
                  
                  }
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
