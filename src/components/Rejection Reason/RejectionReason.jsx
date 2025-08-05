import React, { useEffect, useState } from 'react'
import Api from '../../utils/api'

const RejectionReason = ({itemData}) => {

  const [response, setResponse] = useState([])



const getRejectionData=async()=>{
const res = await Api.get({url: `/web/rejection?ptwNumber=${itemData?.ptwNumber}`})
    
    setResponse(res?.data?.data)
}

useEffect(()=>{
console.log(itemData?.ptwNumber,"___ptwNumber")
getRejectionData()

},[itemData?.ptwNumber])


  return (
    <>
    
      {
        response[0]?.rejectionReason?.map((itm, index)=>{
          return <div className='dark:text-white pl-5'>
              {index+1}. {itm}
          </div>
        })
      }
    </>
  )
}

export default RejectionReason
