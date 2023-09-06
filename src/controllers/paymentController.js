const connectToMongoDB = require("../config/db");
const stripe = require("stripe")(`${process.env.PAYMENT_SECRET_KEY}`);

// const paymentsIntent = async (price) => {
//   const client = await connectToMongoDB();
//   const paymentCollection = client.db("LangMaster").collection("payments");

//   if(price){
//     const amount = parseFloat(price) * 100;
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount : amount,
//         currency : 'usd',
//         payment_method_types: ['card']
//     })
//     return paymentIntent
//   }
// };

// save payment information to db

const savePaymentInfo = async (paymentInfo) => {
  const client = await connectToMongoDB();
  const paymentCollection = client.db("LangMaster").collection("payments");
  const result = await paymentCollection.insertOne(paymentInfo);
  return result;
};

// Get all Payment data ------------
const getPayment = async () => {
  const client = await connectToMongoDB();
  const paymentCollection = client.db("LangMaster").collection("payments");
  const result = await paymentCollection.find().toArray();
  return result;
};
// Get all Payment email ------------
const getPaymentEmail = async (query) => {
  const client = await connectToMongoDB();
  const paymentCollection = client.db("LangMaster").collection("payments");

  const result = await paymentCollection.find(query).toArray();
  return result;
};

// delete payment
const deletePayment = async (query) => {
  const client = await connectToMongoDB();
  const paymentCollection = client.db("LangMaster").collection("payments");
  const result = await paymentCollection.deleteOne(query);
  return result;
};

module.exports = {
  savePaymentInfo,
  getPayment,
  deletePayment,
  getPaymentEmail,
};
