import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Delete() {
  useEffect(()=>{
    getdata()
  })
  const[displaydata,setDisplaydata]=useState([])
  const getdata=()=>{
    axios.get("http://localhost:7008/Read")
    .then((response)=>response.data)
    .then((data)=>{
      setDisplaydata(data.read)
    })
  }
  const buttondelete=(delid)=>{
  axios.delete("http://localhost:7008/Delete/" + delid)
  .then((response)=>response.data)
  .then((data)=>{
    getdata()
  })
  }
  return (
    <div>
      {displaydata.map((row,key)=>(
        <div>{row.data_name}<button onClick={()=>buttondelete(row.data_id)}>Delete</button></div>
      ))}
    </div>
  )
}
