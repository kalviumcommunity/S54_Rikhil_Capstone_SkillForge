const mongoose = require("mongoose");

const instituionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  instname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  contact: {
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
});

const Institution = mongoose.model("Institution", instituionsSchema);

module.exports = Institution;
