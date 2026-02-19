const { createApp } = require("./app");
const { connectToMongo } = require("./db");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/simple_node_mongo";

async function main() {
  await connectToMongo(MONGO_URI);

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

