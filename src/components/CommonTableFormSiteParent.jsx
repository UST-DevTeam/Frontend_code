import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import TextBox from "./FormElements/TextBox";
import FilePicker from "./FormElements/FilePicker";
import SelectDropDown from "./FormElements/SelectDropDown";
import TextArea from "./FormElements/TextArea";
import Multiselection from "./FormElements/Multiselection";
import DatePicking from "./FormElements/DatePicking";
import AutoSuggestion from "./FormElements/AutoSuggestion";
import Radio from "./FormElements/Radio";
import Disabled from "./FormElements/Disabled";
import CheckBox from "./FormElements/CheckBox";
import Table from "./Table";
import TableJson from "./TableJson";
import Button from "./Button";
import RoundedButton from "./RoundedButton";
import { UilPlusCircle, UilBars, UilPen, UilSave } from '@iconscout/react-unicons'
import CreateFormField from "./CreateFormField";
import { useDispatch } from "react-redux";
import { ALERTS } from "../store/reducers/component-reducer";
import TableJsonDynamic from "./TableJsonDynamic";
import CstmButton from "./CstmButton";
import CustomizedButton from "./CustomizedButton";

let types = ["text", "password", "email", "hidden", "number"];




const CommonTableFormSiteParent = ({
  tabslist,
  setmodalFullOpen,
  funcaller,
  defaultValue
}) => {

  console.log(tabslist,"tabslisttabslisttabslist")

  const [activeTab, setActiveTab] = useState(defaultValue);


  const [tabData, setTabData] = useState({}); // State to store data for each tab

    const handleTabClick = (index) => {
        funcaller()
        setActiveTab(index);
    };

    // Function to update data for a specific tab
    const updateTabData = (tabName, newData) => {
        setTabData(prevData => ({
            ...prevData,
            [tabName]: newData
        }));
    };
  // const handleTabClick = (index) => {
  //   setActiveTab(index);
  // };

  return (
    <div className="max-w-full mx-auto">
      <div className="flex border-b-[1.5px] border-gray-400 p-1">

        {
          Object.keys(tabslist).map((itm) => {

            console.log(itm, "itmitmitmitmitm")
            return <CustomizedButton
              onClick={() => handleTabClick(itm)}
              classes={`${activeTab === itm ? 'mb-1 border-b-[3px] border-pcol text-white bg-primaryLine text-center' : 'bg-purple-200 hover:bg-rose-400 hover:text-white text-black '} mx-1 w-auto`}
              name={itm}
            >

            </CustomizedButton>
          })
        }


      </div>

      <div className="p-1">

        {
          Object.keys(tabslist).map((itm) => {

            console.log(activeTab, itm, "itmitmitmitmitm")
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
        <Button name={"Submit"} classes="w-auto" onClick={()=>{
          setmodalFullOpen(prev=>!prev)
        }}/>

      }
      </div>

    </div>
  );
};

export default CommonTableFormSiteParent;
