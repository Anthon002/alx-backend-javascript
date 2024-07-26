var request = require('request');
var { expect } = require('chai');

describe('API integration test', () => {
  var apiUrl = 'http://localhost:7865';

  it('GET / to return a correct response', (done) => {
    request.get(`${apiUrl}/`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Welcome to the payment system');
      done();
    });
  });

  it('GET /cart/:id to return correct response for a valid :id', (done) => {
    request.get(`${apiUrl}/cart/47`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Payment methods for cart 47');
      done();
    });
  });

  it('GET /cart/:id to return a 404 response for negative numbers in :id', (done) => {
    request.get(`${apiUrl}/cart/-47`, (_err, res, _body) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });

  it('GET /cart/:id to return a 404 response for non-numeric values in :id', (done) => {
    request.get(`${apiUrl}/cart/d200-44a5-9de6`, (_err, res, _body) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});
