const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// user create post oparetion
router.post("/user", async (req, res) => {
  try {
    const userData = req.body;
    const query = { email: userData.email };
    await userController.createUser(userData, query);
    res.status(200).send({ message: "Account create successfull !" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", error });
  }
});

// user get

router.get("/user", async (req, res) => {
  try {
    const result = await userController.getUser();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", error });
  }
});

//update user

router.patch("/user/:email", async (req, res) => {
  const userEmail = req.params.email;
  const score = req.body.score;
  console.log("useremail", userEmail, score);
  try {
    const result = await userController.updateUser(userEmail, score);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", error });
  }
});

router.get("/user/:searchText", async (req, res) => {
  const searchText = req.params.searchText;
  try {
    const result = await userController.searchUser(searchText);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Search not working", error });
  }
});

module.exports = router;
