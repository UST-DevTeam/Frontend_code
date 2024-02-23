import React from 'react'
import { UilEdit } from '@iconscout/react-unicons'
import Button from './Button'
const RoundedButton = ({ onClick,icon }) => {

    return (
        <div className='flex justify-around'><Button name={""} className={"w-12 rounded-2xl "} icon={icon} onClick={onClick} /></div>
    )
}

export default RoundedButton