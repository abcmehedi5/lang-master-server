const express = require("express");
const router = express.Router();
const feedbackController = require("./../controllers/feedbackController");

router.patch("/review/:email", async (req, res) => {
  try {
    const reviewData = req.body;
    console.log("review data", reviewData);
    const email = req.params.email;
    const result = await feedbackController.createReview(reviewData, { email });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal server error", error });
  }
});

router.get("/review", async (req, res) => {
  try {
    const result = await feedbackController.getReviews();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal server error", error });
  }
});

module.exports = router;
