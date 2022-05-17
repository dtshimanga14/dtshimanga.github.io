const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
    var app = express();

    app.set('view engine','ejs')
    .set('views','./views')
    .use(cookieParser())
    .use(bodyParser.urlencoded({extended :  false }))
    .use(bodyParser.json())
    .get('/',(req,res) => {

        res.render('home' , { cookies : req.cookies });

    }).get("/hello",(req,res) => {

        res.send("Big greet to you" + req.cookies.name);

    }).post("/addCookie", (req,res) => {
        
        res.cookie(req.body.key,req.body.value);
        console.log(req.cookies);
        res.redirect('/');
    })
    .listen(3000,() => {
        console.log("welcome !!!");
    });