const express = require("express");
const router = express.Router();
const learningQuestionsController = require("../controllers/learningQuestionsController");
const verifyJWT = require("../middleware/verifyJWT");
const { ObjectId } = require("mongodb");

// Add a new route for POST requests to create a question
router.post("/questions", async (req, res) => {
  try {
    const questionData = req.body;
    // find data to controller
    await learningQuestionsController.createLearningQuestion(questionData);
    res.status(200).json({
      message: "Question Create Successfull",
    });
  } catch (error) {
    console.error("Error creating learning question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all data form learningQuestionsController
router.get("/questions", async (req, res) => {
  try {
    const allQuestions =
      await learningQuestionsController.getAllLearningQuestions();
    res.send(allQuestions);
  } catch (error) {
    console.error("Error fetching learning questions:", error);
    res.status(500).send("Internal Server Error");
  }
});

// unit add api Controller start ----------------------------

router.post("/questions-create", async (res, req) => {
  try {
    const data = req.body;
    await learningQuestionsController.unitAdd(data);
    res.status(200).send({ message: "unit post successfull" });
  } catch (error) {
    console.error("Error fetching learning questions:", error);
    res.status(500).send("Internal Server Error");
  }
});

// unit add api Controller end ----------------------------

// unit fnished api start ----------------------

router.post("/unitfinished/:id", async (req, res) => {
  try {
    const userId = req.params.id; //find user from user collection
    const userQuery = { _id: new ObjectId(userId) };
    const number = req.body.unitNumber;
    console.log("working", number);
    const numberCalculate = parseInt(number) + 1;
    const unitNumber = numberCalculate.toString();
    const restul = await learningQuestionsController.finishedUnit(
      userQuery,
      unitNumber
    );
    console.log(restul);
    res.status(200).send(restul);
  } catch (error) {
    res.status(500).send({
      error: `তোমার ${unitNumber} ইউনিট Unlcok করতে ব্যার্থ হয়েছো । আবার চেষ্টা করুন ধন্যবাদ !`,
    });
  }
});

// unit fnished api end ----------------------
module.exports = router;
