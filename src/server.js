const express = require('express');
const path = require('path');
const ccxt = require('./utils/exchanges');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});
app.use(express.static('src/client'));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})

//routes
app.get('/fetchBalances', (req, res) => {
  ccxt.fetchBalances().then(function(result){
    res.json(result);
  });
});

app.get('/fetchOrders', (req, res) => {
  ccxt.fetchOrders().then(function(result){
    res.json(result);
  });
});

app.get('/fetchQuotes', (req, res) => {
  ccxt.fetchQuotes().then(function(result){
    res.json(result);
  });
});

app.post('/createOrder', (req, res) => {
  ccxt.createOrder(req.body.symbol, req.body.type, req.body.side, req.body.amount, req.body.price);
});

app.post('/cancelOrder', (req, res) => {
  ccxt.cancelOrder(req.body.id, req.body.ticker);
});
