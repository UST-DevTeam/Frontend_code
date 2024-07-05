import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";

import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";

const ApproverCards = () => {
  const [type, settype] = useState(false);
  let dispatch = useDispatch();

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Home", "/home", 0, true));
  }, []);
  return (
    <>
      <CCDash
        showbtn={false}
        approveddata={[
          [
          "L1 Approver",
          "bg-gradient-to-r from-[#ffffea] via-[#f4e8c1] to-[#f0f4ef]/80", 
          "/home/approverCards/L1Approver", 
          <Unicons.Uil16Plus size="36" color="" />, 
          "border-b-[#f4e8c1]",
          "/home/approverCards/L1Advance",
        ],

          [
          "L2 Approver", 
         "bg-gradient-to-r from-[#ffffea] via-[#f4e8c1] to-[#f0f4ef]/80", 
          "/home/approverCards/L2Approver", 
          <Unicons.Uil17Plus size="36" color="" />,
          "border-b-[#f4e8c1]", 
          "/home/approverCards/L2Advance"],

          [
            "Finance Approver", 
            "bg-gradient-to-r from-[#ffffea] via-[#f4e8c1] to-[#f0f4ef]/80", 
            "/home/approverCards/FinanceApprover", 
            <Unicons.Uil18Plus size="36" color="" />,
            "border-b-[#f4e8c1]", 
            "/home/approverCards/L2Advance"],

        ].map((itm) => {
          return (
            <>
              {1 == 1 || (getAccessType(itm[0]) == "visible" ||
                getAccessType(itm[0]) == "disabled") ? (
                <div
                  // className={`${itm[1]} shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  `}
                  className={`${itm[1]} shadow-md hover:shadow-2xl w-[96%] h-16 flex cursor-pointer rounded-lg hover:scale-[106%] transition-all duration-500 font-oxygen font-bold hover:text-lg border-[1px] border-b-[7px] ${itm[4]} relative`}
                  onClick={() => {

                    
                    console.log(getAccessType(itm[0]), "getAccessType(itm[0])")
                    if (1 == 1 || getAccessType(itm[0]) == "visible") {

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
                  {/* <div className="m-auto bg-gradient-to-r from-stone-800 to-stone-900 bg-clip-text text-transparent">
                    {itm[0]}
                  </div> */}
                  <div className="flex items-center justify-between w-full p-1">
                    <div className="flex flex-col items-start">
                      <div className="text-xl font-bold text-[#dd2d4a]">0</div>
                      <div className="shining-text bg-black text-[15px] whitespace-nowrap font-extrabold bg-clip-text text-transparent ">
                        {itm[0]}
                      </div>
                    </div>
                    <div className="rotating-icon">{itm[3]}</div>
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-stone-800 to-stone-900 opacity-30 pointer-events-none" />
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

export default ApproverCards;
