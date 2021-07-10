function createDate(timestamp) {
  dateObj = new Date(timestamp),
  date = {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth()+1,
    day: dateObj.getDate(),
    hour: dateObj.getHours(),
    minute: dateObj.getMinutes(),
    second: dateObj.getSeconds(),
  };
  return  date.hour + ':' + date.minute + ':' + date.second + '<br>' + date.day + '/' + date.month + '/' + date.year;
}

function createOrder(order, buySell, coin, ticker, amount, cost, price, date, marketLimit, limitPrice, id, status) {
  var cancelButton = status ? '<img class="js-close-order close-order m-0" src="img/cancel.png" />' : '';
  var orderTemplate = 
  '<div class="order ' + buySell + ' mt-3">' +
    '<div class="d-flex">' +
        cancelButton +
      '<label class="js-order-ticker d-none">' + ticker + '</label>' +
      '<label class="js-order-id d-none">' + id + '</label>' +
      '<div class="order-img">' +
        '<img class="js-order-coin m-0" src="' + coin + '" />' +
      '</div>' +
      '<div class="order-amount">' +
        '<p class="js-order-amount m-0">' + amount + '</p>' +
        '<label>Amount</label>' +
      '</div>' +
      '<div class="order-cost">' +
        '<p class="js-order-cost m-0">$' + cost + '</p>' +
        '<label>Cost</label>' +
      '</div>' +
      '<div class="order-price">' +
        '<p class="js-order-price m-0">$' + price + '</p>' +
        '<label>Price</label>' +
      '</div>' +
    '</div>' +
    '<div class="d-flex mt-2">' +
      '<div class="order-data">' +
        '<label class="js-order-date">' + date + '</label>' +
      '</div>' +
      '<div class="order-market-limit">' +
        '<label class="js-order-market-limit mr-2">' + marketLimit + '</label>' +
        '<label class="js-order-limit-price">$' + limitPrice + '</label>' +
      '</div>' +
    '</div>' +
  '</div>';

  $(order).append(orderTemplate);
}

function fetchOrders() {
  $.get( "/fetchOrders", function(data) {
    const btcPic = 'img/bitcoin.png';
    const ethPic = 'img/ethereum.png';
    const xrpPic = 'img/xrp.png';
    

    for (let i = 0; i < data.btcOrders.length; i++) {
      if (data.btcOrders[i].status === 'open') $('.js-bitcoin-open-orders').html('<h3 class="m-0 mb-2">Open Orders</h3>');
      if (data.btcOrders[i].status === 'closed') $('.js-bitcoin-closed-orders').html('<h3 class="m-0">Closed Orders</h3>');
    }
    
    for (let i = 0; i < data.btcOrders.length; i++) {
      if(data.btcOrders[i].status === 'open') {
        var openOrders = $('.js-bitcoin-open-orders');
        createOrder(openOrders, data.btcOrders[i].side, btcPic, data.btcOrders[i].symbol, data.btcOrders[i].amount.toFixed(5), data.btcOrders[i].cost.toFixed(2), data.btcOrders[i].price.toFixed(0), createDate(data.btcOrders[i].timestamp), data.btcOrders[i].type, data.btcOrders[i].price.toFixed(0), data.btcOrders[i].id, data.btcOrders[i].status);
      }
      if(data.btcOrders[i].status === 'closed') {
        var closedOrders = $('.js-bitcoin-closed-orders');
        createOrder(closedOrders, data.btcOrders[i].side, btcPic, data.btcOrders[i].symbol, data.btcOrders[i].amount.toFixed(5), data.btcOrders[i].cost.toFixed(2), data.btcOrders[i].price.toFixed(0), createDate(data.btcOrders[i].timestamp), data.btcOrders[i].type, data.btcOrders[i].price.toFixed(0), data.btcOrders[i].id);
      }
    }


    for (let i = 0; i < data.ethOrders.length; i++) {
      if (data.ethOrders[i].status === 'open') $('.js-ethereum-open-orders').html('<h3 class="m-0 mb-2">Open Orders</h3>');
      if (data.ethOrders[i].status === 'closed') $('.js-ethereum-closed-orders').html('<h3 class="m-0">Closed Orders</h3>');
    }
    
    for (let i = 0; i < data.ethOrders.length; i++) {
      if(data.ethOrders[i].status === 'open') {
        var openOrders = $('.js-ethereum-open-orders');
        createOrder(openOrders, data.ethOrders[i].side, ethPic, data.ethOrders[i].symbol, data.ethOrders[i].amount.toFixed(5), data.ethOrders[i].cost.toFixed(2), data.ethOrders[i].price.toFixed(0), createDate(data.ethOrders[i].timestamp), data.ethOrders[i].type, data.ethOrders[i].price.toFixed(0), data.ethOrders[i].id, data.btcOrders[i].status);
      }
      if(data.ethOrders[i].status === 'closed') {
        var closedOrders = $('.js-ethereum-closed-orders');
        createOrder(closedOrders, data.ethOrders[i].side, ethPic, data.ethOrders[i].symbol, data.ethOrders[i].amount.toFixed(5), data.ethOrders[i].cost.toFixed(2), data.ethOrders[i].price.toFixed(0), createDate(data.ethOrders[i].timestamp), data.ethOrders[i].type, data.ethOrders[i].price.toFixed(0), data.ethOrders[i].id);
      }
    }

    for (let i = 0; i < data.xrpOrders.length; i++) {
      if (data.xrpOrders[i].status === 'open') $('.js-xrp-open-orders').html('<h3 class="m-0 mb-2">Open Orders</h3>');
      if (data.xrpOrders[i].status === 'closed') $('.js-xrp-closed-orders').html('<h3 class="m-0">Closed Orders</h3>');
    }

    for (let i = 0; i < data.xrpOrders.length; i++) {
      if(data.xrpOrders[i].status === 'open') {
        var openOrders = $('.js-xrp-open-orders');
        createOrder(openOrders, data.xrpOrders[i].side, xrpPic, data.xrpOrders[i].symbol, data.xrpOrders[i].amount.toFixed(2), data.xrpOrders[i].cost.toFixed(2), data.xrpOrders[i].price.toFixed(0), createDate(data.xrpOrders[i].timestamp), data.xrpOrders[i].type, data.xrpOrders[i].price.toFixed(2), data.xrpOrders[i].id, data.btcOrders[i].status);
      }
      if(data.xrpOrders[i].status === 'closed') {
        var closedOrders = $('.js-xrp-closed-orders');
        createOrder(closedOrders, data.xrpOrders[i].side, xrpPic, data.xrpOrders[i].symbol, data.xrpOrders[i].amount.toFixed(2), data.xrpOrders[i].cost.toFixed(2), data.xrpOrders[i].price.toFixed(0), createDate(data.xrpOrders[i].timestamp), data.xrpOrders[i].type, data.xrpOrders[i].price.toFixed(2), data.xrpOrders[i].id);
      }
    }
  }).done(function() {
    $('.js-close-order').on('click', function() {
      var data = {
        id: $($('.' + $(this).attr('class').split(' ')[0] + ' + .js-order-ticker + .js-order-id')[0]).text(),
        ticker: $($('.' + $(this).attr('class').split(' ')[0] + ' + .js-order-ticker')[0]).text()
      }
      var success = console.log('I am back bro');
      $.ajax({
        type: 'POST',
        url: '/cancelOrder',
        data: data,
        success: success,
      });
    });
  });
}

function toggleOrders() {
  $('.js-btc-tab').on('click', function() {
    $('.js-bitcoin-orders').removeClass('d-none');
    $('.js-ethereum-orders').addClass('d-none');
    $('.js-xrp-orders').addClass('d-none');
  });
  $('.js-eth-tab').on('click', function() {
    $('.js-bitcoin-orders').addClass('d-none');
    $('.js-ethereum-orders').removeClass('d-none');
    $('.js-xrp-orders').addClass('d-none');
  });
  $('.js-xrp-tab').on('click', function() {
    $('.js-bitcoin-orders').addClass('d-none');
    $('.js-ethereum-orders').addClass('d-none');
    $('.js-xrp-orders').removeClass('d-none');
  });
}

; (function init() {
  fetchOrders();
  toggleOrders();
})();