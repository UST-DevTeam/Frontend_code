import React, { useEffect, useState } from 'react'
import DeliveryPVAForm from './DeliveryPVAForm';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import FormssActions from '../../../../store/actions/formss-actions';
import { useParams } from 'react-router-dom';
import { UilSearch } from "@iconscout/react-unicons";
import CommonForm from '../../../../components/CommonForm';
import { GET_PVA_DATA } from '../../../../store/reducers/formss-reducer';

const tdClasses = "text-[12px] pl-1 !h-[10px] text-center border-[#0e8670] h-[10px] border-[0.1px] text-primaryLine"

function getColSpan(subProjectType) {
    return subProjectType?.length + 1 || 0
}

function getProjectColumns(subProjectType, color, dataLength) {
    const columns = []
    subProjectType.forEach(item => {
        columns.push(<th className={tdClasses + " " + color}><span className='whitespace-nowrap text-[12px] font-semibold vertical-text py-1'>{item?.subProjectName}</span></th>)
    })
    columns.push(<th className={tdClasses + " vertical-text text-[12px] whitespace-nowrap py-2" + " " + color}>{dataLength ? "Totals" : ""}</th>)
    return columns
}

function getProjectRowsAchievementInPercentage(subProjectType, rowData) {
    const rows = []

    if (!rowData?.target?.length || !rowData.achievement?.length) {
        if (!rowData.length) {
            Array.from({ length: subProjectType.length }).forEach(() => {
                rows.push(<td className={tdClasses + " p-1 text-white bg-[#3E454D] font-medium"}>0</td>)
            })
            rows.push(<td className={tdClasses + " p-1 text-white bg-[#3E454D] font-medium"}>0</td>)
            return rows
        }
    }
    let total = 0
    subProjectType.forEach(item => {
        const subProjectType = item?.subProjectName
        const achievement = rowData.achievement.find(item => item.subProjectName === subProjectType)
        const target = rowData.target.find(item => item.subProjectName === subProjectType)
        if (!achievement || !target || target.value < 1) {
            rows.push(<td className={tdClasses + " p-1 text-white bg-[#3E454D] font-medium"}>0%</td>)
        }
        else {
            const value = Math.round((achievement.value / target.value) * 100)
            total += value
            rows.push(<td className={tdClasses + " p-1 text-white bg-[#3E454D] font-medium"}>{value + "%"}</td>)
        }
    })
    rows.push(<td className={tdClasses + " p-1 text-white bg-[#3E454D] font-medium"}>{total + "%"}</td>)
    return rows
}

function getProjectRows(subProjectType, rowData) {
    const rows = []
    let total = 0

    if (!rowData.length) {
        Array.from({ length: subProjectType.length }).forEach(() => {
            rows.push(<td className={tdClasses + " p-1 text-white bg-[#3E454D] font-medium"}>0</td>)
        })
        rows.push(<td className={tdClasses + " p-1 text-white bg-[#3E454D] font-medium"}>0</td>)
        return rows
    }

    subProjectType.forEach(item => {
        const subProjectType = item?.subProjectName
        const data = rowData.find(item => item?.subProjectName === subProjectType)
        total += data?.value || 0
        rows.push(<td className={tdClasses + " p-1 text-white bg-[#3E454D] font-medium"}>{data?.value || 0}</td>)
    })
    rows.push(<td className={tdClasses + " p-1 text-white bg-[#3E454D] font-medium"}>{total}</td>)
    return rows
}

function getProjectRowsTotalForAchievement(subProjectType, data) {
    const rows = []
    let total = 0

    subProjectType.forEach(item => {
        const subProjectType = item?.subProjectName
        let rowsTotal = 0
        data.forEach(item => {
            const achievement = item.achievement.find(item => item.subProjectName === subProjectType)
            const target = item.target.find(item => item.subProjectName === subProjectType)
            if (!achievement || !target || target.value < 1) {
                rowsTotal += 0
            } else {
                const value = Math.round((achievement.value / target.value) * 100) || 0
                rowsTotal += value
            }
        })
        rows.push(<td className={tdClasses + " p-1 text-white bg-[#3E454D] font-medium"}>{(rowsTotal || 0) + "%"}</td>)
        total += rowsTotal
    })
    rows.push(<td className={tdClasses + " p-1 text-white bg-[#3E454D] font-medium"}>{total + "%"}</td>)
    return rows
}

function getProjectRowsTotal(subProjectType, data, key) {
    const columns = []
    let total = 0
    subProjectType.forEach(item => {
        const subProjectType = item?.subProjectName
        let accumulate = 0
        data.forEach(item => {
            if (!(key in item)) return
            const subProjectTypeData = item[key]
            const data = subProjectTypeData.find(item => item?.subProjectName === subProjectType)
            accumulate += data ? data.value : 0
        })
        total += accumulate
        columns.push(<th className={tdClasses + " text-white bg-[#3E454D]"}>{accumulate}</th>)
    })
    columns.push(<th className={tdClasses + " text-white bg-[#3E454D]"}>{total}</th>)
    return columns
}

const DeliveryPVA = () => {
    const [modalOpen, setmodalOpen] = useState(false);
    const [modalBody, setmodalBody] = useState(<></>);
    const [modalHead, setmodalHead] = useState(<></>);
    const dispatch = useDispatch()
    const [selectType, _] = useState("")
    const { MSType, customerId } = useParams()

    const [filters, setFilters] = useState({
        MSType,
        customerId,
        month: [new Date().getMonth() + 1],
        circleId: null,
        year: new Date().getFullYear()
    })

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors },
        unregister,
        onReset
    } = useForm();

    const months = [
        { label: "Jan", value: 1 },
        { label: "Feb", value: 2 },
        { label: "Mar", value: 3 },
        { label: "Apr", value: 4 },
        { label: "May", value: 5 },
        { label: "Jun", value: 6 },
        { label: "Jul", value: 7 },
        { label: "Aug", value: 8 },
        { label: "Sep", value: 9 },
        { label: "Oct", value: 10 },
        { label: "Nov", value: 11 },
        { label: "Dec", value: 12 },
    ];

    let listYear = [];
    const endDate = moment().format("Y");

    for (let ywq = 2023; ywq <= +endDate; ywq++) {
        listYear.push({ label: ywq, value: ywq });
    }

    const circleList = useSelector((state) => {
        return state?.formssData?.getCircle.map((itm) => {
            return {
                label: itm?.circle,
                value: itm?.circleId,
            };
        });
    });

    const subProjectType = useSelector(state => {
        return state?.formssData?.getCircleSubProjectType || []
    })

    const formFields = [
        {
            label: "Year",
            value: "",
            name: "year",
            bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
            type: "select",
            option: listYear
        },
        {
            label: "Month",
            name: "month",
            value: "Select",
            type: "select",
            option: months,
            props: {
                selectType: selectType,
            },
            hasSelectAll: true,
            bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
        },
        {
            label: "Quater",
            value: "",
            name: "quater",
            bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
            type: "select",
            option: [
                {
                    label: "Q1",
                    value: [1, 2, 3]
                },
                {
                    label: "Q2",
                    value: [4, 5, 6]
                },
                {
                    label: "Q3",
                    value: [7, 8, 9]
                },
                {
                    label: "Q4",
                    value: [10, 11, 12]
                },
            ],
        },
        {
            label: "Circle",
            value: "",
            name: "circleId",
            bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
            type: "select",
            option: circleList
        },
    ]

    function onSubmit(data) {

        data.month = data.quater ? data.quater.split(",").map(item => +item) : [+data.month]

        if (data?.quater) {
            setValue("month", "")
        }

        setFilters({
            ...filters,
            year: +(data.year || filters.year),
            month: (data.month || filters.month),
            circleId: (data.circleId || null),
        })

        dispatch(FormssActions.getPvaData({
            ...filters,
            year: +(data.year || filters.year),
            month: (data.month || filters.month),
            circleId: (data.circleId || null),
        }))
    }


    useEffect(() => {
        dispatch(GET_PVA_DATA({ dataAll:[], reset:true}))
        dispatch(FormssActions.getCircle(customerId))
        dispatch(FormssActions.getCircleSubProjectType(customerId))
        dispatch(FormssActions.getPvaData(filters))
    }, []);


    useEffect(() => {
        setValue("year", filters.year)
        setValue("month", filters.month[0])
    }, [])

    const data = useSelector(state => state.formssData.getPvaData)

    const showMonths = filters.month?.map(item => months.find(innerItem => innerItem.value === item).label).join(",")

    return (
        <>

            <div className="flex items-center justify-between">
                <div className="col-span-1 flex space-x-2 md:col-span-1">
                    <CommonForm
                        classes="grid grid-cols-4 w-[700px] overflow-y-hidden p-2"
                        Form={formFields}
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                    />
                    <div className="flex w-fit mt-4 -ml-3 items-center justify-center">
                        <Button
                            classes="flex h-fit"
                            name=""
                            icon={<UilSearch className="w-5 m-2 h-5" />}
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>
                </div>

                <div className="flex w-fit mt-4 -ml-3 items-center justify-center">
                    <Button
                        onClick={(e) => {
                            setmodalOpen((prev) => !prev);
                            setmodalHead("New Plan");
                            setmodalBody(<DeliveryPVAForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} filters = {filters} />)
                        }}
                        name={"Add New"}
                        classes='w-auto !h-10'>
                    </Button>
                </div>
            </div>

            <div className="absolute left-0 right-0 flex-col">

                <div className={`m-2 overflow-x-auto h-[80vh] pb-6 border-1 border-solid border-black rounded-lg`}>

                    <table className='w-full'>
                        <thead className='sticky top-0'>

                            <tr>
                                <td className={"w-16 bg-[#3E454D]"}></td>
                                {getProjectRowsTotal(subProjectType, data, "target")}
                                {getProjectRowsTotal(subProjectType, data, "achievement")}
                                {getProjectRowsTotalForAchievement(subProjectType, data)}
                            </tr>

                            <tr>
                                <td className={"w-16 bg-[#3E454D]"}></td>
                                <th colSpan={getColSpan(subProjectType)} className={tdClasses + " !bg-orange-200 p-1"}>{showMonths}, {filters?.year} (Target)</th>
                                <th colSpan={getColSpan(subProjectType)} className={tdClasses + " !bg-orange-200 p-1"}>{showMonths}, {filters?.year} (Achievemnet)</th>
                                <th colSpan={getColSpan(subProjectType)} className={tdClasses + " !bg-orange-200 p-1"}>Achievemnet %</th>
                            </tr>

                            <tr>
                                <th className={tdClasses + " !bg-blue-200 w-16 text-[12px] font-semibold"}>Circle</th>
                                {getProjectColumns(subProjectType, "bg-sky-100", data.length)}
                                {getProjectColumns(subProjectType, "bg-rose-100", data.length)}
                                {getProjectColumns(subProjectType, "bg-green-200", data.length)}
                            </tr>

                        </thead>
                        <tbody>

                            {
                                data?.length > 0 ? data.map(item => {
                                    return (
                                        <tr>
                                            <td className={tdClasses + " text-white w-16 text-[12px] font-medium"}>{item?.circle}</td>
                                            {getProjectRows(subProjectType, item.target)}
                                            {getProjectRows(subProjectType, item.achievement)}
                                            {getProjectRowsAchievementInPercentage(subProjectType, item)}
                                        </tr>
                                    )
                                }) : <p className='text-white whitespace-nowrap'>No record found</p>
                            }
                        </tbody>
                    </table>

                </div>

                <div className="m-2 sticky bottom-0 z-10 inset-x-0 mx-auto bg-[#3e454d] p-2">
                    <div className="flex justify-between">
                        <div>
                            <label className="mr-2 text-white">Rows Per Page: </label>
                            <select
                                // value={RPP}
                                // onChange={(e) => handleRPPChange(parseInt(e.target.value))}
                                className="rounded-sm"
                            >
                                {[50, 100, 150, 200].map((itm, idx) => (
                                    <option key={idx} value={itm}>
                                        {itm}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                </div>
            </div>

            <Modal
                size={"sm"}
                modalHead={modalHead}
                children={modalBody}
                isOpen={modalOpen}
                setIsOpen={setmodalOpen}
            />

        </>

    )
}

export default DeliveryPVA