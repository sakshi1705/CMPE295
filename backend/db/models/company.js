var mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    id: Number,
    name: String,
    tier: Number
});

var Company = mongoose.model("company", companySchema);

module.exports = { Company };