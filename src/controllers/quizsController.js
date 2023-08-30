const connectToMongoDB = require("../config/db");
// get operation controller
const getQuizs = async () => {
  const client = await connectToMongoDB();
  const quizsCollection = client.db("LangMaster").collection("quizs");
  const notificationData = quizsCollection.find().toArray();
  return notificationData;
};

// create quizes

const createQuize = async (data) => {
  const client = await connectToMongoDB();
  const quizsCollection = client.db("LangMaster").collection("quizs");
  const result = quizsCollection.insertOne(data);
  return result;
};

module.exports = {
  getQuizs,
  createQuize,
};
