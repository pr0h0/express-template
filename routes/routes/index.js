const express = require("express");
const router = express.Router();

const Controller = require("../controllers/index.js");
const apiController = require("../controllers/api.js");

router.all("/api/*", apiController.notFound);
router.all("*", Controller.index);

module.exports = router;
