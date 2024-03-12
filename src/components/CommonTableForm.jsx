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
import { useDispatch, useSelector } from "react-redux";
import { ALERTS } from "../store/reducers/component-reducer";
import TableJsonDynamic from "./TableJsonDynamic";
import { SET_DYNAMIC_FORM, SET_DYNAMIC_FORM_INDEX } from "../store/reducers/projectList-reducer";
import FileUploader from "./FIleUploader";
import { Urls } from "../utils/url";
import CommonActions from "../store/actions/common-actions";

let types = ["text", "password", "email", "hidden", "number"];




const CommonTableForm = ({
  classes,
  encType = false,
  Form,
  tabHead,
  errors,
  setValue,
  getValues,
  register,
  functioning,
  oldList
}) => {
  const [value, onChange] = useState(new Date());
  const [editing, setediting] = useState(false);
  const [edit, setedit] = useState(false);
  let newars = {
    childView: false
  }


  let listing = useSelector((state) => {
    console.log(state.projectList.dynamicForm[tabHead] ? state.projectList.dynamicForm[tabHead] : [], "statestatestatestatestate")
    return state.projectList.dynamicForm[tabHead] ? state.projectList.dynamicForm[tabHead] : []
  })


  Form.map((itm) => {
    newars[itm.name] = newars[itm.value]
  })


  const dispatch = useDispatch()
  const [selectedDate, setSelectedDate] = useState(true);
  const [selectFile, setSelectFile] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(true);
  newars["index"] = 1
  // const [listing, setlisting] = useState([]);





  console.log(Form, newars, "FormFormForm")
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

  console.log("Forms....... " + Form);
  console.log(listing, "listinglisting");

  // let listing = ["a", "b", "c", "b", "c", "b", "c"]


  // useEffect(() => {
  //   console.log("sadadasdsadsa", oldList)
  //   // setlisting(tabHead,oldList)

  //   dispatch(SET_DYNAMIC_FORM({ label: tabHead, value: oldList, reseter: true }))



  // }, [])


  const dsadsa = (res) => {

    console.log(res, "resresresresres")
  }



  const onTableViewSubmit = (data) => {
    console.log(data, "datadata")
    data["fileType"] = "ManageCircle"
    data['collection'] = "circle"
    dispatch(CommonActions.fileSubmit(Urls.templateUploadFile, data, () => {
      dispatch(AdminActions.getManageCircle())
      setFileOpen(false)
    }))
  }

  {/* <Button classes="w-auto" name={"Save"} onClick={(e) => {

let newdte = listing.map((itmm, indes) => {
  itmm["index"] = indes + 1
  return itmm
})
functioning(newdte)

setediting(prev=>!prev)
console.log(newdte, "listinglistinglisting")
}} /> */}
  return (
    <>
      <div className="w-full flex justify-end gap-1 ">
        <Button name={"Bulk Upload"} icon={""} classes={"w-auto  my-auto"} onClick={() => {
          console.log("dasdasdas")

          setSelectFile(true)
          // setlisting(prev => {
          //   console.log(prev, "prevprevprev")
          //   prev.push("")
          //   return prev
          // })

          // setedit(prev => !prev)

          // setlisting(prev => {
          //   const updatedListing = [...prev, ""];
          //   console.log(updatedListing, "updatedListing");
          //   return updatedListing;
          // });


          // dispatch(SET_DYNAMIC_FORM({ label: tabHead, value: oldList, reseter: false }))


        }} />

        {
          editing ?

            <RoundedButton name={"Add"} icon={<UilSave />} classes={"w-auto rounded-full my-auto"} onClick={() => {

              // setlisting(prev => {
              //   console.log(prev, "prevprevprev")
              //   prev.push("")
              //   return prev
              // })


              console.log(listing, "dasdasdas")


              // let newdte = listing.map((itmm, indes) => {
              //   console.log(itmm, indes,"dasdasdas")
              //   itmm["index"] = indes + 1
              //   return itmm
              // })

              let newdte = listing.map((item, index) => {
                console.log(item, index, "dasdasdas");
                return { ...item, index: index + 1 }; // Create a new object with modified 'index'
              });
              console.log("dasdasdas", newdte)

              if (listing.length > 0) {

                functioning(newdte)
                setediting(prev => !prev)
              } else {

                let msgdata = {
                  show: true,
                  icon: "error",
                  buttons: [],
                  type: 1,
                  text: "Please add at least one row in template",
                };
                dispatch(ALERTS(msgdata));

              }

              // setediting(prev => !prev)

            }} />


            :

            <RoundedButton name={"Add"} icon={<UilPen />} classes={"w-auto rounded-full my-auto"} onClick={() => {
              console.log("dasdasdas")

              setediting(prev => !prev)
            }} />

        }


        {
          editing ? <RoundedButton name={"Add"} icon={<UilPlusCircle />} classes={"w-auto rounded-full my-auto"} onClick={() => {
            console.log("dasdasdas")
            setedit(prev => !prev)

            // setlisting(prev => {

            //   console.log({ ...newars, index: listing + 1 }, "newarsnewarsnewars")
            //   newars["index"] = listing.length + 1
            //   const updatedListing = [...prev, { ...newars }];
            //   console.log(updatedListing, "updatedListing");
            //   return updatedListing;

            // });


            newars["index"] = listing.length + 1


            dispatch(SET_DYNAMIC_FORM({ label: tabHead, value: { ...newars }, reseter: false }))
          }} /> : <></>
        }



      </div>

      {
        editing ? <TableJsonDynamic editing={editing} tabHead={tabHead} functioning={functioning} listing={listing} headers={Form.map((its) => { return its.label })} columns={
          listing.map((itm, indexes) => {
            // alert("dasdasdsadas")
            console.log("indexes", itm, "itsitsitsitsitsitsitsits")
            return Form.map((its, innerIndex) => {
              console.log(itm[its.name], "indexes", itm, indexes, "innerIndex", innerIndex, "dsadadaitsitsitsits")


              let propscheck = {

              }

              if (its.type == "select") {
                propscheck = {
                  onChange: (e) => {

                    console.log(e.target.value, tabHead, listing, its, "e.target.valuee.target.value")


                    if (e.target.value == "Dropdown") {
                      newars["childView"] = true
                    }

                    console.log(newars, "newarsnewarsnewarsnewarsnewars")
                    const indexToUpdate = listing.findIndex((ite) => ite.index === itm.index);

                    console.log(indexToUpdate, "indexToUpdateindexToUpdateindexToUpdate")
                    dispatch(SET_DYNAMIC_FORM_INDEX({ label: tabHead, valer: its.name, indexToUpdate: indexToUpdate, value: { ...newars }, fieldNameValue: e.target.value, reseter: false }))

                    setedit(prev => !prev)
                    // dispatch(SET_DYNAMIC_FORM({ label: tabHead, value: { ...newars }, reseter: false }))

                    // setlisting((prev) => {
                    //   const indexToUpdate = prev.findIndex((ite) => ite.index === itm.index);
                    //   console.log(indexToUpdate, "indexToUpdate")
                    //   const oldDataon = prev[indexToUpdate];

                    //   console.log(oldDataon, "oldDataonoldDataon")

                    //   console.log(oldDataon[its.name], "oldDataonoldDataononew")

                    //   const updatedData = {
                    //     ...oldDataon,
                    //     [its.name]: e.target.value // Assuming e.target.value is the new field value
                    //   };



                    //   const updatedListing = [...prev];
                    //   updatedListing[indexToUpdate] = updatedData;
                    //   console.log(updatedListing, "updatedDataupdatedData")
                    //   return updatedListing




                    //   return prev
                    // })

                    console.log(itm.index, e.target.value, "dsadasdasdasdasd")
                  }
                }
              } else {
                propscheck = {
                  onBlur: (e) => {

                    // setValue(name,e.target.value)
                    // setedit(prev => !prev)
                    // setlisting((prev) => {
                    //   const indexToUpdate = prev.findIndex((ite) => ite.index === itm.index);
                    //   console.log(indexToUpdate, "indexToUpdate")
                    //   const oldDataon = prev[indexToUpdate];

                    //   console.log(oldDataon, "oldDataonoldDataon")

                    //   console.log(oldDataon[its.name], "oldDataonoldDataononew")

                    //   const updatedData = {
                    //     ...oldDataon,
                    //     [its.name]: e.target.value // Assuming e.target.value is the new field value
                    //   };



                    //   const updatedListing = [...prev];
                    //   updatedListing[indexToUpdate] = updatedData;
                    //   console.log(updatedListing, "updatedDataupdatedData")
                    //   return updatedListing




                    //   return prev
                    // })

                    console.log(e.target.value, tabHead, listing, its, "e.target.valuee.target.value")

                    const indexToUpdate = listing.findIndex((ite) => ite.index === itm.index);

                    console.log(indexToUpdate, "indexToUpdateindexToUpdateindexToUpdate")
                    dispatch(SET_DYNAMIC_FORM_INDEX({ label: tabHead, valer: its.name, indexToUpdate: indexToUpdate, value: { ...newars }, fieldNameValue: e.target.value, reseter: false }))

                    setedit(prev => !prev)

                    console.log(itm.index, e.target.value, "dsadasdasdasdasd")
                  }
                }
              }



              console.log("its", itm[its.name], "itm", "itm[its.name]itm[its.name]")


              console.log(listing.filter((ityt) => {
                if (ityt.fieldName == itm["fieldName"]) {
                  return {
                    "label": ityt.fieldName,
                    "value": ityt.fieldName
                  }
                }
              }), itm["fieldName"], "listinglistinglisting")
              return {
                [its.label]: <CreateFormField itm={{
                  ...its,
                  name: its.name + itm.index,
                  value: itm[its.name],
                  option: its.name == "Predecessor" ? listing.filter((ityt) => {
                    if (ityt.fieldName != itm["fieldName"]) {
                      return ityt
                    }
                  }).map((ityt) => {
                    return {
                      "label": ityt.fieldName,
                      "value": ityt.fieldName
                    }
                  }) : its.option,
                  props: propscheck,
                  onSelect: (e) => {

                    let finalselection = e.map((itm) => { return itm.id })
                    // setValue(itm.name, finalselection.join())

                    const indexToUpdate = listing.findIndex((ite) => ite.index === itm.index);
                    console.log(finalselection, "onselection")
                    console.log(indexToUpdate, "indexToUpdateindexToUpdateindexToUpdate")
                    dispatch(SET_DYNAMIC_FORM_INDEX({ label: tabHead, valer: "dropdownValue", indexToUpdate: indexToUpdate, value: { ...newars }, fieldNameValue: finalselection.join(), reseter: false }))

                    setedit(prev => !prev)

                  },
                  onRemove: (e) => {
                    let finalselection = e.map((itm) => { return itm.id })
                    // setValue(itm.name, finalselection.join())
                    // console.log(e, "onselection")
                    console.log(finalselection, "onRemove")

                    const indexToUpdate = listing.findIndex((ite) => ite.index === itm.index);

                    console.log(indexToUpdate, "indexToUpdateindexToUpdateindexToUpdate")
                    dispatch(SET_DYNAMIC_FORM_INDEX({ label: tabHead, valer: "dropdownValue", indexToUpdate: indexToUpdate, value: { ...newars }, fieldNameValue: finalselection.join(), reseter: false }))

                    setedit(prev => !prev)
                  },
                  innervalue: itm["dropdownValue"],
                  innerprops: {
                    onBlur: (e) => {
                      console.log(e.target.value, tabHead, listing, its, "e.target.valuee.target.value")

                      const indexToUpdate = listing.findIndex((ite) => ite.index === itm.index);

                      console.log(indexToUpdate, "indexToUpdateindexToUpdateindexToUpdate")
                      dispatch(SET_DYNAMIC_FORM_INDEX({ label: tabHead, valer: "dropdownValue", indexToUpdate: indexToUpdate, value: { ...newars }, fieldNameValue: e.target.value, reseter: false }))

                      setedit(prev => !prev)

                      console.log(itm.index, e.target.value, "dsadasdasdasdasd")
                    }
                  }
                }} index={indexes} errors={errors} register={register} setValue={setValue} getValues={getValues} />
              }
            }).reduce((acc, obj) => {
              return { ...acc, ...obj };
            }, {});
          })} /> : <><TableJson headers={Form.map((its) => { return its.label })} columns={
            listing.map((itm, indexes) => {
              // Inside the map() function for 'listing', create a new object
              let newObj = {};

              console.log(itm, "itmitmitm")
              // Inside the new object, iterate over the 'Form' array
              Form.forEach((its, innerIndex) => {
                // Populate the new object with key-value pairs from 'Form'
                newObj[its.label] = itm[its.name];
              });
              // Return the newly created object
              return newObj;
            })
          } /></>
      }

      <FileUploader isOpen={selectFile} setIsOpen={setSelectFile} fileUploadUrl={Urls.templateUploadFile} onTableViewSubmit={onTableViewSubmit} />
    </>
  );
};

export default CommonTableForm;
