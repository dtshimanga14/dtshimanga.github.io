
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mod = require("./mod");
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

    }).get("/data",(req,res) => {
        let body = req.query;
        let data = computers[body.id-1];
        console.log("object body" + req.body.id);
        console.log("object params" + req.params.id);
        console.log("object query" + req.query.id);
        res.send(data);
    })
    .listen(3000,() => {
        console.log((new mod()).sum(3,5));
        console.log((new mod()).substract(3,5));
    })