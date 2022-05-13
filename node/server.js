
const express = require("express");
const path = require("path");

var app = express();
app.use(express.static('css'));

app.get("/",(req,res) => {
  res.json({ greet : "hello world "});
});

app.get('/hello', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/red', (req, res) => {
    res.redirect("https://www.google.com");
});

app.use(express.json());
app.listen(3000, () => {
    console.log("hello world");
});