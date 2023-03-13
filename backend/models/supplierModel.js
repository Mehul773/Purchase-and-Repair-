const mongoose = require("mongoose");

const supplier = mongoose.Schema({
  supplier: { type: String, default: "", unique: true },
  address: { type: String, default: "" },
  contact: { type: String, default: "", unique: true },
});

module.exports = mongoose.model("Supplier", supplier);
