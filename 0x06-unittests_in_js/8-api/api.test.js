var request = require('request');
var { expect } = require('chai');

describe('API integration test', () => {
  var apiUrl = 'http://localhost:7865';

  it('GET / returns correct response', (done) => {
    request.get(`${apiUrl}/`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Welcome to the payment system');
      done();
    });
  });
});
