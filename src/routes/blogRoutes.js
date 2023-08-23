const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/blog", async (req, res) => {
  try {
    const blogData = await blogController.getBlog();
    res.status(200).send(blogData);
  } catch (error) {
    res.status(500).send({ error: "internal server error" });
  }
});

module.exports = router;
