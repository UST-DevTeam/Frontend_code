import React, { useEffect, useState } from "react";
import { UilMultiply } from "@iconscout/react-unicons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import ComponentActions from "../store/actions/component-actions";
import { isValidObjectId } from "../utils/commonFunnction";


function changeCase(str) {
  const words = str.split(/(?=[A-Z]+)|(?=[a-z])(?=[A-Z])/);
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  let strdata=capitalizedWords.join('')
  return strdata.replace("%20"," ");
}

const BreadCrumbs = () => {
  const consoleUrl = window.location.pathname;
  let data = consoleUrl.split("/")

  
  // let specialUrl={
  //   "projectManagement_1":[
  //     "/manageCustomer",
  //     "/projectManagement/"+data[2]+"/"+data[4]
  //   ],
    
  //   "projectManagement_2":[
  //     "/manageCustomer",
  //     "/projectManagement/"+data[2]+"/"+data[4]
  //   ],
  // }
  const { cname, customeruniqueId, projecttypeuniqueId } = useParams();
  let itm =""

  let Dtheader={
    "manageCustomer":{
      "name":"Project Management",
      "url":"/manageCustomer"
    },
    "projectManagement":{
      "name":"Project Management",
      "url":"/manageCustomer"
    },
    // "GoToProject":{
    //   "name":"Go To Project",
    //   "url":`${"/projectManagement_1"}/${cname}/GoToProject/${customeruniqueId}`
    // },
    "projectManagement_1":{
      "name":"Project Management",
      "url":`${"/projectManagement_1"}/${cname}/projectType/${customeruniqueId}/${projecttypeuniqueId}`
    },

    "projectManagement_1":{
      "name":"Project Management",
      "url":"/manageCustomer"
    },

    "projectManagement_2":{
      "name":"Project Management",
      "url":"/manageCustomer"
    },
    "home":{
      "name":"My Home",
      "url":"/home"
    },
    "hr":{
      "name":"Human Resource",
      "url":"/hr"
    },
    "empDetailsTable":{
      "name":"All Employee Details",
      "url":"/hr/empDetailsTable"
    },
    
    "Claim":{
      "name":"Expense",
      "url":"/hr/Claim" 
    },
    "attendance":{
      "name":"Attendance",
      "url":"/hr/attendance"
    },
    "superAdmin":{
      "name":"Super Admin",
      "url":"/hr/superAdmin"
    },
    "claimType":{
      "name":"Claim Type",
      "url":"/hr/superAdmin/claimType"
    },
    "financial":{
      "name":"Financial",
      "url":"/financial"
    },
    "poManagement":{
      "name":"PO Management",
      "url":"/financial/poManagement",
    },
    "invoiceMgmt":{
      "name":"Invoice Management",
      "url":"/financial/invoiceMgmt",
    },
    "poWorkDone":{
      "name":"PO WorkDone",
      "url":"/financial/poWorkDone",
    },
    "unbilled":{
      "name":"Unbilled",
      "url":"/financial/Unbilled",
    },
    "forms":{
      "name":"Forms",
      "url":"/forms",
    },
    "gapAnalysis":{
      "name":"Gap Analysis",
      "url":"/forms/gapAnalysis",
    },
    "EVMDelivery":{
      "name":"EVM Delivery",
      "url":"/forms/EVMDelivery",
    },
    "claimAndAdvance":{
      "name":"Claim And Advance",
      "url":"/home/claimAndAdvance",
    },
    "approverCards":{
      "name":"Approval",
      "url":"/home/approverCards",
    },
    "vendor":{
      "name":"Partner",
      "url":"/vendor",
    },
    "dashboard":{
      "name":"Dashboard",
      "url":"/",
    },
    "personalInfo":{
      "name":"Personal Information",
      "url":"/home/personalInfo",
    },
  }
  


  console.log(consoleUrl.split("/"),"consoleUrlconsoleUrl")
  let breadcrumblist = useSelector((state) => {
    return state.component.breadcrumb;
  });
  let globalValuelist = useSelector((state) => {
    return state.component.globalValue;
  });


  console.log(consoleUrl.split("/").filter(item => item !== "" && !isValidObjectId(item)),"breadcrumblistbreadcrumblist")

  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  
  const checkInGlobalValue = (data) => {

    data=data.replace("%20"," ")

    let dwqata=globalValuelist.filter(item=>item.name==data)

    console.log(dwqata,data,globalValuelist,"globalValuelistglobalValuelist")
    if(dwqata.length > 0){
      return dwqata[0]["value"]
    }else{
      return ""
    }
  }

  const addSpacesToWords = (text) => {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  return (
    <div>
      <nav className="bg-[#3e454d] pl-3 p-[12px] text-[16px] font-poppins font-extrabold text-md">
        <ol className="list-reset flex text-white">
          {consoleUrl.split("/").filter(item => item !== "" && !isValidObjectId(item)).map((item, index) => {
            return ( 
              <>
                {index != consoleUrl.split("/").filter(item => item !== "" && !isValidObjectId(item)).length - 1  ? (
                  <>
                    <li>
                      <a
                        className="text-pcol hover:text-pcolhover cursor-pointer"
                        onClick={() => {

                          navigate(item in Dtheader ? Dtheader[item]["url"] : checkInGlobalValue(item)!="" ? checkInGlobalValue(item) : "");
                        }}
                      >
                        {item in Dtheader ? Dtheader[item]["name"] : isValidObjectId(item)?"":changeCase(item)}
                      </a>
                    </li>
                    <li className="mx-2">/</li>
                  </>
                ) : (
                  <>
                        {item in Dtheader ? Dtheader[item]["name"] : isValidObjectId(item)?" ": addSpacesToWords(changeCase(item))}
                  </>
                )}
              </>
            );
          })}
        </ol>
      </nav>
    </div>
  );
  // return (
  //   <div>
  //     <nav className="bg-violet-50 p-3 text-[12px]">
  //       <ol className="list-reset flex text-gray-600">
  //         {consoleUrl.split("/").filter(item => item !== "" && !isValidObjectId(item)).map((item, index) => {
  //           return (
  //             <>
  //               {console.log(index,consoleUrl.split("/").filter(item => item !== "" && !isValidObjectId(item)).length,"dsadsadsadasdsadsa")}
  //               {index != consoleUrl.split("/").filter(item => item !== "" && !isValidObjectId(item)).length - 1  ? (
                  
  //                 <>
  //                   <li>
  //                     <a
  //                       className="text-green-600 hover:text-green-700"
  //                       onClick={() => {
  //                         // dispatch(
  //                         //   ComponentActions.breadcrumb(
  //                         //     "",
  //                         //     "",
  //                         //     item.index,
  //                         //     false
  //                         //   )
  //                         // );
  //                         navigate(item in Dtheader ? Dtheader[item]["url"] : consoleUrl.split("/")[1] in specialUrl ? specialUrl[consoleUrl.split("/")[1]][index] : "");
  //                       }}
  //                     >
  //                       {item in Dtheader ? Dtheader[item]["name"] : isValidObjectId(item)?"":item}
  //                     </a>
  //                   </li>
  //                   <li className="mx-2">/</li>
  //                 </>
  //               ) : (
  //                 <>
  //                       {item in Dtheader ? Dtheader[item]["name"] : isValidObjectId(item)?"":changeCase(item)}
  //                 </>
  //               )}
  //             </>
  //           );
  //         })}
  //       </ol>
  //     </nav>
  //   </div>
  // );
  // return (
  //   <div>
  //     <nav className="bg-violet-50 p-3 text-[12px]">
  //       <ol className="list-reset flex text-gray-600">
  //         {breadcrumblist.filter(item=>item.name!="").map((item, index) => {
  //           return (
  //             <>
  //               {index != breadcrumblist.length - 1 ? (
  //                 <>
  //                   <li>
  //                     <a
  //                       className="text-green-600 hover:text-green-700"
  //                       onClick={() => {
  //                         dispatch(
  //                           ComponentActions.breadcrumb(
  //                             "",
  //                             "",
  //                             item.index,
  //                             false
  //                           )
  //                         );
  //                         navigate(item.link);
  //                       }}
  //                     >
  //                       {item.name}
  //                     </a>
  //                   </li>
  //                   <li className="mx-2">/</li>
  //                 </>
  //               ) : (
  //                 <>
  //                   <li className="text-slate-600 font-semibold">{item.name}</li>
  //                 </>
  //               )}
  //             </>
  //           );
  //         })}
  //       </ol>
  //     </nav>
  //   </div>
  // );
};

export default BreadCrumbs;
