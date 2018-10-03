const express = require('express');
const app = express();
const port = 3000;


//npm install lokijs
//npm install express

var db = new loki('loki.json')

var bids = db.addCollection('bids')
var transactions = db.addCollection('transactions')


app.get('/sell_bid/:seller/:price', (request, response) => {
  bids.insert({'seller':request.params.seller, 'price': request.params.price});
  console.log("Sell bid: "+request.params.seller + " @ " + request.params.price);
  response.json({'reply': "ok"});
});

app.get('/buy_bid/:buyer/:seller/:price', (request, response) => {
  var trans = bids.findOne( {'seller':request.params.seller, 'price': request.params.price} ).remove();
  if(!trans===null) {
    transactions.insert({'buyer': request.params.buyer,'seller':request.params.seller, 'price': request.params.price});
    response.json({'reply': "ok"});
  } else {
    response.json({'reply': "no bid like this"});
  }  
});

app.get('/bids', (request, response) => {
  response.json(bids.data());
});

app.get('/transactions', (request, response) => {
  response.json(transactions.data());
});




app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
