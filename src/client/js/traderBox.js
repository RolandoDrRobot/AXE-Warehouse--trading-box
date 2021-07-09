// Trading Box
function highlightSelected(selectedOption) {
  if($(selectedOption).find('input[type=radio]').attr('checked')) {
    $(selectedOption).addClass('option--selected');
  }
  else {
    $(selectedOption).removeClass('option--selected');
  }
}

$('.js-option').on('click', function() {
  highlightSelected(this);
});

function createOrder() {
  var symbol = '';
  var type = '';
  var side = '';
  var amount = $('#newOrder .js-amount').val();
  var price = $('#newOrder .js-price').val() || '';

  if ($('.js-btc-trade').attr('checked')) symbol = $('.js-btc-trade').val();
  if ($('.js-eth-trade').attr('checked')) symbol = $('.js-btc-trade').val();
  if ($('.js-xrp-trade').attr('checked')) symbol = $('.js-btc-trade').val();
  if ($('.js-market-trade').attr('checked')) type = $('.js-btc-trade').val();
  if ($('.js-limit-trade').attr('checked')) type = $('.js-btc-trade').val();
  if ($('.js-buy-trade').attr('checked')) side = $('.js-btc-trade').val();
  if ($('.js-sell-trade').attr('checked')) side = $('.js-btc-trade').val();
  if (symbol == 'BTC/USDT') price = $('.js-btc-quote').text();
  if (symbol == 'ETH/USDT') price = $('.js-eth-quote').val();
  if (symbol == 'XRP/USDT') price = $('.js-xrp-quote').val();

  var data = {
    symbol : symbol,
    type : type,
    side : side,
    amount : amount,
    price : price,
  }

  console.log(data);
  debugger

  var success = console.log('I am back bro');
  $.ajax({
    type: 'POST',
    url: '/createOrder',
    data: data,
    success: success,
  });
}

$('.js-create-order').on('click', function(e) {
  e.preventDefault();
  createOrder();
});
