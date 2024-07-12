import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";

import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import ProjectChart from "../Dashboard1/ProjectChart";
import ClaimAndAdvanceChart from "../Dashboard1/ClaimAndAdvanceChart";

const FormsCards = () => {
  // const [modalOpen, setmodalOpen] = useState(false)
  // const [modalBody, setmodalBody] = useState(<></>)
  const [type, settype] = useState(false);
  // const [modalHead, setmodalHead] = useState(<></>)
  let dispatch = useDispatch();

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Forms", "/forms", 0, true));
  }, []);
  return (
    <>
      <div className="absolute w-full top-12 mt-12 h-[48] z-10 bg-[#3e454d] overflow-auto ">
      <CCDash
        showbtn={false}
        approveddata={[
          ["EVM-Financial", "bg-[#0e8670]", "/forms/earnValueManagementFinancial",],
          ["EVM-Delivery", "bg-[#0e8670]", "/forms/EVMDelivery"],
          ["SOB", "bg-[#0e8670]", "/forms/SOB",],
          ["Gap Analysis", "bg-[#0e8670]", "/forms/GapAnalysis"],
          ["P&L", "bg-[#0e8670]", "/forms/P&L"],
          ["Liquidation Plan", "bg-[#0e8670]", "/forms/LiquidationPlan"],
          ["Accrual Revenue Trend", "bg-[#0e8670]", "/forms/AccrualRevenueTrend"],
        ].map((itm) => {
          return (
            <>
              {getAccessType(itm[0]) == "visible" || getAccessType(itm[0]) == "disabled" ? (
                <div
               className="bg-[#0e8670] text-white shadow-md hover:shadow-rxl text-center w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-full flex h-16 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-lg hover:bg-[#FFAB2D] hover:text-[#4a525b]"
                  onClick={() => {


                    console.log(getAccessType(itm[0]), "getAccessType(itm[0])")
                    if ( getAccessType(itm[0]) == "visible") {

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
                  <div className="m-auto text-white">
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 m-2 mt-44 gap-2">

        <ProjectChart />
        <ClaimAndAdvanceChart />  
        {/* <MileStoneChart />
        <PoStatusChart />
        <PoTrackingWorkdoneChart />
        <AccrualRevenueTrendChart /> */}

      </div>
    </>
  );
};

export default FormsCards;
