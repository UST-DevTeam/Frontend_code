
import React from 'react'
import { UilImport } from '@iconscout/react-unicons'
import Button from './Button'

const DownloadButton = ({ onClick }) => {
    return (
        <div className='flex justify-around'>
            <Button name={""} classes={"w-10"} icon={<UilImport size="18" className={"hello"} />} onClick={onClick} />
        </div>
    )
}

export default DownloadButton
