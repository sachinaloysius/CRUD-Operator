import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

export default function Update() {
  const [displaydata, setDisplaydata] = useState([]);
  const [inputdata, SetInputdata] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    getdata();
  }, []);
  const getdata = () => {
    axios
      .get("http://localhost:7008/Read")
      .then((response) => response.data)
      .then((data) => {
        setDisplaydata(data.read);
      });
  };
  const buttonclick = () => {
    var dat = {
      inputdata: inputdata,
      eid: id,
    };
    axios.put("http://localhost:7008/Update", dat).then((response) => {
      if (response.data.message === "Data Updated") {
        alert("Data Updated");
        window.location.reload();
      } else {
        alert("Failed");
      }
    });
  };
  const buttonEdit = (id) => {
    setId(id);
    // displaydata.map((row, key) =>
    //   row.data_id === id ? SetInputdata(row.data_name) : ""
    // );

    axios
      .get("http://localhost:7008/Update/"+id)
      .then((response) => response.data)
      .then((data) => {
        // console.log(data.read[0].data_name);
         SetInputdata(data.read[0].data_name)
      });
  };
  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => SetInputdata(e.target.value)}
          value={inputdata}
        />
        <button onClick={buttonclick}>Submit</button>
       </div>
      <div className="container">
        <div className="row">srl.no</div>
        <div className="row">Name</div>
        <div className="row">Action</div>
      </div>

      {displaydata.map((row, key) => (
      
        <div className="container">
          
          <div className="row">{key + 1}</div>
          <div className="row">{row.data_name}</div>
          <div className="row">
            <button onClick={() => buttonEdit(row.data_id)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}
