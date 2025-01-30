import React, { useEffect, useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";
import { GET_COMPLIANCE_APPROVER } from "../../../store/reducers/admin-reducer";

const SuperAdmin = () => {
  const [type, settype] = useState(false);

  let dispatch = useDispatch()

  let navigate = useNavigate();

  return (
    <>
    <div className="absolute w-full top-12 mt-12 h-16 sm:h-16 md:h-32 xl:h-1/2 z-10 bg-[#3e454d] overflow-auto">
      <CCDash
        showbtn={false}
        approveddata={[
          [
            "Manage Circle",
            "bg-pcol",
            "/hr/superAdmin/manageCircle",
          ],
          [
            "Manage Zone",
            "bg-pcol",
            "/hr/superAdmin/manageZone",
          ],
          [
            "Manage Cost Center",
            "bg-pcol",
            "/hr/superAdmin/manageCostCenter",
          ],
          [
            "Manage Project Group",
            "bg-pcol",
            "/hr/superAdmin/projectGroup",
          ],
          [
            "User Access Management",
            "bg-pcol",
            "/hr/superAdmin/UserAccessManagement",
          ],
          [
            "User Project Allocation",
            "bg-pcol",
            "/hr/superAdmin/userProjectAllocation",
          ],
          [
            "Partner Project Allocation",
            "bg-pcol",
            "/hr/superAdmin/partnerProjectAllocation",
          ],
          [
            "Manage Department",
            "bg-pcol",
            "/hr/superAdmin/manageDepartment",
          ],
          [
            "Manage Grade",
            "bg-[#0e8670]",
            "/hr/superAdmin/Grade",
          ],
          [
            "Manage Profiles",
            "bg-pcol",
            "/hr/superAdmin/manageProfile",
          ],
          [
            "Completion Criteria",
            "bg-pcol",
            "/hr/superAdmin/completionCriteria",
          ],
          [
            "Claim Type",
            "bg-pcol",
            "/hr/superAdmin/claimType",
          ],
          [
            "Master Unit Rate",
            "bg-pcol",
            "/hr/superAdmin/MasterUnitRate",
          ],
          [
            "Activity Logs",
            "bg-pcol",
            "/hr/superAdmin/ActivityLogs",
          ],
          [
            "Forms & Checklist",
            "bg-pcol",
            "/hr/superAdmin/compliance",
          ],
          [
            "Compliance L1 Approver",
            "bg-pcol",
            "/hr/superAdmin/complianceL1Approver",
          ],
          [
            "Compliance L2 Approver",
            "bg-pcol",
            "/hr/superAdmin/complianceL2Approver",
          ],
        ].map((itm) => {
          return (
            <>
              <div
                  className={`${itm[1]} bg-pcol text-white text-[14px] md:text-[11px] xl:text-[14px] text-center shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                onClick={() => {
                  if(itm[0]==="Compliance L1 Approver" || itm[0]==="Compliance L2 Approver" ){
                    dispatch(GET_COMPLIANCE_APPROVER({dataAll:[],reset:true}))
                  }
                  dispatch(ComponentActions.globalUrlStore(itm[0],itm[2]));
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
                  <div className="m-auto">
                    {itm[0]}
                  </div>
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
export default SuperAdmin;
