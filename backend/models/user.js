const mongoose = require("mongoose");
const formatDate = require("../utils/formatDate");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  institution:{
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  created:{
    type: Date,
    default: formatDate
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
