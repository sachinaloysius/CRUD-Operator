import React, { useEffect, useState } from 'react'
import axios from "axios"
export default function Read() {
  const[createdataoutput,setCreatedataoutput]=useState([])

  useEffect(()=>{
    getRead()
  },[])
  const getRead=()=>{
   axios.get("http://localhost:7008/Read") 
   .then((response)=>response.data)
   .then((data)=>{
    setCreatedataoutput(data.read)
   })
  }
  return (
    <div>Read
   {createdataoutput.map((row,key)=>(
    <div>{row.data_name}</div>
   ))}
    </div>
  )
}
