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

const fetchOrders = async () => {
  
  const btcOrders = await exchangeClient.fetchOrders('BTC/USDT');
  const ethOrders = await exchangeClient.fetchOrders('ETH/USDT');
  const xrpOrders = await exchangeClient.fetchOrders('XRP/USDT');

  return {
    btcOrders: btcOrders,
    ethOrders: ethOrders,
    xrpOrders: xrpOrders,
  }
}

const fetchQuotes = async () => {
  const btcQuote = await exchangeClient.fetchTicker('BTC/USDT');
  const btcPrice = btcQuote.bid;

  const ethQuote = await exchangeClient.fetchTicker('ETH/USDT');
  const ethPrice = ethQuote.bid;

  const xrpQuote = await exchangeClient.fetchTicker('XRP/USDT');
  const xrpPrice = xrpQuote.bid;

  return {
    btcPrice: btcPrice,
    ethPrice: ethPrice,
    xrpPrice: xrpPrice,
  }
}

const cancelOrder = async (id, symbol) => {
  return await exchangeClient.cancelOrder(id, symbol);
}

module.exports = {
  fetchBalances: fetchBalances,
  fetchOrders: fetchOrders,
  fetchQuotes: fetchQuotes,
  cancelOrder: cancelOrder,
}