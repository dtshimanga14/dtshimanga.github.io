

const express = require("express");
const path = require("path");

var app = express();
app.use(express.json())
  .use(express.urlencoded({ extended : true }))
 .get('/',(req,res) => {

    res.sendFile(path.join(__dirname,"./form.html"));

  }).post('/result',(req,res) =>{
        let form = req.body;
        res.send(`Welcome ${form.name} and your age is ${form.age}`);
  })
  .listen(3000,() => {
    console.log("welcome to our w3d4 assignments ");
});