const HttpError = require("../utils/httpError");

module.exports = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin === 1) {
    next();
  } else {
    throw HttpError.Forbidden("You are not authorized to access this page");
  }
};
