import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";
import ProjectChart from "../Dashboard1/ProjectChart";
import ClaimAndAdvanceChart from "../Dashboard1/ClaimAndAdvanceChart";

const VendorCards = () => {
  // const [modalOpen, setmodalOpen] = useState(false)
  // const [modalBody, setmodalBody] = useState(<></>)
  const [type, settype] = useState(false);
  // const [modalHead, setmodalHead] = useState(<></>)
  // let dispatch = useDispatch()

  let navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Vendor", "/vendor", 0, true));
  }, []);

  return (
    <>
    <div className="absolute w-full top-12 mt-12 h-1/6 z-10 bg-[#3e454d] overflow-auto ">
      <CCDash
        showbtn={false}
        approveddata={[
          [
            "Partner On-Board",
            "bg-[#0e8670]",
            "/vendor/managePartner",
          ],
          [
            "Project Tracking",
            "bg-[#0e8670]",
            "/vendor/projectTracking",
          ],
          ["Commercial", 
            "bg-[#0e8670]",
            "/vendor/commercial",
          ],
            
        ].map((itm) => {
          return (
            <>
              <div
               className={`${itm[1]} shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-full h-16 flex cursor-pointer rounded-lg hover:scale-105 transition-all duration-500 font-oxygen font-extrabold hover:text-lg hover:bg-[#FFAB2D]`}
                // className={`${itm[1]} shadow-md hover:shadow-2xl w-[98%] h-16 flex cursor-pointer rounded-lg hover:scale-[106%] transition-all duration-500 font-oxygen font-bold hover:text-lg border-[1px] border-b-[7px] ${itm[4]} relative`}
                onClick={() => {
                  dispatch(
                    ComponentActions.globalUrlStore(
                      itm[0],
                      itm[2]
                    )
                  );
                  dispatch(
                    ComponentActions.breadcrumb(itm[0], itm[2], 1, false)
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
                 <div className="m-auto text-white">
                    {itm[0]}
                  </div>
                {/* <div className="flex items-center justify-between w-full p-1">
                    <div className="flex flex-col items-start">
                      <div className="text-xl font-bold text-[#dd2d4a]">0</div>
                      <div className="shining-text bg-black text-[14px] whitespace-nowrap font-extrabold bg-clip-text text-transparent ">
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
        label="Add / Modify "
      />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 m-2 mt-28 gap-2">

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

export default VendorCards;
