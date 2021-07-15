function fetchQuotes() {
  $.get( "/fetchQuotes", function(data) {
    $('.js-btc-quote').html(data.btcPrice.toFixed(0));
    $('.js-eth-quote').html(data.ethPrice.toFixed(0));
    $('.js-xrp-quote').html(data.xrpPrice.toFixed(2));
    localStorage.setItem('quotes', JSON.stringify(data));
  });
}

function fetchBalances() {
  $.get( "/fetchBalances", function(data) {
    $('.js-bot-name').html('Rolo test Bot');
    $('.js-usdt-total').html('$ ' + data.USDT.total.toFixed(2));
    $('.js-usdt-used').html('$ ' + data.USDT.used.toFixed(2));
    $('.js-usdt-avaliable').html('$ ' + data.USDT.free.toFixed(2));
    $('.js-btc-total').html(data.BTC.total.toFixed(5));
    $('.js-btc-used').html(data.BTC.used.toFixed(5));
    $('.js-btc-avaliable').html(data.BTC.free.toFixed(5));
    $('.js-eth-total').html(data.ETH.total.toFixed(5));
    $('.js-eth-used').html(data.ETH.used.toFixed(5));
    $('.js-eth-avaliable').html(data.ETH.free.toFixed(5));
    $('.js-xrp-total').html(data.XRP.total.toFixed(2));
    $('.js-xrp-used').html(data.XRP.used.toFixed(2));
    $('.js-xrp-avaliable').html(data.XRP.free.toFixed(2));
    localStorage.setItem('balances', JSON.stringify(data));
  }).done(function() {
    $.get( "/fetchQuotes", function(data) {
      $('.js-btc-total-usdt').html('$ ' + ($('.js-btc-total').text() * data.btcPrice).toFixed(2));
      $('.js-btc-used-usdt').html('$ ' + ($('.js-btc-used').text() * data.btcPrice).toFixed(2));
      $('.js-btc-avaliable-usdt').html('$ ' + ($('.js-btc-avaliable').text() * data.btcPrice).toFixed(2));
      $('.js-eth-total-usdt').html('$ ' + ($('.js-eth-total').text() * data.ethPrice).toFixed(2));
      $('.js-eth-used-usdt').html('$ ' + ($('.js-eth-used').text() * data.ethPrice).toFixed(2));
      $('.js-eth-avaliable-usdt').html('$ ' + ($('.js-eth-avaliable').text() * data.ethPrice).toFixed(2));
      $('.js-xrp-total-usdt').html('$ ' + ($('.js-xrp-total').text() * data.xrpPrice).toFixed(2));
      $('.js-xrp-used-usdt').html('$ ' + ($('.js-xrp-used').text() * data.xrpPrice).toFixed(2));
      $('.js-xrp-avaliable-usdt').html('$ ' + ($('.js-xrp-avaliable').text() * data.xrpPrice).toFixed(2));
    })
  });
}

; (function init(){
  fetchBalances();
  fetchQuotes();
})();
