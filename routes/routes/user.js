const express = require("express");
const router = express.Router();

const Controller = require("../controllers/user");

router.post("/register", Controller.register);
router.post("/login", Controller.login.auth, Controller.login.post);
router.all("/logout", Controller.logout);

module.exports = router;
