const express = require("express");
const unitAddController = require("../controllers/unitAddController");
const router = express.Router();
router.post("/createUnit", async (req, res) => {
  console.log(req.body);

  try {
    await unitAddController.createAdds(data);
    res.status(200).send({ message: "unit create successfull" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

module.exports = router;
