
const express = require('express'); 
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"))
  .use('/css',express.static(path.join(__dirname,'css')))
  .get('/', (req, res) => {
        const date = new Date();
        const hour = date.getHours();
        let tag = (hour >=  6 && hour <=  18) ? "day" : "night";
        console.log(hour);

        res.render("index", {
            time : date.toTimeString(),
            tag : tag
        });
    }).listen(3000,() => {
    console.log("welcome!!!! use this localhost:3000 to visit our website");
});