// import React, { useEffect, useState } from "react";
// import { useDispatch} from "react-redux";
// import CCDash from "../../../components/CCDash";
// import { useNavigate } from "react-router-dom";
// import ComponentActions from "../../../store/actions/component-actions";
// import { getAccessType } from "../../../utils/commonFunnction";
// import { ALERTS } from "../../../store/reducers/component-reducer";

// const ParentApproverCards = () => {
//   const [type, settype] = useState(false);
//   let dispatch = useDispatch();

//   let navigate = useNavigate();

//   useEffect(() => {
//     dispatch(ComponentActions.breadcrumb("Home", "/home", 0, true));
//   }, []);
//   return (
//     <>
//       <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto">
//       <CCDash
//         showbtn={false}
//         approveddata={[
//           [
//           "Expense/Advance",
//           "bg-pcol", 
//           "/home/approverCards"
//           ],
//           [
//           "Compliance", 
//           "bg-pcol",
//           "/home/complianceMilestoneCard"
//           ],
//         ].map((itm) => {
//           return (
//             <>
//               {/* {(getAccessType(itm[0]) == "visible" || getAccessType(itm[0]) == "disabled") ? ( */}
//               {(1==1) ? (
//                 <div
//                   className={`${itm[1]} bg-pcol text-white text-[14px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
//                   onClick={() => {
//                     // if (getAccessType(itm[0]) == "visible") {
//                     if (1==1) {
//                       dispatch(ComponentActions.globalUrlStore(itm[0], itm[2]));
//                       navigate(itm[2]);
//                       dispatch(ComponentActions.breadcrumb(itm[0], itm[2], 1, false));
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
//                   <div className="m-auto">{itm[0]}</div>
//                 </div>
//               ) : (
//                 <></>
//               )}
//             </>
//           );
//         })}
//         settype={settype}
//       />
//       </div>
//     </>
//   );
// };

// export default ParentApproverCards;




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import AdminActions from "../../../store/actions/admin-actions";

const ParentApproverCards = () => {

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let dbConfigListCard = useSelector((state) => {
    let interdata = state?.adminData?.getCardComplainceMilestone;
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
      };
      return updateditm;
    });
  });


  const cards = [
    ["Expense/Advance", "bg-pcol", "/home/approverCards"],
    ["Compliance", "bg-pcol", "/home/complianceMilestoneCard"],
  ];

  const additionalCards = {
    "Expense/Advance": [
      ["L1 Approver","bg-pcol","/home/approverCards/L1Approver"],
      ["L2 Approver", "bg-pcol","/home/approverCards/L2Approver"],
      ["Finance Approver", "bg-pcol","/home/approverCards/FinanceApprover"],
      ["Settlement Amount", "bg-pcol","/home/approverCards/SettlementAmount"],
    ],
    "Compliance": [
      ["Compliance 1", "bg-pcol", "/home/compliance1"],
      ["Compliance 2", "bg-pcol", "/home/compliance2"],
    ],
  };

  const [type, settype] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    dispatch(AdminActions.getCardComplianceMilestone());
    dispatch(ComponentActions.breadcrumb("Home", "/home", 0, true));
  }, []);

  const handleCardClick = (cardName, cardPath) => {
    if (selectedCard === cardName) {
      setSelectedCard(null);
    } else {
      setSelectedCard(cardName);
      dispatch(ComponentActions.globalUrlStore(cardName, cardPath));
      dispatch(ComponentActions.breadcrumb(cardName, cardPath, 1, false));
      // navigate(cardPath);
    }
  }

  return (
    <>
      <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto">
        <CCDash
          showbtn={false}
          approveddata={cards.map((itm) => (
            <div
              key={itm[0]}
              className={`${itm[1]} bg-pcol text-white text-[14px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
              onClick={() => handleCardClick(itm[0], itm[2])}
            >
              <div className="m-auto">{itm[0]}</div>
            </div>
          ))}
          settype={settype}
        />
      </div>

      {selectedCard && (
        <div className="mt-16">
          <h3 className="text-white font-bold text-lg">
            {/* Additional Cards for {selectedCard}: */}
          </h3>
          <div className="flex flex-wrap w-3/4 gap-5 p-2">
            {additionalCards[selectedCard]?.map((itm) => (
              <div
                key={itm[0]}
                className={`${itm[1]} text-white text-[14px] shadow-md hover:shadow-rxl w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                onClick={() => navigate(itm[2])}
              >
                <div className="m-auto">{itm[0]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ParentApproverCards;

