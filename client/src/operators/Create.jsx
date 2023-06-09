import React, { useState } from 'react'
import axios from "axios"
export default function Create() {
  const[inputdata,setInputdata]=useState('')

  const buttonclick=()=>{
    var dat={
      inputdata:inputdata,
    }
    axios.post("http://localhost:7008/Create",
    dat).then((response)=>{
      if(response.data.message==="Data Saved"){
        alert("Data Saved")
        window.location.reload()
      }
      else{
        alert("Failed")
      }
    })
  }
  return (
    <div>Create 
      <input type="text"  onChange={(e)=>setInputdata(e.target.value)} />
      <button onClick={buttonclick}>Submit</button>
    </div>
  )
}
