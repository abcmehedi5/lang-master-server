const connectToMongoDB = require("../config/db");
//  gate all question
const getAllLearningQuestions = async () => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");
  const allQuestions = await learningQuestionsCollection.find().toArray();
  return allQuestions;
};

// Function to create a new learning question
const createLearningQuestion = async (questionData) => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");

  // Insert the new question into the database
  const result = await learningQuestionsCollection.insertOne(questionData);
  // Return the newly created question
  return result;
};

// unit add api Controller start ----------------------------

const unitAdd = async (data) => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");
  const result = await learningQuestionsCollection.insertOne(data);
  return result;
};

// unit add api Contoller end -------------------------------

// finished unit api  start ----------------------------------------

const finishedUnit = async (userQuery, unitNumber) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  // Check if the unitNumber is already in the unit array
  const userFind = await userCollection.findOne(userQuery);
  if (userFind && userFind.unit.includes(unitNumber)) {
    const Message = { message: "তুমি এই Unit এর আগে একবার শেষ করেছো ।" };
    return Message;
  }
  // If the unitNumber is not in the array, push it
  await userCollection.updateOne(userQuery, {
    $push: { unit: unitNumber },
  });
  return {
    message: `তোমার ${unitNumber} ইউনিট Unlcok করা হয়েছে। Next Button ক্লিক করে পয়েন্ট সংগ্রহ করুন ধন্যবাদ ! `,
  };
};
// finished unit api end ----------------------------------------

const certificateController = async (queryParameters) => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");
  const result = await learningQuestionsCollection.find().toArray();
  console.log(result);
};

// add lesson and question dynamically start -----------------------------

const addLesson = async (query) => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");
  const result = learningQuestionsCollection.findOne(query);
  return result;
};

// add lesson and question dynamically end -------------------------------

module.exports = {
  getAllLearningQuestions,
  createLearningQuestion,
  unitAdd,
  finishedUnit,
  certificateController,
  addLesson,
};
