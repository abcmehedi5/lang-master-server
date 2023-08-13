const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const user = require("./fakeData.json");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
// middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Lang Master");
});

// MONGODB CONNECT START------------------------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mbjz2.mongodb.net/?retryWrites=true&w=majority`;
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
    await client.db("admin").command({ ping: 1 });

    // database collection
    const db = client.db("langmaster");
    const userCollection = db.collection("users");

    // api

    app.get("/user", (req, res) => {
      res.send(user);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// MONGODB CONNECT END------------------------------------

app.listen(port, () => {
  console.log(`Lang master app listening on port ${port}`);
});
