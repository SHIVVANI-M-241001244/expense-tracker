const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

// ADD income or expense
router.post("/add", async (req, res) => {
  try {
    const { userId, type, category, amount, date, note } = req.body;

    const transaction = await Transaction.create({
      userId,
      type,
      category,
      amount,
      date,
      note,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction ❌" });
  }
});

// GET all transactions for a user
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.params.userId,
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions ❌" });
  }
});

module.exports = router;
