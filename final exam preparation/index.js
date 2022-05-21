const express = require("express");
const bobyParser = require("body-parser");
const path = require("path");
const { redirect } = require("express/lib/response");

    var app = express();

    let data = [ 'fairfield', 'iowa city', 'de moines' ];

    app.use('/js',express.static(path.join(__dirname,"js")))
    .use(bobyParser.urlencoded({ extended : true }))
    .use(bobyParser.json())
    .set('view engine','ejs')
    .set("views","views")
    .get("/",(req,res) => {
        res.render("view",{ data : data });

    }).post("/addData",(req,res) => {
        data.push(req.body.comment);
        console.log(req.body.comment);
        res.json(req.body);
    })
    .listen(3000,() => {

        console.log("welcome!!!");

    });