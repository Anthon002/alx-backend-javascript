var Utils = require('./utils');

function sendPaymentRequestToApi(totalAmount, totalShipping){
  var total_cost = Utils.calculateNumber('SUM', totalAmount, totalShipping);
  console.log(`The total is: ${total_cost}`);
};

module.exports = sendPaymentRequestToApi;
