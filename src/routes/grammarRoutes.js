const express = require("express");
const router = express.Router();
const grammarController = require("../controllers/GrammarController");
router.get("/grammar", async (req, res) => {
  try {
    const grammarData = await grammarController.getGrammar();
    res.status(200).send(grammarData);
  } catch (error) {
    res.status(500).send({ error: "Internal server error", error });
  }
});

module.exports = router;
