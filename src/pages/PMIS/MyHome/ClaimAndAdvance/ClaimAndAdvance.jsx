import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { UilImport } from "@iconscout/react-unicons";
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
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import ClaimAdvanceForm from "./ClaimAdvanceForm";
import DownloadButton from "../../../../components/DownloadButton";
import jsPDF from "jspdf";

const ClaimAndAdvance = () => {
  const expenseRef = useRef("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [claimByNumber, setClaimByNumber] = useState([]);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [hide, setHide] = useState(false);

  const navigate = useNavigate();

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(ExpenseAdvanceActions.getClaimAndAdvance());
    // dispatch(ExpenseAdvanceActions.getFillExpensesss());
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
      const itm = { ...item };
      itm["debitExpense"] = 0;
      itm.advanceExpense = 0;
      if (itm?.type === "Expense" || itm?.type === "Daily Allowance") {
        itm.debitExpense = itm?.totalApprovedAmountRow;
      } else if (itm?.type === "Advance") {
        itm.advanceExpense = itm?.totalApprovedAmountRow;
      }

      let updateditm = {
        ...itm,
        
        name: (
          <p
          className={`cursor-pointer font-extrabold ${itm.type === 'Expense' ? 'text-rose-400' : 'text-pcol'}`}
            onClick={(e) => {
              expenseRef.current = itm;
              sessionStorage.setItem("claimName", itm?.name);
              navigate(
                `/home/claimAndAdvance/claimAndAdvanceOnclick/${item?._id}`
              );
            }}
          >
            {itm.name}
          </p>
        ),
        customStatus: (
          <p
          className={`cursor-pointer font-extrabold ${[3, 5, 7].includes(itm?.customisedStatus) ? 'text-rose-400' : 'text-pcol'}`}
          >
            {itm.customStatus}
          </p>
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
                        classes='w-15 bg-rose-400'
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
        attachment: (
          <CstmButton
            className={"p-2"}
            child={
              <DownloadButton
                name={""}
                onClick={() => {
                  dispatch(
                    CommonActions.commondownload(
                      "/expenses/DownloadAttachment" +
                        "?" +
                        `expenseId=${itm.name}`,
                      "expense.pdf"
                    )
                  );
                }}
              ></DownloadButton>
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
      {
        name: "Month-Year",
        value: "addedMonth",
        style: "min-w-[110px] max-w-[200px] text-center sticky left-0 bg-[#3e454d]",
      },
      {
        name: "Submission Date",
        value: "AddedAt",
        style: "min-w-[170px] max-w-[450px] text-center sticky left-[110px] bg-[#3e454d]",
      },
      {
        name: "Expense/Advance No",
        value: "name",
        style:
          "min-w-[250px] max-w-[450px] text-center sticky left-[220px] bg-[#3e454d]",
      },
      {
        name: "Cost Center",
        value: "costcenter",
        style: "min-w-[130px] max-w-[450px] text-center ",
      },
      {
        name: "Claim Date",
        value: "submissionDate",
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
      {
        name: "Status",
        value: "customStatus",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Attachment",
        value: "attachment",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
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
      <div className="flex md:flex-col md:absolute text-sm space-x-2">
        <p className="mb-[-30px] md:mb-0 p-2 md:pl-4 text-white">
          Current Balance :{" "}
          <span
            className={
              Amounts?.finalAmount > 0
                ? "text-rose-400 font-extrabold"
                : "text-pcol font-extrabold"
            }
          >
            {Amounts?.finalAmount}
          </span>
        </p>
        <p className="mb-[-30px] md:mb-0 p-2 text-white">
          Expenses Approved :{" "}
          <span
            className={
              Amounts?.ExpenseAmountTotal > 0
                ? "text-rose-400 font-extrabold"
                : "text-pcol font-extrabold"
            }
          >
            {Amounts?.ExpenseAmountTotal}
          </span>
        </p>
        <p className="mb-[-30px] md:mb-0 p-2 text-white">
          Advance Approved :{" "}
          <span
            className={
              Amounts?.AdvanceAmountTotal > 0
                ? "text-pcol font-extrabold"
                : "text-rose-500 font-extrabold"
            }
          >
            {Amounts?.AdvanceAmountTotal}
          </span>
        </p>
      </div>
      <div className="md:mt-14">
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
                classes="ml-1 mr-1"
                onClick={() => {
                  navigate(`${"/home/claimAndAdvance/DAFormFill"}`);
                }}
                name={"Fill DA"}
              ></Button>
            </>
          }
          table={table}
          exportButton={[
            "/export/ExpensesAndAdvance",
            "Export_ExpensesAndAdvance.xlsx",
          ]}
          filterAfter={onSubmit}
          tableName={"UserListTable"}
          handleSubmit={handleSubmit}
          data={dbConfigList}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
          totalCount={dbConfigTotalCount}
          getaccessExport = {"Export(Claim&Advance)"}
        />
      </div>
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
