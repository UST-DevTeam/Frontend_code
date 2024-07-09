import Multiselect from "multiselect-react-dropdown";
import React, { useState } from "react";
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
import { types, uiList } from "../utils/queryBuilder";
import BigMultiselection from "./FormElements/BigMultiselection";
import NewMultiSelectsForm from "./FormElements/NewMultiSelectForm";
import NewMultiSelects, { NewMultiSelects2 } from "./NewMultiSelect";
import NewMultiselection from "./FormElements/NewMultiselection";
import Email from "./FormElements/Email";


const CommonForm = ({
  classes,
  encType = false,
  Form,
  errors,
  handleSubmit,
  setValue,
  getValues,
  register,
  reset = true,
}) => {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(true);

  // let Form = [
  //     { label: "Name", value: "", type: "text" },
  //     { label: "Email", value: "", type: "email" },
  //     { label: "Password", value: "", type: "password" },
  //     { label: "DB Server", value: "", option: ["Abc","bca"], type: "select" }
  // ]
  // let Form = [
  //     { label: "Name", value: "", type: "text" },
  //     { label: "Email", value: "", type: "email" },
  //     { label: "Password", value: "", type: "password" },
  //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
  //     { label: "Custom Queries", value: "", option: ["Please Select Your DB Server"], type: "textarea" }
  // ]

  // console.log("Forms....... " + Form.map((newitm)=>{
  //   console.log(newitm,"newitmnewitmnewitmnewitm")
  // }));


  
  // console.log(Form, "Formdsabdjasbdhjsa");
  return (
    <>
      <form className={`overflow-scroll grid ${classes} ${Form.length>12? " h-[70vh] " : " h-auto " }`} encType="multipart/form-data">
        {console.log(errors, "errors")}
        {Form.map((itm) => {
          {
            {/* console.log(itm, "itmnewitmnewitm"); */}
          }
          return (
            <>
              {itm.type == "heading" ? (
                <>
                  <div
                    className={`${itm.classes ? itm.classes : "col-span-1"}`}
                  >
                    <h1 className="pl-8 break-words	">{itm.label}</h1>
                  </div>
                </>
              ) : (
                <></>
              )}
              {itm.type != "hidden" && itm.type != "heading" ? (
                <div
                  className={`mx-0 my-1 p-1 ${
                    itm.classes ? itm.classes : "col-span-1"
                  }`}
                >
                  {itm?.showlabel == false ? (
                    <></>
                  ) : (
                    <div className="items-center justify-between">
                      {
                        <label className="block text-sm font-medium text-white ml-3 dark:text-darkBg break-words	">
                          {itm.label}
                          {itm?.required && (
                            <span className="text-red-600 ml-1 ">*</span>
                          )}
                        </label>
                      }
                    </div>
                  )}
                  <div
                    className={
                      uiList[itm.type]?.height + " mt-2  px-2  flex flex-row"
                    }
                  >
                    {itm?.amp &&
                      itm?.amp?.map((its) => {
                        return (
                          <div
                            className={`flex flex-row border-b-2 text-white-900 sm:text-sm sm:leading-6 rounded-md bg-opacity-50  font-poppins outline-none border-gray-400  shadow-lg focus:shadow-indigo-500/30 ${
                              its?.styling
                            } ${its?.styling?.includes("w-full") ? "" : " w-24 "}`}
                          >
                        
                            
                            {its?.type == "select" && (
                              <SelectDropDown
                                itm={its}
                                errors={errors}
                                handleSubmit={handleSubmit}
                                setValue={setValue}
                                getValues={getValues}
                                register={register}
                              />
                            )}

                            {types.indexOf(its.type) != -1 && (
                              <TextBox
                                itm={its}
                                errors={errors}
                                handleSubmit={handleSubmit}
                                setValue={setValue}
                                getValues={getValues}
                                register={register}
                              />
                            )}
                          </div>
                        );
                      })}
                    {types.indexOf(itm.type) != -1 ? (
                      <>
                        <TextBox
                          itm={itm}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          setValue={setValue}
                          getValues={getValues}
                          register={register}
                        />
                      </>
                    ) : (
                      <></>
                    )}

                    
                    {itm.type == "sdisabled" || itm.type == "hdisabled" ? (
                      <>
                        <Disabled
                          itm={itm}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          setValue={setValue}
                          getValues={getValues}
                          register={register}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    {itm.type == "jsxcmpt" ? <>{itm.component}</> : <></>}

                    {itm.type == "radio" ? (
                      <>
                        <Radio
                          itm={itm}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          setValue={setValue}
                          getValues={getValues}
                          register={register}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    {itm.type == 'email' ?(
                      <>
                      <Email
                        itm={itm}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                      />
                      
                      </>
                    ):(<></>)}
                    {/* {itm.type == "img" ? (
                      <>
                        <div className="w-14 h-14 rounded-full">
                          {
                            console.log(register(itm?.name) , 'dfasdsadffdsaadfssd')
                          }
                          <img src={itm.name} alt={itm.alt} />
                        </div>
                      </>
                    ) : (
                      <></>
                    )} */}
                    {itm.type == "checkbox" ? (
                      <>
                        <CheckBox
                          itm={itm}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          setValue={setValue}
                          getValues={getValues}
                          register={register}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    {itm.type == "file" ? (
                      <>
                        <FilePicker
                          itm={itm}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          setValue={setValue}
                          getValues={getValues}
                          register={register}
                        />
                      </>
                    ) : (
                      itm?.name == 'img' ? <div>
                        <img src={itm.value} alt="" />
                        
                      </div> : <></>
                    )}
                    {itm.type == "select" ? (
                      <>
                        <SelectDropDown
                          itm={itm}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          setValue={setValue}
                          getValues={getValues}
                          register={register}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    {itm.type == "autoSuggestion" ? (
                      <>
                        <AutoSuggestion
                          itm={itm}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          setValue={setValue}
                          getValues={getValues}
                          register={register}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    {itm.type == "textarea" ? (
                      <>
                        <TextArea
                          itm={itm}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          setValue={setValue}
                          getValues={getValues}
                          register={register}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    {/* {
                                    itm.type == "datetime" ?
                                        <>
                                            <input type={"datetime-local"} {...register(itm.name, {
                                                required: itm.required ? "This " + " Field is required" : false,
                                                ...itm.props
                                            })} className={"bg-white border-black border block h-8 w-full rounded-md py-0.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                                            <p className='text-xs text-red-700'>{errors[itm.name]?.message}</p>
                                        </> :
                                        <></>
                                } */}
                    {itm.type == "datetime" ? (
                      <>
                        <DatePicking
                          itm={itm}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          setValue={setValue}
                          getValues={getValues}
                          register={register}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    {itm.type == "muitiSelect" ? (
                      <Multiselection
                        itm={itm}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                      />
                    ) : (
                      <></>
                    )}
                    {itm.type == "newmuitiSelect2" ? (
                      <NewMultiselection
                        itm={itm}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                      />
                    ) : (
                      <></>
                    )}
                    {itm.type == "newmultiselect" ? (
                      <NewMultiSelectsForm
                        itm={itm}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                      />
                    ) : (
                      <></>
                    )}
                    {itm.type == "BigmuitiSelect" ? (
                      <BigMultiselection
                        itm={itm}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                      />
                    ) : (
                      <></>
                    )}
                    {console.log(errors, "errorsendDateendDate")}
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          );

          //     <div className="mt-2">
          //         <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          //     </div>
          // </div >
          // </>
          // return  <input type={"text"} />
          // }
        })}
      </form>
    </>
  );
};

export default CommonForm;
