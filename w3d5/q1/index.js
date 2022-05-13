

const express = require("express");

var app = express();
app.get('/',(req,res) => {
    let name = req.query.name;
    let age = req.query.age;
    if(!name) {
        name = "Person";
    }
    res.send(`welcome ${name}, your age is ${age}`);
});
app.listen(3000,() => {
    console.log("welcome to our w3d4 assignments ");
});