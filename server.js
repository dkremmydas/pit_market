const express = require('express');
const app = express();
const port = 3000;

app.get('/sell_bid', (request, response) => {
  response.send('Hello from Express!');
});

app.get('/buy_bid', (request, response) => {
  response.send('Hello from Express!');
});




app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});