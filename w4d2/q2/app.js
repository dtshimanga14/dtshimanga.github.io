const express = require("express");
const path = require("path");
    var app = express();

let list = [ "It is Certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes",
"Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy, try again", "Ask again later",
"Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it",
"My reply is no", "My sources say no", "Outlook not so good", "Very doubtful" ];

app.set('view engine','ejs')
app.set('views', path.join(__dirname, "views"))
.use('/js',express.static(path.join(__dirname,"js")))
.get('/',(req,res) => {

    res.render("magic");

}).get('/8ball',(req,res) => {
    let random = Math.floor(Math.random() * 20);
    let answer = list[random];
    res.send(answer);

})
.listen(3000,() => {
    console.log("welcome !!!");
});