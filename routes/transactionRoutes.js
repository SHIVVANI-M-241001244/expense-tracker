const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

/* =========================
   ADD TRANSACTION
========================= */
router.post("/add", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =========================
   GET USER TRANSACTIONS
========================= */
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =========================
   DELETE TRANSACTION ✅
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
