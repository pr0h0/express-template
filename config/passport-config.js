const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userService = require("../services/user.service");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, next) => {
      try {
        const user = await userService.getByEmail(email);

        if (user) {
          const isMatch = await userService.compareUserPassword(
            password,
            user.password
          );
          if (isMatch) {
            next(null, user);
            return;
          }
        }
        next(null, false, { message: "Invalid username or password" });
      } catch (err) {
        next(err);
      }
    }
  )
);
