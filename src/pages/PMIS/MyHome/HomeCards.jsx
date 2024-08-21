// According to Shashank Srivastava code for changing theme of cards:

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";

import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import ClaimAndAdvanceChart from "../Dashboard1/ClaimAndAdvanceChart";
import ProjectChart from "../Dashboard1/ProjectChart";

const HomeCards = () => {
  const [type, settype] = useState(false);
  let dispatch = useDispatch();

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Home", "/home", 0, true));
  }, []);
  return (
    <>
      <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto ">
        <CCDash
          showbtn={false}
          approveddata={[
            [
              "Personal Info",
              "bg-pcol",
              "/home/personalInfo",
              <Unicons.UilUserCircle size="36" color="" />,
              "border-b-blue-300",
            ],
            [
              "My Task",
              "bg-pcol",
              "/home/myTask",
              <Unicons.UilFileAlt size="40" color="" />,
            ],
            [
              "Claim & Advance",
              "bg-pcol",
              "/home/claimAndAdvance",
              <Unicons.UilMoneyWithdrawal size="40" color="#b39800" />,
              "border-b-[#b39800]",
            ],
            [
              "Asset",
              "bg-pcol",
              "/home/assets",
              <Unicons.UilArchive size="40" color="white" />,
            ],
            [
              "Approvals",
              "bg-pcol",
              "/home/approverCards",
              <Unicons.UilCheckCircle size="40" color="" />,
            ],
            [
              "PTW",
              "bg-pcol",
              "/home/ptw",
              <Unicons.UilFileAlt size="40" color="" />,
            ],
            
          ].map((itm) => (
            <>
              {(
              getAccessType(itm[0]) == "visible" ||
              getAccessType(itm[0]) == "disabled") ? (
                <div
                 className={`${itm[1]} bg-pcol text-white text-center text-[14px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                  onClick={() => {
                    if (getAccessType(itm[0]) == "visible") {
                      dispatch(ComponentActions.globalUrlStore(itm[0], itm[2]));
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
                  {itm["companyimg"] && itm["companyimg"] !== "" && (
                    <>
                      <img
                        className="m-auto w-24"
                        src={backendassetUrl + itm["companyimg"]}
                        alt={itm[0]}
                      />
                    </>
                  )}
                  <div className="m-auto">{itm[0]}</div>
                </div>
              ) : (
                <></>
              )}
            </>
          ))}
          settype={settype}
          label="Add / Modify Customer"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 m-2 mt-20 gap-2">
        {/* <ProjectChart />
        <ClaimAndAdvanceChart /> */}
      </div>
    </>
  );
};

export default HomeCards;

// According to Shubham's Code (old code)

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as Unicons from "@iconscout/react-unicons";
// import { useDispatch, useSelector } from "react-redux";
// import CCDash from "../../../components/CCDash";
// import { useNavigate } from "react-router-dom";

// import ComponentActions from "../../../store/actions/component-actions";
// import { getAccessType } from "../../../utils/commonFunnction";
// import { ALERTS } from "../../../store/reducers/component-reducer";

// const HomeCards = () => {
//   const [type, settype] = useState(false);
//   let dispatch = useDispatch();

//   let navigate = useNavigate();

//   useEffect(() => {
//     dispatch(ComponentActions.breadcrumb("Home", "/home", 0, true));
//   }, []);
//   return (
//     <>
//       <CCDash
//         showbtn={false}
//         approveddata={[
//           ["Personal Info", "bg-gradient-to-r from-indigo-500/50 to-green-500/50", "/home/personalInfo"],
//           ["Claim & Advance", "bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-400", "/home/claimAndAdvance",],
//           ["Asset", "bg-gradient-to-r from-indigo-500/50 to-green-500/50", "/home/assets",],
//           ["Approvals", "bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-400", "/home/approverCards",],
//           ["PTW", "bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-400", "/home/ptw",],
//         ].map((itm) => {
//           return (
//             <>
//               {1 == 1 || (getAccessType(itm[0]) == "visible" ||
//                 getAccessType(itm[0]) == "disabled") ? (
//                 <div
//                   className={`${itm[1]} shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  `}
//                   onClick={() => {

//                     console.log(getAccessType(itm[0]), "getAccessType(itm[0])")
//                     if (1 == 1 || getAccessType(itm[0]) == "visible") {

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

// export default HomeCards;
