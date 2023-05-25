module.exports = [
  {
    path: "/api/users",
    handler: require("./routes/user.js"),
  },
  {
    path: "/",
    handler: require("./routes/index"),
  },
];
