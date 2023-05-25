const HttpError = require("../utils/httpError");

module.exports = function userGuard(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw HttpError.Unauthorized("Please log in first");
  }
};
