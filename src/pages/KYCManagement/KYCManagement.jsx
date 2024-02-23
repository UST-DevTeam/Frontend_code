import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import UserManagementForm from './KYCManagementForm';
import KYCManagementForm from './KYCManagementForm';
import CstmButton from '../../components/CstmButton';
import AdvancedTable from '../../components/AdvancedTable';
import AdminManagementActions from '../../store/actions/adminManagement-actions';
import ToggleButton from '../../components/ToggleButton';
import EditButton from '../../components/EditButton';
import DeleteButton from '../../components/DeleteButton';
import OperationManagementActions from '../../store/actions/OperationManagement-actions';
import CommonForm from '../../components/CommonForm';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { ALERTS } from '../../store/reducers/component-reducer';
const KYCManagement = () => {
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    let dispatch = useDispatch()
    let roleList = useSelector((state) => {
        console.log(state, "state state")
        let interdata = state?.adminManagement?.roleList
        return interdata
    })

    let Form = [
        {
            label: "Reg Type",
            value: "Select",
            option: [],
            type: "select",
            name: "regType",
            required: false,
            showlabel: false,
            props: {
                onChange: ((e) => {
                    seteUserLyp(e.target.value)
                })
            },
            classes: "col-span-1"
        }
    ]
    let kycS = {
        0: ["Document Pending","bg-gray-400"],
        1: ["Document Submitted","bg-yellow-400"],
        2: ["Document Verified","bg-green-400"],
        3: ["Document Rejected","bg-red-400"]
    }
    let kycew = {
        0: "Pending",
        1: "Pending",
        2: "Approve",
        3: "Not Approve"
    }
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setValues,
        getValues,
        formState: { errors },
    } = useForm()
    let dbConfigList = useSelector((state) => {
        console.log(state, "state statejjjj")
        let interdata = state?.OperationManagementReducer?.kycstatus
        return interdata.map((itm) => {
            let updateditm = {
                ...itm,
                "kycss": kycS[itm.kycStatus]?.[0] || 0,

                "status": <Button onClick={(e) => {

                    if (itm.kycStatus != 0) {
                        setmodalOpen(prev => !prev)
                        dispatch(AdminManagementActions.getUsersList())
                        setmodalHead("Update")
                        setmodalBody(<KYCManagementForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={{ ...itm, kycStatus: itm.kycStatus }} />)
                    } else {
                        let msgdata = {
                            show: true,
                            icon: 'warning',
                            buttons: [
                               
                            ],
                            type: 1,
                            text: "Currently User Not Submit KYC"
                        }
                        dispatch(ALERTS(msgdata))
                    }
                }}
                    name={"Update KYC"} classes={`${kycS[itm.kycStatus]?.[1] || ""} w-full p-4 text-black`}></Button>,

                "edit": <CstmButton child={<EditButton name={""} onClick={() => {
                    console.log(itm, "itm,dsadsadadada")
                    setmodalOpen(true)
                    dispatch(AdminManagementActions.getUsersList())
                    setmodalHead("Edit User")
                    setmodalBody(<>
                        <KYCManagementForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                }}></EditButton>} />,
                // "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                //     let msgdata = {
                //         show: true,
                //         icon: 'warning',
                //         buttons: [
                //             <Button classes='w-15 bg-green-500' onClick={() => {
                //                 dispatch(CommonActions.deleteApiCaller(`${Urls.alertConfiguration_configureAlert}/${itm.uniqueId}`, () => {
                //                     dispatch(CustomQueryActions.getDBConfig())
                //                     dispatch(ALERTS({ show: false }))
                //                 }))
                //             }} name={"OK"} />,
                //             <Button classes='w-24' onClick={() => {
                //                 dispatch(ALERTS({ show: false }))
                //             }} name={"Cancel"} />
                //         ],
                //         text: "Are you sure you want to Delete?"
                //     }
                //     dispatch(ALERTS(msgdata))
                // }}></DeleteButton>} />
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-green-500' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.admin_userList}/${itm.id}`, () => {
                                    dispatch(CustomQueryActions.getUserList())
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

    let table = {
        columns: [
            {
                name: "First Name",
                value: "firstName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Surname",
                value: "surname",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Email",
                value: "email",
                style: "min-w-[250px] max-w-[450px] text-center"
            },
            {
                name: "Document",
                value: "profileStatus",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "KYC Status",
                value: "kycss",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Reg. Type",
                value: "regType",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Company Name",
                value: "cmpName",
                style: "min-w-[200px] max-w-[200px] text-center"
            },
            {
                name: "Reg. Address",
                value: "cAddress",
                style: "min-w-[300px] max-w-[300px] text-center"
            },
            
            {
                name: "Reg. No.",
                value: "RegNo",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Role",
                value: "roleName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Status",
                value: "status",
                style: "min-w-[140px] max-w-[200px] text-center p-2"
            },
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
        dispatch(AdminManagementActions.getUsersList(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(OperationManagementActions.getKycStatusList())
    }, [])
    return <>
        <AdvancedTable
            headerButton={<><Button onClick={(e) => {
                setmodalOpen(prev => !prev)
                dispatch(AdminManagementActions.getUsersList())
                setmodalHead("New User")
                setmodalBody(<UserManagementForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
                name={"Add New"}></Button></>}
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

export default KYCManagement;
