const mongoose = require("mongoose");

const recurring = mongoose.Schema({
  Sr_No: String,
  Description_of_Material: String,
  Name_Of_Supplier: String,
  Bill_No: String,
  Date: String,
  Amount: String,
  Material: String,
  Receiving_Year: String,
  Year: String,
  Yearly_expense: String,
  Department: String,
});

module.exports = mongoose.model("Recurring", recurring);
