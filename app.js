const express = require("express");
const visitsRouter = require("./routes/visits");

function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.json({ ok: true });
  });

  app.use("/visits", visitsRouter);

  // simple 404
  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}

module.exports = { createApp };

