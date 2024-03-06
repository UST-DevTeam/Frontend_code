import React, { useCallback, useEffect, useState } from 'react';
import Modalmoreinfo from './Modalmoreinfo';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import Modal from './Modal';

import { UilPlusCircle, UilTimes, UilBars } from '@iconscout/react-unicons'
import RoundedButton from './RoundedButton';
// import styled from "styled-components";

// const Handle = 

const RowHandler = SortableHandle(() => <div className="handle text-center"><UilBars /></div>);

const TableRow = ({ data, columns,setlisting, className }) => {
    console.log(data, columns , "data, columns")
    return <tr>
        <td>
            <div className="firstElement">
                <RowHandler />
            </div>
        </td>
        {
            Object.entries(data).map((itm) => {
                return <td>{itm[1]}</td>
            })
        }
        <td>
            <RoundedButton onClick={()=>{
                setlisting(prev=>{
                    prev.pop()
                    console.log(prev,"prevprevprev")
                    return [...prev]
                })
            }} icon={<UilTimes />} />

        </td>

        {/* <td><input className='border-2 border-black' type='text' /></td>
        <td><input className='border-2 border-black' type='text' /></td>
        <td><input className='border-2 border-black' type='text' /></td>
        <td><select className='border-2 border-black'>
            <option>Text</option>
            <option>File</option>
            <option>Select</option>
        </select></td>
        <td><input className='border-2 border-black' type='text' /></td> */}
    </tr>

}

const TableJson = ({ headers,setlisting, columns }) => {

    const [openModal, setOpenModal] = useState(false)
    const [modalBody, setModalBody] = useState("")


    console.log(columns, "columnscolumnscolumns")
    const [items, setItems] = useState([
        "", "", "", ""
    ]);

    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
        setItems(oldItems => arrayMove(oldItems, oldIndex, newIndex));
    }, []);


    useEffect(() => {
        // alert("sadadasdsadsa")
    }, [columns])


    const SortableCont = SortableContainer(({ children }) => {
        return <tbody>{children}</tbody>;
    });


    const SortableItem = SortableElement(props => <TableRow {...props} />);
    return <>
        <table border={1} className='h-auto w-full table-auto'>
            <thead className='bg-primaryLine text-white sticky -top-1 z-10 '>
                <tr>

                    <th className='border-gray-400 border-2 w-6'>S.No</th>
                    {
                        headers.map((itm) => {
                            return <th className='border-gray-400 border-2 w-96'>
                                {itm}
                            </th>
                        })
                    }
                    <th className='border-gray-400 border-2 w-20 text-center'>Acton</th>
                </tr>
            </thead>

            <SortableCont
                onSortEnd={onSortEnd}
                axis="y"
                lockAxis="y"
                lockToContainerEdges={true}
                lockOffset={["30%", "50%"]}
                helperClass="helperContainerClass"
                useDragHandle={true}
            >
                {columns.map((value, index) => {

                    console.log(value, index, "value, index")
                    return <SortableItem
                        key={`item-${index}`}
                        index={index}
                        data={value}
                        columns={columns}
                        setlisting={setlisting}
                    />
                })}
            </SortableCont>
            {/* <tbody className='overflow-scroll'> */}
            {/* {
                    columns.map((itm,index) => {
                        return <tr >
                            {headers.map((innerItm) => {
                                return <td className='border-gray-400 border-2 whitespace-nowrap  w-96'>
                                    <Modalmoreinfo setModalBody={setModalBody} setOpenModal={setOpenModal} value={itm[innerItm]} />
                                </td>
                            })}
                        </tr>

                    })
                } */}
            {/* </tbody> */}
        </table>

        <Modal children={modalBody} setIsOpen={setOpenModal} isOpen={openModal} size={"sm"} />
    </>
};

export default TableJson;
