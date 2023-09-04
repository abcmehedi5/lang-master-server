const connectToMongoDB = require("../config/db");
//  gate all question
const createAdds = async () => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");
};

module.exports = {
  createAdds,
};
