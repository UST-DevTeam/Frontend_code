import React, { useEffect, useState } from "react";
import { UilMultiply } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import ComponentActions from "../store/actions/component-actions";
import { isValidObjectId } from "../utils/commonFunnction";


function changeCase(str) {
  // Split the string into words
  const words = str.split(/(?=[A-Z]+)|(?=[a-z])(?=[A-Z])/);

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // Join words with spaces
  return capitalizedWords.join('');
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

  let Dtheader={
    "manageCustomer":{
      "name":"Project Management",
      "url":"/manageCustomer"
    },
    "projectManagement":{
      "name":"Project Management",
      "url":"/manageCustomer"
    },
    "projectManagement_1":{
      "name":"Project Management",
      "url":"/manageCustomer"
    },
    "projectManagement_2":{
      "name":"Project Management",
      "url":"/manageCustomer"
    },
    "hr":{
      "name":"Human Resource",
      "url":"/hr"
    },
    "empDetailsTable":{
      "name":"Employee Details Table",
      "url":"/hr/empDetailsTable"
    },
    
    "expenseAdvance":{
      "name":"Expense & Advance",
      "url":"/hr/expenseAdvance"
    },
    "attendance":{
      "name":"Attendance",
      "url":"/hr/attendance"
    },
    "superAdmin":{
      "name":"Super Admin",
      "url":"/hr/superAdmin"
    }
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
    let dwqata=globalValuelist.filter(item=>item.name==data)
    if(dwqata.length > 0){
      return dwqata[0]["value"]
    }else{
      return ""
    }
  }



  
  return (
    <div>
      <nav className="bg-violet-50 p-3 text-[12px] font-poppins font-bold text-sm">
        <ol className="list-reset flex text-gray-600">
          {consoleUrl.split("/").filter(item => item !== "" && !isValidObjectId(item)).map((item, index) => {
            return (
              <>
                {index != consoleUrl.split("/").filter(item => item !== "" && !isValidObjectId(item)).length - 1  ? (
                  <>
                    <li>
                      <a
                        className="text-green-600 hover:text-green-700"
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
                        {item in Dtheader ? Dtheader[item]["name"] : isValidObjectId(item)?"":changeCase(item)}
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
