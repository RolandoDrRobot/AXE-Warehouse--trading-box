// Trading Box
// $('.js-option').on('click', function() {
//   $(this).toggleClass('option--selected');
//   var isSelected = $(this).hasClass('option--selected');
//   $(this).find('input[type=radio]').attr('checked', isSelected);
// });

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
