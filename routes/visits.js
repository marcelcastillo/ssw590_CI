const express = require("express");
const Counter = require("../models/Counter");

const router = express.Router();

// GET /visits -> current count
router.get("/", async (req, res) => {
  const doc = await Counter.findOne({ name: "visits" }).lean();
  res.json({ visits: doc?.value ?? 0 });
});

// POST /visits -> increment and return new count
router.post("/", async (req, res) => {
  const doc = await Counter.findOneAndUpdate(
    { name: "visits" },
    { $inc: { value: 1 }, $setOnInsert: { name: "visits" } },
    { new: true, upsert: true }
  ).lean();

  res.json({ visits: doc.value });
});

module.exports = router;

