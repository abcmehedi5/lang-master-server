const connectToMongoDB = require("../config/db");
// grammar all data get
const getGrammar = async () => {
  const client = await connectToMongoDB();
  const grammarCullection = client.db("LangMaster").collection("grammars");
  const grammarData = await grammarCullection.find().toArray();
  return grammarData;
};

module.exports = {
  getGrammar,
};
