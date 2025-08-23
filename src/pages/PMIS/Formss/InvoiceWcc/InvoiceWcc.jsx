import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AdvancedTable from "../../../../components/AdvancedTable";
import {objectToQueryString } from "../../../../utils/commonFunnction";
import FinanceActions from "../../../../store/actions/finance-actions";

const InvoiceWcc = () => {

  const [strValFil, setstrVal] = useState(false);
  const endDate = moment().format("Y");

  let dispatch = useDispatch();


  let dbConfigList = useSelector((state) => {
    let interdata = state?.financeData?.getInvoiceWcc || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
      };
      return updateditm;
    });
  });



  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.financeData?.getInvoiceWcc || [];
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  let listYear = [];

  for (let ywq = 2019; ywq <= +endDate; ywq++) {
    listYear.push({'label':ywq,'value':ywq});
  }

  let monthList = [
    {'label':'Jan', 'value':'Jan'},
    {'label':'Feb', 'value':'Feb'},
    {'label':'Mar', 'value':'Mar'},
    {'label':'Apr', 'value':'Apr'},
    {'label':'May', 'value':'May'},
    {'label':'Jun', 'value':'Jun'},
    {'label':'Jul', 'value':'Jul'},
    {'label':'Aug', 'value':'Aug'},
    {'label':'Sep', 'value':'Sep'},
    {'label':'Oct', 'value':'Oct'},
    {'label':'Nov', 'value':'Nov'},
    {'label':'Dec', 'value':'Dec'},
  ]


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
        name: "Year",
        value: "year",
        style: "min-w-[60px] max-w-[160px] text-center sticky left-0 bg-[#3e454d] z-10",
      },
      {
        name: "Month",
        value: "month",
        style: "min-w-[80px] max-w-[160px] text-center sticky left-[60px] bg-[#3e454d] z-10",
      },
      {
        name: "WCC No",
        value: "wccNumber",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Invoice Number",
        value: "invoiceNumber",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Year",
        type: "select",
        name: "year",
        option:listYear,
        props: {
        }
      },
      {
        label: "Month",
        type: "select",
        name: "month",
        option:monthList,
        props: {
        }
      },
      {
        label: "WCC NO",
        type: "text",
        name: "wccNumber",
        props: {
        }
      },
      {
        label: "Invoice No",
        type: "text",
        name: "invoiceNumber",
        props: {
        }
      },
    ],
  };


  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    let strVal=objectToQueryString(data)
    setstrVal(strVal)
    dispatch(FinanceActions.getInvoiceWcc(value, strVal));
  };


  useEffect(() => {
    dispatch(FinanceActions.getInvoiceWcc(true,""));
  }, []);



  return (
    <>
      <AdvancedTable
        headerButton={
          <>
          </>
        }
        table={table}
        exportButton={[`/export/InvoiceWcc`+"?"+strValFil, "Export_Invoice_WCC.xlsx"]}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        heading = {'Total Count:- '}
        getaccessExport = {"Export(Revenue Invoice)"}
      />
      
    </>
  );
};

export default InvoiceWcc;