var Utils = require('./utils');
var sinon = require('sinon');
var sendPaymentRequestToApi = require('./4-payment');
var { expect } = require('chai');

describe('sendPaymentRequestToApi', () => {
  it('sendPaymentRequestToApi will call console.log using the right arguments', () => {
    var big_brother = sinon.spy(console);
    var dummy = sinon.stub(Utils, 'calculateNumber');

    dummy.returns(10);
    sendPaymentRequestToApi(100, 20);
    expect(dummy.calledWith('SUM', 100, 20)).to.be.true;
    expect(dummy.callCount).to.be.equal(1);
    expect(big_brother.log.calledWith('The total is: 10')).to.be.true;
    expect(big_brother.log.callCount).to.be.equal(1);
    dummy.restore();
    big_brother.log.restore();
  });
});
