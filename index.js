const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const learningQuestionsRoutes = require("./src/routes/learningQuestionsRoutes");
const JwtRoutes = require("./src/routes/JwtRoutes");
const notificationRouter = require("./src/routes/notificationRoutes");
const userRoutes = require("./src/routes/userRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
const grammarRoutes = require("./src/routes/grammarRoutes");
const quizRoutes = require("./src/routes/quizsRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const makeUserRoutes = require("./src/routes/makeUserRoutes");
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Lang Master is Running");
});

app.use("/learning-questions", learningQuestionsRoutes);
app.use("/json-web-token", JwtRoutes);
app.use("/notifications", notificationRouter);
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/reviews", feedbackRoutes);
app.use("/grammars", grammarRoutes);
app.use("/quizs", quizRoutes);
app.use("/admins", adminRoutes);
app.use("/makeUsers", makeUserRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error (Default)");
});

app.listen(port, () => {
  console.log(`Lang master app listening on port ${port}`);
});
