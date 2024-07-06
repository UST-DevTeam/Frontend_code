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
       <div className="absolute w-full top-12 mt-12 h-1/6 z-10 bg-[#3e454d] overflow-auto ">
      <CCDash
        showbtn={false}
        approveddata={[
          [
            "Manage Employee",
            "bg-[#0e8670]",
            "/hr/empDetailsTable",
            <Unicons.UilUserCircle size="30" color="" />,
          ],
          ["Asset Management", "bg-[#0e8670]", "/hr/assetManagement",<Unicons.UilMoneyWithdrawal size="30" color="" />,],
          ["Manage Policy", "bg-[#0e8670]", "/hr/managePolicy", <Unicons.UilArchive size="30" color="" />,],
          [
            "Expense & Advance",
            "bg-[#0e8670]",
            "/hr/Claim", "/hr/Advance",
          ],
          ["Attendance", "bg-[#0e8670]", "/hr/attendance",  <Unicons.UilCheckCircle size="30" color="" />,],
          [
            "Super Admin",
            "bg-[#0e8670]",
            "/hr/superAdmin",
            <Unicons.UilFileAlt size="30" color="" />,
          ],
        ].map((itm) => {
          return (
            <>
              {getAccessType(itm[0]) == "visible" ||
                getAccessType(itm[0]) == "disabled" ? (
                <div
                  className={`${itm[1]} shadow-md hover:shadow-rxl w-full text-center sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-full h-16 flex cursor-pointer rounded-lg hover:scale-[106%] transition-all duration-500 font-oxygen font-extrabold  hover:text-lg hover:bg-[#FFAB2D] `}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 m-2 mt-24 gap-2">

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

export default HRHomeView;










// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as Unicons from "@iconscout/react-unicons";
// import { useDispatch, useSelector } from "react-redux";
// import CCDash from "../../../components/CCDash";
// import { useNavigate } from "react-router-dom";

// import ComponentActions from "../../../store/actions/component-actions";
// import { getAccessType } from "../../../utils/commonFunnction";
// import { ALERTS } from "../../../store/reducers/component-reducer";
// const HRHomeView = () => {
//   // const [modalOpen, setmodalOpen] = useState(false)
//   // const [modalBody, setmodalBody] = useState(<></>)
//   const [type, settype] = useState(false);
//   // const [modalHead, setmodalHead] = useState(<></>)
//   let dispatch = useDispatch();

//   let navigate = useNavigate();

//   useEffect(() => {
//     dispatch(ComponentActions.breadcrumb("HR", "/hr", 0, true));
//   }, []);
//   return (
//     <>
//       <CCDash
//         showbtn={false}
//         approveddata={[
//           [
//             "Manage Employee",
//             "bg-gradient-to-r from-[#427d9d] to-[#9bbec8]",
//             "/hr/empDetailsTable",
//           ],
//           ["Asset Management", "bg-gradient-to-r from-lime-300 to-teal-400", "/hr/assetManagement"],
//           ["Manage Policy", "bg-gradient-to-r from-violet-500 to-purple-500", "/hr/managePolicy"],
//           [
//             "Expense & Advance",
//             "bg-gradient-to-r from-blue-200 to-cyan-200",
//             "/hr/Claim", "/hr/Advance",
//           ],
//           ["Attendance", "bg-gradient-to-r from-teal-200 to-teal-500", "/hr/attendance"],
//           [
//             "Super Admin",
//             "bg-gradient-to-r from-pink-400 to-red-400",
//             "/hr/superAdmin",
//           ],
//         ].map((itm) => {
//           return (
//             <>
//               {getAccessType(itm[0]) == "visible" ||
//                 getAccessType(itm[0]) == "disabled" ? (
//                 <div
//                   className={`${itm[1]} shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  `}
//                   onClick={() => {


//                     console.log(getAccessType(itm[0]), "getAccessType(itm[0])")
//                     if (getAccessType(itm[0]) == "visible") {

//                       dispatch(
//                         ComponentActions.globalUrlStore(
//                           itm[0],
//                           itm[2]
//                         )
//                       );
//                       navigate(itm[2]);
//                       dispatch(
//                         ComponentActions.breadcrumb(itm[0], itm[2], 1, false)
//                       );
//                     } else {
//                       let msgdata = {
//                         show: true,
//                         icon: "error",
//                         buttons: [],
//                         type: 1,
//                         text: "This option is disabled",
//                       };
//                       dispatch(ALERTS(msgdata));
//                     }
//                   }}
//                 >
//                   {itm["companyimg"] && itm["companyimg"] != "" && (
//                     <>
//                       <img
//                         className="m-auto w-24"
//                         src={backendassetUrl + itm["companyimg"]}
//                       />
//                     </>
//                   )}
//                   <div className="m-auto bg-gradient-to-r from-stone-800 to-stone-900 bg-clip-text text-transparent">
//                     {itm[0]}
//                   </div>
//                 </div>
//               ) : (
//                 <></>
//               )}
//             </>
//           );
//         })}
//         settype={settype}
//         label="Add / Modify Customer"
//       />
//     </>
//   );
// };

// export default HRHomeView;
