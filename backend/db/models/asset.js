var mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    key: String,
    denomination_type: String,
    denomination_amount: Number
});

var Asset = mongoose.model("asset", assetSchema);

module.exports = { Asset };