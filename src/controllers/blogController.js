const connectToMongoDB = require("../config/db");

const getBlog = async () => {
  const client = await connectToMongoDB();
  const blogCollection = client.db("LangMaster").collection("blogs");
  const result = blogCollection.find().toArray();
  return result;
};

module.exports = {
  getBlog,
};
