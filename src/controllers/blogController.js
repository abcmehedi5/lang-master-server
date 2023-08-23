const connectToMongoDB = require("../config/db");

// get all blog data
const getBlog = async () => {
  const client = await connectToMongoDB();
  const blogCollection = client.db("LangMaster").collection("blogs");
  const result = blogCollection.find().toArray();
  return result;
};

//  blog data by id
const getBlogById = async (query) => {
  const client = await connectToMongoDB();
  const blogCollection = client.db("LangMaster").collection("blogs");
  const result = await blogCollection.findOne(query);
  return result;
};

module.exports = {
  getBlog,
  getBlogById,
};
