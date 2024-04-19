import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";

import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
const HRHomeView = () => {
  // const [modalOpen, setmodalOpen] = useState(false)
  // const [modalBody, setmodalBody] = useState(<></>)
  const [type, settype] = useState(false);
  // const [modalHead, setmodalHead] = useState(<></>)
  let dispatch = useDispatch();

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("HR", "/hr", 0, true));
  }, []);
  return (
    <>
      <CCDash
        showbtn={false}
        approveddata={[
          [
            "Manage Employee",
            "bg-gradient-to-r from-teal-400 to-sky-500",
            "/empDetailsTable",
          ],
          ["Asset Management", "bg-gradient-to-r from-lime-300 to-teal-400","/hr/assetManagement"],
          ["Manage Policy", "bg-gradient-to-r from-violet-500 to-purple-500","/hr/managePolicy"],
          [
            "Expense & Advance",
            "bg-gradient-to-r from-blue-200 to-cyan-200",
            "/expenseAdvance",
          ],
          ["Attendance", "bg-gradient-to-r from-teal-200 to-teal-500","/hr/attendance"],
          [
            "Super Admin",
            "bg-gradient-to-r from-pink-400 to-red-400",
            "/hr/superAdmin",
          ],
        ].map((itm) => {
          return (
            <>
              {getAccessType(itm[0]) == "visible" ||
              getAccessType(itm[0]) == "disabled" ? (
                <div
                  className={`${itm[1]} shadow-md hover:shadow-rxl w-full flex h-24 cursor-pointer`}
                  onClick={() => {


                    console.log(getAccessType(itm[0]),"getAccessType(itm[0])")
                    if (getAccessType(itm[0]) == "visible") {
                      navigate(itm[2]);
                      dispatch(
                        ComponentActions.breadcrumb(itm[0], itm[2], 1, false)
                      );
                    } else {
                      let msgdata = {
                        show: true,
                        icon: "error",
                        buttons: [],
                        type: 1,
                        text: "This option is disabled",
                      };
                      dispatch(ALERTS(msgdata));
                    }
                  }}
                >
                  {itm["companyimg"] && itm["companyimg"] != "" && (
                    <>
                      <img
                        className="m-auto w-24"
                        src={backendassetUrl + itm["companyimg"]}
                      />
                    </>
                  )}
                  <div className="m-auto bg-gradient-to-r from-stone-800 to-stone-900 bg-clip-text text-transparent">
                    {itm[0]}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          );
        })}
        settype={settype}
        label="Add / Modify Customer"
      />
    </>
  );
};

export default HRHomeView;
