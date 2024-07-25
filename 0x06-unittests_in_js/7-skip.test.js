var { expect } = require('chai');

describe('Testing numbers', () => {
  it('1 equals 1', () => {
    expect(1 === 1).to.be.true;
  });

  it('2 equals 2', () => {
    expect(2 === 2).to.be.true;
  });

  it.skip('1 equals 3', () => {
    expect(1 === 3).to.be.true;
  });

  it('3 equals 3', () => {
    expect(3 === 3).to.be.true;
  });

  it('4 equals 4', () => {
    expect(4 === 4).to.be.true;
  });

  it('5 equals 5', () => {
    expect(5 === 5).to.be.true;
  });

  it('6 equals 6', () => {
    expect(6 === 6).to.be.true;
  });

  it('7 equals 7', () => {
    expect(7 === 7).to.be.true;
  });
});
