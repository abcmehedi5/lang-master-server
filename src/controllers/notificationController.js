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
const getNotification = async (query) => {
  const client = await connectToMongoDB();
  const notificationCollection = client
    .db("LangMaster")
    .collection("notifications");
  const notificationData = notificationCollection.find(query).toArray();
  return notificationData;
};

// delete notification
const deleteNotification = async (query) => {
  const client = await connectToMongoDB();
  const notificationCollection = client
    .db("LangMaster")
    .collection("notifications");
  const result = await notificationCollection.deleteOne(query);
  return result;
};
module.exports = {
  createNotification,
  getNotification,
  deleteNotification,
};
