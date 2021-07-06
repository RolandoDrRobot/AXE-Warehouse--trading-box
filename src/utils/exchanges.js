require("dotenv").config();
const ccxt = require('ccxt');

var exchangeClient = new ccxt['binance'] ({
  'apiKey': process.env.API_KEY,
  'secret': process.env.API_SECRET,
  'timeout': 30000,
  'enableRateLimit': true,
});

const fetchBalances = async () => {
  return await exchangeClient.fetchBalance();
}

const fetchQuotes = async () => {
  const btcQuote = await exchangeClient.fetchTicker('BTC/USD');
  const btcPrice = btcQuote.bid;

  const ethQuote = await exchangeClient.fetchTicker('ETH/USD');
  const ethPrice = ethQuote.bid;

  const xrpQuote = await exchangeClient.fetchTicker('XRP/USD');
  const xrpPrice = xrpQuote.bid;

  return {
    btcPrice: btcPrice,
    ethPrice: ethPrice,
    xrpPrice: xrpPrice,
  }
}

module.exports = {
  fetchBalances: fetchBalances,
  fetchQuotes: fetchQuotes,
}