const express = require("express");
const router = express.Router();
const learningQuestionsController = require("../controllers/learningQuestionsController");
const verifyJWT = require("../middleware/verifyJWT");

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
router.get("/questions", verifyJWT, async (req, res) => {
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

router.post("/questions-create" , async (res, req) =>{
  try {
    //route 
  } catch (error) {
    // error
  }
} )


// unit add api Controller end ----------------------------

module.exports = router;
