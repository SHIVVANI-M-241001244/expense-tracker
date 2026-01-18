const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

/* GET transactions by user */
router.get("/:userId", async (req, res) => {
  try {
    const txns = await Transaction.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ADD transaction */
router.post("/add", async (req, res) => {
  try {
    const txn = new Transaction(req.body);
    await txn.save();
    res.json(txn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE transaction */
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE transaction */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
