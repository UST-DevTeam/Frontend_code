import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import { objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import ExpenseAdvanceActions from "../../../../store/actions/expenseAdvance-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";

const ClaimAndAdvance = () => {
  const expenseRef = useRef("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [claimByNumber, setClaimByNumber] = useState([]);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [hide, setHide] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ExpenseAdvanceActions.getClaimAndAdvance());
  }, []);

  let Amounts = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getClaimAndAdvance;
    if (interdata.length > 0) {
      return interdata[0];
    } else {
      return 0;
    }
  });

  let dbConfigList = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getClaimAndAdvance || [""];
    console.log(
      state?.expenseAdvanceData,
      "stateexpenseAdvanceData",
      interdata[0]?.data,
      typeof interdata[0]
    );
    let interdata2 = [];
    if (interdata.length > 0) {
      interdata2 = interdata[0]?.data || [];
    }
    return interdata2?.map((item) => {
        const itm = { ...item }; // Create a shallow copy of the object
        // typeof('rtyuiuytrtui',itm)
        itm["debitExpense"] =0
        itm.advanceExpense = 0;
        if (itm?.type === "Expense") {
            itm.debitExpense = itm?.totalApprovedAmountRow;
        } else if (itm?.type === "Advance") {
            itm.advanceExpense = itm?.totalApprovedAmountRow;
        }

      let updateditm = {
        ...itm,
        attachment: (
          <div className="flex justify-center items-center">
            <img
              src={backendassetUrl + itm?.attachment}
              className="w-24 h-14 content-center flex object-contain"
            />
          </div>
        ),

        name: (
          <p
            className="cursor-pointer text-blue-500 underline"
            onClick={(e) => {
              expenseRef.current = itm;
              dispatch(
                ExpenseAdvanceActions.getClaimAndAdvancebyNumber(
                  true,
                  `Number=${itm?.name}`,
                  (data) => setClaimByNumber(data)
                )
              );
              setmodalFullOpen((prev) => !prev);
              setHide(true);
              setmodalHead("(Claim And Advance)" + " " + itm?.name);
            }}
          >
            {itm.name}
          </p>
        ),

        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  dispatch(ExpenseAdvanceActions.getClaimAndAdvance());
                  setmodalHead("Edit Claim Advance");
                  setmodalBody(
                    <>
                      {/* <ManageCustomerForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></EditButton>
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
                        classes="w-15 bg-green-500"
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.expAdv_claim_and_advance}/${itm.uniqueId}`,
                              () => {
                                dispatch(
                                  ExpenseAdvanceActions.getClaimAndAdvance()
                                );
                                dispatch(ALERTS({ show: false }));
                              }
                            )
                          );
                        }}
                        name={"OK"}
                      />,
                      <Button
                        classes="w-24"
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

        view: (
          <CstmButton
            className={"p-5"}
            child={
              <Button
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  setmodalHead("Show PDF");
                  setmodalBody(
                    <>
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></Button>
            }
          />
        ),
      };
      return updateditm;
    });
  });

  useEffect(() => {
    if (!modalFullOpen) {
      setHide(false);
    }
  }, [modalFullOpen]);

  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getClaimAndAdvance || [""];
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });
  // let Form = [
  //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
  //     { label: "Custom Queries", value: "", type: "textarea" }
  // ]
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let table = {
    columns: [
      ...(!hide
        ? [
            {
              name: "Month-Year",
              value: "addedMonth",
              style: "min-w-[140px] max-w-[200px] text-center",
            },
          ]
        : [
            {
              name: "Expense Month",
              value: "expensemonth",
              style: "min-w-[120px] max-w-[100px] text-center",
            },
          ]),
      ...(!hide
        ? [
            {
              name: "Expense/Advance No",
              value: "name",
              style:
                "min-w-[250px] max-w-[450px] text-center sticky left-0 bg-white",
            },
          ]
        : [
            {
              name: "Expense/Advance ID",
              value: "name",
              style: "min-w-[180px] max-w-[100px] text-center",
            },
            {
              name: "Expense Date",
              value: "expenseDate",
              style: "min-w-[180px] max-w-[100px] text-center",
            },
            {
              name: "Designation",
              value: "designation",
              style: "min-w-[150px] max-w-[100px] text-center",
            },
            {
              name: "Claim/Advance Type",
              value: "types",
              style: "min-w-[150px] max-w-[100px] text-center",
            },
            {
              name: "Category",
              value: "categories",
              style: "min-w-[150px] max-w-[100px] text-center",
            },
            {
              name: "Start Km",
              value: "startKm",
              style: "min-w-[150px] max-w-[100px] text-center",
            },
            {
              name: "End Km",
              value: "endKm",
              style: "min-w-[150px] max-w-[100px] text-center",
            },
            {
              name: "Total Distance",
              value: "Total_distance",
              style: "min-w-[150px] max-w-[100px] text-center",
            },
            {
              name: "Project ID",
              value: "projectIdName",
              style: "min-w-[150px] max-w-[100px] text-center",
            },
            {
              name: "Circle",
              value: "circle",
              style: "min-w-[150px] max-w-[100px] text-center",
            },
            {
              name: "Employee Name",
              value: "empName",
              style: "min-w-[150px] max-w-[100px] text-center",
            },
            {
              name: "Employee code",
              value: "empCode",
              style: "min-w-[150px] max-w-[100px] text-center",
            },
          ]),
      {
        name: "Cost Center",
        value: "costcenter",
        style: "min-w-[130px] max-w-[450px] text-center ",
      },
      ...(!hide
        ? [
            {
              name: "Submission Date",
              value: "AddedAt",
              style: "min-w-[250px] max-w-[450px] text-center",
            },
            {
              name: "Claim Date",
              value: "AddedAt",
              style: "min-w-[250px] max-w-[450px] text-center",
            },
            {
              name: "Debit(Expense)",
              value: "debitExpense",
              style: "min-w-[250px] max-w-[450px] text-center",
            },
            {
              name: "Advance(Credit)",
              value: "advanceExpense",
              style: "min-w-[250px] max-w-[450px] text-center",
            },
          ]
        : []),
      ...(!hide
        ? []
        : [
            {
              name: "Claimed Amount",
              value: "Amount",
              style: "min-w-[200px] max-w-[100px] text-center",
            },
            {
              name: "Approved Amount",
              value: "ApprovedAmount",
              style: "min-w-[200px] max-w-[100px] text-center",
            },
            {
              name: "Bill Number",
              value: "billNumber",
              style: "min-w-[200px] max-w-[100px] text-center",
            },
            {
              name: "Attachment",
              value: "attachment",
              style: "min-w-[200px] max-w-[100px] text-center",
            },
          ]),
      {
        name: "Status",
        value: "customStatus",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      ...(!hide
        ? []
        : [
            {
              name: "Remarks",
              value: "remark",
              style: "min-w-[200px] max-w-[100px] text-center",
            },
          ]),
      ...(!hide
        ? [
            {
              name: "Edit",
              value: "edit",
              style: "min-w-[250px] max-w-[450px] text-center",
            },
          ]
        : []),
    ],
    properties: {
      rpp: [10, 20, 50, 100],
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
    ],
  };
  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(
      ExpenseAdvanceActions.getClaimAndAdvance(value, objectToQueryString(data))
    );
  };

  return (
    <>
      <div className="flex text-sm space-x-2">
        <p className="mb-[-30px] p-2 ">
          Current Balance :{" "}
          <span
            className={
              Amounts?.finalAmount > 0 ? "text-green-600" : "text-rose-500"
            }
          >
            {Amounts?.finalAmount}
          </span>
        </p>
        <p className="mb-[-30px] p-2">
          Expenses Approved :{" "}
          <span
            className={
              Amounts?.ExpenseAmountTotal > 0
                ? "text-rose-600"
                : "text-green-500"
            }
          >
            {Amounts?.ExpenseAmountTotal}
          </span>
        </p>
        <p className="mb-[-30px] p-2">
          Advance Approved :{" "}
          <span
            className={
              Amounts?.AdvanceAmountTotal > 0
                ? "text-green-600"
                : "text-rose-500"
            }
          >
            {Amounts?.AdvanceAmountTotal}
          </span>
        </p>
      </div>

      <AdvancedTable
        headerButton={
          <>
            <Button
              onClick={() => {
                navigate(`${"/home/claimAndAdvance/Expense"}`);
              }}
              name={"Fill Expense"}
            ></Button>

            <Button
              classes="ml-1"
              onClick={() => {
                navigate(`${"/home/claimAndAdvance/Advance"}`);
              }}
              name={"Fill Advance"}
            ></Button>
            <Button
              classes="ml-1"
              onClick={() => {
                navigate(`${"/home/claimAndAdvance/DAFormFill"}`);
              }}
              name={"Fill DA"}
            ></Button>
          </>
        }
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

      <Modal
        size={"full"}
        modalHead={modalHead}
        children={
          <AdvancedTable
            headerButton={<div className="flex gap-1"></div>}
            table={table}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            handleSubmit={handleSubmit}
            data={claimByNumber}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
          />
        }
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      {/* <CommonForm/> */}
    </>
  );
};

export default ClaimAndAdvance;
