const mongoose = require("mongoose");

const recurring = mongoose.Schema({
  Sr_No: { type: String, default: "" },
  Description_of_Material: { type: String, default: "" },
  Name_Of_Supplier: { type: String, default: "" },
  Bill_No: { type: String, default: "" },
  Date: { type: String, default: "" },
  Amount: { type: String, default: "" },
  Material: { type: String, default: "" },
  Receiving_Year: { type: String, default: "" },
  Year: { type: String, default: "" },
  Yearly_expense: { type: String, default: "" },
  Department: { type: String, default: "" },
});

module.exports = mongoose.model("Recurring", recurring);
