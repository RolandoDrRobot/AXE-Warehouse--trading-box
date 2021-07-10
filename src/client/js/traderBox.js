// Trading Box
$('.js-option').on('click', function() {
  var options = $('[name="' + $(this).find('input[type=radio]').attr("name") + '"]');
  for (let i = 0; i < options.length; i++) {
    $(options[i]).attr('checked', false);
  }
  $(this).find('input[type=radio]').attr('checked', true);

  var optionsBoxes = $('.js-option');
  for (let i = 0; i < optionsBoxes.length; i++) {
    $(optionsBoxes[i]).removeClass('option--selected');
    if ($(optionsBoxes[i]).has($(optionsBoxes[i]).find('input[type=radio]:checked')).length !== 0) {
      $(optionsBoxes[i]).addClass('option--selected');
    }
  }
});

$('.js-amount').on('keyup', function(e) {
  const quotes = localStorage.getItem('quotes');
  var amount = $(this).val();
  if ($('.js-btc-trade').attr('checked')) $('.js-estimaded-order').html('$ ' + (amount * JSON.parse(quotes).btcPrice).toFixed(2)); 
  if ($('.js-eth-trade').attr('checked')) $('.js-estimaded-order').html('$ ' + (amount * JSON.parse(quotes).ethPrice).toFixed(2));
  if ($('.js-xrp-trade').attr('checked')) $('.js-estimaded-order').html('$ ' + (amount * JSON.parse(quotes).xrpPrice).toFixed(2));
});

$('.js-create-order').on('click', function(e) {
  var symbol = '';
  var type = '';
  var side = '';
  var amount = parseFloat($('#newOrder .js-amount').val());
  var price = 0

  if ($('.js-btc-trade').attr('checked')) symbol = $('.js-btc-trade').val();
  if ($('.js-eth-trade').attr('checked')) symbol = $('.js-eth-trade').val();
  if ($('.js-xrp-trade').attr('checked')) symbol = $('.js-xrp-trade').val();
  if ($('.js-market-trade').attr('checked')) type = 'market';
  if ($('.js-limit-trade').attr('checked')) type = 'limit';
  if ($('.js-buy-trade').attr('checked')) side = 'buy';
  if ($('.js-sell-trade').attr('checked')) side = 'sell';
  if (symbol == 'BTC/USDT') price = $('.js-btc-quote').text();
  if (symbol == 'ETH/USDT') price = $('.js-eth-quote').text();
  if (symbol == 'XRP/USDT') price = $('.js-xrp-quote').text();

  if (symbol == "") {
    var img = '<img src="img/warning.png" class="mr-2">';
    var msg = 'Please select a coin'
    $('.js-order-result').html(img + msg);
    $('.js-order-result').addClass('error');
    return
  }

  if (type == "") {
    var img = '<img src="img/warning.png" class="mr-2">';
    var msg = 'Please select either market or limit'
    $('.js-order-result').html(img + msg);
    $('.js-order-result').addClass('error');
    return
  }

  if (side == "") {
    var img = '<img src="img/warning.png" class="mr-2">';
    var msg = 'Please select either buy or sell'
    $('.js-order-result').html(img + msg);
    $('.js-order-result').addClass('error');
    return
  }

  if (amount == "") {
    var img = '<img src="img/warning.png" class="mr-2">';
    var msg = 'Please type the amount'
    $('.js-order-result').html(img + msg);
    $('.js-order-result').addClass('error');
    return
  }

  var data = {
    symbol : symbol,
    type : type,
    side : side,
    amount : amount,
    price : price,
  }

  var success = console.log('I am back bro');
  $.ajax({
    type: 'POST',
    url: '/createOrder',
    data: data,
    success: success,
  });
});
