const mongoose = require("mongoose");
const formatDate = require("../utils/formatDate");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  address: {
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
  website: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: formatDate,
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
