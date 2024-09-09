import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate, useParams } from "react-router-dom";

import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import ProjectChart from "../Dashboard1/ProjectChart";
import ClaimAndAdvanceChart from "../Dashboard1/ClaimAndAdvanceChart";
import TrendPlanVSActualWorkdone from "../Formss/FinancialGraph/TrendPlanVSActualWorkdone";
import CirclePlanVSActualWorkdone from "../Formss/FinancialGraph/CirclePlanVSActualWorddone";
import PoStatusChart from "../Dashboard1/PoStatusChart";
import PoTrackingWorkdoneChart from "../Dashboard1/PoTrackingWorkdoneChart";
import MonthRevenueTrend from "../Formss/FinancialGraph/MonthRevenueTrend";
import MonthlyRevenueCircle from "../Formss/FinancialGraph/MonthlyRevenueCircle";
import CumulativeTrendPlanVsActual from "../Formss/FinancialGraph/CumulativeTrendPlanVsActual";
import AccrualRevenueTrendChart from "../Dashboard1/AccrualRevenueTrendChart";
import CurrentuserActions from "../../../store/actions/currentuser-action";

const FinancialCards = () => {
  // const [modalOpen, setmodalOpen] = useState(false)
  // const [modalBody, setmodalBody] = useState(<></>)
  const [type, settype] = useState(false);
  // const [modalHead, setmodalHead] = useState(<></>)
  let dispatch = useDispatch();
  const { cname, customeruniqueId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Financial", "/financial", 0, true));
    // dispatch(CurrentuserActions.getcurrentuserCircleWithProjectId(true,"",0));
  }, []);
  return (
    <>
    <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto ">
     <CCDash
        showbtn={false}
        approveddata={[
          ["PO Management", "bg-pcol", "/financial/poManagement",],
          ["Revenue Management", "bg-pcol", "/financial/invoiceMgmt"],
          ["Workdone", "bg-pcol", "/financial/poWorkDone",],
          ["Unbilled", "bg-pcol", "/financial/unbilled"],
  
        ].map((itm) => {
          return (
            <>
              {(getAccessType(itm[0]) == "visible" ||
                getAccessType(itm[0]) == "disabled") ? (
                <div
                  // className={`${itm[1]} shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  `}
                  className={`${itm[1]} bg-pcol text-white text-center text-[13px] md:text-[11px] xl:text-[13px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                  onClick={() => {


                    console.log(getAccessType(itm[0]), "getAccessType(itm[0])")
                    if (getAccessType(itm[0]) == "visible") {

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
                   <div className="m-auto">
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
     <div className="grid lg:grid-cols-1 m-2 mt-20 gap-2">
        {/* <PoStatusChart customeruniqueId = {customeruniqueId} />
        <MonthRevenueTrend />
        <MonthlyRevenueCircle />
        <CumulativeTrendPlanVsActual />
        <PoTrackingWorkdoneChart customeruniqueId = {customeruniqueId} />
        <AccrualRevenueTrendChart customeruniqueId = {customeruniqueId} /> */}
      </div>
    </>
  );
};

export default FinancialCards;
