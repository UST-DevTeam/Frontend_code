import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../../components/CCDash";
import { useNavigate } from "react-router-dom";
import ComponentActions from "../../../../store/actions/component-actions";

import { getAccessType } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";

const Ptw = () => {
  const [type, settype] = useState(false);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  let showType1 = getAccessType("Total Partners(Graph)");

  let graph1 = false;

  if (showType1 === "visible") {
    graph1 = true;
  }

  return (
    <>
      <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto ">
        <CCDash
          showbtn={false}
          approveddata={[
            ["Work At Height", "bg-pcol", "/superAdmin/ptw/workatheight"],
            ["Ground Activity", "bg-pcol", "/superAdmin/ptw/groundactivity"],
            ["Drive Test Activity", "bg-pcol", "/superAdmin/ptw/drivetestactivity"],
            ["RTWS", "bg-pcol", "/superAdmin/ptw/rtws"],
            ["Rejection reasons", "bg-pcol", "/superAdmin/ptw/rejectionreasoin"],
            ["MDB Approver", "bg-pcol", "/superAdmin/PTW/mdbApprover"],
            ["PTW Log Backup", "bg-pcol", "cPTWLogBackup"],
          ].map((itm) => {
            return (
              <>
                <div
                  className={`${itm[1]} bg-pcol text-white text-[14px] md:text-[11px] xl:text-[14px] text-center shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                  // className={`${itm[1]} shadow-md hover:shadow-2xl w-[96%] h-16 flex cursor-pointer rounded-lg hover:scale-[106%] transition-all duration-500 font-oxygen font-bold hover:text-lg border-[1px] border-b-[7px] ${itm[4]} relative`}
                  onClick={() => {
                    dispatch(ComponentActions.globalUrlStore(itm[0], itm[2]));
                    dispatch(
                      ComponentActions.breadcrumb(itm[0], itm[2], 2, false)
                    );
                    navigate(itm[2]);
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
                  <div className="m-auto">{itm[0]}</div>
                  {/* <div className="flex items-center justify-between w-full p-1">
                    <div className="flex flex-col items-start">
                      <div className="text-xl font-bold text-[#dd2d4a]">0</div>
                      <div className="shining-text bg-black text-[12px] whitespace-nowrap font-extrabold bg-clip-text text-transparent ">
                        {itm[0]}
                      </div>
                    </div>
                    <div className="rotating-icon">{itm[3]}</div>
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-stone-800 to-stone-900 opacity-30 pointer-events-none" /> */}
                </div>
              </>
            );
          })}
          settype={settype}
          label="Add / Modify Customer"
        />
      </div>
    </>
  );
};

export default Ptw;
