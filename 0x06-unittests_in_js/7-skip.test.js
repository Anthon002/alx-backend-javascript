const { expect } = require('chai');

describe('Testing equality of numbers', () => {
  it('should verify 1 is equal to 1', () => {
    expect(1 === 1).to.be.true;
  });

  it('should verify 2 is equal to 2', () => {
    expect(2 === 2).to.be.true;
  });

  it.skip('should verify 1 is equal to 3 (this test is skipped)', () => {
    expect(1 === 3).to.be.true;
  });

  it('should verify 3 is equal to 3', () => {
    expect(3 === 3).to.be.true;
  });

  it('should verify 4 is equal to 4', () => {
    expect(4 === 4).to.be.true;
  });

  it('should verify 5 is equal to 5', () => {
    expect(5 === 5).to.be.true;
  });

  it('should verify 6 is equal to 6', () => {
    expect(6 === 6).to.be.true;
  });

  it('should verify 7 is equal to 7', () => {
    expect(7 === 7).to.be.true;
  });
});
