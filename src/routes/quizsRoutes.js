const express = require("express");
const router = express.Router();
const quizsController = require("../controllers/quizsController");

// quizs post oparetion
router.get("/quiz", async (req, res) => {
  try {
    const quizsData = await quizsController.getQuizs();
    res.status(200).send(quizsData);
  } catch (error) {
    res.status(500).send({ error: "NOtification Internal Server Error" });
  }
});

module.exports = router;
