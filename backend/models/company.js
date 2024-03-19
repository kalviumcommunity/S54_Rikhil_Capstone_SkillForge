const mongoose = require("mongoose")
const formatDate = require("../utils/formatDate")

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: formatDate
    }
})

const Company = mongoose.model("Company", companySchema)

module.exports = Company