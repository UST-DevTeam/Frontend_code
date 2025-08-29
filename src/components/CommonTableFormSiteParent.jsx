import React, { useEffect, useState } from "react";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import CustomizedButton from "./CustomizedButton";
import Api from "../utils/api";
import axios from "axios";
import { baseUrl } from "../utils/url";
import ComponentActions from "../store/actions/component-actions";
import { useDispatch } from "react-redux";

let types = ["text", "password", "email", "hidden", "number"];

const CommonTableFormSiteParent = ({
  itemData,
  tabslist,
  setmodalFullOpen,
  funcaller,
  defaultValue,
  beforeAnyChange = () => {},
  setType = () => {},
}) => {

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(defaultValue);

  useEffect(() => {
    setActiveTab(defaultValue);
  }, [defaultValue]);

  const [tabData, setTabData] = useState({});

  const handleTabClick = (index) => {
    funcaller();
    setActiveTab(index);
  };

  const updateTabData = (tabName, newData) => {
    setTabData((prevData) => ({
      ...prevData,
      [tabName]: newData,
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
    beforeAnyChange();
  }, [activeTab]);

  return (
    <div className="max-w-full mx-auto ">
      {tabslist && (
        <>
          <div className="flex border-b-[1.5px] border-gray-400 py-1  justify-between">
            <div className="flex  border-gray-400 p-1">
              {Object.keys(tabslist).map((itm) => {
                return (
                  <CustomizedButton
                    onClick={() => handleTabClick(itm)}
                    classes={`${
                      activeTab === itm
                        ? "mb-1 border-b-[3px] border-pcol text-[#f4d3a8] bg-primaryLine text-center"
                        : "bg-purple-200 hover:bg-rose-400 hover:text-white text-black "
                    } mx-1 w-auto`}
                    name={itm}
                  ></CustomizedButton>
                );
              })}
            </div>
            <div className="flex  border-gray-400  ">
              {activeTab === "Snap" && (
                <Button
                  name={"Export Snaps"}
                  classes="w-auto h-[38px]"
                  onClick={async () => {
                    try {
                      dispatch(ComponentActions.loaders(true))
                      const response = await axios.get(
                        `${baseUrl}/downloadSnapZip/${itemData?.uniqueId}`,
                        {
                          responseType: "blob",
                        }
                      );

                      if(response?.status === 200){
                        dispatch(ComponentActions.loaders(false))
                      }
                       
                      const url = window.URL.createObjectURL(
                        new Blob([response.data])
                      );
                      const link = document.createElement("a");
                      link.href = url;

                      link.setAttribute(
                        "download",
                        `${itemData?.siteIdName}.zip`
                      );
                      document.body.appendChild(link);
                      link.click();

                      link.remove();
                      window.URL.revokeObjectURL(url);
                    } catch (error) {
                      console.error("Download failed:", error);
                      dispatch(ComponentActions.loaders(false))
                    }
                  }}
                />
              )}
            </div>
          </div>

          <div className="p-1 ">
            {Object.keys(tabslist).map((itm) => {
              return activeTab === itm && <div>{tabslist[itm]}</div>;
            })}
          </div>
        </>
      )}

      <div className="flex">
        {setmodalFullOpen && !["Basic Details"].includes(activeTab) && (
          <Button
            name={"Submit"}
            classes="w-auto"
            onClick={() => {
              setmodalFullOpen((prev) => !prev);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CommonTableFormSiteParent;
