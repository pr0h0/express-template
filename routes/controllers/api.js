const HttpError = require("../../utils/httpError");

const notFound = (req, res) => {
  throw HttpError.NotFound("Route not found");
};

module.exports = {
  notFound,
};
