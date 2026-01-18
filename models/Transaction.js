const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: Number,
    type: String,
    category: String,
    note: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
