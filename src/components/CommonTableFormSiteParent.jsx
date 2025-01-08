import React, { useEffect, useState } from "react";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import CustomizedButton from "./CustomizedButton";

let types = ["text", "password", "email", "hidden", "number"];

const CommonTableFormSiteParent = ({
  tabslist,
  setmodalFullOpen,
  funcaller,
  defaultValue,
  setType = () => { }
}) => {

  const [activeTab, setActiveTab] = useState(defaultValue);

  const [tabData, setTabData] = useState({});

  const handleTabClick = (index) => {
    funcaller()
    setActiveTab(index);
  };

  const updateTabData = (tabName, newData) => {
    setTabData(prevData => ({
      ...prevData,
      [tabName]: newData
    }));
  };

  useEffect(() => {
    // funcaller()
    // setType(true)
    // return () => {
    //   funcaller()
    //   setType(false)
    //   console.log("component unmounted")
    // }
  }, [])

  return (
    <div className="max-w-full mx-auto">
      <div className="flex border-b-[1.5px] border-gray-400 p-1">
        {
          Object.keys(tabslist).map((itm) => {
            return <CustomizedButton
              onClick={() => handleTabClick(itm)}
              classes={`${activeTab === itm ? 'mb-1 border-b-[3px] border-pcol text-[#f4d3a8] bg-primaryLine text-center' : 'bg-purple-200 hover:bg-rose-400 hover:text-white text-black '} mx-1 w-auto`}
              name={itm}
            >
            </CustomizedButton>
          })
        }

      </div>

      <div className="p-1">
        {
          Object.keys(tabslist).map((itm) => {
            return activeTab === itm && (
              <div>
                {/* <h2 className="text-xl font-semibold"></h2>
                <p>This is the content of tab 1.</p> */}

                {tabslist[itm]}
              </div>
            )

          })
        }

        {/* {activeTab === 1 && (
          <div>
            <h2 className="text-xl font-semibold">Content 2</h2>
            <p>This is the content of tab 2.</p>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2 className="text-xl font-semibold">Content 3</h2>
            <p>This is the content of tab 3.</p>
          </div>
        )} */}
      </div>

      <div className="flex">
        {setmodalFullOpen && activeTab !== "Financials" &&
          <Button name={"Submit"} classes="w-auto" onClick={() => {
            setmodalFullOpen(prev => !prev)
          }} />

        }
      </div>

    </div>
  );
};

export default CommonTableFormSiteParent;
