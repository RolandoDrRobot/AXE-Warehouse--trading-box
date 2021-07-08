function createOrder(buySell, coin, amount, cost, price, date, marketLimit, limitPrice) {
  var orderTemplate = 
  '<div class="order mt-3">' +
    '<div class="d-flex">' +
      '<img class="js=close-transaction close-transantcion m-0" src="img/cancel.png" />' +
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
        '<label class="js-order-market-limit">' + marketLimit + '</label>' +
        '<label class="js-order-limit-price">$' + limitPrice + '</label>' +
      '</div>' +
    '</div>' +
  '</div>';

  $(buySell).append(orderTemplate);
}


function fetchOrders() {
  $.get( "/fetchOrders", function(data) {
    const btcPic = 'img/bitcoin.png';
    const ethPic = 'img/ethereum.png';
    const xrpPic = 'img/xrp.png';
    
    for (let i = 0; i < data.btcOrders.length; i++) {
      if(data.btcOrders[i].status === 'open') {
        var openOrders = $('.js-open-orders');
        createOrder(openOrders, btcPic, data.btcOrders[i].amount, data.btcOrders[i].cost, data.btcOrders[i].price, data.btcOrders[i].datetime, data.btcOrders[i].type, data.btcOrders[i].price);
      }
      if(data.btcOrders[i].status === 'closed') {
        var closedOrders = $('.js-closed-orders');
        createOrder(closedOrders, btcPic, data.btcOrders[i].amount, data.btcOrders[i].cost, data.btcOrders[i].price, data.btcOrders[i].datetime, data.btcOrders[i].type, data.btcOrders[i].price);
      }
    }

    

    console.log(data);
  });
}

; (function init() {
  fetchOrders();
})();