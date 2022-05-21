const req = require('express/lib/request');
const res = require('express/lib/response');
const path = require("path");
/*import express here --->*/ const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
/*import product here --->*/const product = require("./product");

const products = [new product("Clock", "To tell the time.", 15, 'https://assets.website-files.com/5d0754d8b6e7f897e55ae9bc/5e4bdda7d87988621de332dd_simply-productimg-6.jpg'),
new product("Chair", "To sit on.", 200, 'https://assets.website-files.com/5d0754d8b6e7f897e55ae9bc/5e4bde965d8bac2ad7160b2e_simply-productimg-4.jpg'),
new product("Light", "To see things.", 394, "https://assets.website-files.com/5d0754d8b6e7f897e55ae9bc/5e4bdf797c41e5725aee16df_simply-productimg-1.jpg"),
new product("Table", "To put things on.", 302, "https://assets.website-files.com/5d0754d8b6e7f897e55ae9bc/5e4bdf006640d06648846d06_simply-productimg-3.jpg"),
new product("Zebra Frame", "A picture frame showcasing zebra skin.", 44934, "https://assets.website-files.com/5d0754d8b6e7f897e55ae9bc/5e4bdf24dec3494629cc1926_simply-productimg-7.jpg"),
new product("Sofa", "To chill on.", 230, "https://assets.website-files.com/5d0754d8b6e7f897e55ae9bc/5e4bdde6c1617c0acf787ae3_simply-productimg-2.jpg"),
new product("Dining Chair", "To sit on while dining", 34, "https://assets.website-files.com/5d0754d8b6e7f897e55ae9bc/5e4bdeefdec349268ccc173b_simply-productimg-9.jpg"),
new product("Wooden Chair", "To sit on, but less comfortably.", 232, "https://assets.website-files.com/5d0754d8b6e7f897e55ae9bc/5e4bde857c41e5fb5dee10b9_simply-productimg-5.jpg"),
new product("Bowls", "To serve soup in.", 2, "https://assets.website-files.com/5d0754d8b6e7f897e55ae9bc/5e4bde13dec3492863cc1310_simply-productimg-8.jpg")]

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
/*initialize your app here --->*/var app = express();
/*set up the view engine here --->*/app.set('view engine','ejs');
/*set up the view engine here --->*/app.set('views',path.join(__dirname,'views'));

async function run() {
    try {
      // Connect the client to the server
      await client.connect();
      // Establish and verify connection
      const database = await client.db("shopify");
      const test = database.collection('test');
      const cart = await test.findOne({});
      console.log(cart);
      console.log("Connected successfully to server");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  
app.use(express.static('public'));
app.use('/js',express.static(path.join(__dirname,"js")));
app.use(bodyParser());
/*set up your session secret here*/app.use(session({ secret : "secret"}));
app.get('/',(req,res) => {

    let n = req.session.items ? req.session.items.length : 0;
    res.render("index",{ products : products, n : n });

}).get("/p",(req,res) => {

    let id = req.query.pnumber;
    let n = req.session.items ? req.session.items.length : 0;
    res.render("product",{ p : products[id], n : n , i : id });

}).get("/cart",(req,res) => {

    let items = req.session.items;
    let n = items ? items.length : 0;
    let sum = items.map(res => parseInt(res.price))
                .reduce((acc,item) => (acc + item));
                
    res.render("cart",{ items : items, n : n, sum : sum });

}).get("/contact",(req,res) => {

    let n = req.session.items ? req.session.items.length : 0;
    res.render("contact",{n : n});

})
.post("/add",(req,res) => {

    if(!req.session.items) req.session.items = [];
    let i = req.body.i;  
    console.log(i);
    req.session.items.push(products[i]);
    res.redirect("/");

});
/*start your server here --->*/app.listen(3000,() => {
    console.log("welcome!!!");
});


