const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { ObjectId } = require("mongodb");


// Post or Add All Books

router.post('/addBook', async(req,res)=>{
const addBook = req.body 
 
try {
  await bookController.createBook(addBook);
  res.status(200).send({ Message: "Book Post Successfull" });
} catch (error) {
  res.status(500).send({ error: "Book Post Internal Server Error" });
}


})

// delete a book from all book 

router.delete('/deleteBook/:id', async(req,res)=> {
  const id = req.params.id 
  try{
    const query = {_id : new ObjectId(id)}
    const deleteBook = await bookController.deleteBook(query)
    res.status(200).send({ message: "Book deleted", data: deleteBook });
  }catch (error) {
    res.status(500).send({ error: "Book Internal Server Error" });
  }

})



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


// delete bought-books --------------
router.delete("/bought-books/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const bookDelete = await bookController.boughtBookDelete(query);
    res
      .status(200)
      .send({ message: "Book deleted", data: bookDelete });
  } catch (error) {
    res.status(500).send({ error: "Book Internal Server Error" });
  }
});

module.exports = router;
