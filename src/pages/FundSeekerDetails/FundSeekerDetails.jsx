import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import AdvancedTable from '../../components/AdvancedTable.jsx';
// import UserManagementForm from './UserManagementForm';
import Modal from '../../components/Modal.jsx';
import Button from '../../components/Button.jsx';
import CstmButton from '../../components/CstmButton.jsx';
import EditButton from '../../components/EditButton.jsx';
import DeleteButton from '../../components/DeleteButton.jsx';
import ToggleButton from '../../components/ToggleButton.jsx';

import { objectToQueryString } from '../../utils/commonFunnction.js';
import { ALERTS } from '../../store/reducers/component-reducer.js';
import CommonActions from '../../store/actions/common-actions.js';
import { Urls } from '../../utils/url.js';
import CustomQueryActions from '../../store/actions/customQuery-actions.js';
import FundSeekerDetailsActions from '../../store/actions/FundSeekerDetails-actions.js';
import FundSeekerDetailsForm from './FundSeekerDetailsForm.jsx';

const FundSeekerDetails = () => {
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    let dispatch = useDispatch()
    let roleList = useSelector((state) => {
        let interdata = state?.FundSeekerDetails?.USERS_LIST
        return interdata
    })
    let dbConfigList = useSelector((state) => {
        console.log(state, "state statejjjj")
        let interdata = state?.FundSeekerDetailsReducer?.usersList
        return interdata?.map((itm) => {
            console.log(itm,'jdjdjdjjdjdj')
            let updateditm = {
                ...itm,
                "status": <CstmButton child={<ToggleButton onChange={(e) => {
                    console.log(e.target.checked, "e.target.checked")
                    let data = {
                        "enabled": e.target.checked ? 1 : 0
                    }
                    dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
                        // alert(e.target.checked)
                        e.target.checked = e.target.checked
                    }, itm.id))
                    // if(itm.enabled==0){
                    //     itm.enabled=1
                    // }else{
                    //     itm.enabled=0
                    // }
                    // itm.enabled=itm.enabled==0?1:0
                    console.log(itm.enabled, "itm.enabled")
                }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,
                "edit": <CstmButton child={<EditButton name={""} onClick={() => {
                    console.log(itm,'shssjsjjsjsj')
                    setmodalOpen(true)
                    // dispatch(FundSeekerDetailsActions.postOperationUserList(itm.uniqueId))
                    //dispatch(FundSeekerDetailsActions.getOperationUserList())
                    setmodalHead("Edit User")
                    setmodalBody(<>
                        <FundSeekerDetailsForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
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
                                dispatch(CommonActions.deleteApiCaller(`${Urls.operationUser}/${itm.uniqueId}`, () => {
                                    dispatch(FundSeekerDetailsActions.getOperationUserList())
                                    dispatch(ALERTS({ show: false }))
                                }))
                            }} name={"OK"} />,
                            <Button classes='w-24' onClick={() => {
                                console.log('snnsnsnsns')
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
        let interdata = state?.adminManagement?.usersList
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

    let table = {
        columns: [
            {
                name: "Fund Seeker",
                value: "fundseeker",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Investor",
                value: "investor",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Investment Amount",
                value: "investment_amount",
                style: "min-w-[250px] max-w-[450px] text-center"
            },
            {
                name: "Raised Date",
                value: "raised_date",
                style: "min-w-[250px] max-w-[450px] text-center"
            },
            // {
            //     name: "Edit",
            //     value: "edit",
            //     style: "min-w-[100px] max-w-[200px] text-center"
            // },
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
        console.log("jsjsjsjss", data)
        let value = data.reseter
        delete data.reseter
        dispatch(FundSeekerDetailsActions.getOperationUserList(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(FundSeekerDetailsActions.getOperationUserList())
        // dispatch(FundSeekerDetailsActions.getRoleList())
    }, [])
    return <>
        <AdvancedTable
            // headerButton={<><Button onClick={(e) => {
            //     setmodalOpen(prev => !prev)
            //     dispatch(FundSeekerDetailsActions.getOperationUserList())
            //     setmodalHead("New User")
            //     setmodalBody(<FundSeekerDetailsForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            // }}
            //     name={"Add New"}></Button></>}
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

export default FundSeekerDetails;