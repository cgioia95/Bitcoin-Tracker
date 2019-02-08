const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res){

var formData = req.body;

var fiat = formData.fiat;
var crypto = formData.crypto;
var amount = formData.amount;

var options = {
  url: "https://apiv2.bitcoinaverage.com/convert/global",
  method: "GET",

  qs: {
    from: crypto,
    to: fiat,
    amount: amount,
  }
};



  request(options , function(error, response, body){

    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;

    console.log(price);

    res.write("<p> THe current date is " +  currentDate + "</p>");

    res.write("<h1> " + amount + " " + crypto + " is currently " + price + " " +  fiat + "</h1>");

    res.send();
  });

});



app.listen(3000, function(){
  console.log("Server running on port 3000");
});
