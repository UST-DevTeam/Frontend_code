import React from 'react'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import PTWActions from '../../store/actions/ptw-actions'

const CommonAlert = ({ Heading, setmodalOpen, sendData }) => {
  const dispatch = useDispatch()

  return (
    <div className="p-4">
     
      <p className="text-center text-white text-lg font-semibold mb-4">{Heading}</p>

   
      <div className="flex justify-center gap-10 px-4">
        <Button
          name="Ok"
          classes="w-auto"
          onClick={() => {
            dispatch(PTWActions.getPtwApproverAlert(true, sendData, ''))
          }}
        />
        <Button
          name="Cancel"
          classes="w-auto"
          onClick={() => {
            setmodalOpen(false)
          }}
        />
      </div>
    </div>
  )
}

export default CommonAlert
