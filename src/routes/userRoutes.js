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
  const result = await userController.getUser();
  res.send(result);
});

module.exports = router;
