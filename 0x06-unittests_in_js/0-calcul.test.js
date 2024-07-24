const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
  it('should handle floating point numbers by rounding them to whole numbers', () => {
    assert.strictEqual(calculateNumber(1.0, 2.0), 3);
  });

  it('should round down the fractional part of b', () => {
    assert.strictEqual(calculateNumber(1.0, 2.4), 3);
  });

  it('should round down the fractional parts of both a and b', () => {
    assert.strictEqual(calculateNumber(1.4, 2.4), 3);
  });

  it('should round down the fractional part of a', () => {
    assert.strictEqual(calculateNumber(1.4, 2.0), 3);
  });

  it('should round up the fractional part of b', () => {
    assert.strictEqual(calculateNumber(1.0, 2.5), 4);
  });

  it('should round up the fractional parts of both a and b', () => {
    assert.strictEqual(calculateNumber(2.6, 2.5), 6);
  });

  it('should round up the fractional part of a', () => {
    assert.strictEqual(calculateNumber(2.6, 2.0), 5);
  });

  it('should correctly round down fractional parts with trailing 9\'s', () => {
    assert.strictEqual(calculateNumber(2.499999, 3.499999), 5);
  });
});
