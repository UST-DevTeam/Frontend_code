import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Api from '../../utils/api'

const RejectionReason = ({itemData}) => {

const getRejectionData=async()=>{
const res = await Api.get({url: `/rejection?ptwNumber=${itemData?.ptwNumber}`,
    })
    console.log(res,"___res")
}

useEffect(()=>{

getRejectionData()

},[])


  return (
    <div>
      Dharmender
    </div>
  )
}

export default RejectionReason
