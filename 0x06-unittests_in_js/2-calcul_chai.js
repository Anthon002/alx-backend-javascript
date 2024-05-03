const calculateNumber = (type, a, b) => {
  if (type === 'SUM') {
    math_round = Math.round(a) + Math.round(b);
    return math_round
  }
  if (type === 'SUBTRACT') {
    math_round_sub = Math.round(a) - Math.round(b);
    return math_round_sub
  }
  if (type === 'DIVIDE') {
    return Math.round(b) === 0 ? 'Error' : Math.round(a) / Math.round(b);
  }
  return 0;
};

module.exports = calculateNumber;
