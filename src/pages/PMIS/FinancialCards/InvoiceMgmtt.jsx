import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";

import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";

const InvoiceMgmt = () => {
  // const [modalOpen, setmodalOpen] = useState(false)
  // const [modalBody, setmodalBody] = useState(<></>)
  const [type, settype] = useState(false);
  // const [modalHead, setmodalHead] = useState(<></>)
  let dispatch = useDispatch();

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Financial", "/financial", 0, true));
  }, []);
  return (
    <>
      <CCDash
        showbtn={false}
        approveddata={[
          ["Revenue Invoiced", "bg-gradient-to-r from-teal-400 via-teal-300 to-teal-600","/financial/invoiceMgmt/invoice"],
          ["Accrual Revenue","bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-400","/financial/invoiceMgmt/acronym",],
        ].map((itm) => {
          return (
            <>
              {1==1   || (getAccessType(itm[0]) == "visible" ||
              getAccessType(itm[0]) == "disabled") ? (
                <div
                  className={`${itm[1]} shadow-md hover:shadow-rxl w-full flex h-24 cursor-pointer`}
                  onClick={() => {


                    console.log(getAccessType(itm[0]),"getAccessType(itm[0])")
                    if (1==1 || getAccessType(itm[0]) == "visible") {

                      dispatch(
                        ComponentActions.globalUrlStore(
                          itm[0],
                          itm[2]
                        )
                      );
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

export default InvoiceMgmt;
