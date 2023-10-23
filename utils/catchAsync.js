module.exports = (fn) => {
  //need to return function with request from express route
  return (req, res, next) => {
    // fn returns a promise, no need for try block
    // this catch function will trigger global error handler
    fn(req, res, next).catch(next);
  };
};
