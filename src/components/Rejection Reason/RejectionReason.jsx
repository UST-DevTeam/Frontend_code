import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Api from '../../utils/api'

const RejectionReason = ({itemData}) => {

  const [response, setResponse] = useState([])

console.log(itemData,"__itemData___")

const getRejectionData=async()=>{
const res = await Api.get({url: `/web/rejection?ptwNumber=${itemData?.ptwNumber}`,
    })
    
    setResponse(res?.data?.data)
}

useEffect(()=>{

getRejectionData()

},[])
console.log(response,"___reponse")

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
