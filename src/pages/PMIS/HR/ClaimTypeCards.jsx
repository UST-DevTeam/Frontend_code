import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";

const ClaimTypeCards = () => {

  const [type, settype] = useState(false);

  let dispatch = useDispatch()

  let navigate = useNavigate();

  return (
    <>
      <CCDash
        showbtn={false}
        approveddata={[
          [
            "Claim Type Category",
            "bg-gradient-to-r from-teal-400 to-sky-500",
            "/hr/superAdmin/claimType/claimTypeCategories",
          ],
          [
            "ClaimType Designation",
            "bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-300",
            "/hr/superAdmin/claimType/claimTypeDesignation",
          ],
          [
            "Unit Rate",
            "bg-gradient-to-r from-rose-400 via-orange-400 to-red-500",
            "/hr/superAdmin/claimType/claimTypeUnitRate",
          ],
        ].map((itm) => {
          return (
            <>
              <div
                className={`${itm[1]} shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  `}
                onClick={() => {
                  dispatch(
                    ComponentActions.globalUrlStore(
                      itm[0],
                      itm[2]
                    )
                  );
                  dispatch(ComponentActions.breadcrumb(itm[0], itm[2], 2, false));
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
                <div className="m-auto bg-gradient-to-r from-stone-800 to-stone-900 bg-clip-text text-transparent text-center">
                  {itm[0]}
                </div>
              </div>
            </>
          );
        })}
        settype={settype}
        label=""
      />
    </>
  );
};

export default ClaimTypeCards;
