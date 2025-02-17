import { useForm } from "react-hook-form";
import CommonForm from "./CommonForm";
import { useEffect } from "react";
import DateRangePicking from "./FormElements/DateRangePicking";

function Tabs({ data,enable,setEnable, date=false }) {


  const handleDateRange = async (date) => {
    try {
      const response = await fetch("dst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });
      const result = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
    return (
      <div>
        <div className="flex items-center px-4 space-x-4 mt-1">
          {
            data.map(item => {
              return <button onClick={() => setEnable(item.label)} className={`text-white rounded-full py-[6px] px-3 ${enable === item.label ? "bg-onHoverButton" : "bg-pcol"}`}>{item.label}</button>
            })
          }

       {date && <div className="ml-auto">
        <DateRangePicking  
       itm={
        {
          label: "Date Range Selector",
          name: "dateTime",
          value: "Select",
          type: "datetimeRange",
          classes: "col-span-1",
          formatop:"yyyy-MM-DD",
          onChange :handleDateRange        
        }
       }
    />
          
        </div>}
        </div>
        <div className="mt-4 p-4">
          {
            data.find(item => item.label === enable)?.body
          }
        </div>
      </div>
  
    )
  }


export default Tabs