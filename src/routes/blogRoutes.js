const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { ObjectId } = require("mongodb");

// get all blogs data
router.get("/blog", async (req, res) => {
  try {
    const blogData = await blogController.getBlog();
    res.status(200).send(blogData);
  } catch (error) {
    res.status(500).send({ error: "internal server error" });
  }
});

// get single blog data by id

router.get("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const blogData = await blogController.getBlogById(query);
    res.status(200).send(blogData);
  } catch (error) {
    res.status(500).send({ error: "internal server error", error });
  }
});

// create post api

router.post("/blog", async (req, res) => {
  try {
    const data = req.body;
    await blogController.createBlog(data);
    res.status(200).send({ message: "Blog Post successfull" });
  } catch (error) {
    res.status(500).send({ error: "internal server error", error });
  }
});
module.exports = router;
