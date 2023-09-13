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

router.post("/payment", async (req, res) => {
  try {
    const data = req.body;
    await blogController.createBlog(data);
    res.status(200).send({ message: "Blog Post successfull" });
  } catch (error) {
    res.status(500).send({ error: "internal server error", error });
  }
});


// // Update the like count for a specific blog post
router.patch("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };

    // Get the current like count from the request body
    const { like } = req.body;

    // Update the blog post with the new like count
    await blogController.updateLikeCount(query, like);

    res.status(200).send({ message: "Like count updated successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error", error });
  }
});

// Update the like count for a specific blog post and store user information
router.put("/blog/:id/like", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const { username, email, liked, userImg } = req.body;
    await blogController.updateLikeCount(query);

    // Store user information in the blog post
    await blogController.storeLikedUser(query, { username, email, liked, userImg });

    res.status(200).send({ message: "Like count updated successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error", error });
  }
});


module.exports = router;
