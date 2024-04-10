import React, { useEffect, useState } from 'react';
import Button from './Button';
import PopupMenu from './PopupMenu';
import { UilAngleDown, UilAngleUp } from '@iconscout/react-unicons'
import { current } from '@reduxjs/toolkit';
import { UilColumns } from '@iconscout/react-unicons'
import { UilFilter } from '@iconscout/react-unicons'
import Modalmoreinfo from './Modalmoreinfo';
import Modal from './Modal';
import DatePicker from 'react-datepicker';
import { objectToArray } from '../utils/commonFunnction';
import moment from 'moment';

const AdvancedTableExpandableOneRow = ({ multiSelect, setOpenModal, setModalBody, table, itm, hide }) => {



    const [expand, setExpand] = useState(false)

    return <>
        <tr>

            <td className='text-[12px] pl-1 border-primaryLine border-[1.5px] text-primaryLine'>
                <span onClick={() => {
                    setExpand(prev => !prev)
                }}>{expand ? <UilAngleUp /> : <UilAngleDown />}
                </span>
            </td>
            {table.columns.map((innerItm, index) => {

                return hide.indexOf(String(index)) == -1 ? <td className={`text-[12px] pl-1 border-primaryLine border-[1.5px] text-primaryLine  ${innerItm.style ? innerItm.style : " min-w-[300px] max-w-[500px]"}`}>

                    <Modalmoreinfo ctt={32} setModalBody={setModalBody} setOpenModal={setOpenModal} value={itm[innerItm.value]} />
                </td> : <></>
            })}
        </tr>



        {
            expand && Object.entries(table.childs).map((onewq) => {

                console.log(itm[onewq[0]], "itm[onewq[0]]")
                return itm[onewq[0]].map((onewqq) => {

                    console.log(onewqq.uniqueId,"onewqq.uniqueId")
                    return <tr>

                        <td className='text-[12px] pl-1 border-primaryLine border-[1.5px] bg-violet-50 text-primaryLine '>
                        {

                            multiSelect?<div className='flex justify-center'><input type='checkbox' name='groupOfCheck[]' value={onewqq.uniqueId}/></div>:<></>
                        }
                        </td>
                        {

                            console.log(table.childs[onewq[0]], "onewqqonewqqonewqqonewqqonewqq")
                        }
                        {
                            table.childs[onewq[0]].map((itts) => {

                                console.log(itts,onewqq, "ittsittsittsittsitts")
                                return <td className={`text-[12px] pl-1 border-primaryLine cursor-pointer border-[1.5px] bg-violet-50 text-primaryLine ${itts.style ? itts.style : " min-w-[300px] max-w-[500px]"}`}>
                                    <Modalmoreinfo ctt={32} setModalBody={setModalBody} setOpenModal={setOpenModal} value={onewqq[itts.value]} />
                                </td>
                            })
                        }
                        {/* {
                            Object.entries(table.childs).map((onewq) => {

                                console.log(onewq, "onewqonewqonewqonewq")
                                return onewq[1].map((innerItm, index) => {

                                    console.log(itm[onewq[0]], innerItm.value, "innerItminnerItminnerItm")

                                    return itm[onewq[0]].map((itts) => {
                                        return <td className={`text-[14px] pl-1 border-primaryLine border-2 text-primaryLine ${innerItm.style ? innerItm.style : " min-w-[300px] max-w-[500px]"}`}>
                                            <Modalmoreinfo ctt={32} setModalBody={setModalBody} setOpenModal={setOpenModal} value={itts[innerItm.value]} />
                                        </td>
                                    })
                                })
                            })
                        } */}
                    </tr>
                })
            })
        }


    </>

};

export default AdvancedTableExpandableOneRow;
