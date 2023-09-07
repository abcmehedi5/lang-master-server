const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// getting all books
router.get("/book", async (req, res) => {
  try {
    const result = await bookController.getAllBooks();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "error getting all books", error });
  }
});

// get single user books
router.get("/bought-book", async (req, res) => {
  const email = req.query.email;
  try {
    const result = await bookController.getUserBooks(email);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "error getting all books", error });
  }
});

// get all bought books
router.get("/bought-books", async (req, res) => {
  try {
    const result = await bookController.getAllBoughtBooks();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "error getting all books", error });
  }
});

// post bought books on db
router.post("/bought-book", async (req, res) => {
  const bookInfo = req.body.bookInfo;
  try {
    const result = await bookController.postBoughtBooks(bookInfo);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "error posting bought books", error });
  }
});

module.exports = router;
