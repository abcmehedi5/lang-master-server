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





// Increment the like count for a blog post
const updateLikeCount = async (query, newLikeCount) => {
  const client = await connectToMongoDB();
  const blogCollection = client.db("LangMaster").collection("blogs");
  // Update the like count in the database
  const result =  blogCollection.updateOne(query, { $set: { like: newLikeCount } });
  return result;
};


// added user info after clicking on click
const storeLikedUser = async (query, userData) => {
  const client = await connectToMongoDB();
  const blogCollection = client.db("LangMaster").collection("blogs");
  // Use $push to add user information to the likedUsers array
  const result = blogCollection.updateOne(query, { $push: { likedUsers: userData } });
  return result;
};




module.exports = {
  getBlog,
  getBlogById,
  createBlog,
  updateLikeCount,
  storeLikedUser,
};