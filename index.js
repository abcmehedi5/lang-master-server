const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
// middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER, process.env.DB_PASSWORD);
// MONGODB CONNECT START------------------------------------
// const uri = `mongodb+srv://<${process.env.DB_USER}>:<${process.env.DB_PASSWORD}>@langmaster.cdgcbkc.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@langmaster.cdgcbkc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // collections
    const learningQuestionsCollection = client
      .db("LangMaster")
      .collection("questions");

    //! get all learning questions
    app.get("/learning-questions", async (req, res) => {
      const allQuestions = await learningQuestionsCollection.find().toArray();
      res.send(allQuestions);
    });

    await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// MONGODB CONNECT END------------------------------------

app.get("/", (req, res) => {
  res.send("Hello Lang Master");
});
app.listen(port, () => {
  console.log(`Lang master app listening on port ${port}`);
});
