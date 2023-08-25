const connectToMongoDB = require("../config/db");

const createReview = async (review, query) => {
  const client = await connectToMongoDB();
  const reviewsCollection = client.db("LangMaster").collection("reviews");
  const previousReview = await reviewsCollection.findOne(query);
  console.log("previous", previousReview);

  if (previousReview) {
    const updatedReview = await reviewsCollection.updateOne(query, {
      $set: review,
    });
    return updatedReview;
  }

  const newReview = await reviewsCollection.insertOne(review);
  return newReview;
};

const getReviews = async () => {
  const client = await connectToMongoDB();
  const reviewsCollection = client.db("LangMaster").collection("reviews");
  const result = await reviewsCollection.find().toArray();
  return result;
};
module.exports = {
  createReview,
  getReviews,
};
