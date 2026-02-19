const mongoose = require("mongoose");

async function connectToMongo(mongoUri) {
  if (!mongoUri) throw new Error("MONGO_URI is required");
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
  return mongoose.connection;
}

async function disconnectMongo() {
  await mongoose.disconnect();
}

module.exports = { connectToMongo, disconnectMongo };

