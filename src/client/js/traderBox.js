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
