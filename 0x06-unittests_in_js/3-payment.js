const Utils = require('./utils');

const sendPaymentRequestToApi = (totalAmount, totalShipping){
  const total_cost = Utils.calculateNumber('SUM', totalAmount, totalShipping);
  console.log(`The total is: ${total_cost}`);
};

module.exports = sendPaymentRequestToApi;
