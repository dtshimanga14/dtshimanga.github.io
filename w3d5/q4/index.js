

const express = require("express");
const path = require("path");

var app = express();
app.use(express.json())
 .use('/css', express.static(path.join(__dirname, 'css')))
 .use(express.urlencoded({ extended : true }))
 .get('/',(req,res) => {
     
    const date = new Date();
    const hour = date.getHours();
    let tag = (hour >=  6 && hour <=  18) ? "day" : "night";

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="css/${tag}.css" rel="stylesheet" />
            <title>Home page</title>
        </head>
        <body>
            <div class="container">
                <form method="post" action="/result">
                    <label>Name</label> <input type="text" name="name"/>
                    <label>Age</label> <input type="text" name="age"/>
                    <input type="submit" value="Submit Query" />
                </form>
            </div>
        </body>
        </html>
    `);

  }).post('/result',(req,res) =>{
        let form = req.body;
        res.redirect(`/output/?name=${form.name}&age=${form.age}`);
  }).get('/output',(req,res) => {
     let form = req.query;
     res.send(`Welcome ${form.name} and your age is ${form.age}`);
  })
  .listen(3000,() => {
    console.log("welcome to our w3d4 assignments ");
});