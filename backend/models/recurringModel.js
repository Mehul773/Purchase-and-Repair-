const mongoose = require("mongoose");

const recurring = mongoose.Schema(
  {
    Sr_No: { type: String, unique: true, required: true },
    Description_of_Material: { type: String, default: "" },
    Name_Of_Supplier: { type: String, default: "" },
    Bill_No: { type: String, default: "" },
    Date: { type: String, default: "" },
    Amount: { type: String, default: "" },
    Material: { type: String, default: "" },
    Receivng_date: { type: String, default: "" },
    Year: { type: String, default: "" },
    Yearly_expense: { type: String, default: "" },
    Department: { type: String, default: "" },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Recurring", recurring);
