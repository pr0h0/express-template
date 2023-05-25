const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");

const jsonResponseMiddleware = require("./middlewares/jsonResponseMiddleware");
const HttpError = require("./utils/httpError");
require("./config/passport-config");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Express session
app.use(
  session({
    secret: "env-online-session-secret!@#$%^&*()",
    saveUninitialized: true,
    resave: true,
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// add response json method to res object (res.jsonError, res.jsonSuccess)
app.use(jsonResponseMiddleware);

require("./routes/router").forEach((route) => {
  app.use(route.path, route.handler);
  console.log(`Route ${route.path} is ready`);
});

// error handler
app.use(function (err, req, res, next) {
  if (err instanceof HttpError) {
    res.jsonError({
      status: err.status,
      msg: err.message,
      data: err.data,
    });
  } else {
    res.jsonError({
      status: 500,
      msg: err.message,
      data: null,
    });
  }
});

module.exports = app;
