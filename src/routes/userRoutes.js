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

// get single user

router.get("/singleUser", async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  try {
    const result = await userController.getSingleUser(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", error });
  }
});

//update user learning points

router.patch("/user/:email", async (req, res) => {
  const userEmail = req.params.email;
  const score = req.body.score;
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

// delete user data

router.delete("/user", async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await userController.deleteUser(query);
    res.status(200).send({ message: "user delete successfull", data: result });
  } catch (error) {
    res.status(500).send({ error: "Search not working", error });
  }
});

// check admin by user

router.get("/admin", async (req, res) => {
  try {
    const email = req.query.email;
    // if (req.decoded !== email) {
    //   res.send({ admin: false });
    // }

    const query = { email: email };
    const user = await userController.adminCheck(query);
    const isAdmin = { admin: user?.role == "admin" };
    res.send(isAdmin);
  } catch (error) {
    res.status(500).send({ error: "there was a server side error", error });
  }
});

module.exports = router;
