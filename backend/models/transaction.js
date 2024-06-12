const mongoose = require("mongoose");
const formatDate = require("../utils/formatDate");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

const Transaction = mongoose.model("Transaction",transactionSchema)
module.exports = Transaction