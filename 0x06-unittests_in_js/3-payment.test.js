var Utils = require('./utils');
var sinon = require('sinon');
var { expect } = require('chai');
var sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  it('sendPaymentRequestToApi will use the calculateNumber function in Utils', () => {
    var big_brother = sinon.spy(Utils);

    sendPaymentRequestToApi(100, 20);
    expect(big_brother.calculateNumber.calledWith('SUM', 100, 20)).to.be.true;
    expect(big_brother.calculateNumber.callCount).to.be.equal(1);
    big_brother.calculateNumber.restore();
  });
});
