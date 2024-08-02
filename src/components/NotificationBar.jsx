import * as Unicons from "@iconscout/react-unicons";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const NotificationBar = ({ modalRef, roleName, calllogout }) => {

  const msgdata=useSelector((state) => {

    console.log(state.websocket.data_from_socket,"statestatestatestatestate")
    return state.websocket.data_from_socket.notification ? state.websocket.data_from_socket.notification : []
  })

  const msgapidata=useSelector((state) => {

    // return [
    //   {
    //     "msg": "BulkSite (1).xlsx completed",
    //     "typem": "old",
    //     "time": "1722534094313657"
    //   }
    // ]

    console.log(state.websocket.data_from_socket,"statestatestatestatestate")
    return state.websocket.data_from_socket.notification ? state.websocket.data_from_socket.notification : []
  })



  useEffect(()=>{

  },[""])
  return (
    <>
      <div
        ref={modalRef}
        className="absolute right-1 mt-10 w-[400px] h-72 overflow-scroll bg-[#4f5760] shadow-lg rounded-md z-[100000] border-[1.5px] border-pcol"
      >
        <div className="p-2">
          {[...msgapidata,...msgdata].map((it,index) => {
            return it.typem!="new"?<div className="border-2 border-white p-2 m-2 flex text-center items-center bg-gray-300">
                <img src="/logo.png" width={60} height={60} className="bg-gray-400 rounded-xl p-2"/>
                <p className="pl-2 text-black text-left">{it.msg}<br/>{it.time}</p>
              </div>:<div className="border-2 border-white p-2 m-2 flex text-center items-center bg-gray-600">
                <img src="/logo.png" width={60} height={60} className="bg-gray-400 rounded-xl p-2"/>
                <p className="pl-2 text-white text-left">{it.msg}<br/>{it.time}</p>
              </div>;
          })}
          <div></div>
          {/* <div className="">
                        <button className="w-full text-center text-gray-700 hover:text-blue-600 py-2 font-medium">Change Password</button>
                    </div> */}
        </div>
      </div>
    </>
  );
};

export default NotificationBar;
