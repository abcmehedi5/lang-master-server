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


// create blog

const createBlog = async (data) =>{
  const client = await connectToMongoDB();
  const blogCollection = client.db("LangMaster").collection("blogs");
  const result = blogCollection.insertOne(data)
  return result
}

module.exports = {
  getBlog,
  getBlogById,
  createBlog
};
