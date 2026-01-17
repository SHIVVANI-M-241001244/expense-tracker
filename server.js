const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes"); // ✅ ADD

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes); // ✅ ADD

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
