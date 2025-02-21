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
import CstmButton from '../../../../components/CstmButton'
import EditButton from '../../../../components/EditButton'
import DeleteButton from '../../../../components/DeleteButton'
import ExchangeForm from './ExchangeForm'
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


            let row = useSelector((state) => {
              let interdata = state?.table?.tableContent || [];
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
                            setmodalOpen(true);
                            setmodalHead("Edit Plan");
                            setmodalBody(
                              <>
                                <ExchangeForm
                                 isOpen={modalOpen}
                                 setIsOpen={setmodalOpen}
                                 resetting={false}
                                 formValue={itm}
                                 year = {2025}
                                 monthss = {[2]}
                                 filtervalue = {""}
                                />
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
                                  classes='w-15 bg-rose-400'
                                  onClick={() => {
                                    dispatch(
                                      CommonActions.deleteApiCaller(
                                        `${Urls.exchangeRate}/${itm.uniqueId}`,
                                        () => {
                                          
                                          dispatch(tableAction.getTable(Urls.exchangeRate, SET_TABLE))
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



        // let row =useSelector((state)=>state.table.tableContent)
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
                {
                  name: "Edit",
                  value: "edit",
                  style: "min-w-[100px] max-w-[200px] text-center",
                },
                {
                  name: "Delete",
                  value: "delete",
                  style: "min-w-[100px] max-w-[200px] text-center",
                },
            ],
            properties: {
                rpp: [10, 20, 50, 100]
            },
            filter: []
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
    <div>
      <AdvancedTable
        headerButton={
          <div className='flex gap-1'>
            <Button classes='w-auto ' onClick={(e) => {
              setmodalOpen(prev => !prev)
              setmodalHead("Rate")
              // setmodalBody(<ManageZoneForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
              }}
              name={"Add Exchange"}>
            </Button>
          </div>}
        table={table}
        filterAfter={onSubmit}
        tableName={"UserListTable"} 
        data={row}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={""}
      />
      <Modal size={"sm"} modalHead={modalHead} children={<ExchangeForm />} isOpen={modalOpen} setIsOpen={setmodalOpen}/>
    </div>
  )
}

export default ExChangeRate





