import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import ManageProjectTypeForm from '../../../PMIS/Admin/ManageProjectType/ManageProjectTypeForm';
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import ToggleButton from '../../../../components/ToggleButton';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls, backendassetUrl, baseUrl } from '../../../../utils/url';
// import AdminActions from '../../../../store/actions/admin-actions';
import AdminActions from '../../../../store/actions/admin-actions';
import { useNavigate, useParams } from 'react-router-dom';
import CCDash from '../../../../components/CCDash';
import CommonForm from '../../../../components/CommonForm';
import CommonTableForm from '../../../../components/CommonTableForm';
import CommonTableFormParent from '../../../../components/CommonTableFormSiteParent';
import CommonTableFormSiteParent from '../../../../components/CommonTableFormSiteParent';
import { SET_DYNAMIC_FORM } from '../../../../store/reducers/projectList-reducer';




const ManageProjectType = () => {


  const { customeruniqueId } = useParams()

  const { register, handleSubmit, watch, setValue, setValues, getValues, formState: { errors } } = useForm()


  const [modalOpen, setmodalOpen] = useState(false)

  const [type, settype] = useState(false)
  const [modalHead, setmodalHead] = useState(<></>)
  const [uniqueness, setUniqueness] = useState("")

  const [listing, setlisting] = useState([]);


  // setconditioncountform((prev) => {
  //     let val = [...prev]
  //     let sval = val.pop()
  //     if (isNaN(sval)) {
  //       finval = 1
  //     } else {
  //       finval = sval + 1
  //     }
  //     console.log(finval, "finval", val, prev)
  //     return [...prev, finval]
  //   })


  let dispatch = useDispatch()

  let navigate = useNavigate()

  let conditionmultiForm = [
    // { label: "Sequence", name: "sequence", value: "", type: "text", props: "", required: false, placeholder: "" },
    {
      label: "Field Name", name: "fieldName", value: "", type: "text", props: "", required: false, placeholder: ""
    },
    {
      label: "Mandatory(Y/N)",
      name: "required",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Yes",
          value: "Yes"
        }, {
          label: "No",
          value: "No"
        }
      ],
      props: "",
      required: false,
      placeholder: ""
    },
    {
      label: "Input Type",
      name: "dataType",
      value: "Select",
      innerSmart: true,
      type: "select",
      option: [
        {
          label: "Text",
          value: "text"
        }, {
          label: "Number",
          value: "Number"
        }, {
          label: "Decimal",
          value: "Decimal"
        }, {
          label: "Date",
          value: "Date"
        }, {
          label: "Dropdown",
          value: "Dropdown",
          extended: {
            typer: "add",
            type: "text",
            option: []
          }
        }
      ],
      props: "",
      required: false,
      placeholder: ""
    },
    {
      label: "Status",
      name: "Status",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Active",
          value: "Active"
        }, {
          label: "Inactive",
          value: "Inactive"
        }
      ],
      props: "",
      required: false,
      placeholder: ""
    }
  ]


  let milestonemultiForm = [
    // { label: "Sequence", name: "sequence", value: "", type: "text", props: "", required: false, placeholder: "" },
    {
      label: "Milestone", name: "fieldName", type: "text", props: "", required: false, placeholder: "",
      value: "",
    },
    {
      label: "WCC Sign off",
      name: "WCC Sign off",
      type: "select",
      option: [
        {
          label: "Yes",
          value: "Yes"
        }, {
          label: "No",
          value: "No"
        }
      ],
      props: "",
      required: false,
      value: "Select",
      placeholder: ""
    },
    {
      label: "Estimated Time (Days)",
      name: "Estimated Time (Days)",
      type: "text",
      props: "",
      required: false,
      value: "",
      placeholder: ""
    },
    {
      label: "Completion Criteria",
      name: "Completion Criteria",
      type: "muitiSelect",
      option: [
        { id: "completion_date", name: "Completion Date" },
        { id: "checklist", name: "Checklist" },
        { id: "mo_no", name: "MO No" },
        { id: "challan_copy", name: "Challan copy" },
        { id: "attachment", name: "Attachment" },
        { id: "reference_no", name: "Reference No" }
      ],

      // option:[
      //     {
      //         label: "Active",
      //         value: "Active"
      //     }, {
      //         label: "Inactive",
      //         value: "Inactive"
      //     }
      // ],
      props: "",
      required: false,
      value: "Select",
      placeholder: ""
    },
    {
      label: "Predecessor",
      name: "Predecessor",
      type: "select",
      option: [],
      props: "",
      required: false,
      value: "Select",
      placeholder: ""
    },
    {
      label: "Status",
      name: "Status",
      type: "select",
      option: [
        {
          label: "Active",
          value: "Active"
        }, {
          label: "Deactive",
          value: "Deactive"
        }
      ],
      props: "",
      value: "Select",
      required: false,
      placeholder: ""
    }
  ]


  let commercialmultiForm = [
    // { label: "Sequence", name: "sequence", value: "", type: "text", props: "", required: false, placeholder: "" },
    {
      label: "Item Code", name: "fieldName", value: "", type: "text", props: "", required: false, placeholder: ""
    },
    {
      label: "GBPA",
      name: "required",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Yes",
          value: "Yes"
        }, {
          label: "No",
          value: "No"
        }
      ],
      props: "",
      required: false,
      placeholder: ""
    },
    {
      label: "Scope",
      name: "dataType",
      value: "Select",
      innerSmart: true,
      type: "select",
      option: [
        {
          label: "Text",
          value: "text"
        }, {
          label: "Number",
          value: "Number"
        }, {
          label: "Decimal",
          value: "Decimal"
        }, {
          label: "Date",
          value: "Date"
        }, {
          label: "Dropdown",
          value: "Dropdown",
          extended: {
            typer: "add",
            type: "text",
            option: []
          }
        }
      ],
      props: "",
      required: false,
      placeholder: ""
    },
    {
      label: "Description",
      name: "Status",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Active",
          value: "Active"
        }, {
          label: "Inactive",
          value: "Inactive"
        }
      ],
      props: "",
      required: false,
      placeholder: ""
    },
    {
      label: "Attachment",
      name: "Status",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Active",
          value: "Active"
        }, {
          label: "Inactive",
          value: "Inactive"
        }
      ],
      props: "",
      required: false,
      placeholder: ""
    }
  ]

  const handleAddActivity = (res, targ, itm) => {
    console.log(res, "uniqueness", itm.uniqueId, "uniqueness", "handleAddActivity");

    let newdata = {
      [targ]: res
    }

    dispatch(AdminActions.patchManageProjectType(true, itm.uniqueId, newdata, () => {
      // alert("done")

      dispatch(AdminActions.getManageProjectType(customeruniqueId))
    }))





  };








  const [modalBody, setmodalBody] = useState((<>



    {/* <Button name={"sasaass"} onClick={(handleSubmit(handleAddActivity))}></Button> */}
  </>))





  let dbConfigList = useSelector((state) => {
    console.log(state, "state statejjjj")
    let interdata = state?.adminData?.getManageProjectType
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        imgshow: <img src={backendassetUrl + itm?.companyimg} />,
        // "status": <CstmButton child={<ToggleButton onChange={(e) => {
        //     console.log(e.target.checked, "e.target.checked")
        //     let data = {
        //         "enabled": e.target.checked ? 1 : 0
        //     }
        //     dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
        //         // alert(e.target.checked)
        //         e.target.checked = e.target.checked
        //     }, itm.id))
        //     // if(itm.enabled==0){
        //     //     itm.enabled=1
        //     // }else{
        //     //     itm.enabled=0
        //     // }
        //     // itm.enabled=itm.enabled==0?1:0
        //     console.log(itm.enabled, "itm.enabled")
        // }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,


        "template": <CstmButton className={"p-2"} child={<Button classes='w-10' name={""} icon={<Unicons.UilAirplay />} onClick={() => {

          setUniqueness(prev => itm.uniqueId)
          setmodalOpen(true)
          dispatch(AdminActions.getManageCustomer())
          // console.log(itm["t_sengg"], "setUniqueness")
          setmodalHead("Templates")

          // [""].map((itesw)=>{

          //     console.log(itesw,"itm[itesw]itm[itesw]")

          //     // dispatch(SET_DYNAMIC_FORM({ label: tabHead, value: itm[itesw]?itm[itesw]:[], reseter: true }))
          // })
          dispatch(SET_DYNAMIC_FORM({ label: "Site Engg", value: itm["t_sengg"] ? itm["t_sengg"] : [], reseter: true }))
          dispatch(SET_DYNAMIC_FORM({ label: "Tracking", value: itm["t_tracking"] ? itm["t_tracking"] : [], reseter: true }))
          dispatch(SET_DYNAMIC_FORM({ label: "Issues", value: itm["t_issues"] ? itm['t_issues'] : [], reseter: true }))
          dispatch(SET_DYNAMIC_FORM({ label: "Financials", value: itm["t_sFinancials"] ? itm["t_sFinancials"] : [], reseter: true }))

          console.log(itm, "setmodalHeadsetmodalHead")
          setmodalBody(<>


            <div className='flex flex-col justify-between p-2'>
              <div class="overflow-scroll">

                {/* {conditioncountform.map((val, index) => {
                                    return <>
                                        <CommonForm classes={"grid-cols-1 md:grid-cols-2 lg:gap-8 w-full"} errors={errors} Form={conditionmultiForm.map((itm) => {
                                            return {
                                                ...itm,
                                                type: itm.name == "formovalue" ? nestfilter["wherecondition" + "_" + val + "_form"] == "joins" ? "muitiSelect" : "text" : itm.type,
                                                props: itm.label == "Select Column" || (itm.label == "Value" && nestfilter["wherecondition" + "_" + val + "_form"] == "joins") ? {
                                                    ...itm.props, onSelect: (a, b) => {
                                                        console.log("gamecall", a, b, "column" + "_" + val + "_form")
                                                        setValue(itm.label == "Select Column" ? "wherecolumn" + "_" + val + "_form" : "formovalue" + "_" + val + "_form", b.category + "smartGame" + b.name)
                                                    }
                                                } : { ...itm.props },
                                                option: itm.label == "Expression" ? all_command_type_wise[nestfilter["wherecondition" + "_" + val + "_form"]] : itm.option,
                                                name: itm.name + "_" + val + "_form"
                                            }
                                        })}
                                            register={register} setValue={setValue} getValues={getValues} />
                                    </>
                                })} */}
              </div>
            </div>
            {/* <CommonTableForm classes={"grid-cols-2 gap-1"} Form={conditionmultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} /> */}
            <CommonTableFormSiteParent defaultValue={"Site Engg"} tabslist={{
              "Site Engg": <CommonTableForm tabHead={"Site Engg"} classes={"grid-cols-2 gap-1"} Form={conditionmultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res, "t_sengg", itm)} oldList={[]} listing={listing} setlisting={setlisting} />,
              "Tracking": <CommonTableForm tabHead={"Tracking"} classes={"grid-cols-2 gap-1"} Form={conditionmultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res, "t_tracking", itm)} oldList={[]} listing={listing} setlisting={setlisting} />,
              "Issues": <CommonTableForm tabHead={"Issues"} classes={"grid-cols-2 gap-1"} Form={conditionmultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res, "t_issues", itm)} oldList={[]} listing={listing} setlisting={setlisting} />,
              "Financials": <CommonTableForm tabHead={"Financials"} classes={"grid-cols-2 gap-1"} Form={conditionmultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res, "t_sFinancials", itm)} oldList={[]} listing={listing} setlisting={setlisting} />
            }} />


            {/* <ManageProjectTypeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
            {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
          </>)
        }}></Button>} />,
        "milestone": <CstmButton className={"p-2"} child={<Button classes='w-10' name={""} icon={<Unicons.UilAirplay />} onClick={() => {
          setmodalOpen(true)
          dispatch(AdminActions.getManageCustomer())
          setmodalHead("Milestones")

          dispatch(SET_DYNAMIC_FORM({ label: "MileStone", value: itm["MileStone"] ? itm["MileStone"] : [], reseter: true }))
          setmodalBody(<>


            <div className='flex flex-col justify-between p-2'>
              <div class="overflow-scroll">

                {/* {conditioncountform.map((val, index) => {
                                    return <>
                                        <CommonForm classes={"grid-cols-1 md:grid-cols-2 lg:gap-8 w-full"} errors={errors} Form={conditionmultiForm.map((itm) => {
                                            return {
                                                ...itm,
                                                type: itm.name == "formovalue" ? nestfilter["wherecondition" + "_" + val + "_form"] == "joins" ? "muitiSelect" : "text" : itm.type,
                                                props: itm.label == "Select Column" || (itm.label == "Value" && nestfilter["wherecondition" + "_" + val + "_form"] == "joins") ? {
                                                    ...itm.props, onSelect: (a, b) => {
                                                        console.log("gamecall", a, b, "column" + "_" + val + "_form")
                                                        setValue(itm.label == "Select Column" ? "wherecolumn" + "_" + val + "_form" : "formovalue" + "_" + val + "_form", b.category + "smartGame" + b.name)
                                                    }
                                                } : { ...itm.props },
                                                option: itm.label == "Expression" ? all_command_type_wise[nestfilter["wherecondition" + "_" + val + "_form"]] : itm.option,
                                                name: itm.name + "_" + val + "_form"
                                            }
                                        })}
                                            register={register} setValue={setValue} getValues={getValues} />
                                    </>
                                })} */}
              </div>
            </div>
            {/* <CommonTableForm classes={"grid-cols-2 gap-1"} Form={milestonemultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res,"milestone", itm)} oldList={itm.milestone} listing={listing} setlisting={setlisting} /> */}
            <CommonTableForm tabHead={"MileStone"} classes={"grid-cols-2 gap-1"} Form={milestonemultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res, "MileStone", itm)} oldList={[]} listing={listing} setlisting={setlisting} />
            {/* <ManageProjectTypeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
            {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
          </>)
        }}></Button>} />,
        // "milestone": <CstmButton className={"p-2"} child={<Button classes='w- 10' name={""} icon={<Unicons.UilAirplay />} onClick={() => {
        //     setmodalOpen(true)
        //     dispatch(AdminActions.getManageCustomer())
        //     setmodalHead("Milestone")
        //     setmodalBody(<>
        //         <ManageProjectTypeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
        //         {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
        //     </>)
        // }}></Button>} />,
        commercial: (
          <CstmButton
            className={"p-2"}
            child={
              <Button
                classes="w-10"
                icon={<Unicons.UilAirplay />}
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  dispatch(AdminActions.getManageCustomer());
                  setmodalHead("Coomercial");
                  setmodalBody(
                    <>
                      <CommonTableForm tabHead={"MileStone"} classes={"grid-cols-2 gap-1"} Form={milestonemultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res, "MileStone", itm)} oldList={[]} listing={listing} setlisting={setlisting} />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></Button>
            }
          />
        ),

        "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
          let msgdata = {
            show: true,
            icon: 'warning',
            buttons: [
              <Button classes='w-15 bg-green-500' onClick={() => {
                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_projecttype}/${customeruniqueId}/${itm.uniqueId}`, () => {
                  dispatch(AdminActions.getManageProjectType(customeruniqueId))
                  dispatch(ALERTS({ show: false }))
                }))
              }} name={"OK"} />,
              <Button classes='w-24' onClick={() => {
                dispatch(ALERTS({ show: false }))
              }} name={"Cancel"} />
            ],
            text: "Are you sure you want to Delete?"
          }
          dispatch(ALERTS(msgdata))
        }}></DeleteButton>} />
      }
      return updateditm
    });
  })
  let dbConfigListCard = useSelector((state) => {
    console.log(state, "state statejjjj")
    let interdata = state?.adminData?.getCardProjectType
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        imgshow: <img src={backendassetUrl + itm?.companyimg} />,
        // "status": <CstmButton child={<ToggleButton onChange={(e) => {
        //     console.log(e.target.checked, "e.target.checked")
        //     let data = {
        //         "enabled": e.target.checked ? 1 : 0
        //     }
        //     dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
        //         // alert(e.target.checked)
        //         e.target.checked = e.target.checked
        //     }, itm.id))
        //     // if(itm.enabled==0){
        //     //     itm.enabled=1
        //     // }else{
        //     //     itm.enabled=0
        //     // }
        //     // itm.enabled=itm.enabled==0?1:0
        //     console.log(itm.enabled, "itm.enabled")
        // }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,


        "template": <CstmButton className={"p-2"} child={<Button classes='w-10' name={""} icon={<Unicons.UilAirplay />} onClick={() => {

          setUniqueness(prev => itm.uniqueId)
          setmodalOpen(true)
          dispatch(AdminActions.getManageCustomer())
          // console.log(itm["t_sengg"], "setUniqueness")
          setmodalHead("Templates")

          // [""].map((itesw)=>{

          //     console.log(itesw,"itm[itesw]itm[itesw]")

          //     // dispatch(SET_DYNAMIC_FORM({ label: tabHead, value: itm[itesw]?itm[itesw]:[], reseter: true }))
          // })
          dispatch(SET_DYNAMIC_FORM({ label: "Site Engg", value: itm["t_sengg"] ? itm["t_sengg"] : [], reseter: true }))
          dispatch(SET_DYNAMIC_FORM({ label: "Tracking", value: itm["t_tracking"] ? itm["t_tracking"] : [], reseter: true }))
          dispatch(SET_DYNAMIC_FORM({ label: "Issues", value: itm["t_issues"] ? itm['t_issues'] : [], reseter: true }))
          dispatch(SET_DYNAMIC_FORM({ label: "Financials", value: itm["t_sFinancials"] ? itm["t_sFinancials"] : [], reseter: true }))

          console.log(itm, "setmodalHeadsetmodalHead")
          setmodalBody(<>


            <div className='flex flex-col justify-between p-2'>
              <div class="overflow-scroll">

                {/* {conditioncountform.map((val, index) => {
                                        return <>
                                            <CommonForm classes={"grid-cols-1 md:grid-cols-2 lg:gap-8 w-full"} errors={errors} Form={conditionmultiForm.map((itm) => {
                                                return {
                                                    ...itm,
                                                    type: itm.name == "formovalue" ? nestfilter["wherecondition" + "_" + val + "_form"] == "joins" ? "muitiSelect" : "text" : itm.type,
                                                    props: itm.label == "Select Column" || (itm.label == "Value" && nestfilter["wherecondition" + "_" + val + "_form"] == "joins") ? {
                                                        ...itm.props, onSelect: (a, b) => {
                                                            console.log("gamecall", a, b, "column" + "_" + val + "_form")
                                                            setValue(itm.label == "Select Column" ? "wherecolumn" + "_" + val + "_form" : "formovalue" + "_" + val + "_form", b.category + "smartGame" + b.name)
                                                        }
                                                    } : { ...itm.props },
                                                    option: itm.label == "Expression" ? all_command_type_wise[nestfilter["wherecondition" + "_" + val + "_form"]] : itm.option,
                                                    name: itm.name + "_" + val + "_form"
                                                }
                                            })}
                                                register={register} setValue={setValue} getValues={getValues} />
                                        </>
                                    })} */}
              </div>
            </div>
            {/* <CommonTableForm classes={"grid-cols-2 gap-1"} Form={conditionmultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} /> */}
            <CommonTableFormSiteParent defaultValue={"Site Engg"} tabslist={{
              "Site Engg": <CommonTableForm tabHead={"Site Engg"} classes={"grid-cols-2 gap-1"} Form={conditionmultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res, "t_sengg", itm)} oldList={[]} listing={listing} setlisting={setlisting} />,
              "Tracking": <CommonTableForm tabHead={"Tracking"} classes={"grid-cols-2 gap-1"} Form={conditionmultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res, "t_tracking", itm)} oldList={[]} listing={listing} setlisting={setlisting} />,
              "Issues": <CommonTableForm tabHead={"Issues"} classes={"grid-cols-2 gap-1"} Form={conditionmultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res, "t_issues", itm)} oldList={[]} listing={listing} setlisting={setlisting} />,
              "Financials": <CommonTableForm tabHead={"Financials"} classes={"grid-cols-2 gap-1"} Form={conditionmultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res, "t_sFinancials", itm)} oldList={[]} listing={listing} setlisting={setlisting} />
            }} />


            {/* <ManageProjectTypeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
            {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
          </>)
        }}></Button>} />,
        "milestone": <CstmButton className={"p-2"} child={<Button classes='w-10' name={""} icon={<Unicons.UilAirplay />} onClick={() => {
          setmodalOpen(true)
          dispatch(AdminActions.getManageCustomer())
          setmodalHead("Milestones")

          dispatch(SET_DYNAMIC_FORM({ label: "MileStone", value: itm["MileStone"] ? itm["MileStone"] : [], reseter: true }))
          setmodalBody(<>


            <div className='flex flex-col justify-between p-2'>
              <div class="overflow-scroll">

                {/* {conditioncountform.map((val, index) => {
                                        return <>
                                            <CommonForm classes={"grid-cols-1 md:grid-cols-2 lg:gap-8 w-full"} errors={errors} Form={conditionmultiForm.map((itm) => {
                                                return {
                                                    ...itm,
                                                    type: itm.name == "formovalue" ? nestfilter["wherecondition" + "_" + val + "_form"] == "joins" ? "muitiSelect" : "text" : itm.type,
                                                    props: itm.label == "Select Column" || (itm.label == "Value" && nestfilter["wherecondition" + "_" + val + "_form"] == "joins") ? {
                                                        ...itm.props, onSelect: (a, b) => {
                                                            console.log("gamecall", a, b, "column" + "_" + val + "_form")
                                                            setValue(itm.label == "Select Column" ? "wherecolumn" + "_" + val + "_form" : "formovalue" + "_" + val + "_form", b.category + "smartGame" + b.name)
                                                        }
                                                    } : { ...itm.props },
                                                    option: itm.label == "Expression" ? all_command_type_wise[nestfilter["wherecondition" + "_" + val + "_form"]] : itm.option,
                                                    name: itm.name + "_" + val + "_form"
                                                }
                                            })}
                                                register={register} setValue={setValue} getValues={getValues} />
                                        </>
                                    })} */}
              </div>
            </div>
            {/* <CommonTableForm classes={"grid-cols-2 gap-1"} Form={milestonemultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res,"milestone", itm)} oldList={itm.milestone} listing={listing} setlisting={setlisting} /> */}
            <CommonTableForm tabHead={"MileStone"} classes={"grid-cols-2 gap-1"} Form={milestonemultiForm} errors={errors} register={register} setValue={setValue} getValues={getValues} functioning={(res) => handleAddActivity(res, "MileStone", itm)} oldList={[]} listing={listing} setlisting={setlisting} />
            {/* <ManageProjectTypeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
            {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
          </>)
        }}></Button>} />,
        // "milestone": <CstmButton className={"p-2"} child={<Button classes='w- 10' name={""} icon={<Unicons.UilAirplay />} onClick={() => {
        //     setmodalOpen(true)
        //     dispatch(AdminActions.getManageCustomer())
        //     setmodalHead("Milestone")
        //     setmodalBody(<>
        //         <ManageProjectTypeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
        //         {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
        //     </>)
        // }}></Button>} />,
        // "commercial": <CstmButton className={"p-2"} child={<Button classes='w-10' icon={<Unicons.UilAirplay />} name={""} onClick={() => {
        //   setmodalOpen(true)
        //   dispatch(AdminActions.getManageCustomer())
        //   setmodalHead("Coomercial")
        //   setmodalBody(<>
        //     <ManageProjectTypeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
        //     {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
        //   </>)
        // }}></Button>} />,

        "commercial": <CstmButton className={"p-2"} child={<Button classes='w-10' icon={<Unicons.UilAirplay />} name={""} onClick={() => {
          setmodalOpen(true)
          dispatch(AdminActions.getManageCustomer())
          setmodalHead("Commercial")
          setmodalBody(<>
            <ManageProjectTypeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
            {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
          </>)
        }}></Button>} />,

        "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
          let msgdata = {
            show: true,
            icon: 'warning',
            buttons: [
              <Button classes='w-15 bg-green-500' onClick={() => {
                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_projecttype}/${customeruniqueId}/${itm.uniqueId}`, () => {
                  dispatch(AdminActions.getManageProjectType(customeruniqueId))
                  dispatch(ALERTS({ show: false }))
                }))
              }} name={"OK"} />,
              <Button classes='w-24' onClick={() => {
                dispatch(ALERTS({ show: false }))
              }} name={"Cancel"} />
            ],
            text: "Are you sure you want to Delete?"
          }
          dispatch(ALERTS(msgdata))
        }}></DeleteButton>} />
      }
      return updateditm
    });
  })
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.adminData?.getManageProject
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"]
    } else {
      return 0
    }
  })
  // let Form = [
  //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
  //     { label: "Custom Queries", value: "", type: "textarea" }
  // ]
  let table = {
    columns: [
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[140px] max-w-[200px] text-center"
      },
      {
        name: "Sub Type",
        value: "subProject",
        style: "min-w-[140px] max-w-[200px] text-center"
      },
      {
        name: "Status",
        value: "status",
        style: "min-w-[140px] max-w-[200px] text-center"

      },
      {
        name: "Template",
        value: "template",
        style: "min-w-[140px] max-w-[200px] text-center"

      },
      {
        name: "Milestone",
        value: "milestone",
        style: "min-w-[140px] max-w-[200px] text-center"

      },

      {
        name: "Commercial",
        value: "commercial",
        style: "min-w-[140px] max-w-[200px] text-center"

      },
      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[200px] text-center"
      },
      {
        name: "Delete",
        value: "delete",
        style: "min-w-[100px] max-w-[200px] text-center"
      }
    ],
    properties: {
      rpp: [10, 20, 50, 100]
    },
    filter: [
      // {
      //     label: "Role",
      //     type: "select",
      //     name: "rolename",
      //     option: roleList,
      //     props: {
      //     }
      // }
    ]
  }
  const onSubmit = (data) => {
    let value = data.reseter
    delete data.reseter
    dispatch(AdminActions.getManageProjectType(value, objectToQueryString(data)))
  }
  useEffect(() => {
    dispatch(AdminActions.getManageProjectType(customeruniqueId))
    dispatch(AdminActions.getCardProjectType(customeruniqueId))
  }, [])
  return type ?
    <>

      <div className='flex p-2'>
        <Button classes='w-auto' onClick={() => {
          settype(false)
        }} name={"View"} />
      </div>
      <AdvancedTable
        headerButton={<><Button onClick={(e) => {
          setmodalOpen(prev => !prev)
          // dispatch(OperationManagementActions.getOperationUserList())
          setmodalHead("New Project Type")
          setmodalBody(<ManageProjectTypeForm customeruniqueId={customeruniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
        }}
          name={"Add New"}></Button></>}
        table={table}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
      />

      <Modal size={"lg"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

      {/* <CommonForm/> */}
    </>
    : <>

      {/* <CCDash approveddata={
                dbConfigListCard?.map((itm => {
                    return <>
                        <div
                            className='bg-pink-100 shadow-md hover:shadow-rxl w-full flex h-24 cursor-pointer'
                            onClick={() => {
                                navigate(`${"/projectGroup"}/${itm["uniqueId"]}`)
                            }}>
                            {itm["companyimg"] && itm["companyimg"] != "" && <><img className='m-auto w-24' src={backendassetUrl + itm["companyimg"]} /></>}
                            <div className='m-auto '>{itm["projectType"]}</div>
                        </div>
                    </>
                }))
            } settype={settype} label='Add / Modify Project Type' /> */}


      <CCDash
        approveddata={dbConfigList?.map((itm) => {
          return (
            <>
              <div
                className="bg-pink-100 shadow-md hover:shadow-rxl w-full flex h-24 cursor-pointer"
                onClick={() => {
                  navigate(`${"/project"}/${customeruniqueId}/${itm["uniqueId"]}`)
                }}
              >
                {itm["companyimg"] && itm["companyimg"] != "" && (
                  <>
                    <img
                      className="m-auto w-24"
                      src={backendassetUrl + itm["companyimg"]}
                    />
                  </>
                )}
                <div className="m-auto ">{itm["projectType"]}</div>
              </div>
            </>
          );
        })}
        settype={settype}
        showbtn={true}
        label="Add / Modify Project Type"
        oppshowbtn={true}
        opplabel="Go To Project"
        onpassclick={() => {
          navigate(`${"/project"}/${customeruniqueId}`)
        }}
      />

      {/* <CCDash settype={settype} nextNavigate={"/viewcu"} name={"projectType"} img={""} data={dbConfigList} url="/list/manageCustomer" label='Add / Modify Project Type' /> */}
    </>
}


export default ManageProjectType;