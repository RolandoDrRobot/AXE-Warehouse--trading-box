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
  var estimatedCost = 0;
  var price = 0

  if ($('.js-btc-trade').attr('checked')) symbol = $('.js-btc-trade').val();
  if ($('.js-eth-trade').attr('checked')) symbol = $('.js-eth-trade').val();
  if ($('.js-xrp-trade').attr('checked')) symbol = $('.js-xrp-trade').val();
  if ($('.js-market-trade').attr('checked')) type = 'market';
  if ($('.js-limit-trade').attr('checked')) type = 'limit';
  if ($('.js-buy-trade').attr('checked')) side = 'buy';
  if ($('.js-sell-trade').attr('checked')) side = 'sell';

  $('.js-order-result').html('');
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
  if (type === "limit") {
    var isPrice = $('#newOrder .js-price').val();
    if (isPrice) {
      price = isPrice;
    } else {
      var img = '<img src="img/warning.png" class="mr-2">';
      var msg = 'Please select price for your limit order'
      $('.js-order-result').html(img + msg);
      $('.js-order-result').addClass('error');
      return
    }
  }
  if (type === "market") {
    if (symbol == 'BTC/USDT') price = $('.js-btc-quote').text();
    if (symbol == 'ETH/USDT') price = $('.js-eth-quote').text();
    if (symbol == 'XRP/USDT') price = $('.js-xrp-quote').text();
  }
  if (side == "") {
    var img = '<img src="img/warning.png" class="mr-2">';
    var msg = 'Please select either buy or sell'
    $('.js-order-result').html(img + msg);
    $('.js-order-result').addClass('error');
    return
  }

  

  function minimumAmount(amount) {
    const quotes = localStorage.getItem('quotes');
    if ($('.js-btc-trade').attr('checked')) {
      estimatedCost = amount * JSON.parse(quotes).btcPrice;
      return estimatedCost > 10
    }
    if ($('.js-eth-trade').attr('checked')) {
      estimatedCost = amount * JSON.parse(quotes).ethPrice;
      return estimatedCost > 10
    }
    if ($('.js-xrp-trade').attr('checked')) {
      estimatedCost = amount * JSON.parse(quotes).xrpPrice;
      return estimatedCost > 10
    }
  }

  if (isNaN(amount) || !minimumAmount(amount)) {
    var img = '<img src="img/warning.png" class="mr-2">';
    var msg = 'Please type an amount greater than $10'
    $('.js-order-result').html(img + msg);
    $('.js-order-result').addClass('error');
    return
  }

  var data = {
    symbol : symbol,
    type : type,
    side : side,
    amount : amount,
    estimatedCost: estimatedCost,
    price : price,
  }

  var success = {
    render: function() {
      $('.js-order-result').html('<img src="img/checked.png" class="mr-2">Order created Succesfully');
      $('.js-order-result').addClass('success');
    }
  }

  $.ajax({
    type: 'POST',
    url: '/createOrder',
    data: data,
    success: success.render(),
  });
});
