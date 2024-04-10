const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  volunteers: {
    type: Number,
    required: true,
  },
  registered_volunteers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
