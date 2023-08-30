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

//  quizes create

router.post("/quiz", async (req, res) => {
  const data = req.body;
  try {
    await quizsController.createQuize(data);
    res.status(200).send({ Message: "Quize Post Successfull" });
  } catch (error) {
    res.status(500).send({ error: "Quize Post Internal Server Error" });
  }
});

module.exports = router;
