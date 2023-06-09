const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const port = 7008;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(port,() => {
  console.log("yeah its running!");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "db_crud",
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database is connected");
});

app.post("/Create", (req, res) => {
  const data = req.body.inputdata;
  let qry = `insert into tbl_data(data_name)values('${data}')`;
  console.log(qry);
  db.query(qry,(err,result)=>{
      if(err){
          console.log(err)
      }
      else{
          res.send({
              message:"Data Saved"
          })
      }
  })
});


app.get("/Read",(req,res)=>{
    let qry=`select * from tbl_data`
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length>0){
            res.send({
                read:result
            })
        }
        else{
            res.send({
                read:[]
            })
        }
    })
})

app.delete("/Delete/:id",(req,res)=>{
    const id=req.params.id;
    let qry=`delete from tbl_data where data_id='${id}'`
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({
                message:"Deleted"
            })
        }
    })

})

app.put("/Update", (req, res) => {
    const data = req.body.inputdata;
    const id = req.body.eid;
    let qry = `update tbl_data set data_name='${data}' where data_id='${id}'`;
    console.log(qry);
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send({
                message:"Data Updated"
            })
        }
    })
  });
  app.get("/Update/:id",(req,res)=>{
    var id = req.params.id;
    let qry=`select * from tbl_data where data_id='${id}'`
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length>0){
            res.send({
                update:result
            })
        }
        else{
            res.send({
                update:[]
            })
        }
    })
})