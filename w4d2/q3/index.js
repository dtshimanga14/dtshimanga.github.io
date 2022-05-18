const express = require('express');
const path = require('path');
const app = express();

const product = require('./router/router'); 

app.use("/css", express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));
app.use(express.json());


// template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

 // set router
app.use(product);

let items = [];

app.post("/addToCart", (req, res) => {
      let present = false;
          if(!items.length) {
              items.push({
                 prodName: req.body.prodName,
                 prodPrice: parseFloat(req.body.prodPrice),
                  prodQty: 1,
              })
          } else{
              for (let c of items) {
                  if (c.prodName == req.body.prodName) {
                    c.prodPrice += parseFloat(req.body.prodPrice);
                    present = true;
                    c.prodQty++;
                  }
                }
                
          if (!present) {
                  items.push({
                 prodName: req.body.prodName,
                prodPrice: parseFloat(req.body.prodPrice),
                prodQty: 1,
                 });
            }
  
          }    
          res.status(200).end();

  });

  app.get("/shoppingcart", (req,res) => {
    res.render('shoppingcart', {
        cartItems: items, pageTitle: "Shopping Cart"
    })
})

app.listen(3000, () => {
    console.log(`Server is running on 3000`);
})





