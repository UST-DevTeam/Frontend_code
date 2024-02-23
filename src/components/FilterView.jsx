import React from "react";
import PopupMenu from "./PopupMenu";
import { UilColumns } from '@iconscout/react-unicons'
import { UilFilter } from '@iconscout/react-unicons'
import DatePicker from 'react-datepicker';
import Button from "./Button";

const FilterView = ({tablefilter,handleSubmit = () => { },onSubmit, table, data, errors, register, setValue, getValues}) => {
  return (
    <>
      {tablefilter.length > 0 && (
        <PopupMenu
          name={"Filter"}
          dataclasses={""}
          classes=""
          icon={<UilFilter size="32" className={"hello"} />}
          child={
            <>
              <div className="grid grid-cols-2">
                {tablefilter.map((itm) => {
                  return (
                    <>
                      <div className="flex flex-col ">
                        <label className="block text-sm p-2 font-medium text-black  dark:text-black">
                          {itm.label}
                        </label>

                        {itm.type == "select" && (
                          <select
                            onChange={itm.onChanging ? itm.onChanging : null}
                            {...register(itm.name, {
                              required: itm.required
                                ? "This " + " Field is required"
                                : false,
                              ...itm.props,
                            })}
                            className={
                              "bg-white border-black border block h-8 w-44 m-1 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            }
                          >
                            <option value={""}>Select</option>
                            {itm.option.map((selitm) => {
                              return (
                                <option value={selitm.value}>
                                  {selitm.label}
                                </option>
                              );
                            })}
                          </select>
                        )}
                        {itm.type == "text" && (
                          <>
                            <input
                              type={itm.type}
                              {...register(itm.name, {
                                required: itm.required
                                  ? "This " + " Field is required"
                                  : false,
                                ...itm.props,
                              })}
                              className=" bg-white border-black border block h-8 w-44 m-1 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              {...itm.props}
                            />
                            {console.log(
                              errors[itm.name],
                              itm.required,
                              "errors?.itm?"
                            )}
                            <p className="text-xs text-red-700">
                              {errors[itm.name]?.message}
                            </p>
                          </>
                        )}
                        {itm.type == "datetime" && (
                          <>
                            <DatePicker
                              // selected={getValues(itm.name)}
                              // onChange={(date) => {
                              //     setValue(itm.name,date)
                              //     setSelectedDate(prev=>!prev)
                              // }}
                              selectsRange
                              selected={
                                getValues(itm.name)
                                  ? moment(
                                      getValues(itm.name),
                                      itm?.formatop
                                    ).toDate()
                                  : getValues(itm.name)
                              }
                              onChange={(date) => {
                                console.log(
                                  date,
                                  getValues(itm.name),
                                  "datedatedatedatedate"
                                );

                                let curr = moment(date);

                                // console.log(curr.format(itm?.format),getValues(itm.name),itm?.format,"datedatedatedatedate")
                                setValue(itm.name, date);
                                console.log(
                                  typeof date,
                                  "datedatedatedatedate"
                                );

                                console.log(
                                  getValues(itm.name)
                                    ? moment(
                                        getValues(itm.name),
                                        itm?.formatop
                                      ).toDate()
                                    : getValues(itm.name),
                                  "datedatedatedatedate"
                                );

                                // setSelectedDate(prev => !prev)
                              }}
                              // showTimeSelect={itm.formattype == "time" || itm.formattype == "datetime"}
                              // showTimeSelectOnly={itm.formattype == "time" || itm.formattype == "datetime"}
                              show={false}
                              showIcon={true}
                              dateFormat={itm?.format}
                              timeIntervals={itm?.interval}
                              timeFormat={"HH:mm"}
                              className="bg-white border-black border block h-8 w-44 rounded-md py-1  .5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="text-xs text-red-700">
                              {errors[itm.name]?.message}
                            </p>
                          </>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="w-18 flex justify-center grid-cols-1">
                <Button
                  name={"Filter"}
                  onClick={handleSubmit(onsubmit)}
                  classes="w-18 p-10 mx-2"
                />
                <Button
                  name={"Clear"}
                  onClick={() => {
                    onReset();
                  }}
                  classes="w-18 p-10 mx-2"
                />
              </div>
            </>
          }
        />
      )}
    </>
  );
};

export default FilterView;
