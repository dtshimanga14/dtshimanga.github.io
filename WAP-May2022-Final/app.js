
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
const http = require("http");
const fs = require("fs");
const url = require("url");
const cors = require("cors");
const path = require("path");

/*import express here --->*/ 
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

const mongoURI = "mongodb://localhost:27017";
const client = new MongoClient(mongoURI);
/*initialize your app here --->*/var app = express();
/*set up the view engine here --->*/app.set('view engine','ejs');
/*set up the view engine here --->*/app.set('views',path.join(__dirname,'views'));

const prepare = (o) => {
    o._id = o._id.toString()
    return o
};

const toObjectId = (_id) => {
    return  ObjectId(_id)
};


app.use(express.static('public'));
app.use('/js',express.static(path.join(__dirname,"js")));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.raw());
/*set up your session secret here*/
app.use(session({ secret : "secret"}));
// app.use(express.urlencoded()); 

// connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Create storage engine
var filename;

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});
  
let products;

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    const database = await client.db("shopify");
    const productsList = database.collection('products');
    products = await productsList.find({}).toArray();
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.post("/addPicture", upload.single("file"),async (req, res,err) => {
   
    await client.connect();
    // Establish and verify connection
    const database = await client.db("shopify");
    const productsList = database.collection('products');

    let newPost = { 
        name : req.body.name, 
        description : req.body.description, 
        price : req.body.price,
        pic: filename
    };
    let products = productsList.insertOne(newPost);
    filename = null;
  })
  .get('/watch/:filename',(req,res) => {

    res.render("watch",{ filename : "http://localhost:3000/image/"+ req.params.filename  });

  });
app.get('/',(req,res) => {

    let n = req.session.items ? req.session.items.length : 0;
    res.render("index",{ products : products, n : n });

}).get("/image/:filename", (req, res) => {
  const file = gfs.find({ filename: req.params.filename })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
      return res.status(404).json({
              err: "no files exist"
            });
       }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
})
.get("/login",(req,res) => {

    res.render("login");

}).post("/login",(req,res) => {
    res.render("home",{ n : 2 });

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
/*start your server here --->*/
app.listen(3000,() => {
    console.log("welcome!!!");
});


