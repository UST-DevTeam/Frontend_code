import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../../components/Modal'
import AdvancedTable from '../../../../components/AdvancedTable'
import Button from '../../../../components/Button'
import { useForm } from 'react-hook-form'
import CommonForm from '../../../../components/CommonForm'
import Api from '../../../../utils/api'
import { Urls } from '../../../../utils/url'
import { tableAction } from '../../../../store/actions/table-action'
import { SET_TABLE } from '../../../../store/reducers/table-reducer'

const ExChangeRate = () => {
    let dispatch = useDispatch()
        const [modalOpen, setmodalOpen] = useState(false)
        const [modalBody, setmodalBody] = useState(<></>)
        const [modalHead, setmodalHead] = useState(<></>)
         const {
                register,
                handleSubmit,
                watch,
                setValue,
                setValues,
                getValues,
                formState: { errors },
            } = useForm()

        let row =useSelector((state)=>state.table.tableContent)
        console.log("=============",row)
        let table = {
            columns: [
                {
                    name: "Exchange Year",
                    value: "year",
                    style: "min-w-[140px] max-w-[200px] text-center"
                },
                {
                    name: "Rate",
                    value: "rate",
                    style: "min-w-[140px] max-w-[200px] text-center"
                },
                // {
                //     name: "Zone ID",
                //     value: "shortCode",
                //     style: "min-w-[140px] max-w-[200px] text-center"
                // },
                // {
                //     name: "Circle",
                //     value: "circleName",
                //     style: "min-w-[140px] max-w-[200px] text-center"
                // },            
                // {
                //     name: "Edit",
                //     value: "edit",
                //     style: "min-w-[100px] max-w-[200px] text-center"
                // },
                {
                    name: "Action",
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
            dispatch(AdminActions.getManageZone(value, objectToQueryString(data)))
        }

        useEffect(()=>{
            dispatch(tableAction.getTable(Urls.exchangeRate, SET_TABLE))
        },[])
  return (
    <div><AdvancedTable
    headerButton={<div className='flex gap-1'><Button classes='w-auto ' onClick={(e) => {
        setmodalOpen(prev => !prev)
        // dispatch(AdminActions.getManageZone())
        setmodalHead("New Zone")
        setmodalBody(<ManageZoneForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
    }}
        name={"Add Exchange"}></Button>
        {/* <Button name={"Upload File"} classes='w-auto' onClick={(e) => {
            setFileOpen(prev=>!prev)
        }}></Button> */}
        {/* <Button name={"Export"} classes='w-auto mr-1' onClick={(e) => {
            dispatch(CommonActions.commondownload("/export/manageZone","Export_Zone("+dt+").xlsx"))
        }}></Button> */}
        </div>}
    table={table}
    filterAfter={onSubmit}
    tableName={"UserListTable"} 
    // handleSubmit={handleSubmit}
    data={row}
    errors={errors}
    register={register}
    setValue={setValue}
    getValues={getValues}
    totalCount={10}
    heading = {"Total Exchanges :- "}
/>

<Modal size={"sm"} modalHead={modalHead} children={<ExchangeForm />} isOpen={modalOpen} setIsOpen={setmodalOpen} /></div>
  )
}

export default ExChangeRate





const ExchangeForm =()=>{
    const dispatch=useDispatch()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors },
      } = useForm();
      const onSubmit =async (data) => {
        console.log(data);

        const resp = await Api.post({ data, url: Urls.exchangeRate,"cb": () => dispatch(tableAction.getTable(Urls.exchangeRate, SET_TABLE)) })
      if (resp.status == 201) {
      
        setIsOpen(false);
      }
      };
    

    let Form =[
        {
            label: "Year",
            value: "",
            name: "year",
            type: "number",
            classes: "col-span-1",
            required:true,
            props:{
              "valueAsNumber":true,
              "min":2000
            }
            // props: {
            //   valueAsNumber: true,
            //   min: 0,
            // },
          },
          {
            label: "Rate",
            value: "",
            name: "rate",
            type: "number",
            classes: "col-span-1",
            required:true,
            props:{
              "valueAsNumber":true,
              "min":0
            }
            // props: {
            //   valueAsNumber: true,
            //   min: 0,
            // },
          },
    ]
    
    return (
        <>

        <CommonForm
        classes={"grid-cols-1 gap-1"}
        Form={Form}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
      />
        <Button
          classes={"mt-2 w-sm text-center flex mx-auto"}
          onClick={handleSubmit(onSubmit)}
          name="Submit"
        />
        </>
    )
}