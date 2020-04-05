var mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
    id: Number,
    rate: String,
    tier: Number
});

var ExchangeRate = mongoose.model("exchangerate", rateSchema);

module.exports = { ExchangeRate };