const passport = require("passport");

const HttpError = require("../../utils/httpError");
const asyncWrapper = require("../../utils/asyncWrapper");
const userService = require("../../services/user.service");

const register = async (req, res) => {
  const { email, username, password } = req.body;

  const normalizedEmail = email?.toString().toLowerCase().trim();
  const normalizedUsername = username?.toString().toLowerCase().trim();

  if (!normalizedEmail || !normalizedUsername || !password)
    throw HttpError.BadRequest("Missing required fields");

  const user = await userService.getByUsernameOrEmail(
    normalizedUsername,
    normalizedEmail
  );

  if (user && user.email === normalizedEmail)
    throw HttpError.BadRequest("Email is already taken");
  if (user && user.username === normalizedUsername)
    throw HttpError.BadRequest("Username is already taken");
  if (password.length < 6)
    throw HttpError.BadRequest("Password must be at least 6 characters");

  const hashedPassword = await userService.hashUserPassword(password);

  await userService.create({
    email: normalizedEmail,
    username: normalizedUsername,
    password: hashedPassword,
    isAdmin: 0,
  });

  res.jsonSuccess({ data: null, msg: "User registered" });
};

const loginAuth = passport.authenticate("local", {
  failureRedirect: "/login",
});

const loginPost = async (req, res) => {
  const user = await userService.getById(req.user.id);

  res.jsonSuccess({ data: user, msg: "User logged in" });
};

const logout = async (req, res) => {
  req.logout(console.log);
  res.jsonSuccess({ msg: "User logged out" });
};

module.exports = {
  register: asyncWrapper(register),
  login: {
    auth: asyncWrapper(loginAuth),
    post: asyncWrapper(loginPost),
  },
  logout: asyncWrapper(logout),
};
