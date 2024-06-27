import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
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
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import FileUploader from "../../../../components/FIleUploader";
import ExpenseAdvanceActions from "../../../../store/actions/expenseAdvance-actions";
import L1FormFORM from "../../../../pages/PMIS/MyHome/L1Form/L1FormFORM";
import CommonForm from "../../../../components/CommonForm";
import { useNavigate } from "react-router-dom";
import DownloadButton from "../../../../components/DownloadButton";

const L1Form = () => {
  const expenseRef = useRef("");
  const [amount, setAmount] = useState({
    ExpenseNo: {},
    amount: {},
    claimedAmount: {},
    remark: {},
    addedFor: {},
  });
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [hide, setHide] = useState(false);

  const navigate = useNavigate();

  let dispatch = useDispatch();

  const currentDate = new Date();
  const dt = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  const monthMap = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };
  let dbConfigList = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getL1Data || [""];
    return interdata?.map((itm) => {
      
      let updateditm = {
        ...itm,

        // attachment: (
        //   <div className="flex justify-center items-center">
        //     <img
        //       src={backendassetUrl + itm?.attachment}
        //       className="w-24 h-14 content-center flex object-contain"
        //     />
        //   </div>
        // ),
        expensemonth: monthMap[itm.expensemonth] || itm.expensemonth,
        
        ExpenseNo: (
          <p
            className="cursor-pointer text-[#13b497] font-extrabold"
            onClick={(e) => {
              
              expenseRef.current = itm;
              dispatch(
                ExpenseAdvanceActions.getL1Data(
                  true,
                  `ExpenseNo=${itm?.ExpenseNo}`
                )
              );
              setmodalFullOpen((prev) => !prev);
              setHide(true);
              setmodalHead("(L1)" + " " + itm?.ExpenseNo);
            }}
          >
            {itm.ExpenseNo}
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
                  dispatch(ExpenseAdvanceActions.getL1Data());
                  setmodalHead("Edit L1 Expense Approval");
                  setmodalBody(
                    <>
                      <L1FormFORM
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                      />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                  //setmodalOpen(false)
                }}
              ></EditButton>
            }
          />
        ),

        // attachment: (
        //   <CstmButton
        //     className={"p-2"}
        //     child={
        //     <DownloadButton
        //         name={""}
        //         onClick={() => {
        //             dispatch(CommonActions.commondownload("/expenses/downloadFile"+"?"+`expenseId=${itm.ExpenseNo}`,"expense.pdf"))                      
        //         }}
        //       ></DownloadButton>
        //     }
        //   />
        // ),

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
                              `${Urls.expAdv_L1Data}/${itm.uniqueId}`,
                              () => {
                                dispatch(ExpenseAdvanceActions.getL1Data());
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
      };
      return updateditm;
    });
  });

  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getL1Data || [];
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
        name: "Month",
        value: "expensemonth",
        style: "min-w-[80px] max-w-[450px] text-center",
      },
      {
        name: "Expense ID",
        value: "ExpenseNo",
        style: "min-w-[170px] max-w-[450px] text-center sticky left-0 bg-[#3e454d]",
      },
      {
        name: "Expense Date",
        value: "expenseDate",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      ...( !hide ? [] : 
      [
        {
          name: "Claim Type",
          value: "claimType",
          style: "min-w-[170px] max-w-[450px] text-center",
        },
      ]),
      {
        name: "Circle",
        value: "circle",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Cost Center",
        value: "costcenter",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Project ID",
        value: "projectIdName",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Employee Name",
        value: "empName",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Employee Code",
        value: "empCode",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Designation",
        value: "designation",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Category",
        value: "categories",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Bill Number",
        value: "billNumber",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Claimed Amount",
        value: "Amount",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Current Status",
        value: "customStatus",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      {
        name: "Last Action Date",
        value: "lastActionDate",
        style: "min-w-[200px] max-w-[450px] text-center",
      },
      ...( !hide ? [] : 
        [
          {
            name: "Attachment",
            value: "attachment",
            style: "min-w-[150px] max-w-[450px] text-center",
          },
        ]),
      ...( !hide ? [] : 
        [
          {
            name: "Amount",
            value: "amount",
            style: "min-w-[150px] max-w-[450px] text-center",
          },
          // {
          //   name: "Status",
          //   value: "status",
          //   style: "min-w-[100px] max-w-[450px] text-center",
          // },
          {
            name: "Remarks",
            value: "remark",
            style: "min-w-[350px] max-w-[450px] text-center",
          },
        ]),

      // {
      //   name: "Edit",
      //   value: "edit",
      //   style: "min-w-[100px] max-w-[100px] text-center",
      // },
      //   {
      //     name: "Delete",
      //     value: "delete",
      //     style: "min-w-[100px] max-w-[100px] text-center",
      //   },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Approval Status",
        type: "select",
        name: "status",
        option: [
          { label: "Submitted", value: "Submitted" },
          { label: "L1-Approved", value: "L1-Approved" },
          { label: "L1-Rejected", value: "L1-Rejected" },
          { label: "L2-Approved", value: "L2-Approved" },
          { label: "L2-Rejected", value: "L2-Rejected" },
          { label: "L3-Approved", value: "L3-Approved" },
          { label: "L3-Rejected", value: "L3-Rejected" },
        ],
        // props: {
        // }
      },
    ],
  };

  useEffect(() => {
    if(!modalFullOpen){
      setHide(false)
    }
  } , [modalFullOpen])
  

  function handleAmountAndRemark(type) {
    const data = { approver: "L1-" + type, type: "Expense", status: type };
    const amountRemark = [];

    if (typeof amount === "undefined" || typeof expenseRef === "undefined") {
      console.error("amount or expenseRef is not defined");
      return;
    }

    // const keys = [...new Set([...Object.keys(amount.amount), ...Object.keys(amount.remark)])];
    const keys = dbConfigList.map((item) => item.uniqueId);

    keys.forEach((key) => {
      const item = dbConfigList.find(item => item.uniqueId === key);
      console.log(item , amount , 'afdfadfsdfgfdgdgfddfgsddfassfadf')
      if (item) {
          amountRemark.push({
              _id: key,
              ApprovedAmount: key in amount.amount ? +amount.amount[key] : 0,
              Amount: key in amount.claimedAmount ? +item?.Amount : dbConfigList.find(item => item.uniqueId === key)?.Amount,
              remark: key in amount.remark ? amount.remark[key] : "",
              
          });
      }
  });

    // Populate the data object
    data.data = amountRemark;
    data.expenseId = expenseRef.current?.ExpenseNo;
    data.addedFor = expenseRef.current?.addedFor;
    dispatch(
      ExpenseAdvanceActions.postApprovalStatus(true, data, () => {
        // setIsOpen(false);
        dispatch(ExpenseAdvanceActions.getL1Data());

        setmodalOpen(false);
        setmodalFullOpen(false);
        setmodalBody(<></>);
        setmodalHead(<></>);

        const refs = document.querySelectorAll(".amountWithRemark");
        if (refs) {
          const data = Array.from(refs);
          if (data && Array.isArray(data)) {
            data.forEach((ele) => {
              ele.value = "";
            });
          }
        }
      })
    );

    // console.log("___data___", data);
  }

  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(ExpenseAdvanceActions?.getL1Data(value, objectToQueryString(data)));
  };

  useEffect(() => {
    if (!modalFullOpen) {
      dispatch(ExpenseAdvanceActions?.getL1Data());
    }
  }, [modalFullOpen]);

  const onTableViewSubmit = (data) => {
    data["fileType"] = "ManageClaimType";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(ExpenseAdvanceActions.getL1Data());
        setFileOpen(false);
      })
    );
  };
  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-1">
            <Button
              classes="w-auto"
              onClick={(e) => {
                navigate("/home/approverCards/L1Approver");
              }}
              name={"L1 Expense"}
            ></Button>
            <Button
              classes="w-auto"
              onClick={(e) => {
                navigate("/home/approverCards/L1Advance");
              }}
              name={"L1 Advance"}
            ></Button>

            {/* <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button> */}
          </div>
        }
        table={table}
        // templateButton={["/template/Circle.xlsx","Circle.xlsx"]}
        // exportButton={["/export/manageCircle","Export_Circle("+dt+").xlsx"]}
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
            headerButton={
              <div className="flex gap-1">
                <Button
                  onClick={() => {
                    handleAmountAndRemark("Rejected");
                  }}
                  name="Reject"
                />
                <Button
                  onClick={() => {
                    handleAmountAndRemark("Approved");
                  }}
                  name="Approve"
                />
              </div>
            }
            table={table}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            handleSubmit={handleSubmit}
            data={dbConfigList?.map((item, index) => {

              return {
                ...item,
                amount: (
                  <input
                    type="number"
                    className="p-5 w-full !border amountWithRemark bg-black"
                    placeholder="Enter Amount"
                    onChange={(e) => {
                      setAmount((prev) => {
                        return {
                          ...prev,
                          amount: {
                            ...prev.amount,
                            [item.uniqueId]: e.target.value,
                          },
                          claimedAmount: {
                            ...prev.claimedAmount,
                            [item.uniqueId]:
                              dbConfigList.find(
                                (item) => item.uniqueId === item.uniqueId
                              )?.Amount || 0,
                          },
                        };
                      });
                    }}
                  />
                ),
                remark: (
                  <input
                    type="text"
                    className="p-5 w-full !border amountWithRemark bg-black"
                    placeholder="Enter Your Remark..."
                    onChange={(e) => {
                      setAmount((prev) => {
                        return {
                          ...prev,
                          remark: {
                            ...prev.remark,
                            [item.uniqueId]: e.target.value,
                          },
                          claimedAmount: {
                            ...prev.claimedAmount,
                            [item.uniqueId]:
                              dbConfigList.find(
                                (item) => item.uniqueId === item.uniqueId
                              )?.Amount || 0,
                          },
                        };
                      });
                    }}
                  />
                ),

                attachment: (
                  <CstmButton
                    className={"p-2"}
                    child={
                    <DownloadButton
                        name={""}
                        onClick={() => {
                            dispatch(CommonActions.commondownload("/expenses/downloadFile"+"?"+`attachment=${item.attachment}`,`${item?.attachment}`))                      
                        }}
                      ></DownloadButton>
                    }
                  />
                ),
              };
            })}
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
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
        tempbtn={true}
        tempbtnlink={["/template/Circle.xlsx", "Circle.xlsx"]}
      />
    </>
  );
};

export default L1Form;
