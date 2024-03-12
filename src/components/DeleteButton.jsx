import React from 'react'
import { UilTrashAlt } from '@iconscout/react-unicons'
import Button from './Button'
const DeleteButton = ({ onClick }) => {
    return (
        <div className='flex justify-around'><Button name={""} classes={"w-10 bg-rose-600"} icon={<UilTrashAlt size="18" className={"hello"} />} onClick={onClick} /></div>
    )
}
export default DeleteButton