import React, { useEffect, useState } from "react";
import Button from "./Button";
import PopupMenu from "./PopupMenu";
import { current } from "@reduxjs/toolkit";
import { UilColumns } from "@iconscout/react-unicons";
import { UilFilter } from "@iconscout/react-unicons";
import Modalmoreinfo from "./Modalmoreinfo";
import Modal from "./Modal";
import DatePicker from "react-datepicker";
import { getAccessType, objectToArray } from "../utils/commonFunnction";
import moment from "moment";
import FilterView from "./FilterView";
import { useDispatch, useSelector } from "react-redux";
import CommonActions from "../store/actions/common-actions";
import ConditionalButton from "./ConditionalButton";
import ComponentActions from "../store/actions/component-actions";

const AdvancedTable = ({
  tableName = "",
  headerButton,
  templateButton,
  exportButton,
  exportSiteButton,
  exportSiteWithTask,
  UploadSites,
  UploadTask,
  filterAfter = () => {},
  handleSubmit = () => {},
  table,
  data,
  errors,
  // upDatq=false,
  // setupDatq=()=>{},
  // currentPage,
  // setcurrentPage,
  reset,
  register,
  setValue,
  getValues,
  totalCount = 0,
  actions = ["Edit", "Delete"],
  icon,
}) => {
  const [hide, setHide] = useState([]);
  const [finalData , setFinalData] = useState([])
  const [lastVisitedPage, setLastVisitedPage] = useState(50);
  const [RPP, setRPP] = useState(50);
  const [sRPP, ssRPP] = useState(0);
  const [activeFilter, setActiveFilter] = useState([]);
  const [activedFilter, setActivedFilter] = useState({});
  const [currentPage, setcurrentPage] = useState(1);
  data = (data[0]?.uniqueId)?data : [];
  let pages = Array.from({
    length: totalCount % RPP == 0 ? totalCount / RPP : totalCount / RPP + 1,
  });

  // const pages = Math.ceil(totalCount / RPP);

  let dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  table.properties = {
    ...table.properties,
    rpp: [10,20,30,50],
  };

  const callApiPagination = (value, callApi) => {

    let lcllastVisitedPage = lastVisitedPage;
    setcurrentPage(value);
    // if (lcllastVisitedPage < totalCount) {
      setLastVisitedPage(lcllastVisitedPage + 50);
      const filters = {
        ...activedFilter,
        start: lcllastVisitedPage,
        end: 50,
        reseter: true,
        page: value,
        
      };
      // setActiveFilter({
      //   start: lcllastVisitedPage,
      //   end: 50,
      //   reseter: false,
      //   page: value,
      // });
      sessionStorage.setItem("page",value)
      console.info("filters_______", filters);
      // return;
      filterAfter(filters);
      
    setActivedFilter(filters);

    console.log("__paginate_filter",filters)
    setActiveFilter(objectToArray(filters));
    // }
  };

  console.log("setcurrentPage", currentPage);

  const onSubmit = (formdata) => {
    // alert(value)
    console.log("__________formdata______", formdata);
    formdata["reseter"] = true;
    const data = {
      ...activedFilter,
      ...formdata
    }
    console.log("_filter_data",data)
    filterAfter(data);
    setActivedFilter(data);
    setActiveFilter(objectToArray(data));
    dispatch(ComponentActions.popmenu(location.pathname + "_" + name, false));
  };

  console.log("____activedFilter__",activedFilter)
  const onReset = () => {
    // alert(value)
    filterAfter({ reseter: true });
    setActiveFilter([]);
    setActivedFilter({});
  };

  useEffect(() => {
    setActiveFilter([]);
    setActivedFilter({});
  }, [tableName]);

  useEffect(()=>{
    console.log("after_paginate", data)
    setFinalData(data)
  },[data])

  console.log("setFinalData", finalData)


  // const [filterVisiblity, setfilterVisiblity] = useState(false)
  return (
    <>
      <div className="absolute left-0 right-0 flex-col">
        <div className="m-2 ">
          <div className="flex justify-between">
            <div className="flex flex-row">
              {/* {activeFilter.length > 0 && (
                <h1 className="p-1 m-1">Active Filter:</h1>
              )}
              {activeFilter.map((itm) => {
                return (
                  <h1 className="text-pbutton text-white p-1 rounded-xl m-1">
                    {itm}
                  </h1>
                );
              })} */}
              {/* <label className='h-8 align-middle'>Search: </label><input className="ml-4 pl-2  bg-white border-black border block h-8 w-full rounded-md py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type='text' /> */}
            </div>
            <div className="flex flex-row">
              {/* <Button onClick={() => { setfilterVisiblity(prev => !prev) }} name={"Filter"} /> */}

              {/* <PopupMenu visiblity={filterVisiblity}/> */}

              <FilterView
                onReset={onReset}
                tablefilter={table.filter}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                table={table}
                data={data}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
              />
              <PopupMenu
                name={"Hide / Unhide"}
                //icon={<UilColumns size="32" className={"hello"} />}
                icon={
                  icon ? icon : <UilColumns size="32" className={"hello"} />
                }
                child={
                  <>
                    <div className="flex z-40 max-h-96 overflow-scroll flex-col">
                      {table.columns.map((itts, index) => {
                        return (
                          <>
                            <div className="flex m-1">
                              <input
                                type="checkbox"
                                checked={hide.indexOf(String(index)) == -1}
                                value={String(index)}
                                onChange={(e) => {
                                  setHide((prev) => {
                                    // console.log(e.target.checked,prev,[e.target.value],e.target.value,"checkboxchecked")

                                    console.log(
                                      e.target.checked,
                                      e.target.value,
                                      "e.target.checked"
                                    );
                                    // alert("caller")
                                    if (!e.target.checked) {
                                      //   alert("pusher")
                                      return [...prev, e.target.value];
                                    } else {
                                      //   alert("remover")
                                      let vle = prev.indexOf(e.target.value);

                                      console.log(vle, "dsadsadsadasdsadsa");
                                      if (vle != -1) {
                                        prev.splice(vle, 1);
                                      }
                                      return [...prev];
                                    }
                                  });
                                }}
                                name={itts.name}
                              />
                              <span className="text-[11px] mx-2">
                                {itts.name}
                              </span>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                }
              />

              {headerButton}

              {/* {headerButton} */}
              {templateButton ? (
                <Button
                  name={"Template"}
                  classes="w-full mx-1"
                  onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        templateButton[0],
                        templateButton[1]
                      )
                    );
                  }}
                >
                  Template
                </Button>
              ) : (
                <></>
              )}
              {exportButton ? (
                <ConditionalButton
                  showType={getAccessType("Add Project")}
                  name={"Export"}
                  classes="w-full mr-1"
                  onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        exportButton[0],
                        exportButton[1]
                      )
                    );
                  }}
                >
                  Export
                </ConditionalButton>
              ) : (
                <></>
              )}
              {exportSiteButton ? (
                <ConditionalButton
                  showType={getAccessType("Download Project")}
                  name={"Export Site"}
                  classes="w-full mr-1"
                  onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        exportSiteButton[0],
                        exportSiteButton[1]
                      )
                    );
                  }}
                >
                  Export
                </ConditionalButton>
              ) : (
                <></>
              )}
              {exportSiteWithTask ? (
                <ConditionalButton
                  showType={getAccessType("Download Project")}
                  name={"Export Site with task"}
                  classes="w-full mr-1"
                  onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        exportSiteWithTask[0],
                        exportSiteWithTask[1]
                      )
                    );
                  }}
                >
                  Export
                </ConditionalButton>
              ) : (
                <></>
              )}
              {UploadSites ? (
                <Button
                  name={"Upload Sites"}
                  classes="w-full mr-1"
                  onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        exportButton[0],
                        exportButton[1]
                      )
                    );
                  }}
                >
                  Export
                </Button>
              ) : (
                <></>
              )}
              {UploadTask ? (
                <Button
                  name={"Upload Task"}
                  classes="w-full"
                  onClick={() => {
                    dispatch(
                      CommonActions.commondownload(
                        exportButton[0],
                        exportButton[1]
                      )
                    );
                  }}
                >
                  Export
                </Button>
              ) : (
                <></>
              )}
              {console.log(headerButton, "headerButton")}
            </div>
          </div>
        </div>
        {/* <div className='m-2 '>
                <div className='flex'>
                    {
                        table.filter.map((itm) => {
                            return <>
                                <div className='flex flex-col'>
                                    <label className="block text-sm p-2 font-medium text-black  dark:text-black">{itm.name}</label>

                                    {
                                        itm.type == "select" ?

                                            <select onChange={itm.onChanging ? itm.onChanging : null}

                                                {...register(itm.name, {
                                                    required: itm.required ? "This " + " Field is required" : false,
                                                    ...itm.props
                                                })} className={"bg-white border-black border block h-8 w-32 m-1 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}>
                                                {
                                                    itm.option.map((selitm) => {
                                                        return <option value={selitm.value}>{selitm.label}</option>
                                                    })
                                                }
                                            </select> :
                                            <>
                                                <input type={itm.type} {...register(itm.name, {
                                                    required: itm.required ? "This " + " Field is required" : false,
                                                    ...itm.props
                                                })} className=" bg-white border-black border block h-8 w-32 m-1 rounded-md py-1.5 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...itm.props} />
                                                {console.log(errors[itm.name], itm.required, "errors?.itm?")}
                                                <p className='text-xs text-red-700'>{errors[itm.name]?.message}</p>
                                            </>
                                    }
                                </div>
                            </>
                        })

                    }

                </div>
            </div> */}
        <div className="m-2 overflow-x-scroll h-[68vh] pb-6 border-1 border-solid border-black rounded-lg ">
          {1 == 1 ? (
            <table border={1} className="w-[100%] table-auto">
              <thead className="sticky -top-1 h-4 z-30">
                <tr>
                  {table.columns.map((itts, index) => {
                    console.log(
                      hide.indexOf(itts.name),
                      itts.name,
                      hide,
                      "hidehidehide"
                    );
                    return hide.indexOf(String(index)) == -1 ? (
                      <>
                        {actions.includes(itts.name) ? (
                          ["Edit"].includes(itts.name) ? (
                            <td
                              colSpan={actions.length}
                              className={`border-primaryLine h-10  border-[1.5px] bg-primaryLine min-w-[200px] max-w-[200px] text-center`}
                            >
                              <span className="text-white text-[12px]">
                                {"Actions"}
                              </span>
                            </td>
                          ) : !actions.includes("Edit") ? (
                            <td
                              colSpan={actions.length}
                              className={`border-primaryLine h-10  border-[1.5px] bg-primaryLine min-w-[200px] max-w-[200px] text-center`}
                            >
                              <span className="text-white text-[12px]">
                                {"Actions"}
                              </span>
                            </td>
                          ) : (
                            ""
                          )
                        ) : (
                          <>
                            <td
                              className={`border-primaryLine border-[1.5px] h-10  bg-primaryLine ${
                                itts.style
                                  ? itts.style
                                  : " min-w-[300px] max-w-[500px]"
                              }`}
                            >
                              <span className="text-white text-[12px]">
                                {itts.name}
                              </span>
                            </td>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    );
                  })}
                </tr>
              </thead>

              

              {finalData.length > 0 ? (
                <tbody>
                  {finalData
                   
                    .map((itm) => {
                      return (
                        <tr>
                          {table.columns.map((innerItm, index) => {
                            return hide.indexOf(String(index)) == -1 ? (
                              <td
                                className={`text-[11px] h-2 pl-1 border-gray-400 border-[0.1px] overflow-hidden text-slate-800 ${
                                  innerItm.style
                                    ? innerItm.style
                                    : " min-w-[300px] max-w-[500px]"
                                }`}
                              >
                                <Modalmoreinfo
                                  ctt={32}
                                  setModalBody={setModalBody}
                                  setOpenModal={setOpenModal}
                                  value={itm[innerItm.value]}
                                />
                              </td>
                            ) : (
                              <></>
                            );
                          })}
                        </tr>
                      );
                    })}
                </tbody>
              ) : (
                <tbody>
                  <tr className="border-2 border-black text-center">
                    <td colSpan={table.columns.length} className="">
                      No Records Found
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          ) : (
            <>
              <table border={1} className="w-[100%] table-auto">
                <thead className="sticky -top-1 h-4 z-30">
                  {/* <tr>
                                        {
                                            table.columns.map((itts, index) => {
                                                console.log(hide.indexOf(itts.name), itts.name, hide, "hidehidehide")
                                                return hide.indexOf(String(index)) == -1 ? <th className=' border-primaryLine border-2 bg-orange-600 '>
                                                    <span className='text-white text-[14px]'>{itts.name}</span>
                                                </th> : <></>
                                            })
                                        }
                                    </tr> */}

                  <tr className="flex">
                    {table.columns.map((itts, index) => {
                      console.log(
                        hide.indexOf(itts.name),
                        itts.name,
                        hide,
                        "hidehidehide"
                      );
                      return hide.indexOf(String(index)) == -1 ? (
                        <>
                          {["Edit", "Delete"].includes(itts.name) ? (
                            ["Edit"].includes(itts.name) ? (
                              <th
                                colSpan={actions.length}
                                className={
                                  " border-primaryLine border-[0.1px] bg-primaryLine "
                                }
                              >
                                <span className="text-white text-[12px]">
                                  {"Actions"}
                                </span>
                              </th>
                            ) : (
                              ""
                            )
                          ) : (
                            <>
                              <th className=" border-gray-400 border-[0.1px] bg-primaryLine ">
                                <span className="text-white text-[12px]">
                                  {itts.name}
                                </span>
                              </th>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>No Records Found</td>
                  </tr>
                </tbody>
              </table>
              {/* <h1 className="flex justify-center">No Records Found</h1> */}
            </>
          )}
        </div>
        <div className="m-2">
          <div className="flex justify-between">
            <div>
              {/* <label>Rows Per Page: </label>
              <select onChange={(e) => setRPP(e.target.value)}>
                {table.properties.rpp.map((itm) => {
                  return <option>{itm}</option>;
                })}
              </select> */}
            </div>

            <div className="flex ">
              {pages.map((itm, index) => {
                return pages.length > 5 ? (
                  (index + 3 > currentPage && index - 1 < currentPage) ||
                  index + 1 == 1 ||
                  index + 1 == pages.length ? (
                    <span
                      onClick={(e) => {
                        callApiPagination(index + 1, "558");
                      }}
                      className={`border cursor-pointer px-2 mx-2 ${
                        currentPage == index + 1
                          ? "bg-primaryLine text-white border-primaryLine"
                          : "bg-white text-black border-primaryLine"
                      } `}
                    >
                      {index + 1}
                    </span>
                  ) : (
                    <></>
                  )
                ) : (
                  <span
                    onClick={(e) => {
                      callApiPagination(index + 1);
                    }}
                    className={`border cursor-pointer border-primaryLine ${
                      currentPage == index + 1
                        ? "bg-primaryLine text-white"
                        : "bg-white"
                    } px-2 mx-2`}
                  >
                    {index + 1}
                  </span>
                );
              })}
              {/* {
                            table.properties.rpp.map((itm) => {
                                return <span className='border border-red-500 px-2 mx-2'>{itm}</span>
                            })
                        } */}
            </div>
          </div>
        </div>
      </div>

      <Modal
        children={modalBody}
        setIsOpen={setOpenModal}
        isOpen={openModal}
        size={"sm"}
      />
    </>
  );
};

export default AdvancedTable;
