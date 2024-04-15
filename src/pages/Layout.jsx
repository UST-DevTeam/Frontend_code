import React, { useEffect, useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = ({ child }) => {
  const [sidebarOpen, setsidebarOpenn] = useState(true);

  // SELECT dbConfig.*,'**********' AS A ,'**********' AS B,'**********' AS C,'**********' AS D,'**********' AS E,'**********' AS F,'**********' AS G FROM dbConfig;
  const navigate = useNavigate();
  // const [Width, setWidth] = useState(window.innerWidth)
  const handleResize = () => {
    console.log(window, "windowwindow");
    setWidth(window.innerWidth, "windowwindow");
    console.log(window.innerHeight, "windowwindow");
  };

  let breadcrumblist = useSelector((state) => {
    return state.component.breadcrumb;
  });
  // console.log(Boolean(checkauth), "checkAuthcheckAuth")
  // if(checkAuth==false){
  //     navigate("/login")
  // }
  let checkAuth = localStorage.getItem("auth");
  console.log(checkAuth, "statestatestatestate");
  // let checkauth;
  useEffect(() => {
    if (checkAuth == "false") {
      navigate("/login");
    }

    window.addEventListener("resize", handleResize);
  }, [checkAuth]);

  return (
    <>
      {/* <Sidebar sidebarOpen={sidebarOpen} setsidebarOpenn={setsidebarOpenn}/> */}
      {/* <div style={{width:Width}} className={`flex-1 h-full bg-white p-2 overflow-y-scroll`}> */}
      {/* <div>
        <nav class="bg-gray-100 p-4">
          <ol class="list-reset flex text-gray-600">
            {breadcrumblist.map((item, index) => {
              return (
                <>
                  {index != breadcrumblist.length-1 ? (
                    <>
                      <li>
                        <a class="text-green-500 hover:text-green-600" onClick={()=>{
                            navigate(item.link);
                        }}>
                          {item.name}
                        </a>
                      </li>
                      <li class="mx-2">/</li>
                    </>
                  ) : (
                    <>
                      <li class="text-gray-700 font-semibold">{item.name}</li>
                    </>
                  )}
                </>
              );
            })}
          </ol>
        </nav>
      </div> */}
      <div className={`flex-1 h-[40vh] overflow-y-scroll`}>
        {/* <div class="flex-1 bg-white p-4"> */}
        {child}
      </div>
    </>
  );
};

export default Layout;
