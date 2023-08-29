const connectToMongoDB = require("../config/db");

// post operation user
const createUser = async (userData, query) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  //   check existing user
  const existingUser = await userCollection.findOne(query);
  if (existingUser) {
    return res.send({ message: "user already exists" });
  }
  //   store user data
  const result = await userCollection.insertOne(userData);
  return result;
};

// get operation user
const getUser = async () => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const result = await userCollection.find().toArray();
  return result;
};

//update user with quiz result
const updateUser = async (userEmail, score) => {
  console.log("controler score", score);
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const updateResult = await userCollection.updateOne(
    { email: userEmail },
    {
      $inc: {
        score: score,
      },
    }
  );

  return updateResult;
};

//get user by search on user management page
const searchUser = async (searchText) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");

  const result = await userCollection
    .find({
      $or: [
        { name: { $regex: searchText, $options: "i" } }, // Case-insensitive search
        { email: { $regex: searchText, $options: "i" } }, // Case-insensitive search
      ],
    })
    .toArray();
  return result;
};

// Create indexes once during database initialization
const createIndexes = async () => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");

  const indexKeys = { name: 1, email: 1 };
  const indexOption = { name: "nameEmail" };
  await userCollection.createIndex(indexKeys, indexOption);
};
createIndexes().catch(console.error);

// single user get

const getSingleUser = async (query) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const userData = userCollection.findOne(query);
  return userData;
};

//  user delete

const deleteUser = async (query) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const result = userCollection.deleteOne(query);
  return result;
};

// check admin users

const adminCheck = async (query) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const user = await userCollection.findOne(query);
  return user;
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  searchUser,
  createIndexes,
  getSingleUser,
  adminCheck,
  deleteUser,
};
