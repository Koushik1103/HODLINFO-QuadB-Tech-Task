const express = require("express");
const router = express.Router();
const { page } = require("../controller/controller.js");

router.get("/", page);

module.exports = router;