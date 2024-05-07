const mongoose = require("mongoose");
const formatDate = require("../utils/formatDate");

const applicationSchema = new mongoose.Schema({
  why: {
    type: String,
    required: true,
  },
  how: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  state: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected"],
  },
  generated: {
    type: Date,
    default: formatDate,
  },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
