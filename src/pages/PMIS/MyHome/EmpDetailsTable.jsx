import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
import EmpDetails from "../MyHome/EmpDetails";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
import ToggleButton from "../../../components/ToggleButton";
import { objectToQueryString } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../utils/url";
import OperationManagementActions from "../../../store/actions/admin-actions";
import HrActions from "../../../store/actions/hr-actions";
import { useNavigate, useParams } from "react-router-dom";
import FileUploader from "../../../components/FIleUploader";
import { GET_EMPLOYEE_DETAILS } from "../../../store/reducers/hr-reduces";

const EmpDetailsTable = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  const [strValFil, setstrVal] = useState(false);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  const currentDate = new Date();
  const dt = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let dbConfigList = useSelector((state) => {
    console.log(state, "state statejjjj");
    let interdata = state?.hrReducer?.getManageEmpDetails;
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  dispatch(GET_EMPLOYEE_DETAILS({ dataAll: [], reset: true, }));
                  navigate(`/empdetails/${itm.uniqueId}`);
                  setmodalBody(
                    <>
                      <EmpDetails resetting={false} formValue={itm} />
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
                              `${Urls.admin_empdetails}/${itm.uniqueId}`,
                              () => {
                                dispatch(HrActions.getManageEmpDetails());
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
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.hrReducer?.getManageEmpDetails;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  

  let table = {
    columns: [
      {
        name: "Emp Name",
        value: "empName",
        style: "min-w-[200px] max-w-[200px] font-extrabold text-center sticky left-0 bg-[#3e454d]",
      },
      {
        name: "Emp Code",
        value: "empCode",
        style: "min-w-[150px] max-w-[450px] text-center sticky left-[199px] bg-[#3e454d]",
      },
      {
        name: "Email ID",
        value: "email",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Mobile No.",
        value: "mobile",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      {
        name: "Designation",
        value: "designation",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "PMIS Role",
        value: "userRoleName",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      {
        name: "Status",
        value: "status",
        style: "min-w-[100px] max-w-[450px] text-center",
      },
      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[100px] text-center",
      },
      {
        name: "Delete",
        value: "delete",
        style: "min-w-[100px] max-w-[100px] text-center",
      },
      // {
      //     name: "View",
      //     value: "view",
      //     style: "min-w-[100px] max-w-[100px] text-center"
      // }
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
          label: "EMP Name",
          type: "text",
          name: "empName",
          props: {
          }
      },
      {
          label: "EMP Code",
          type: "text",
          name: "empCode",
          props: {
          }
      },
      {
          label: "PMIS Role",
          type: "text",
          name: "pmisRole",
          props: {
          }
      },
      {
          label: "Status",
          type: "select",
          name: "status",
          option: [
            { label: "Active", value: "Active" },
            { label: "Resign", value: "Resign" },
            { label: "Abscond", value: "Abscond" },
            { label: "Exit", value: "Exit" },
          ],
          props: {}
      },
    ],
  };
  const onSubmit = (data) => {
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal=objectToQueryString(data)
    setstrVal(strVal)
    // if(strValFil){
    //   strVal=strValFil
    // }
    // console.log("____strVal____",strVal)
    dispatch(HrActions.getManageEmpDetails(shouldReset,'', strVal));
  };

  useEffect(() => {
    dispatch(HrActions.getManageEmpDetails());
  }, []);

  const onTableViewSubmit = (data) => {
    data["fileType"] = "ManageEmployee";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(AdminActions.getManageEmpDetails());
        setFileOpen(false);
        resetting("");
      })
    );
  };
  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-1">
            {" "}
            <Button
              classes="w-auto"
              onClick={() => {
                navigate(`${"/empdetails"}`);
              }}
              name={"Add New"}
            ></Button>
            <Button
              name={"Upload File"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen((prev) => !prev);
              }}
            ></Button>
          </div>
        }
        table={table}
        exportButton={["/export/manageEmployee","Export_Employee("+dt+").xlsx"]}
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
        tempbtn={true} tempbtnlink = {["/template/ManageEmployee.xlsx","ManageEmployee.xlsx"]}
      />
    </>
  );
};

export default EmpDetailsTable;
