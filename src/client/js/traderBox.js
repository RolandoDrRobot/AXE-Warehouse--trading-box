// Trading Box
function enableButtons() {
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
}

// convertCointoUsdt
function convertCointoUsdt(amount) {
  $(amount).on('keyup', function(e) {
    const quotes = localStorage.getItem('quotes');
    var amount = $(this).val();
    if ($('.js-btc-trade').attr('checked')) $('.js-estimaded-order').html('$ ' + (amount * JSON.parse(quotes).btcPrice).toFixed(2)); 
    if ($('.js-eth-trade').attr('checked')) $('.js-estimaded-order').html('$ ' + (amount * JSON.parse(quotes).ethPrice).toFixed(2));
    if ($('.js-xrp-trade').attr('checked')) $('.js-estimaded-order').html('$ ' + (amount * JSON.parse(quotes).xrpPrice).toFixed(2));
  });
}

// minimumAmount
function minimumAmount(amount) {
  var estimatedCostMinimumAmount = 0;
  const quotesMinimumAmount = localStorage.getItem('quotes');
  if ($('.js-btc-trade').attr('checked')) {
    estimatedCostMinimumAmount = amount * JSON.parse(quotesMinimumAmount).btcPrice;
    return estimatedCostMinimumAmount > 10
  }
  if ($('.js-eth-trade').attr('checked')) {
    estimatedCostMinimumAmount = amount * JSON.parse(quotesMinimumAmount).ethPrice;
    return estimatedCostMinimumAmount > 10
  }
  if ($('.js-xrp-trade').attr('checked')) {
    estimatedCostMinimumAmount = amount * JSON.parse(quotesMinimumAmount).xrpPrice;
    return estimatedCostMinimumAmount > 10 
  }
}

function captureOrderInformation() {
  var symbol = '';
  var type = '';
  var side = '';
  var amount = parseFloat($('#newOrder .js-amount').val());;
  var estimatedCost =0;
  var price = 0;

  // Get Quotes
  const quotes = localStorage.getItem('quotes');
  var btcPrice = JSON.parse(quotes).btcPrice;
  var ethPrice = JSON.parse(quotes).ethPrice;
  var xrpPrice = JSON.parse(quotes).xrpPrice;

  // Get Symbol
  if ($('.js-btc-trade').attr('checked')) symbol = $('.js-btc-trade').val();
  if ($('.js-eth-trade').attr('checked')) symbol = $('.js-eth-trade').val();
  if ($('.js-xrp-trade').attr('checked')) symbol = $('.js-xrp-trade').val();

  // Get type
  if ($('.js-market-trade').attr('checked')) type = 'market';
  if ($('.js-limit-trade').attr('checked')) type = 'limit';

  // Get side
  if ($('.js-buy-trade').attr('checked')) side = 'buy';
  if ($('.js-sell-trade').attr('checked')) side = 'sell';

  // Get estimated cost
  if ($('.js-btc-trade').attr('checked')) estimatedCost = amount * btcPrice;
  if ($('.js-eth-trade').attr('checked')) estimatedCost = amount * ethPrice;
  if ($('.js-xrp-trade').attr('checked')) estimatedCost = amount * xrpPrice;

  // Get Price
  if (type === "market") {
    if (symbol == 'BTC/USDT') price = btcPrice;
    if (symbol == 'ETH/USDT') price = ethPrice;
    if (symbol == 'XRP/USDT') price = xrpPrice;
  }

  var tradeInfo = {
    symbol : symbol,
    type : type,
    side : side,
    amount : amount,
    estimatedCost: estimatedCost,
    price : price,
  }
  return tradeInfo;
}

function createOrder(symbol, type, side, amount, estimatedCost, price) {
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
      $('.js-order-result-done').html('<img src="img/checked.png" class="mr-2">Order created Succesfully');
      $('.js-order-result-done').addClass('success');
    }
  }

  $.ajax({
    type: 'POST',
    url: '/createOrder',
    data: data,
    success: function() {
      success.render();
      setTimeout(function() {
        location.reload();
      }, 3000);
    },
  });
}


// prepareOrder
function prepareOrder(symbol, type, side, amount, estimatedCost, price) {
  function isBuyOrSell(side, amount, symbol) {
    if ( side == 'buy' ) return '<p class="buy-transanction mt-2 mb-4 text-center">Do you want to ' + side + ' ' + amount + ' ' + symbol + ' for an estimated cost of $' + estimatedCost +  ' at a price of $' + price + '</p>' 
    if ( side == 'sell' ) return '<p class="sell-transanction mt-2 mb-4 text-center">Do you want to ' + side + ' ' + amount + ' ' + symbol + ' to get an estimate of $' + estimatedCost + ' at a price of $' + price + '</p>'
  }
  var buyOrSell = isBuyOrSell(side, amount, symbol);

  function pairIconElement(symbol) {
    if ( symbol == 'BTC/USDT' ) return '<img class="mx-2" src="img/bitcoin.png">'
    if ( symbol == 'ETH/USDT' ) return '<img class="mx-2" src="img/ethereum.png">'
    if ( symbol == 'XRP/USDT' ) return '<img class="mx-2" src="img/xrp.png">'
  }
  var pairIcon = pairIconElement(symbol); 

  var orderElement = 
  '<div class="order-confirmation">' +
    '<div class="coins-to-swap d-flex justify-content-center">' +
      pairIcon +
      '<img class="mx-2" src="img/right-arrow.svg">' +
      '<img class="mx-2" src="img/tether.png">' +
    '</div>' +
    buyOrSell +
    '<div class="js-create-order submit-btn d-flex align-items-center justify-content-center" data-toggle="modal" data-target=".bd-example-modal-sm">' +
      'Create Order' +
    '</div>' +
  '</div>';

  $('.js-order-result').html(orderElement);
  $('.js-create-order').on('click', function(e) {
    createOrder(symbol, type, side, amount, estimatedCost, price);
  });
}


function validateOrder(symbol, type, side, amount, estimatedCost, price) {
  if (type == "") {
    var img = '<img src="img/warning.png" class="d-block">';
    var msg = 'Please select either market or limit'
    $('.js-order-result').html(img + msg);
    $('.js-order-result').addClass('error');
    return
  }

  // Valids if It is a limit order
  if (type === "limit") {
    var isPrice = $('#newOrder .js-price').val();
    if (isPrice) {
      price = isPrice;
    } else {
      var img = '<img src="img/warning.png" class="d-block">';
      var msg = 'Please select price for your limit order'
      $('.js-order-result').html(img + msg);
      $('.js-order-result').addClass('error');
      return
    }
  }

  // Valids amount
  if (isNaN(amount) || !minimumAmount(amount)) {
    var img = '<img src="img/warning.png" class="d-block">';
    var msg = 'Please type an amount greater than $10'
    $('.js-order-result').html(img + msg);
    $('.js-order-result').addClass('error');
    return
  }

  // Valids if any coin is checked
  if (symbol == "") {
    var img = '<img src="img/warning.png" class="d-block">';
    var msg = 'Please select a coin'
    $('.js-order-result').html(img + msg);
    $('.js-order-result').addClass('error');
    return
  }

  // Valids if either sell or buy is checked
  if (side == "") {
    var img = '<img src="img/warning.png" class="d-block">';
    var msg = 'Please select either buy or sell'
    $('.js-order-result').html(img + msg);
    $('.js-order-result').addClass('error');
    return
  }

  prepareOrder(symbol, type, side, amount, estimatedCost, price);
}


; (function initilizeTraderBox() {
  enableButtons();
  convertCointoUsdt($('.js-amount'));
  $('.js-confirm-order').on('click', function() {
    $('.js-order-result').html('');
    $('.js-order-result').removeClass('error');
    var tradeData = captureOrderInformation();
    validateOrder(tradeData.symbol, tradeData.type, tradeData.side, tradeData.amount, tradeData.estimatedCost.toFixed(2), tradeData.price.toFixed(2))
  })

})();
