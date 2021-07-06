function fetchQuotes() {
  $.get( "/fetchQuotes", function(data) {
    $('.js-btc-quote').html(data.btcPrice.toFixed(0));
    $('.js-eth-quote').html(data.ethPrice.toFixed(0));
    $('.js-xrp-quote').html(data.xrpPrice.toFixed(2));
  });
}

function fetchBalances() {
  $.get( "/fetchBalances", function(data) {
    $('.js-bot-name').html('Rolo test Bot');
    $('.js-usdt-total').html(data.USDT.total.toFixed(2));
    $('.js-usdt-used').html(data.USDT.used.toFixed(2));
    $('.js-usdt-avaliable').html(data.USDT.free.toFixed(2));
    $('.js-btc-total').html(data.BTC.total.toFixed(8));
    $('.js-btc-used').html(data.BTC.used.toFixed(8));
    $('.js-btc-avaliable').html(data.BTC.free.toFixed(8));
    $('.js-eth-total').html(data.ETH.total.toFixed(5));
    $('.js-eth-used').html(data.ETH.used.toFixed(5));
    $('.js-eth-avaliable').html(data.ETH.free.toFixed(5));
    $('.js-xrp-total').html(data.XRP.total.toFixed(2));
    $('.js-xrp-used').html(data.XRP.used.toFixed(2));
    $('.js-xrp-avaliable').html(data.XRP.free.toFixed(2));
  });
}


// Trading Box
function highlightSelected(selectedOption) {
  selectedOption.toggleClass('option--selected');
  var isSelected = selectedOption.hasClass('option--selected');
  selectedOption.find('input[type=radio]').attr('checked', isSelected);
}



function setListeners() {
  $('.js-update-balances').on('click', fetchBalances);
  $('.js-option').on('click', highlightSelected($(this)));
}

; (function init(){
  fetchBalances();
  fetchQuotes();
  setListeners();
})();
