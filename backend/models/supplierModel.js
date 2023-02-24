const mongoose = require("mongoose");

const supplier = mongoose.Schema({
  supplier: { type: String, default: "" },
  address: { type: String, default: "" },
  contact: { type: String, default: "" },
});

module.exports = mongoose.model("Supplier", supplier);
