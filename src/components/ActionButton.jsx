import React from 'react'
import {UilCheckCircle,UilFolderCheck,UilCheckSquare } from '@iconscout/react-unicons'
import Button from './Button'


const ActionButton = ({ onClick }) => {
    return (
        <div className='flex justify-around'>
            <Button name={""} classes={"w-10"} icon={<UilCheckSquare  size="18" className={"hello"} />} onClick={onClick} />
        </div>
    )
}

export default ActionButton