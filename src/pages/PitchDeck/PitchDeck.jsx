import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { UilMessage } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal';
// import Button from '../../../components/Button';
import Button from '../../components/Button';
// import CstmButton from '../../../components/CstmButton';
import CstmButton from '../../components/CstmButton';
// import EditButton from '../../../components/EditButton';
import EditButton from '../../components/EditButton';
import ToggleButton from '../../components/ToggleButton';
import AdminManagementActions from '../../store/actions/adminManagement-actions';
import { objectToQueryString } from '../../utils/commonFunnction';
import { ALERTS } from '../../store/reducers/component-reducer';
import CommonActions from '../../store/actions/common-actions';
import { Urls } from '../../utils/url';
import CustomQueryActions from '../../store/actions/customQuery-actions';
import AdvancedTable from '../../components/AdvancedTable';
import DeleteButton from '../../components/DeleteButton';
import PitchDeckForm from './PitchDeckForm';
import { UilEye  } from '@iconscout/react-unicons'
import DeckManagementActions from '../../store/actions/deckManagement-actions';
import { useNavigate } from 'react-router-dom';
import PitchSent from './PitchSent';
import InvestorManagementActions from '../../store/actions/Investor-action';
const PitchDeck = () => {
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let dbConfigList = useSelector((state) => {
        console.log(state, "state statejjjj")
        let interdata = state?.deckManagement.deckList
        let userRole=state?.auth?.user?.roleName
        console.log(userRole,'userRoleuserRoleuserRole')
        return interdata.map((itm) => {
            console.log('kkkkkxgg',itm)
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
                    }, itm.uniqueId))
                    // if(itm.enabled==0){
                    //     itm.enabled=1
                    // }else{
                    //     itm.enabled=0
                    // }
                    // itm.enabled=itm.enabled==0?1:0
                    console.log(itm.enabled, "itm.enabled")
                }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,
                "sentto":<CstmButton child={<Button classes='w-10' icon={<UilMessage classes='w-4' />}  name={""} onClick={() => {
                    setmodalOpen(true)
                    setmodalHead("Send To")
                    setmodalBody(<>
                        <PitchSent isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                    </>)
                    console.log('ahshshhs',itm)
                }}></Button>} />,
                "view": <CstmButton child={<Button name={""} icon={<UilEye size="18" className={"hello"} />} classes='w-10' onClick={() => {
                    navigate("/viewPitch/dasdsada")
                }}></Button>} />,
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    // dispatch(DeckManagementActions.getDeckList())
                    setmodalHead("Edit User")
                    setmodalBody(<>
                        <PitchDeckForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    console.log('ahshshhs',itm)
                    //setmodalOpen(false)
                }}></EditButton>} />,
                // "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                //     let msgdata = {
                //         show: true,
                //         icon: 'warning',
                //         buttons: [
                //             <Button classes='w-15 bg-rose-400' onClick={() => {
                //                 dispatch(CommonActions.deleteApiCaller(`${Urls.alertConfiguration_configureAlert}/${itm.uniqueId}`, () => {
                //                     dispatch(CustomQueryActions.getDBConfig())
                //                     dispatch(ALERTS({ show: false }))
                //                 }))
                //             }} name={"OK"} />,
                //             <Button classes='w-auto' onClick={() => {
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
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.pitchdeck}/${itm.uniqueId}`, () => {
                                    dispatch(DeckManagementActions.getDeckList())
                                    dispatch(ALERTS({ show: false }))
                                }))
                            }} name={"OK"} />,
                            <Button classes='w-auto' onClick={() => {
                                console.log('snnsnsnsns')
                                dispatch(ALERTS({ show: false }))
                            }} name={"Cancel"} />
                        ],
                        text: "Are you sure you want to Delete?"
                    }
                    dispatch(ALERTS(msgdata))
                }}></DeleteButton>}/>
            }
            return updateditm
        });
    })
    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.deckManagement?.deckList
        console.log(state.deckManagement.deckList,'kkxkxkkxkx')
        if(interdata?.length>0){
            return interdata[0]["overall_table_count"]
        }else{
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
                name: "Pitch Name",
                value: "pitchDeckName",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "The Ask",
                value: "amount",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            {
                name: "Project Current Stage",
                value: "projectCurrentStage",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            // {
            //     name: "The Ask",
            //     value: "ask",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },
            {
                name: "View",
                value: "view",
                style: "min-w-[50px] max-w-[50px] text-center"
            },
            {
                name: "Sent To",
                value: "sentto",
                style: "min-w-[50px] max-w-[50px] text-center"
            },
            {
                name: "Edit",
                value: "edit",
                style: "min-w-[20px] max-w-[20px] text-center"
            },
            {
                name: "Delete",
                value: "delete",
                style: "min-w-[50px] max-w-[50px] text-center"
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
        console.log("jsjsjsjss",data)
        let value = data.reseter
        delete data.reseter
        // dispatch(AdminManagementActions.getUsersList(value, objectToQueryString(data)))
        dispatch(DeckManagementActions.getDeckList(value, objectToQueryString(data)))
    }
    useEffect(() => {
        // dispatch(AdminManagementActions.getUsersList())
        // dispatch(AdminManagementActions.getRoleList())
        dispatch(InvestorManagementActions.getInvestorList())
        dispatch(DeckManagementActions.getDeckList())
    }, [])
    return <>
        <AdvancedTable 
            headerButton={<><Button onClick={(e) => {
                setmodalOpen(prev => !prev)
                // dispatch(AdminManagementActions.getUsersList())
                dispatch(DeckManagementActions.getDeckList())
                setmodalHead("Upload Pitch Deck")
                setmodalBody(<PitchDeckForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
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

        {/* let Form = [
        { label: "Pitch Deck Name", name: "firstName", value: "firstName", type: "text", props: "", required: true, placeholder: "" },
        { label: "Amount Raise", name: "surname", value: "surname", type: "text", props: "", required: true, placeholder: "" },
        { label: "E-mail", name: "email", value: "email", type: "text", props: "", required: true, placeholder: "" },
        { label: "Phone Number", name: "phoneNumber", value: "phone number", type: "text", props: "", required: true, placeholder: "" },
        { label: "File", name: "document", value: "document", type: "file", props: "", required: true, placeholder: "",multiple:true},
    ]
        return (
            <>
           <CommonForm  Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues}></CommonForm>
           <Button classes={"mt-4 mx-auto bg-neavycolor"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />
           </>
        ) */}
    </>
};

export default PitchDeck;

