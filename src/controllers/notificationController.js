const connectToMongoDB = require("../config/db");
// post  operation controller
const createNotification = async (notificationData) => {
  const client = await connectToMongoDB();
  const notificationCollection = client
    .db("LangMaster")
    .collection("notifications");
  const result = await notificationCollection.insertOne(notificationData);
  return result;
};

// get operation controller
const getNotification = async () => {
  const client = await connectToMongoDB();
  const notificationCollection = client
    .db("LangMaster") 
    .collection("notifications");
  const notificationData = notificationCollection.find().toArray();
  return notificationData;
};

module.exports = {
  createNotification,
  getNotification,
};
