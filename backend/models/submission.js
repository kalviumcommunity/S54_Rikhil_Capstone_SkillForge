const mongoose = require("mongoose");
const formatDate = require("../utils/formatDate");

const submissionSchema = new mongoose.Schema({
  repo: {
    type: String,
    required: true,
  },
  deployed: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  feedback: {
    type: String,
  },
  winner: {
    type: Boolean,
    default: false,
  },
  generated: {
    type: Date,
    default: formatDate,
  },
});
