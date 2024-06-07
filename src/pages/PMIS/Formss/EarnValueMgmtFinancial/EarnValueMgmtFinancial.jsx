import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import ToggleButton from '../../../../components/ToggleButton';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
import EarnValueMgmtForm from '../../../../pages/PMIS/Formss/EarnValueMgmtFinancial/EarnValueMgmtForm'
import FinanceActions from '../../../../store/actions/finance-actions';
import FormssActions from '../../../../store/actions/formss-actions';
import AdminActions from '../../../../store/actions/admin-actions';

const EarnValueMgmtFinancial = () => {
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    let dispatch = useDispatch()
    // let roleList = useSelector((state) => {
    //     let interdata = state?.operationManagement?.USERS_LIST
    //     return interdata
    // })


    let circleList = useSelector((state) => {
        return state?.adminData?.getManageCircle.map((itm) => {
            return {
            label: itm?.circleName,
            value: itm?.uniqueId
            }
        })
    })

    let projectTypeList = useSelector((state) => {
        return state?.adminData?.getCardProjectType.map((itm) => {
            return {
            label: itm?.projectType,
            value: itm?.uniqueId
            }
        })
    })

    let ccList = useSelector((state) => {
        return state?.adminData?.getManageCostCenter.map((itm) => {
            return {
            label: itm?.costCenter,
            value: itm?.uniqueId
            }
        })
    })
    let projectList = useSelector((state) => {
        return state?.adminData?.getProject.map((itm) => {
            return {
            label: itm?.projectId,
            value: itm?.uniqueId
            }
        })
    })



    let dbConfigList = useSelector((state) => {
        let interdata = state?.formssData?.getEarnValueMgmtFinancial || []
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                plan1: itm.earnvalueArray?.[0]?.["plan"],
                plan2: itm.earnvalueArray?.[1]?.["plan"],
                plan3: itm.earnvalueArray?.[2]?.["plan"],

                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(FormssActions.getEarnValueMgmtFinancial(true, ))
                    setmodalHead("Edit User")
                    setmodalBody(<>
                        <EarnValueMgmtForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    console.log('ahshshhs',itm)
                    //setmodalOpen(false)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-green-500' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.formss_earnValue_mgmt_financial}/${itm.uniqueId}`, () => {
                                    dispatch(FormssActions.getEarnValueMgmtFinancial())
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
        let interdata = state?.formssData?.getEarnValueMgmtFinancial || []
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
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setValues,
        getValues,
        formState: { errors },
    } = useForm()

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getPreviousCurrentAndNextMonth = () => {
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
        const nextMonthIndex = (currentMonthIndex + 1) % 12;
        const currentYear = currentDate.getFullYear();
        const previousMonthYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;
        const nextMonthYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;

        return [
            { month: months[previousMonthIndex], year: previousMonthYear },
            { month: months[currentMonthIndex], year: currentYear },
            { month: months[nextMonthIndex], year: nextMonthYear }
        ];
    };

    const [previousMonthData, currentMonthData, nextMonthData] = getPreviousCurrentAndNextMonth();



    let table = {
        columns: [
            {
                name: "Circle",
                value: "circle",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Type",
                value: "projectType",
                style: "min-w-[140px] max-w-[200px] text-center"
            },                      
            {
                name: "Cost Center",
                value: "costCenter",
                style: "min-w-[140px] max-w-[200px] text-center"
            },            
            {
                name: "Project ID",
                value: "projectId",
                style: "min-w-[200px] max-w-[200px] text-center"
            },
            {
                name: `Plan (${previousMonthData.month} ${previousMonthData.year})`,
                value: "plan1",
                style: "min-w-[200px] max-w-[200px] text-center"
            },            
            {
                name: `Achievement (${previousMonthData.month} ${previousMonthData.year})`,
                value: "prevAchievementValue",
                style: "min-w-[200px] max-w-[200px] text-center"
            },            
            {
                name: `Plan (${currentMonthData.month} ${currentMonthData.year})`,
                value: "plan2",
                style: "min-w-[200px] max-w-[200px] text-center"
            },            
            {
                name: `Achievement (${currentMonthData.month} ${currentMonthData.year})`,
                value: "currAchievementValue",
                style: "min-w-[200px] max-w-[200px] text-center"
            },            
            {
                name: `Plan (${nextMonthData.month} ${nextMonthData.year})`,
                value: "plan3",
                style: "min-w-[200px] max-w-[200px] text-center"
            },            
            {
                name: `Achievement (${nextMonthData.month} ${nextMonthData.year})`,
                value: "nextAchievementValue",
                style: "min-w-[200px] max-w-[200px] text-center"
            },            
                         
            {
                name: "Edit",
                value: "edit",
                style: "min-w-[100px] max-w-[200px] text-center"
            },
            // {
            //     name: "Delete",
            //     value: "delete",
            //     style: "min-w-[100px] max-w-[200px] text-center"
            // }    
        ],
        properties: {
            rpp: [10, 20, 50, 100]
        },
        filter: [
            {
                label: "Cirlce",
                type: "autoSuggestion",
                name: "cirlce",
                option: circleList,
                props: {
                }
            },
            {
                label: "Project Type",
                type: "autoSuggestion",
                name: "projectType",
                option: projectTypeList,
                props: {
                }
            },
            {
                label: "Cost Center",
                type: "autoSuggestion",
                name: "costCenter",
                option: ccList,
                props: {
                }
            },
            {
                label: "Project ID",
                type: "autoSuggestion",
                name: "projectId",
                option: projectList,
                props: {
                }
            },
            // {
            //     label: "Project ID",
            //     type: "autoSuggestion",
            //     name: "projectId",
            //     option: `${}`,
            //     props: {
            //     }
            // },
        ]
    }
    const onSubmit = (data) => {
        console.log("jsjsjsjss", data)
        let value = data.reseter
        delete data.reseter
        dispatch(FinanceActions.getPoLifeCycle(value, objectToQueryString(data)))
    }
    useEffect(() => {

        dispatch(FormssActions.getEarnValueMgmtFinancial())
        dispatch(AdminActions.getManageCircle())
        dispatch(AdminActions.getCardProjectType());
        dispatch(AdminActions.getManageCostCenter());
        dispatch(AdminActions.getProject());
    }, [])
    return <>
        <AdvancedTable
            headerButton={<>
            {/* <Button onClick={(e) => {
                setmodalOpen(prev => !prev)
                setmodalHead("New Plan")
                setmodalBody(<EarnValueMgmtForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add New"}></Button> */}
                </>}
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

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
    </>


};

export default EarnValueMgmtFinancial;