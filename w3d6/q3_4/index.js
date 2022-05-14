

const express = require("express");
const { redirect } = require("express/lib/response");
const path = require("path");

var app = express();

let items = [
  { name : "Lips baum ", price : 12, description : "", id : "00001"},
  { name : "Vegetables juices", price : 43, description : "", id : "00002"},
  { name : "body lotion", price : 56, description : "", id : "00003"},
  { name : "toothpaste", price : 32, description : "", id : "00004"}
];

let shoppingCart = [];

app.set('view engine','ejs')
  .set('views',path.join(__dirname,'view'))
  .use('/css',express.static(path.join(__dirname,'css')))
  .use(express.json())
  .use(express.urlencoded({ extended : true }))
  .get('/',(req,res) => {

    res.render("product" ,{ items : items });
    
  }).get('/shoppingcart',(req,res) => {

    res.render("shoppingcart" ,{ shoppingCartItems : shoppingCart });
    
  }).post('/addToCart', (req,res) => {
       let id = req.body.id;
       let quantity = req.body.quantity;

       let { name, price }= items.filter(item => item.id == id)[0];
       let totalPrice = price*quantity;
       shoppingCart.push({ 
         name , price, 
         totalPrice : totalPrice,
         quantity : quantity 
      });
      console.log(shoppingCart);
       res.redirect('/');
  })
  .listen(3000,() => {
    console.log("welcome to our w3d4 assignments ");
});
