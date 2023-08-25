const connectToMongoDB = require("../config/db");
// get operation controller
const getQuizs = async () => {
  const client = await connectToMongoDB();
  const quizsCollection = client.db("LangMaster").collection("quizs");
  const notificationData = quizsCollection.find().toArray();
  return notificationData;
};

module.exports = {
  getQuizs,
};
