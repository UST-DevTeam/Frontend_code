import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";

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
      <CCDash
        showbtn={false}
        approveddata={[
          [
            "Partner On-Board",
            "bg-gradient-to-r from-teal-400 to-sky-500",
            "/vendor/managePartner",
          ],
          [
            "Project Tracking",
            "bg-gradient-to-r from-teal-200 to-teal-500",
            "/vendorProject",
          ],
          ["Commercial", "bg-gradient-to-r from-pink-400 to-red-400"],
        ].map((itm) => {
          return (
            <>
              <div
                className={`${itm[1]} shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg `}
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
                <div className="m-auto bg-gradient-to-r from-stone-800 to-stone-900 bg-clip-text text-transparent">
                  {itm[0]}
                </div>
              </div>
            </>
          );
        })}
        settype={settype}
        label="Add / Modify "
      />
    </>
  );
};

export default VendorCards;
