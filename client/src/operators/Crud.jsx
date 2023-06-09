import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Crud() {
  const [inputdata, setInputdata] = useState("");
  const [displayoutput, setDisplayoutput] = useState([]);
  const [id, setid] = useState("");
  useEffect(() => {
    getdata();
  }, []);
  const getdata = () => {
    axios
      .get("http://localhost:7008/Read")
      .then((response) => response.data)
      .then((data) => {
        setDisplayoutput(data.read);
      });
  };
  const buttonclick = () => {
    var dat = {
      inputdata: inputdata,
      eid: id,
    };
    if (inputdata !== "") {
      if (id === "") {
        axios.post("http://localhost:7008/Create", dat).then((response) => {
          if (response.data.message === "Data Saved") {
            alert("Data Saved");
            window.location.reload();
          } else {
            alert("Failed");
          }
        });
      } else {
        axios.put("http://localhost:7008/Update", dat).then((response) => {
          if (response.data.message === "Data Updated") {
            alert("Data Updated");
            window.location.reload();
          } else {
            alert("Failed");
          }
        });
      }
    }
    else{
      alert("Enter Data");
    }
  };

  const buttondelete = (delid) => {
    axios
      .delete("http://localhost:7008/Delete/" + delid)
      .then((response) => response)
      .then((data) => {
        getdata();
      });
  };
  const buttonclickedit = (id) => {
    setid(id);
    axios
      .get("http://localhost:7008/Update/" + id)
      .then((response) => response.data)
      .then((data) => {
        setInputdata(data.update[0].data_name);
      });
  };
  return (
    <div>
      <div className="tableinput">
        <input
          type="text"
          onChange={(e) => setInputdata(e.target.value)}
          value={inputdata}
        />
        <button onClick={buttonclick}>Submit</button>
      </div>

      <div className="tableout">
        <div className="r">
          <div className="c">Name</div>
          <div className="c">Action</div>
        </div>
        <div>
          {displayoutput.map((row, map) => (
            <div className="c">
              {row.data_name}
              <button onClick={() => buttondelete(row.data_id)}>Delete</button>
              <button onClick={() => buttonclickedit(row.data_id)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
