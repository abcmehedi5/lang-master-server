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

//update user with learning point result
const updateUserPoints = async (userEmail, score) => {
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

// update user profile data
const updateUser = async (userEmail, updatedData) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const updateUser = await userCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        name: updatedData.name,
        bio: updatedData.bio,
        birthday: updatedData.birthday,
        address: updatedData.address,
        phoneNumber: updatedData.phoneNumber,
        gender: updatedData.gender,
        image: updatedData.image,
      },
    }
  );
  return updateUser;
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

// // admin make user role

const makeAdmin = async (query, updateData) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const result = userCollection.updateOne(query, updateData);
  return result;
};

module.exports = {
  createUser,
  getUser,
  updateUserPoints,
  updateUser,
  searchUser,
  createIndexes,
  getSingleUser,
  adminCheck,
  deleteUser,
  makeAdmin,
};
