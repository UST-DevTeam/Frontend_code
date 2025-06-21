import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import ManageProjectTypeForm from "../../../PMIS/Admin/ManageProjectType/ManageProjectTypeForm";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import {
  getAccessType,
  objectToQueryString,
} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import CCDash from "../../../../components/CCDash";
import CommonTableForm from "../../../../components/CommonTableForm";
import CommonTableFormSiteParent from "../../../../components/CommonTableFormSiteParent";
import { SET_DYNAMIC_FORM } from "../../../../store/reducers/projectList-reducer";
import ConditionalButton from "../../../../components/ConditionalButton";
import ComponentActions from "../../../../store/actions/component-actions";
import FilterActions from "../../../../store/actions/filter-actions";
import CurrentuserActions from "../../../../store/actions/currentuser-action";
const WorkAtHeight = () => {
  const [modalOpen, setmodalOpen] = useState(false);

  let completionCriteriaList = useSelector((state) => {
    let interdata = state?.adminData?.getManageCompletionCriteria || [];
    return interdata?.map((itm) => {
      const data = {
        name: itm.completion,
        id: itm.completion,
      };
      return data;
    });
  });
  const [type, settype] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  const [modalSize, setmodalSize] = useState("full");
  const [uniqueness, setUniqueness] = useState("");
  const [listing, setlisting] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let conditionmultiForm = [
    {
      label: "Field Name",
      name: "fieldName",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Mandatory(Y/N)",
      name: "required",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Yes",
          value: "Yes",
        },
        {
          label: "No",
          value: "No",
        },
      ],
      props: "",
      required: false,
      placeholder: "",
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
          value: "Text",
        },
        {
          label: "Number",
          value: "Number",
        },
        {
          label: "Decimal",
          value: "Decimal",
        },
        {
          label: "Date",
          value: "Date",
        },
        {
          label: "Dropdown",
          value: "Dropdown",
          extended: {
            typer: "add",
            type: "text",
            option: [],
          },
        },
        {
          label: "Auto Created",
          value: "Auto Created",
          extended: {
            typer: "add",
            type: "text",
            option: [],
          },
        },
      ],
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Status",
      name: "Status",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "Inactive",
        },
      ],
      props: "",
      required: false,
      placeholder: "",
    },
  ];

  const handleAddActivity = (res, sediting, targ, itm) => {
    let newdata = {
      [targ]: res,
    };

    dispatch(
      AdminActions.patchManageProjectType(true, itm.uniqueId, newdata, () => {
        sediting((prev) => !prev);
        // dispatch(AdminActions.getManageProjectType(customeruniqueId));
      })
    );

    let dbConfigList = useSelector((state) => {
      let interdata = state?.adminData?.getManageProjectType;
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

          template: (
            <CstmButton
              className={"p-2"}
              child={
                <Button
                  classes="w-10"
                  name={""}
                  icon={<Unicons.UilFileCheck />}
                  onClick={() => {
                    setUniqueness((prev) => itm.uniqueId);
                    setmodalOpen(true);
                    setmodalSize("full");
                    // dispatch(AdminActions.getManageCustomer())
                    // console.log(itm["t_sengg"], "setUniqueness")
                    setmodalHead("Templates");

                    dispatch(
                      SET_DYNAMIC_FORM({
                        label: "Site Engg",
                        value: itm["t_sengg"] ? itm["t_sengg"] : [],
                        reseter: true,
                      })
                    );
                    dispatch(
                      SET_DYNAMIC_FORM({
                        label: "Tracking",
                        value: itm["t_tracking"] ? itm["t_tracking"] : [],
                        reseter: true,
                      })
                    );
                    dispatch(
                      SET_DYNAMIC_FORM({
                        label: "Issues",
                        value: itm["t_issues"] ? itm["t_issues"] : [],
                        reseter: true,
                      })
                    );
                    dispatch(
                      SET_DYNAMIC_FORM({
                        label: "Financials",
                        value: itm["t_sFinancials"] ? itm["t_sFinancials"] : [],
                        reseter: true,
                      })
                    );
                    setmodalBody(
                      <>
                        <div className="flex flex-col justify-between p-2">
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
                        <CommonTableFormSiteParent
                          funcaller={() => {}}
                          defaultValue={"Site Engg"}
                          tabslist={{
                            "Site Engg": (
                              <CommonTableForm
                                setmodalOpen={setmodalOpen}
                                tabHead={"Site Engg"}
                                customeruniqueId={customeruniqueId}
                                classes={"grid-cols-2 gap-1"}
                                Form={conditionmultiForm}
                                errors={errors}
                                register={register}
                                setValue={setValue}
                                getValues={getValues}
                                functioning={(res, changeState) =>
                                  handleAddActivity(
                                    res,
                                    changeState,
                                    "t_sengg",
                                    itm
                                  )
                                }
                                oldList={[]}
                                listing={listing}
                                setlisting={setlisting}
                                rowId={itm["uniqueId"]}
                                name={"Template"}
                              />
                            ),
                            Tracking: (
                              <CommonTableForm
                                setmodalOpen={setmodalOpen}
                                tabHead={"Tracking"}
                                customeruniqueId={customeruniqueId}
                                classes={"grid-cols-2 gap-1"}
                                Form={conditionmultiForm}
                                errors={errors}
                                register={register}
                                setValue={setValue}
                                getValues={getValues}
                                functioning={(res, changeState) =>
                                  handleAddActivity(
                                    res,
                                    changeState,
                                    "t_tracking",
                                    itm
                                  )
                                }
                                oldList={[]}
                                listing={listing}
                                setlisting={setlisting}
                                rowId={itm["uniqueId"]}
                                name={"Template"}
                              />
                            ),
                            Issues: (
                              <CommonTableForm
                                setmodalOpen={setmodalOpen}
                                tabHead={"Issues"}
                                customeruniqueId={customeruniqueId}
                                classes={"grid-cols-2 gap-1"}
                                Form={conditionmultiForm}
                                errors={errors}
                                register={register}
                                setValue={setValue}
                                getValues={getValues}
                                functioning={(res, changeState) =>
                                  handleAddActivity(
                                    res,
                                    changeState,
                                    "t_issues",
                                    itm
                                  )
                                }
                                oldList={[]}
                                listing={listing}
                                setlisting={setlisting}
                                rowId={itm["uniqueId"]}
                                name={"Template"}
                              />
                            ),
                            Financials: (
                              <CommonTableForm
                                setmodalOpen={setmodalOpen}
                                tabHead={"Financials"}
                                customeruniqueId={customeruniqueId}
                                classes={"grid-cols-2 gap-1"}
                                Form={conditionmultiForm}
                                errors={errors}
                                register={register}
                                setValue={setValue}
                                getValues={getValues}
                                functioning={(res, changeState) =>
                                  handleAddActivity(
                                    res,
                                    changeState,
                                    "t_sFinancials",
                                    itm
                                  )
                                }
                                oldList={[]}
                                listing={listing}
                                setlisting={setlisting}
                                rowId={itm["uniqueId"]}
                                name={"Template"}
                              />
                            ),
                          }}
                        />

                        {/* <ManageProjectTypeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                      </>
                    );
                  }}
                ></Button>
              }
            />
          ),
          milestone: (
            <CstmButton
              className={"p-2"}
              child={
                <Button
                  classes="w-10"
                  name={""}
                  icon={<Unicons.UilAirplay />}
                  onClick={() => {
                    setmodalOpen(true);
                    setmodalSize("full");
                    setmodalHead("Milestones");

                    dispatch(
                      SET_DYNAMIC_FORM({
                        label: "MileStone",
                        value: itm["MileStone"] ? itm["MileStone"] : [],
                        reseter: true,
                      })
                    );
                    setmodalBody(
                      <>
                        <div className="flex flex-col justify-between p-2">
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
                        <CommonTableForm
                          setmodalOpen={setmodalOpen}
                          tabHead={"MileStone"}
                          customeruniqueId={customeruniqueId}
                          classes={"grid-cols-2 gap-1"}
                          Form={milestonemultiForm}
                          errors={errors}
                          register={register}
                          setValue={setValue}
                          getValues={getValues}
                          functioning={(res, changeState) =>
                            handleAddActivity(
                              res,
                              changeState,
                              "MileStone",
                              itm
                            )
                          }
                          oldList={[]}
                          listing={listing}
                          setlisting={setlisting}
                          rowId={itm["uniqueId"]}
                          name={"MileStone"}
                        />
                        {/* <ManageProjectTypeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                      </>
                    );
                  }}
                ></Button>
              }
            />
          ),
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
                  icon={<Unicons.UilBriefcaseAlt />}
                  name={""}
                  onClick={() => {
                    setmodalOpen(true);
                    setmodalHead("Commercial");
                    dispatch(
                      SET_DYNAMIC_FORM({
                        label: "Commercial",
                        value: itm["Commercial"] ? itm["Commercial"] : [],
                        reseter: true,
                      })
                    );
                    setmodalSize("full");
                    setmodalBody(
                      <>
                        <CommonTableForm
                          setmodalOpen={setmodalOpen}
                          tabHead={"Commercial"}
                          customeruniqueId={customeruniqueId}
                          classes={"grid-cols-2 gap-1"}
                          Form={commercialmultiForm}
                          errors={errors}
                          register={register}
                          setValue={setValue}
                          getValues={getValues}
                          functioning={(res, changeState) =>
                            handleAddActivity(
                              res,
                              changeState,
                              "Commercial",
                              itm
                            )
                          }
                          oldList={[]}
                          listing={listing}
                          setlisting={setlisting}
                          rowId={itm["uniqueId"]}
                          name={"Commercial"}
                        />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                      </>
                    );
                  }}
                ></Button>
              }
            />
          ),

          delete: (
            <CstmButton
              child={
                <DeleteButton
                  name={""}
                  onClick={() => {
                    let msgdata = {
                      show: true,
                      icon: "warning",
                      buttons: [
                        <Button
                          classes="w-15 bg-rose-400"
                          onClick={() => {
                            dispatch(
                              CommonActions.deleteApiCaller(
                                `${Urls.admin_projecttype}/${customeruniqueId}/${itm.uniqueId}`,
                                () => {
                                  dispatch(
                                    AdminActions.getManageProjectType(
                                      customeruniqueId
                                    )
                                  );
                                  dispatch(ALERTS({ show: false }));
                                }
                              )
                            );
                          }}
                          name={"OK"}
                        />,
                        <Button
                          classes="w-auto"
                          onClick={() => {
                            dispatch(ALERTS({ show: false }));
                          }}
                          name={"Cancel"}
                        />,
                      ],
                      text: "Are you sure you want to Delete?",
                    };
                    dispatch(ALERTS(msgdata));
                  }}
                ></DeleteButton>
              }
            />
          ),
        };
        return updateditm;
      });
    });
  };

  return (
    <>
      <div>
        <CommonTableFormSiteParent
          funcaller={() => {}}
          defaultValue={"CheckList"}
          tabslist={{
            CheckList: (
              <CommonTableForm
                setmodalOpen={setmodalOpen}
                tabHead={"CheckList"}
                classes={"grid-cols-2 gap-1"}
                Form={conditionmultiForm}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
                functioning={(res, changeState) =>
                  handleAddActivity(res, changeState, "t_sengg", itm)
                }
                oldList={[]}
                listing={listing}
                setlisting={setlisting}
              />
            ),
            Photo: (
              <CommonTableForm
                setmodalOpen={setmodalOpen}
                tabHead={"Photo"}
                classes={"grid-cols-2 gap-1"}
                Form={conditionmultiForm}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
                functioning={(res, changeState) =>
                  handleAddActivity(res, changeState, "t_tracking", itm)
                }
                oldList={[]}
                listing={listing}
                setlisting={setlisting}
              />
            ),
            RiskAssessment: (
              <CommonTableForm
                setmodalOpen={setmodalOpen}
                tabHead={"Risk Assessment"}
                classes={"grid-cols-2 gap-1"}
                Form={conditionmultiForm}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
                functioning={(res, changeState) =>
                  handleAddActivity(res, changeState, "t_issues", itm)
                }
                oldList={[]}
                listing={listing}
                setlisting={setlisting}
              />
            ),
            OneAtRisk: (
              <CommonTableForm
                setmodalOpen={setmodalOpen}
                tabHead={"Financials"}
                classes={"grid-cols-2 gap-1"}
                Form={conditionmultiForm}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
                functioning={(res, changeState) =>
                  handleAddActivity(res, changeState, "t_sFinancials", itm)
                }
                oldList={[]}
                listing={listing}
                setlisting={setlisting}
              />
            ),
          }}
        />
      </div>
    </>
  );
};

export default WorkAtHeight;
