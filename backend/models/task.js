const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bounty: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ]
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
