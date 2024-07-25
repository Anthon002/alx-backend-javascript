var sinon = require('sinon');
var { expect } = require('chai');
var sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
  let consoleSpy;

  beforeEach(() => {
    if (!consoleSpy) {
      consoleSpy = sinon.spy(console, 'log');
    }
  });

  afterEach(() => {
    consoleSpy.resetHistory();
  });

  it('should log the total for inputs 100 and 20', () => {
    sendPaymentRequestToApi(100, 20);
    expect(consoleSpy.calledWith('The total is: 120')).to.be.true;
    expect(consoleSpy.calledOnce).to.be.true;
  });

  it('should log the total for inputs 10 and 10', () => {
    sendPaymentRequestToApi(10, 10);
    expect(consoleSpy.calledWith('The total is: 20')).to.be.true;
    expect(consoleSpy.calledOnce).to.be.true;
  });
});
