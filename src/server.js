const express = require('express');
const path = require('path');
const ccxt = require('./utils/exchanges');

const app = express();
const port = process.env.PORT || 3000


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

app.get('/fetchQuotes', (req, res) => {
  ccxt.fetchQuotes().then(function(result){
    res.json(result);
  });
});
