const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const learningQuestionsRoutes = require("./src/routes/learningQuestionsRoutes");
const JwtRoutes = require("./src/routes/JwtRoutes");
const notificationRouter = require('./src/routes/notificationRoutes')
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Lang Master");
});

app.use("/learning-questions", learningQuestionsRoutes);
app.use("/json-web-token", JwtRoutes);
app.use("/notifications" , notificationRouter)
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error (Default)");
});

app.listen(port, () => {
  console.log(`Lang master app listening on port ${port}`);
});
