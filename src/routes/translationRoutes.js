const express = require("express");
const router = express.Router();
const translationController = require("../controllers/translationController");
const translateLimiter = require("../middleware/translateLimiter");

router.post("/", translateLimiter, translationController.translateText);

module.exports = router;
