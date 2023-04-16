module.exports = (thatFunction) => (req, res, next) => {
  Promise.resolve(thatFunction(req, res, next)).catch(next);
};
