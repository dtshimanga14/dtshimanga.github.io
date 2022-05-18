
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

    var app = express();

    const computers = [
    { 
        cpuSpeed : "8Ghz",
        Ram : "9Gb",
        Storage : "9Tb",
        Price : 450 
    },{ 
        cpuSpeed : "16Ghz",
        Ram : "18Gb",
        Storage : "18Tb",
        Price : 900 
    },{ 
        cpuSpeed : "32Ghz",
        Ram : "36Gb",
        Storage : "36Tb",
        Price : 1800 
    }];

    app.use(bodyParser.urlencoded({ extended : true }))
    .use(bodyParser.json())
    .use('/js',express.static(path.join(__dirname,'js')))
    .set('view engine','ejs')
    .set('views','views')
    .get("/",(req,res) => {
        res.render("app");

    }).post("/data",(req,res) => {
        let body = req.body;
        let data = computers[body.id-1];
        console.log(data);
        res.send(data);
    })
    .listen(3000,() => {
        console.log("welcome");
    })