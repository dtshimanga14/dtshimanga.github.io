

const express = require("express");
const { redirect } = require("express/lib/response");
const path = require("path");
var session = require("express-session");
var cookieParser = require("cookie-parser");

var app = express();
    app.use(cookieParser())
       .use(session({ secret : "secret" }));

let items = [
  { name : "Lips baum ", price : 12, description : "", id : "00001"},
  { name : "Vegetables juices", price : 43, description : "", id : "00002"},
  { name : "body lotion", price : 56, description : "", id : "00003"}
];

//let shoppingCart = [];

app.set('view engine','ejs')
  .set('views',path.join(__dirname,'view'))
  .use('/css',express.static(path.join(__dirname,'css')))
  .use(express.json())
  .use(express.urlencoded({ extended : true }))
  .get('/',(req,res) => {

    res.render("product" ,{ items : items });
    
  }).get('/shoppingcart',(req,res) => {
    if(!req.session.shoppingCart) 
      req.session.shoppingCart = [];
    res.render("shoppingcart" ,{ 
      shoppingCartItems : req.session.shoppingCart 
    });
    
  }).post('/addToCart', (req,res) => {
       let id = req.body.id;
       let quantity = req.body.quantity;

       let cart = req.session.shoppingCart;
       let existingItem = cart.filter(item => item.id == id)[0];

       let { name, price }= items.filter(item => item.id == id)[0];
       let totalPrice = price*quantity;
      

      if(!existingItem) {
        cart.push({ 
          name , price, id, 
          totalPrice : totalPrice,
          quantity : quantity 
        });
      }else {
        cart = cart.filter(item => item.id != id);
        cart.push({ 
          name , price, id, 
          totalPrice : existingItem.totalPrice + totalPrice,
          quantity : parseInt(existingItem.quantity) + parseInt(quantity) 
        });
        req.session.shoppingCart = cart;
      }
      console.log(cart);
       res.redirect('/');
  })
  .listen(3000,() => {
    console.log("welcome to our w3d4 assignments ");
});
