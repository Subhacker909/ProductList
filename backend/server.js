const express = require('express')
const cors = require('cors')
const mysql = require("mysql");
const app=express();
app.use(express.json());
app.use(cors());

//Establish the database connection

const db=mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "productlistapp",

})

//Get the data
app.get("/",(req, res) => {
     const sql="SELECT * FROM productlist";
     db.query(sql,(err,data) =>{
        if(err) return res.json("Error");
        return res.json(data);
     })
})

//create
app.post("/Create",(req, res) => {
    const sql="INSERT INTO productlist ('product_name','product_price') VALUES(?,?)";
    const values=[
        req.body.product_name,
        req.body.product_price
    ]
    db.query(sql,[values],(err,res) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//update
app.put("/Update/:id",(req, res) => {
    const sql="update productlist set 'product_name'=?,'product_price'=? where ID=?";
    const values=[
        req.body.product_name,
        req.body.product_price
    ]
    const id=req.params.id;
    db.query(sql,[...values,id],(err,res) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//delete
app.delete("/Student/:id",(req, res) => {
    const sql="DELETE FROM productlist WHERE ID= ?";
    const id=req.params.id;
    db.query(sql,[id],(err,res) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081, () =>{
    console.log("listening");
})
